// Example of a custom data provider
import { fetchUtils } from 'react-admin';

const apiUrl = 'https://se-europe-test.pl/api';
const domainUrl = 'https://se-europe-test.pl';
// const apiUrl = 'https://127.0.0.1:8000/api';
const httpClient = fetchUtils.fetchJson

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const url = `${apiUrl}/${resource}?page=${page}&perPage=${perPage}`;

    return httpClient(url)
      .then(response => ({
        data: response.json,
        total: parseInt(response.headers.get('x-total-count')),
      }));
  },
  getOne: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url).then(({ json }) => ({
      data: json,
    }));
  },
  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
    return httpClient(url).then(({ json }) => ({
      data: json,
    }));
  },
  // update: (resource, params) => {
  //   console.log('Updating user with data:', params.data);
  //
  //   const url = `${apiUrl}/${resource}/${params.id}`;
  //   const options = {
  //     method: 'PUT',
  //     body: JSON.stringify(params.data),
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //
  //   return httpClient(url, options).then(({ json }) => ({
  //     data: json,
  //   })).catch(error => {
  //     console.error('Update error', error);
  //     throw error;
  //   });
  // },
    update: async (resource, params) => {
        try {
            let data = { ...params.data };

            console.log("Brand Data before upload:", data);

            if (resource === "brands" && data.pictures?.rawFile) {
                // Step 1: Handle file upload
                const formData = new FormData();
                formData.append("file", data.pictures.rawFile);

                const uploadResponse = await httpClient(`${apiUrl}/brands_media_objects`, {
                    method: "POST",
                    body: formData,
                });

                // Log the upload response
                console.log("Upload Response:", uploadResponse);

                const responseJson = uploadResponse.json; // Parsed JSON from the response
                console.log("Upload Response JSON:", responseJson);

                // Extract media URL or filename
                const mediaUrl = responseJson.contentUrl;
                console.log("Extracted Media URL:", mediaUrl);

                // Extract filename (if required)
                const filename = mediaUrl.split("/").pop();
                console.log("Extracted Filename:", filename);

                // Update the imagePath or domainImagePath in the brand data
                data.imagePath = filename;
                data.domainImagePath = mediaUrl; // Optional: Assign full URL
            }

            // Step 2: Update the brand
            const url = `${apiUrl}/${resource}/${params.id}`;
            const mediaUrl = `${domainUrl}/media/${resource}`; // Replace `yourDomainUrl` with the correct base URL

            const nameField = resource === "variants" ? data.variantname : data.name;


            // Construct the payload
            const payload = {
                ...(resource === "variants"
                    ? {
                        variantname: nameField,
                        brand: {
                            id: data.bid
                        } // Include `bid` only for `variants`
                    }
                    : {
                        name: nameField
                    }),
                imagePath: data.imagePath,
                domainImagePath: `${domainUrl}/media/${resource}/${data.imagePath}`, // Full URL with domain
                // Add any other fields required by the resource
            };

            const options = {
                method: "PUT", // Use PUT for updates
                // body: JSON.stringify({
                //     name: data.name,
                //     imagePath: data.imagePath,
                //     domainImagePath: `${mediaUrl}/${data.imagePath}`, // Full URL with domain
                // }),
                body: JSON.stringify(payload),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            };

            console.log("Update Payload:", options.body);

            // Make the update request
            return httpClient(url, options).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        } catch (error) {
            console.error("Update Brand Error:", error);
            throw error;
        }
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
        });
        return { data: json };
    },
  deleteMany: (resource, ids) => {
        // Construct the URL for bulk delete
        const url = `${apiUrl}/${resource}`;

        // Create a request payload if needed
        const requestPayload = { ids }; // This format depends on your backend API

        return fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify(requestPayload),
        })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error('Network response was not ok.'));
            }
            return response.json();
        })
        .then(json => ({ data: json }))
        .catch(error => {
            console.error('Error:', error);
            throw new Error('Bulk delete failed');
        });
    },
    // create: (resource, params) => {
    //     const url = ${apiUrl}/${resource};
    //     const options = {
    //         method: 'POST',
    //         body: JSON.stringify(params.data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //         }),
    //     };
    //
    //     return httpClient(url, options).then(({ json }) => ({
    //         data: { ...params.data, id: json.id },
    //     }));
    // },

    create: async (resource, params) => {
        try {
            let data = { ...params.data };
            console.log("Data before upload:", data);

            // Handle image upload for both brands and variants
            if (data.pictures?.rawFile) {
                const formData = new FormData();
                formData.append("file", data.pictures.rawFile);

                const mediaEndpoint =
                    resource === "brands"
                        ? `${apiUrl}/brands_media_objects`
                        : `${apiUrl}/variants_media_objects`;

                const uploadResponse = await httpClient(mediaEndpoint, {
                    method: "POST",
                    body: formData,
                });

                const responseJson = uploadResponse.json;
                const mediaUrl = responseJson.contentUrl;
                const filename = mediaUrl.split("/").pop();

                data.imagePath = filename;
                data.domainImagePath = mediaUrl;

                console.log(`${resource} Data with image_path:`, data);
            }

            // Determine the URL and name field based on the resource
            const url = `${apiUrl}/${resource}`;
            const nameField = resource === "variants" ? data.variantname : data.name;

            // Construct the payload
            const payload = {
                ...(resource === "variants"
                    ? {
                        variantname: nameField,
                        brand: {
                            id: data.bid
                        } // Include `bid` only for `variants`
                    }
                    : {
                        name: nameField
                    }),
                imagePath: data.imagePath,
                domainImagePath: `${domainUrl}/media/${resource}/${data.imagePath}`, // Full URL with domain
                // Add any other fields required by the resource
            };

            console.log("Payload for creation:", payload);

            // Set up the request options
            const options = {
                method: "POST",
                body: JSON.stringify(payload),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            };

            // Make the request to create the resource
            const response = await httpClient(url, options);
            const responseJson = response.json;

            console.log("Create Resource Response:", responseJson);

            return {
                data: { ...params.data, id: responseJson.id },
            };
        } catch (error) {
            console.error("Create Resource Error:", error);
            throw error;
        }
    },



    // Other CRUD methods...
};

export default dataProvider;

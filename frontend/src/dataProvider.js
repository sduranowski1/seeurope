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
  update: (resource, params) => {
    console.log('Updating user with data:', params.data);

    const url = `${apiUrl}/${resource}/${params.id}`;
    const options = {
      method: 'PUT',
      body: JSON.stringify(params.data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };

    return httpClient(url, options).then(({ json }) => ({
      data: json,
    })).catch(error => {
      console.error('Update error', error);
      throw error;
    });
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
    create: async (resource, params) => {
        try {
            let brandData = { ...params.data };

            console.log('Brand Data before upload:', brandData);

            if (resource === "brands" && brandData.pictures?.rawFile) {
                // Step 1: Upload the image
                const formData = new FormData();
                formData.append("file", brandData.pictures.rawFile);

                const uploadResponse = await httpClient(`${apiUrl}/brands_media_objects`, {
                    method: "POST",
                    body: formData,
                });

                // Log the uploadResponse to check its structure
                console.log('Upload Response:', uploadResponse);

                // Access the json directly (since it is already parsed)
                const responseJson = uploadResponse.json; // No need to call .json()

                console.log('Upload Response JSON:', responseJson);

                // Step 2: Extract the MediaObject URL (adjust based on actual response structure)
                const mediaUrl = responseJson.contentUrl;
                console.log('Extracted Media URL:', mediaUrl);

                // Step 3: Extract filename from the mediaUrl (e.g., /media/brands/filename.jpg -> filename.jpg)
                const filename = mediaUrl.split('/').pop();
                console.log('Extracted Filename:', filename);

                // Step 4: Assign the filename to the image_path (correct field)
                brandData.imagePath = filename; // Use image_path with the filename

                // Optional: If your API expects the full media URL, you can also assign it here
                brandData.image = mediaUrl;

                console.log('Brand Data with image_path:', brandData);
            }

            // Step 5: Create the brand
            const url = `${apiUrl}/${resource}`;
            const mediaUrl = `${domainUrl}/media/${resource}`;
            const options = {
                method: "POST",
                body: JSON.stringify({
                    name: brandData.name,
                    imagePath: brandData.imagePath,
                    domainImagePath: `${mediaUrl}` + brandData.domainImagePath,
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            };

            console.log(options.body)

            // const response = await httpClient(`${apiUrl}/${resource}`, options);
            // const responseJson = await response.json(); // Await the create response
            // console.log('Create Brand Response:', responseJson);

            return httpClient(url, options).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        } catch (error) {
            console.error('Create Brand Error:', error);
            throw error;
        }
    },

    // Other CRUD methods...
};

export default dataProvider;

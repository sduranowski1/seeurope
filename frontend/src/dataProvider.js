// Example of a custom data provider
import { fetchUtils } from 'react-admin';

const apiUrl = 'https://se-europe-test.pl/api';
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
  create: (resource, params) => {
    let url = `${apiUrl}/${resource}`;
    let options;

    if (resource === 'brands_media_objects' && params.data.pictures?.rawFile) {
          // Handle file upload
          const formData = new FormData();
          formData.append('file', params.data.pictures.rawFile); // Assuming 'pictures' contains the file

          options = {
              method: 'POST',
              body: formData,
          };
    } else {
        options = {
          method: 'POST',
          body: JSON.stringify(params.data),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        };
    }

    return httpClient(url, options).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    }));
  },
  // Other CRUD methods...
};

export default dataProvider;

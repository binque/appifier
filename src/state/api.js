const apiRequest = (endpoint, method, body) =>
  () =>
    Promise.resolve()
      .then(() => {
        const hostUrl = window.env.API_URL || 'https://webcatalog.io/api';

        const url = `${hostUrl}${endpoint}`;

        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        const opts = {
          method,
          headers: new window.Headers(headers),
        };

        if (body) opts.body = JSON.stringify(body);

        return fetch(url, opts);
      })
      .then((response) => {
        // ok
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }

        // error
        return response.json()
          .then((parsedResponse) => {
            const error = new Error(response.statusText);
            error.fetchedResponse = parsedResponse;
            return Promise.reject(error);
          });
      });

export const apiGet = endpoint =>
  dispatch => dispatch(apiRequest(endpoint, 'GET'));

export const apiPost = (endpoint, body) =>
  dispatch => dispatch(apiRequest(endpoint, 'POST', body));

export const apiPatch = (endpoint, body) =>
  dispatch => dispatch(apiRequest(endpoint, 'PATCH', body));

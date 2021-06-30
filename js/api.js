const Url = {
  POST: 'https://23.javascript.pages.academy/kekstagram',
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
};

const fetchData = (method, onSuccess, onError, body) => {
  method = method.toUpperCase();
  fetch(Url[method], { method, body })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((result) => onSuccess(result))
    .catch((error) => onError(error));
};

export const getData = (onSuccess, onError) => fetchData('GET', onSuccess, onError);

export const postData = (onSuccess, onError, body) => fetchData('POST', onSuccess, onError, body);

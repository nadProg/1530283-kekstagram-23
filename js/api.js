import { isFunction } from './utils.js';

const Url = {
  POST: 'https://23.javascript.pages.academy/kekstagram',
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
};

const fetchData = (method, onSuccess, onError, onFinally, body) => {
  method = method.toUpperCase();
  fetch(Url[method], { method, body })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((result) => {
      if (isFunction(onSuccess)) {
        onSuccess(result);
      }
    })
    .catch((error) => {
      if (isFunction(onError)) {
        onError(error);
      }
    })
    .finally(() => {
      if (isFunction(onFinally)) {
        onFinally();
      }
    });
};

export const getData = (onSuccess, onError) => fetchData('GET', onSuccess, onError);

export const postData = (onSuccess, onError, onFinally, body) => fetchData('POST', onSuccess, onError, onFinally, body);

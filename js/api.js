const Url = {
  POST: 'https://23.javascript.pages.academy/kekstagram',
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
};

export const getData = (onSuccess, onError) => {
  fetch(Url.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((result) => onSuccess(result))
    .catch((error) => onError(error));
};

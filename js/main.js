import { getData } from './api.js';
import { initUploadForm}  from './img-upload-form/upload-form.js';
import { renderPictures } from './picture-gallery/pictures.js';
import { initBigPicture, setRenderedPictures } from './picture-gallery/big-picture.js';

const renderGallery = (pictures) => {
  renderPictures(pictures);
  setRenderedPictures(pictures);
};

const onGetDataSuccess = (receivedPictures) => {
  initBigPicture();
  renderGallery(receivedPictures);
};

const onGetDataError = (error) => alert(error);

getData(onGetDataSuccess, onGetDataError);

initUploadForm();

import { renderPictures } from './picture-gallery/pictures.js';
import { initBigPicture, setRenderedPictures } from './picture-gallery/big-picture.js';
import { initFilter } from './picture-gallery/filter.js';
import { showAlert } from './alert.js';
import { getData } from './api.js';
import { initUploadForm}  from './img-upload-form/upload-form.js';

const renderGallery = (pictures) => {
  renderPictures(pictures);
  setRenderedPictures(pictures);
};

const onGetDataSuccess = (receivedPictures) => {
  initBigPicture();
  initFilter(receivedPictures, renderGallery);
};

const onGetDataError = () => showAlert('Не удалось загрузить изображения');

getData(onGetDataSuccess, onGetDataError);

initUploadForm();

import {initForm} from './img-upload-form/img-upload-form.js';
import {createPictures} from './data/create-pictures.js';
import {renderPictures} from './picture-gallery/pictures.js';
import {initBigPicture, setRenderedPictures} from './picture-gallery/big-picture.js';

const renderGallery = (pictures) => {
  renderPictures(pictures);
  setRenderedPictures(pictures);
};

const receivedPictures = createPictures();

initBigPicture();
renderGallery(receivedPictures);

initForm();

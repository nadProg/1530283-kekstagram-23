import './img-upload-form/img-upload-form.js';
import {createPictures} from './data/create-pictures.js';
import {renderPictures} from './picture-gallery/pictures.js';

const pictures = createPictures();

renderPictures(pictures);

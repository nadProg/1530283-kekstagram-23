import './img-upload-form/img-upload-form.js';
import {createPictures} from './data/create-pictures.js';
import {showBigPicture} from './picture-gallery/big-picture.js';
import {renderPictures, setPicturesContainerClickHandler} from './picture-gallery/pictures.js';


const pictures = createPictures();

renderPictures(pictures);
setPicturesContainerClickHandler(showBigPicture);

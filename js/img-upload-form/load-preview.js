import { commonNodes } from '../utils.js';

const ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const { uploadImageNode } = commonNodes;

const getURLfromFile = (file) => new Promise((resolve, reject) => {
  const fileName = file.name.toLowerCase();
  const isTypeMatch = ALLOWED_FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!isTypeMatch) {
    reject(new Error('File type mismatch'));
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', () => {
    reject(new Error(reader.error));
  });

  reader.readAsDataURL(file);
});

export const loadPreview = (file) => getURLfromFile(file)
  .then((url) => new Promise((resolve, reject) => {
    uploadImageNode.addEventListener('load', onImageNodeLoad);
    uploadImageNode.addEventListener('error', onImageNodeError);

    uploadImageNode.src = url;

    function onImageNodeLoad() {
      uploadImageNode.removeEventListener('load', onImageNodeLoad);
      uploadImageNode.removeEventListener('error', onImageNodeError);
      resolve();
    }

    function onImageNodeError() {
      uploadImageNode.removeEventListener('load', onImageNodeLoad);
      uploadImageNode.removeEventListener('error', onImageNodeError);
      reject(new Error('Image load error'));
    }
  }));

import {
    spinnerSearchEl,
    spinnerJobDetailsEl
} from '../common.js';

const spinnerRender = whichSpinner => {
    // spinnerSearchEl.classList.add('spinner--visible');
    // spinnerJobDetailsEl.classList.add('spinner--visible');
    const spinnerEl = whichSpinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    spinnerEl.classList.toggle('spinner--visible');

};

export default spinnerRender;

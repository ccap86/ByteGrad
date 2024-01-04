import {
    spinnerSearchEl,
    spinnerJobDetailsEl
} from '../common.js';

const renderSpinner = whichSpinner => {
    // spinnerSearchEl.classList.add('spinner--visible');
    // spinnerJobDetailsEl.classList.add('spinner--visible');
    const spinnerEl = whichSpinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    spinnerEl.classList.toggle('spinner--visible');

};

export default renderSpinner;

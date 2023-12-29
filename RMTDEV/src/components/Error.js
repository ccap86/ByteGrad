import {
    DEFAULT_DISPLAY_TIME,
    errorTextEl,
    errorEl
} from '../common.js';

const  renderError = message => {
    errorTextEl.textContent = message // error message to display given as argument
        errorEl.classList.add('error--visible'); // add class to error element to show
        setTimeout( ()=> {
            errorEl.classList.remove('error--visible'); // set a display duration and then remove error from screen
        }, DEFAULT_DISPLAY_TIME);
}

export default renderError; // can import by not having to use {}
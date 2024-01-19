import {
    state,
    paginationEl,
    paginationBtnNextEl,
    paginationBtnBackEl,
    paginationNumberBackEl,
    paginationNumberNextEl,

} from '../common.js';
import renderJobList from './jobList.js';

// click handler function
const clickHandler = event => {
    // get clicked button element
    const clickedButtonEl = event.target.closest('.pagination__button');

    if(!clickedButtonEl) return;

    // check if click was next or prev
    const nextPage = clickedButtonEl.className.includes('--next') ? true : false;

    // update state
    nextPage ? state.currentPage++ : state.currentPage--;
}


// add an event listener to the button
paginationEl.addEventListener('click', clickHandler);
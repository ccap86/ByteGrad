import {
    state,
    paginationEl,
    paginationBtnNextEl,
    paginationBtnBackEl,
    paginationNumberBackEl,
    paginationNumberNextEl,

} from '../common.js';
import renderJobList from './jobList.js';

// render pagination buttons
const renderPaginationButtons =()=> {
    // render back button if greater than page 1 
    if(state.currentPage >= 2){
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

    // update page number
}


// click handler function
const clickHandler = event => {
    // get clicked button element
    const clickedButtonEl = event.target.closest('.pagination__button');

    // stop function if null
    if(!clickedButtonEl) return;

    // check if click was next or prev
    const nextPage = clickedButtonEl.className.includes('--next') ? true : false;

    // update state
    nextPage ? state.currentPage++ : state.currentPage--;

    // render pagination buttons 
    renderPaginationButtons();

    // render job items for that page
    renderJobList();

    // render pagination buttons 
    renderPaginationButtons();
}


// add an event listener to the button
paginationEl.addEventListener('click', clickHandler);
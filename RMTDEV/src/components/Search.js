import {
    BASE_API_URL,
    state,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    getData
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderError from './Error.js'; // exported as a default
import renderJobList from './jobList.js'; // exported as a default
import renderPaginationButtons from './pagination.js';


const submitHandler = async event => {
    // prevent default behavior 
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;
    
    // validation example of reg expression 
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if(patternMatch){
        renderError('Your search may not contain numbers.');
        return;
    }

    // blur input
    searchInputEl.blur();

    // remove previous job items
    jobListSearchEl.innerHTML = '';

    // render spinner
    renderSpinner('search');
    //spinnerSearchEl.classList.add('spinner--visible');

    try {
        // fetch search results
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
        // const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
        // const data = await response.json();


        // if (!response.ok) { // 4xx, 5xx status code
        //     throw new Error(data.description);
        // }

        // extract job items
        const { jobItems } = data;

        // update state
        state.searchJobItems = jobItems;
        state.currentPage = 1;
    
        // remove prev job items
        //jobListSearchEl.innerHTML = '';
    
        // reset sorting buttons
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');


         // stop spinner
        renderSpinner('search');
    
        // render the number of results
        numberEl.textContent = jobItems.length;
    
        // reset pagination buttons
        renderPaginationButtons();


        // render job items  in search  job list
        renderJobList();
    }
    catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }

};

searchFormEl.addEventListener('submit', submitHandler);
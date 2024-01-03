import {
    BASE_API_URL,
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    jobListSearchEl,
    numberEl
} from '../common.js';

import spinnerRender from './Spinner.js';
import renderError from './Error.js'; // exported as a default
import renderJobList from './jobList.js'; // exported as a default


const submitHandler = event => {
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

    // render spinner
    spinnerRender('search');
    //spinnerSearchEl.classList.add('spinner--visible');
    
    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
        .then(response => {
            if(!response.ok){
                throw {
                    message: 'Resource issue (e.g., resource doesn\'t exist) or server issue',
                    name: 'error'
                };
            }

            return response.json();
        })
        .then(data => {
            // extract job items
            const { jobItems } = data;

            // remove prev job items
            jobListSearchEl.innerHTML = '';

            // stop spinner
            spinnerRender('search');
            //spinnerSearchEl.classList.remove('spinner--visible');

            // render the number of results
            numberEl.textContent = jobItems.length;

            // render job items  in search  job list
            renderJobList( jobItems);
        })
        //.catch(error => console.log(error));
        // .catch(error =>{
        //     console.log(error);
        // });
        // update to make a bit more sophisticated 
        .catch(error =>{
            spinnerRender('search');
            renderError(error.message);
        });
}


searchFormEl.addEventListener('submit', submitHandler);
import {
BASE_API_URL,
jobDetailsContentEl,
state,
getData
}  from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';


const loadHashChangeHandler = async () => {
    
    // get id from url
    const id = window.location.hash.substring(1);

    if (id) { 
        // remove previous jobdetails content
        jobDetailsContentEl.innerHTML = '';
        
        // render spinner
        renderSpinner('job-details');

        // render specific jobitem id from url
        try{

            // fetch job items data
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
            // const response = await fetch(`${BASE_API_URL}/jobs/${id}`);
            // const data = await response.json();
    
            // if (!response.ok){
            //     console.log(data.description);
            //     throw new Error(data.description);
            // }
            
            // get data
            const { jobItem } = data;

            // update state
            state.activeJobItem = jobItem; 

            // remove spinner
            renderSpinner('job-details');
            //spinnerJobDetailsEl.classList.remove('spinner--visible');
            
            // render job detail
            renderJobDetails(jobItem);
    
        } catch (error) {
            renderSpinner('job-details');
            renderError(error.message);
        }
    } 
    

    
}

//window.addEventListener(`DOMContentLoaded`, loadHandler);
window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);
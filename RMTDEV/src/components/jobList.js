import {
    BASE_API_URL,
    RESULTS_PER_PAGE,
    state,
    jobListSearchEl,
    jobDetailsContentEl,
    getData,
    jobListBookmarksEl
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';


const renderJobList = (whichJobList = 'search') => {
    // determine correct sector for job list  (search results or bookmark list)
    const jobListEl = whichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;



    // remove previous job items
    //jobListSearchEl.innerHTML = ''; changed to jobListEl 
    jobListEl.innerHTML = '';

    // determine the jobitems that should be rendered
    let jobItems;

    if (whichJobList === 'search') {
        jobItems = state.searchJobItems.slice(state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE);
    } else if (whichJobList === 'bookmarks') {
        jobItems = state.bookmarkJobItems;
    }

    // display job items
    //state.searchJobItems.slice(0,RESULTS_PER_PAGE).forEach(jobItem => {
    //state.searchJobItems.slice(state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, state.currentPage * RESULTS_PER_PAGE).forEach(jobItem => {
    jobItems.forEach( jobItem => {
    
        const newJobItemHTML = `
            <li class="job-item ${ state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''}">
                <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading">${jobItem.title}</h3>
                        <p class="job-item__company">${jobItem.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === jobItem.id) && 'job-item__bookmark-icon--bookmarked'}"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>
        `;
        // jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML); changed to joblistel
        jobListEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    });
};

const clickHandler = async event => {
    // prevent default behavior 
    event.preventDefault();

    // get clicked job item element
    const jobItemEl = event.target.closest('.job-item');
    
    // remove previous active class from previous active job item
    document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));

    // add active class
    jobItemEl.classList.add('job-item--active');
    
    // empty the job detail section
    jobDetailsContentEl.innerHTML = '';

    // render spinner
    renderSpinner('job-details');
    
    // get job item id
    const id = jobItemEl.children[0].getAttribute('href');

    // update active jobitem state
    // create jobitem array with ALL jobitems
    const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
    state.activeJobItem = allJobItems.find(jobItem => jobItem.id === +id);

    // add item id to the url
    history.pushState(null,'',`/RMTDEV/#${id}`);
//    http://127.0.0.1:5500/RMTDEV/#5565565652345245

    // fetch id data

    try{
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);
        // const response = await fetch(`${BASE_API_URL}/jobs/${id}`);
        // const data = await response.json();

        // if (!response.ok){
        //     console.log(data.description);
        //     throw new Error(data.description);
        // }
        
        // get data
        const { jobItem } = data;
         
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

jobListSearchEl.addEventListener('click', clickHandler);
jobListBookmarksEl.addEventListener('click', clickHandler);

export default renderJobList;
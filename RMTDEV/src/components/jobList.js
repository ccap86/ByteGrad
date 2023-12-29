import {
    BASE_API_URL,
    jobListSearchEl,
    jobDetailsContentEl,
} from '../common.js';
import spinnerRender from './Spinner.js';
import renderJobDetails from './JobDetails.js';

const renderJobList = jobItems =>{
    jobItems.slice(0,7).forEach(jobItem => {

        const newJobItemHTML = `
            <li class="job-item">
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
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>
        `;
        jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    });
}

const clickHandler = event => {
    // prevent default behavior 
    event.preventDefault();

    // get clicked job item element
    const jobItemEl = event.target.closest('.job-item');
    
    // remove previous clicked element
    // -- first way to check truthy
    // const activeJobItemEl = document.querySelector('.job-item--active');
    // if ( activeJobItemEl) {
    //      activeJobItemEl.classList.remove('job-item--active');
    //     }
    // -- second way to check truthy
    // document.querySelector('.job-item--active') && document.querySelector('.job-item--active').classList.remove('job-item--active');
    
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');

    // add active class
    jobItemEl.classList.add('job-item--active');
    
    // empty the job detail section
    jobDetailsContentEl.innerHTML = '';

    // render spinner
    spinnerRender('jobDetails');
//    spinnerJobDetailsEl.classList.add('spinner--visible');

    // get job item id
    const id = jobItemEl.children[0].getAttribute('href');

    // fetch id data
    fetch(`${BASE_API_URL}/jobs/${id}`)
        .then(response => {
            if(!response.ok) {
                console.log('something went wrong');
                return;
            }
            return response.json();        
        })
        .then(data => {
            // get data
            const { jobItem } = data;
     
            // remove spinner
            spinnerRender('jobDetails');
            //spinnerJobDetailsEl.classList.remove('spinner--visible');

            // render job detail
            renderJobDetails( jobItem);
            }
            
         
        )
        .catch(error => console.log(error));
    
}


jobListSearchEl.addEventListener('click', clickHandler);

export default renderJobList;
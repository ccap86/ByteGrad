import {
    jobListSearchEl,
    jobDetailsContentEl,
    
} from '../common.js';

import spinnerRender from './Spinner.js';

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
    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs/${id}`)
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
            const newJobItemHTML = `
                <img 
                src="${jobItem.coverImgURL}" 
                alt="#" class="job-details__cover-img">

                <a class="apply-btn" href="${jobItem.companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>
                
                <section class="job-info">
                    <div class="job-info__left">
                        <div class="job-info__badge">${jobItem.badgeLetters}</div>
                        <div class="job-info__below-badge">
                            <time class="job-info__time">${jobItem.daysAgo}d</time>
                            <button class="job-info__bookmark-btn">
                                <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
                            </button>
                        </div>
                    </div>
                    <div class="job-info__right">
                        <h2 class="second-heading">${jobItem.title}</h2>
                        <p class="job-info__company">${jobItem.company}</p>
                        <p class="job-info__description">${jobItem.description}.</p>
                        <div class="job-info__extras">
                            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i>${jobItem.duration}</p>
                            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i>${jobItem.salary}</p>
                            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i>${jobItem.location}</p>
                        </div>
                    </div>
                </section>
                
                <div class="job-details__other">
                    <section class="qualifications">
                        <div class="qualifications__left">
                            <h4 class="fourth-heading">Qualifications</h4>
                            <p class="qualifications__sub-text">Other qualifications may apply</p>
                        </div>
                        <ul class="qualifications__list">
                        ${jobItem.qualifications.map(qualificationText => `<li class="qualifications__item">${qualificationText}</li>`).join('')}
                        </ul>
                    </section>
                
                    <section class="reviews">
                        <div class="reviews__left">
                            <h4 class="fourth-heading">Company reviews</h4>
                            <p class="reviews__sub-text">Recent things people are saying</p>
                        </div>
                        <ul class="reviews__list">
                            ${jobItem.reviews.map(reviewText => `<li class="reviews__item">${reviewText}</li>`).join('')}
                        </ul>
                    </section>
                </div>
                
                <footer class="job-details__footer">
                    <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
                </footer>
                    `;
                
                jobDetailsContentEl.insertAdjacentHTML('beforeend', newJobItemHTML);
            }
            
         
        )
        .catch(error => console.log(error));
    
}


jobListSearchEl.addEventListener('click', clickHandler);
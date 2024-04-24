import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';

import renderJobList from './jobList.js';

const mouseEnterHandler = () => {

    // change look of bookmark button to look active
    bookmarksBtnEl.classList.add('bookmarks-btn--active');
    
    // make  bookmark joblist visible 
    jobListBookmarksEl.classList.add('job-list--visible');


}

const mouseLeaveHandler = () => {

    // change look of bookmark button to look inactive
    bookmarksBtnEl.classList.remove('bookmarks-btn--active');
    
    // make  bookmark joblist invisible 
    jobListBookmarksEl.classList.remove('job-list--visible');

}



const clickHandler = event => {

    

}



bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);
jobDetailsEl.addEventListener('click', clickHandler);
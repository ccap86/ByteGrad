import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';

import renderJobList from './jobList.js';

// check if bookmark is clicked
const clickHandler = event => {
    
    // don't continue if click is outside bookmark button
        //if (event.target.className.includes('bookmark')) 
    if (!event.target.className.includes('bookmark')) return; 
        
    // update state
    if( state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === state.activeJobItem.id)){
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobItem => bookmarkJobItem.id !== state.activeJobItem.id);
    }  else {
        state.bookmarkJobItems.push(state.activeJobItem);
    }

    // update bookmark icon to active
    document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');
    
    }


const mouseEnterHandler = () => {

    // change look of bookmark button to look active
    bookmarksBtnEl.classList.add('bookmarks-btn--active');
    
    // make  bookmark joblist visible 
    jobListBookmarksEl.classList.add('job-list--visible');

    // render bookmarked joblist
    renderJobList('bookmarks');

}

const mouseLeaveHandler = () => {

    // change look of bookmark button to look inactive
    bookmarksBtnEl.classList.remove('bookmarks-btn--active');
    
    // make  bookmark joblist invisible 
    jobListBookmarksEl.classList.remove('job-list--visible');

}






bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);
jobDetailsEl.addEventListener('click', clickHandler);
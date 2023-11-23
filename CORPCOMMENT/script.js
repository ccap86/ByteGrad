// -- GLOBAL --
const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';


const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');
const hashtagListEl = document.querySelector('.hashtags');

const renderFeedbackItem = feedbackItem => {
    // new feedback item html
    const feedbackItemHTML = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${feedbackItem.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedbackItem.company}</p>
            <p class="feedback__text">${feedbackItem.text}</p>
        </div>
        <p class="feedback__date">${feedbackItem.daysAgo === 0 ? "NEW": `${feedbackItem.daysAgo}d`}</p>
    </li>
    `;

    // insert new feedback item in list
    feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);

}


// --- counter component
( ()=> {

    const inputHandler = () => {
        // determine max number characters
        const maxNrChars = MAX_CHARS;
    
        // determine number of characters currently typed
        const nrCharsTyped = textareaEl.value.length;
        
        // calculate number of characters left (max - currently typed)
        const charsLeft = maxNrChars - nrCharsTyped;
        
        
        // show number of characters left
        counterEl.textContent = charsLeft;
    
    }
    
    textareaEl.addEventListener('input', inputHandler);
})();

//-- submit component --
( ()=>{

    // const submitHandler = (event) => { -- can remove () since only one input
    const submitHandler = event => {
        // prevent default browser action (submitting data to 'action' --address and loading new page)
        event.preventDefault();
        
        // get text from textarea
        const text = textareaEl.value;  
    
        validate = formValidation => {
            formEl.classList.add(formValidation);
    
            // remove valid indicator after 2 seconds
            setTimeout(() => {
                formEl.classList.remove(formValidation);
            },2000);
        };
        // validate text (e.g. check if hashtag is present and text is long enough)
        if( text.includes('#') && text.length >= 5) {
            // show valid indicator
            validate('form--valid');
        } else {
            // show invalid indicator
            validate('form--invalid');
            
            // focus textarea
            textareaEl.focus();
    
            // stop this function execution
            return;
        }
    
        // we have text, now extract other info
        const hashtag = text.split(' ').find(el =>el.includes('#'));
        const company= hashtag.substring(1);
         //const company=hashtag.replace('#',''); 
    
        const badgeLetter = company.substring(0,1).toUpperCase();
        //console.log(company.charAt(0).toUpperCase());
    
        const upvoteCount = 0;
        const daysAgo = 0;
        
        // render feedback item in list
        const feedbackItem = {
            upvoteCount: upvoteCount,
            company: company,
            badgeLetter: badgeLetter,
            daysAgo: daysAgo,
            text: text
        };
        renderFeedbackItem(feedbackItem);
    
        // send feedback item to list
        fetch(`${BASE_API_URL}/feedbacks`, {
            method: 'POST',
            body: JSON.stringify(feedbackItem),
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json'
            }
        })
        .then(response => {
            if(!response.ok){
                return console.log('Something went wrong');
            }
                console.log('Successfully submitted');
        })
        .catch(error => console.log(error));
    
        // clear textarea
        textareaEl.value = '';
    
        // set submit button to blur
        submitBtnEl.blur();
    
        // reset the counter
        counterEl.textContent = MAX_CHARS;
    }
    
    formEl.addEventListener('submit', submitHandler);
})();

// -- Feedback List Component --
(() => {

    const clickHandler = event => {
        // Get clicked HTML element
      const clickedEl = event.target;
    
      // determine if user intended to upvote or expand
      const upvoteIntention = clickedEl.className.includes('upvote');
    
        // run the appropriate logic 
      if (upvoteIntention) {
        // get the closest upvote button
        const upvoteBtnEl = clickedEl.closest('.upvote');
    
        // disable upvote button
        upvoteBtnEl.disabled = true;
    
        // select upvote count within the current upvote button that was clicked
        const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');
    
        // get currently displayed upvote count as number (add + in front to convert to number)
        let upvoteCount =  +upvoteCountEl.textContent;
        
    
        // set upvote count and inc by 1
        upvoteCountEl.textContent = ++upvoteCount;
      }
      else {
        // expand the clicked feedback item
        
        clickedEl.closest('.feedback').classList.toggle('feedback--expand');
    
      }
    };
    
    feedbackListEl.addEventListener('click', clickHandler);
    
    fetch(`${BASE_API_URL}/feedbacks`)
    .then(response => response.json())
    .then(data => {
        // remove spinner element
        //spinnerEl.classList.remove("spinner");    
        spinnerEl.remove();    
    
        // iterate over each element in the feedbacks array and render it in the list
        data.feedbacks.forEach(feedbackItem => renderFeedbackItem(feedbackItem));
    })
    .catch(error => {
        feedbackListEl.textContent = `Failed to fetch feedback item. Error message: ${error.message}`;
    });
})();


// -- HASHTAG LIST COMPONENT --
(() => {

    const clickHandler = event => {
           // -- get the clicked element
           const clickedEl = event.target;
    
           
    
        // -- stop function if clicked happen outside of button
        if(clickedEl.className === 'hashtags') return;
        console.log(clickedEl);
        // -- extract company name from click
        const companyNameFromHashtag = clickedEl.textContent.substring(1).toLowerCase().trim();
        console.log(companyNameFromHashtag);
    
        // -- iterate over each childnode in the feedback list
        feedbackListEl.childNodes.forEach( childNode => {
            
        
        // -- stop iteration if a text node
        if(childNode.nodeType === 3) return;
        
        // -- extract company name from li
        const companyNameFromFeedbackItem = childNode.querySelector('.feedback__company').textContent.toLowerCase().trim();
        
        // -- remove feedback items from list if not equal
        if (companyNameFromHashtag !== companyNameFromFeedbackItem ){
            
            childNode.remove();
        }
         
    });
    
        
    }
    
    
    hashtagListEl.addEventListener('click', clickHandler);
})();




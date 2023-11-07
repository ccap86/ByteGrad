// -- GLOBAL --
const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');

// --- counter component

const inputHandler = () => {
    // determine max number characters
    const maxNrChars = 150;

    // determine number of characters currently typed
    const nrCharsTyped = textareaEl.value.length;
    
    // calculate number of characters left (max - currently typed)
    const charsLeft = maxNrChars - nrCharsTyped;
    
    // show number of characters left
    counterEl.textContent = charsLeft;


}

textareaEl.addEventListener('input', inputHandler);

//-- submit component --

// const submitHandler = (event) => { -- can remove () since only one input
const submitHandler = (event) => {
    // prevent default browser action (submitting data to 'action' --address and loading new page)
    event.preventDefault();
    
    // get text from textarea
    const text = textareaEl.value;  
    
    // validate text (e.g. check if hashtag is present and text is long enough)
    if( text.includes('#') && text.length >= 5) {
        // show valid indicator
        formEl.classList.add('form--valid');

        // remove valid indicator after 2 seconds
        setTimeout(() =>{
            formEl.classList.remove('form--valid');
        },2000);
    } else {
        // show invalid indicator
        formEl.classList.add('form--invalid');

        // remove invalid indicator after 2 seconds
        setTimeout(() =>{
            formEl.classList.remove('form--invalid');
        },2000);

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

    
    const upVoteCount = 0;
    const daysAgo = 0;

    // new feedback item html
    const feedbackItemHTML = `
    <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${upVoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${company}</p>
            <p class="feedback__text">${text}</p>
        </div>
        <p class="feedback__date">${daysAgo === 0 ? "NEW": `${daysAgo}d`}</p>
    </li>
    `;

    // insert new feedback item in list
    feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);


}

formEl.addEventListener('submit', submitHandler);


const textareaEl = document.querySelector('.textarea');
const charactersNumberEl = document.querySelector('.stat__number--characters');
const twitterNumberEl = document.querySelector('.stat__number--twitter');
const facebookNumberEl = document.querySelector('.stat__number--facebook');
const wordsNumberEl = document.querySelector('.stat__number--words');

let twitterMaxChar = 280;
let facebookMaxChar = 2200;

textareaEl.addEventListener('input', function() {
    
    // determine  new numbers
    const numberOfCharacters = textareaEl.value.length;
    const twitterCharacterLeft = twitterMaxChar - numberOfCharacters;
    const facebookCharacterLeft = facebookMaxChar - numberOfCharacters;

    // add visual indicator max limit is exceeded
    if (twitterCharacterLeft < 0) {
        // twitterNumberEl.style.color = 'red';
        twitterNumberEl.classList.add( 'stat__number--limit');
    }
    else {
        twitterNumberEl.classList.remove( 'stat__number--limit');
    }

    // set new number
    charactersNumberEl.textContent = numberOfCharacters;
    twitterNumberEl.textContent = twitterCharacterLeft;
    facebookNumberEl.textContent = facebookCharacterLeft;
})
const textareaEl = document.querySelector('.textarea');
const charactersNumberEl = document.querySelector('.stat__number--characters');
const twitterNumberEl = document.querySelector('.stat__number--twitter');
const facebookNumberEl = document.querySelector('.stat__number--facebook');
const wordsNumberEl = document.querySelector('.stat__number--words');

let twitterMaxChar = 280;
let facebookMaxChar = 2200;
const inputHandler = () =>{
        // example validation check
        if (textareaEl.value.includes('<script>')) {
            alert("WARNING: Invalid text used - Can't use <script> in text!");
            textareaEl.value = textareaEl.value.replace('<script>', ' ');
            
        }
        // determine  new numbers
        let numberOfWords = textareaEl.value.split(' ').length;
        // hack to fix displaying 1 even when deleted - due to empty element creates array of one element
        // so we check the length of the string rather than len of element value
        if (textareaEl.value.length === 0) {
            numberOfWords = 0;
        }
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
        
        if (facebookCharacterLeft < 0) {
            
            facebookNumberEl.classList.add( 'stat__number--limit');
        }
        else {
            facebookNumberEl.classList.remove( 'stat__number--limit');
        }
    
        // set new number
        wordsNumberEl.textContent = numberOfWords;
        charactersNumberEl.textContent = numberOfCharacters;
        twitterNumberEl.textContent = twitterCharacterLeft;
        facebookNumberEl.textContent = facebookCharacterLeft;
};

textareaEl.addEventListener('input', inputHandler);
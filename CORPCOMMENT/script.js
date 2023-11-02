const textareaEl = document.querySelector('.form__textarea');
let numberOfCharacters = textareaEl.value.length;
const counterEl = document.querySelector('.counter');

const inputHandler = () => {
    counterEl.textContent = numberOfCharacters;
}

textareaEl.addEventListener('input', inputHandler);
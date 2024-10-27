const backBtn = document.getElementById('backBtn');
const modal = document.getElementById('modal');
const discardBtn = document.querySelector('.discard');
const saveBtn = document.querySelector('.save');
const title = document.querySelector('h1');
const description = document.querySelector('.description');

let originalTitle = title.innerText;
let originalDescription = description.innerHTML;

backBtn.addEventListener('click', () => {
    if (title.innerText !== originalTitle || description.innerHTML !== originalDescription) {
        modal.style.display = 'block';
    } else {
        console.log('No changes to save');
    }
});

discardBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    title.innerText = originalTitle;
    description.innerHTML = originalDescription;
    console.log('Changes discarded');
});

saveBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    originalTitle = title.innerText;
    originalDescription = description.innerHTML;
    console.log('Changes saved');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

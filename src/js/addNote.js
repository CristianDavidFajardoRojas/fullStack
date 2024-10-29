
const backBtn = document.getElementById('backBtn');
const previewBtn = document.getElementById('previewBtn');
const imageBtn = document.getElementById('imageBtn');
const titleInput = document.querySelector('.title-input');
const contentInput = document.querySelector('.content-input');

backBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to go back? Any unsaved changes will be lost.')) {
        // Handle going back (e.g., window.history.back())
        console.log('Going back...');
    }
});

previewBtn.addEventListener('click', () => {
    // Handle preview functionality
    console.log('Preview clicked');
});

imageBtn.addEventListener('click', () => {
    // Handle image insertion
    console.log('Image insertion clicked');
});

// Example of applying formatting (bold) when the B button is clicked
document.querySelector('.formatting-bar button:first-child').addEventListener('click', () => {
    document.execCommand('bold', false, null);
});

// Adjust textarea height based on content
contentInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

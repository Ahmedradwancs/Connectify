document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); //  This line prevents the default form submission behavior, which would cause the page to reload.

    // Clear previous error messages
    clearErrorMessages();


    // Perform validations
    if (validateName() && validateEmail() && validateMessage() && validateAgreement()) {
        // Show the thank-you message
        document.getElementById('thankYouMessage').style.display = 'block';

        // Reset the form fields
        this.reset();
    }
});

// Close the modal when the user clicks on <span> (x)
document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('thankYouMessage').style.display = 'none';
});


// 
function validateName() {
    const name = document.getElementById('name').value;
    // The regular expression /\d/ matches any digit (0-9), The test() method checks if this pattern exists in the name string
    // This is copied from stackoverflow
    if (/\d/.test(name) || name === '') {
        displayErrorMessage('nameError', "Name cannot contain any numbers and cannot be empty!");
        return false;
    }
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        displayErrorMessage('emailError', "Please enter a valid email address.");
        return false;
    }
    return true;
}

function validateMessage() {
    const message = document.getElementById('message').value;
    if (message === '') {
        displayErrorMessage('messageError', "Please write a message to proceed.");
        return false;
    }
    return true;
}

function validateAgreement() {
    const agree = document.getElementById('agree').checked;
    if (!agree) {
        displayErrorMessage('agreeError', "You must confirm your information to proceed.");
        return false;
    }
    return true;
}

function displayErrorMessage(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(element => {
        element.innerText = '';
    });
}
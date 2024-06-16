// Ensuring the JavaScript file is connected
console.log('JavaScript file is connected');

// Getting HTML elements:
let myForm = document.getElementById('form');
let myFirstName = document.getElementById('first-name');
let myLastName = document.getElementById('last-name');
let myEmail = document.getElementById('email');
let myPassword = document.getElementById('password');
let mySubmitBtn = document.getElementById('submitBtn');
let myPasswordIcon = document.getElementById('passwordIcon');

// New variables for error messages
let firstNameError = document.getElementById('first-name-error');
let lastNameError = document.getElementById('last-name-error');
let emailError = document.getElementById('email-error');
let passwordError = document.getElementById('password-error');

// To test connections:
console.log('Form:', myForm);
console.log('First Name:', myFirstName);
console.log('Last Name:', myLastName);
console.log('Email:', myEmail);
console.log('Password:', myPassword);
console.log('Submit Button:', mySubmitBtn);
console.log('First Name Error:', firstNameError);
console.log('Last Name Error:', lastNameError);
console.log('Email Error:', emailError);
console.log('Password Error:', passwordError);

// Function to capitalize the first letter
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Function to validate first name
function validateFirstName() {
  let firstNameValue = myFirstName.value;
  let firstNameIcon = myFirstName.nextElementSibling;
  if (firstNameValue === '') {
    myFirstName.classList.add('form__input-error');
    firstNameError.classList.remove('form__hide');
    firstNameIcon.classList.remove('form__hide');
    console.log('You need to add your first name');
    return false;
  } else if (!/^[A-Za-z]+$/.test(firstNameValue)) {
    myFirstName.classList.add('form__input-error');
    myFirstName.classList.remove('form__input-valid');
    firstNameError.classList.remove('form__hide');
    firstNameIcon.classList.remove('form__hide');
    console.log('Invalid first name: Only letters are allowed');
    return false;
  } else {
    myFirstName.classList.remove('form__input-error');
    myFirstName.classList.add('form__input-valid');
    firstNameError.classList.add('form__hide');
    firstNameIcon.classList.add('form__hide');
    return true;
  }
}

// Function to validate last name
function validateLastName() {
  let lastNameValue = myLastName.value;
  let lastNameIcon = myLastName.nextElementSibling;
  if (lastNameValue === '') {
    myLastName.classList.add('form__input-error');
    myLastName.classList.remove('form__input-valid');
    lastNameError.classList.remove('form__hide');
    lastNameIcon.classList.remove('form__hide');
    console.log('You need to add your last name');
    return false;
  } else if (!/^[A-Za-z]+$/.test(lastNameValue)) {
    myLastName.classList.add('form__input-error');
    myLastName.classList.remove('form__input-valid');
    lastNameError.classList.remove('form__hide');
    lastNameIcon.classList.remove('form__hide');
    console.log('Invalid last name: Only letters are allowed');
    return false;
  } else {
    myLastName.classList.remove('form__input-error');
    myLastName.classList.add('form__input-valid');
    lastNameError.classList.add('form__hide');
    lastNameIcon.classList.add('form__hide');
    return true;
  }
}

// Function to validate email
function validateEmail() {
  let emailValue = String(myEmail.value).toLowerCase();
  let emailIcon = myEmail.nextElementSibling;
  if (emailValue === '') {
    myEmail.classList.add('form__input-error');
    myEmail.classList.remove('form__input-valid');
    emailError.classList.remove('form__hide');
    emailIcon.classList.remove('form__hide');
    console.log('You need to add your email');
    return false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    myEmail.classList.add('form__input-error');
    myEmail.classList.remove('form__input-valid');
    emailError.classList.remove('form__hide');
    emailIcon.classList.remove('form__hide');
    console.log('Looks like this is not an email');
    return false;
  } else {
    myEmail.classList.remove('form__input-error');
    myEmail.classList.add('form__input-valid');
    emailError.classList.add('form__hide');
    emailIcon.classList.add('form__hide');
    return true;
  }
}

// Function to validate password
function validatePassword() {
  let passwordValue = myPassword.value;
  let passwordIcon = myPassword.nextElementSibling;
  if (passwordValue === '') {
    myPassword.classList.add('form__input-error');
    myPassword.classList.remove('form__input-valid');
    passwordError.classList.remove('form__hide');
    passwordIcon.classList.remove('form__hide');
    console.log('You need to add your password');
    return false;
  } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwordValue)) {
    myPassword.classList.add('form__input-error');
    myPassword.classList.remove('form__input-valid');
    passwordError.classList.remove('form__hide');
    passwordIcon.classList.remove('form__hide');
    console.log('Invalid password: Use one uppercase letter, one number, one symbol, and at least 8 characters');
    return false;
  } else {
    myPassword.classList.remove('form__input-error');
    myPassword.classList.add('form__input-valid');
    passwordError.classList.add('form__hide');
    passwordIcon.classList.add('form__hide');
    return true;
  }
}

// Adding input event listeners to capitalize first letter
myFirstName.addEventListener('input', function () {
  myFirstName.value = capitalizeFirstLetter(myFirstName.value);
});

myLastName.addEventListener('input', function () {
  myLastName.value = capitalizeFirstLetter(myLastName.value);
});

// Adding focusout and function calls to event listeners to input fields so user get immediate feedback or wrong input
myFirstName.addEventListener('focusout', validateFirstName);
myLastName.addEventListener('focusout', validateLastName);
myEmail.addEventListener('focusout', validateEmail);
myPassword.addEventListener('focusout', validatePassword);

// Adding click event listener to the submit button to call the functions
mySubmitBtn.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form submission
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
    //if all is valid show alert
    alert('Your form has been sent');
    myForm.reset(); // Reset form fields
    // Remove validation classes
    myFirstName.classList.remove('form__input-valid', 'form__input-error');
    myLastName.classList.remove('form__input-valid', 'form__input-error');
    myEmail.classList.remove('form__input-valid', 'form__input-error');
    myPassword.classList.remove('form__input-valid', 'form__input-error');
  }
});

// Password reveal logic
myPasswordIcon.addEventListener('mousedown', (e) => {
  e.preventDefault(); // Prevent form submission on icon click
  if (myPassword.type === 'password') {
    myPassword.type = 'text';
    myPasswordIcon.classList.remove('fa-eye');
    myPasswordIcon.classList.add('fa-eye-slash');
  } else {
    myPassword.type = 'password';
    myPasswordIcon.classList.remove('fa-eye-slash');
    myPasswordIcon.classList.add('fa-eye');
  }
  myPassword.focus(); // Keep focus on the password field to prevent validation errors
});

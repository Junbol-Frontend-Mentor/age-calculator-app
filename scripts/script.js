// Getting HTML elements:
let myDayInputField = document.getElementById('dayInput');
let myMonthInputField = document.getElementById('monthInput');
let myYearInputField = document.getElementById('yearInput');
let myDayInputLabel = document.getElementById('dayLabel');
let myMonthInputLabel = document.getElementById('monthLabel');
let myYearInputLabel = document.getElementById('yearLabel');
let myYears = document.getElementById('years');

// New variables for error messages
let dayEmptyError = document.getElementById('day-emptyError');
let dayNumbersError = document.getElementById('day-onlyNumbersError');
let monthEmptyError = document.getElementById('month-emptyError');
let monthNumbersError = document.getElementById('month-onlyNumbersError');
let yearEmptyError = document.getElementById('year-emptyError');
let yearNumbersError = document.getElementById('year-onlyNumbersError');

const yearOfBirth = '';
const monthOfBirth = '';
const dayuOfBirth = '';

// Function to validate day input field
function validateDay() {
  let dayValue = myDayInputField.value;
  console.log('Day Input Value:', dayValue); // Debugging

  if (dayValue === '') {
    console.log('Day field is empty'); // Debugging
    myDayInputField.classList.add('dateTopRow__input-error');
    myDayInputLabel.classList.add('dateTopRow__inputLabel-error');
    dayEmptyError.classList.remove('dateTopRow__hide');
    console.log('You need to add your day of birth');
    return false;
  } else if (!/^[0-9]{2}$/.test(dayValue)) {
    // ✅ Updated to check for exactly 2 numbers
    console.log('Day field contains invalid characters'); // Debugging
    myDayInputField.classList.add('dateTopRow__input-error');
    myDayInputLabel.classList.add('dateTopRow__inputLabel-error');
    myDayInputField.classList.remove('dateTopRow__input-valid');
    dayNumbersError.classList.remove('dateTopRow__hide');
    dayNumbersError.log('Invalid day: Only numbers are allowed');
    return false;
  } else {
    console.log('Day field is valid'); // Debugging
    myDayInputField.classList.remove('dateTopRow__input-error');
    myDayInputField.classList.add('dateTopRow__input-valid');
    dayEmptyError.classList.add('dateTopRow__hide');
    return true;
  }
}

// Function to validate month input field
function validateMonth() {
  let monthValue = myMonthInputField.value;
  console.log('Month Input Value:', monthValue); // Debugging

  if (monthValue === '') {
    console.log('Month field is empty'); // Debugging
    myMonthInputField.classList.add('dateTopRow__input-error');
    myMonthInputLabel.classList.add('dateTopRow__inputLabel-error');
    monthEmptyError.classList.remove('dateTopRow__hide');
    console.log('You need to add your month of birth');
    return false;
  } else if (!/^[0-9]{2}$/.test(monthValue)) {
    // ✅ Updated to check for exactly 2 numbers
    console.log('Month field contains invalid characters'); // Debugging
    myMonthInputField.classList.add('dateTopRow__input-error');
    myMonthInputLabel.classList.add('dateTopRow__inputLabel-error');
    monthNumbersError.classList.remove('dateTopRow__hide');
    monthNumbersError.log('Invalid day: Only numbers are allowed');
    return false;
  } else {
    console.log('Month field is valid'); // Debugging
    myMonthInputField.classList.remove('dateTopRow__input-error');
    myMonthInputField.classList.add('dateTopRow__input-valid');
    monthEmptyError.classList.add('dateTopRow__hide');
    return true;
  }
}

// Function to validate year input field
function validateYear() {
  let yearValue = myYearInputField.value;
  console.log('Year Input Value:', yearValue); // Debugging

  if (yearValue === '') {
    console.log('Year field is empty'); //  Debugging
    myYearInputField.classList.add('dateTopRow__input-error');
    myYearInputLabel.classList.add('dateTopRow__inputLabel-error');
    yearEmptyError.classList.remove('dateTopRow__hide');
    console.log('You need to add your year of birth');
    return false;
  } else if (!/^[0-9]{4}$/.test(yearValue)) {
    // ✅ Updated to check for exactly 4 numbers
    console.log('Day field contains invalid characters'); //  Debugging
    myYearInputField.classList.add('dateTopRow__input-error');
    myYearInputLabel.classList.add('dateTopRow__inputLabel-error');
    yearNumbersError.classList.remove('dateTopRow__hide');
    yearNumbersError.log('Invalid day: Only numbers are allowed');
    return false;
  } else {
    console.log('Day field is valid'); //  Debugging
    myYearInputField.classList.remove('dateTopRow__input-error');
    myYearInputField.classList.add('dateTopRow__input-valid');
    yearEmptyError.classList.add('dateTopRow__hide');
    return true;
  }
}

// Adding focusout and function calls to event listeners to input fields so user get immediate feedback or wrong input
myDayInputField.addEventListener('focusout', validateDay);
myMonthInputField.addEventListener('focusout', validateMonth);
myYearInputField.addEventListener('focusout', validateYear);

// Adding focusout and function calls to event listeners to input fields so user get immediate feedback or wrong input
myDayInputField.addEventListener('focusout', validateDay);
myMonthInputField.addEventListener('focusout', validateMonth);
myYearInputField.addEventListener('focusout', validateYear);

// Function to calculate the amount of years, months, and days that have passed
function calculateAge() {
  const dayOfBirth = parseInt(myDayInputField.value);
  const monthOfBirth = parseInt(myMonthInputField.value) - 1; // Month is 0-indexed in JS Date
  const yearOfBirth = parseInt(myYearInputField.value);

  const today = new Date();
  const birthDate = new Date(yearOfBirth, monthOfBirth, dayOfBirth);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// Function to set the year dynamically and to animate the numbers
function animateNumber(element, finalValue, duration) {
  let startValue = 0; // Initial value
  let startTime = null; // Variable to store the start time

  // Function to update the number during each animation frame
  function updateNumber(currentTime) {
    if (!startTime) startTime = currentTime; // Set the start time if it's not already set
    const elapsedTime = currentTime - startTime; // Calculate elapsed time
    const progress = Math.min(elapsedTime / duration, 1); // Calculate progress as a fraction (0 to 1)
    //elapsedTime / duration calculates how far along the animation is as a fraction. If elapsedTime is half of duration, then elapsedTime / duration is 0.5, meaning the animation is 50% complete. The '1' ensures that progress never exceeds 1.
    const currentValue = Math.floor(progress * finalValue); // Calculate current value based on progress. progress * finalValue calculates the intermediate value of the number being animated based on the progress. If progress is 0.5 and finalValue is 100, then progress * finalValue is 50, meaning we are halfway to the final value. Math.floor() rounds down the result to the nearest integer. This ensures the displayed value is an integer and does not show fractional values during the animation.
    element.innerHTML = currentValue; // Update the element's inner HTML to the current value
    if (progress < 1) { // If the animation is not yet complete
      requestAnimationFrame(updateNumber); // Request the next animation frame
    }
  }

  // Start the animation
  requestAnimationFrame(updateNumber);
}

/* How They Work Together
Progress Calculation:

At the start of the animation, elapsedTime is 0, so progress is 0. This means the currentValue will start at 0.
As time progresses, elapsedTime increases, making progress increase from 0 towards 1.
When elapsedTime equals duration, progress becomes 1, and the animation is complete.
Current Value Calculation:

Initially, progress is 0, so currentValue is 0.
As progress increases, currentValue increases proportionally, giving the effect of counting up.
When progress reaches 1, currentValue equals finalValue, completing the animation.

 */


// Function to set the year, month, and day dynamically with animation
function setYearDynamically() {
  const age = calculateAge(); // Calculate the age
  const yearsDiv = document.getElementById('years');
  const monthsDiv = document.getElementById('months');
  const daysDiv = document.getElementById('days');

  // Animate the numbers
  animateNumber(yearsDiv, age.years, 2000); // 2 seconds duration
  animateNumber(monthsDiv, age.months, 2000);
  animateNumber(daysDiv, age.days, 2000);
}

// Event listener to trigger the animation
document.getElementById('getAgeButton').addEventListener('click', function () {
  setYearDynamically();
});


const createDataBars = (data) => {
  // Extract total budget and expenses
  const totalBudget = data.totalBudget;
  const expenses = data.expenses;

  // Find the maximum amount
  const maxAmount = expenses.reduce((max, item) => item.amount > max ? item.amount : max, 0);//🚩When you omit the curly braces, the arrow function has an implicit return, meaning it automatically returns the result of the expression without needing the return keyword.
  //max = accumulator item= currentValue

  console.log("Maximum amount:", maxAmount); // For debugging purposes

  const maxBarHeight = 10; // in rem

  // Calculate total amount spent
  const totalAmountSpent = expenses.reduce((accumulator, item) => accumulator + item.amount, 0); // 0 is the initial value

  // Calculate my balance
  const myBalance = totalBudget - totalAmountSpent;

  // Update bars and amounts
  expenses.forEach(item => {
    const barHeight = (item.amount / maxAmount) * maxBarHeight;
    const barElement = document.querySelector(`.bar${item.day.charAt(0).toUpperCase() + item.day.slice(1)}`);
    if (barElement) {
      barElement.style.height = `${barHeight}rem`;
    }
    
    // Update amount
    const barGrpElement = barElement.parentElement;//🚩the se of parentElement was the 🗝️ here 
    const amountElement = barGrpElement.querySelector('.amount');
    if (amountElement) {
      amountElement.innerHTML = item.amount;
    }
  });

   // Update my balance in the UI
   const monthTotalTopElement = document.querySelector('.myBalance__monthTotalTop');
   if ( monthTotalTopElement) {
    monthTotalTopElement.innerHTML = `$${totalBudget.toFixed(2)}`;
   }

  // Update my balance in the UI
  const totalTopElement = document.querySelector('.myBalance__totalTop');
  if (totalTopElement) {
    totalTopElement.innerHTML = `$${myBalance.toFixed(2)}`;
  }

  // Update total this month in the UI
  const totalBottomElement = document.querySelector('.bottomRow__totalBottom');
  if (totalBottomElement) {
    totalBottomElement.innerHTML = `$${totalAmountSpent.toFixed(2)}`;
  }
};

const fetchDataAsync = async () => {
  try {
    const response = await fetch('data.json'); // Ensure the path is correct
    const parsedData = await response.json();
    createDataBars(parsedData); // 'parsedData' is the argument
  } catch (error) {
    console.error(error);
  }
};

fetchDataAsync();



//---- Reducer function to sum all elements:

/* const sum = array.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);// 0 is the initial value
 */
const budgetFeedback = document.querySelector(".budget-feedback");
const expenseFeedback = document.querySelector(".expense-feedback");
const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const budgetAmount = document.getElementById("budget-amount");
const expenseAmount = document.getElementById("expense-amount");
const balance = document.getElementById("balance");
const balanceAmount = document.getElementById("balance-amount");
const expenseForm = document.getElementById("expense-form");
const expenseInput = document.getElementById("expense-input");
const amountInput = document.getElementById("amount-input");
const expenseList = document.getElementById("expense-list");
let itemList = [];
let itemID = 0;

// Submit budget form
budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = budgetInput.value;
  if (value === "" || value < 0) {
    budgetFeedback.classList.add("showItem");
    budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
    setTimeout(() => {
      budgetFeedback.classList.remove("showItem");
    }, 3000);
  } else {
    budgetAmount.textContent = value;
    budgetInput.value = "";
    showBalance();
  }
});

// Show balance
function showBalance() {
  const expense = totalExpense();
  const total = parseInt(budgetAmount.textContent) - expense;
  balanceAmount.textContent = total;
  if (total < 0) {
    balance.classList.remove("showGreen", "showBlack");
    balance.classList.add("showRed");
  } else if (total > 0) {
    balance.classList.remove("showRed", "showBlack");
    balance.classList.add("showGreen");
  } else if (total === 0) {
    balance.classList.remove("showRed", "showGreen");
    balance.classList.add("showBlack");
  }
}

// Submit expense form
expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const expenseValue = expenseInput.value;
  const amountValue = amountInput.value;
  if (expenseValue === "" || amountValue === "" || amountValue < 0) {
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
    setTimeout(() => {
      expenseFeedback.classList.remove("showItem");
    }, 3000);
  } else {
    let amount = parseInt(amountValue);
    expenseInput.value = "";
    amountInput.value = "";
    let expense = {
      id: itemID,
      title: expenseValue,
      amount: amount,
    };
    itemID++;
    itemList.push(expense);
    addExpense(expense);
    showBalance();
  }
});

// Add expense
function addExpense(expense) {
  const div = document.createElement("div");
  div.classList.add("expense");
  div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
    <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">$${expense.amount}</h5>
    <div class="expense-icons list-item">
     <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>`;
  expenseList.appendChild(div);
}

// Total expense
function totalExpense() {
  let total = 0;
  if (itemList.length > 0) {
    total = itemList.reduce((acc, curr) => {
      acc += curr.amount;
      return acc;
    }, 0);
  }
  expenseAmount.textContent = total;
  return total;
}

// Edit expense
function editExpense(element) {
  let id = parseInt(element.dataset.id);
  let parent = element.parentElement.parentElement.parentElement;
  // Remove from DOM
  expenseList.removeChild(parent);
  // Remove from the list
  let expense = itemList.filter((item) => item.id === id);
  // Show values
  expenseInput.value = expense[0].title;
  amountInput.value = expense[0].amount;
  // Remove from the list
  let tempList = itemList.filter((item) => item.id !== id);
  itemList = tempList;
  showBalance();
}

// Delete expense
function deleteExpense(element) {
  let id = parseInt(element.dataset.id);
  let parent = element.parentElement.parentElement.parentElement;
  // Remove from DOM
  expenseList.removeChild(parent);
  // Remove from the list
  let tempList = itemList.filter((item) => item.id !== id);
  itemList = tempList;
  showBalance();
}

// Expense list submit
expenseList.addEventListener("click", (event) => {
  if (event.target.parentElement.classList.contains("edit-icon")) {
    editExpense(event.target.parentElement);
  } else if (event.target.parentElement.classList.contains("delete-icon")) {
    deleteExpense(event.target.parentElement);
  }
});

// DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  // Code to be executed after the DOM is ready
  // ...
});

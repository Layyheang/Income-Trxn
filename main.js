import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setValue } from "./setValue";
import {calculateBalance} from "./calculateBalance";x``

document.querySelector("#app").innerHTML = `
<div class=" justify-center items-center min-h-screen">
    <div class="w-[40%] mx-auto">
        <div class="font-bold text-center">
            <h1 class="text-[#2f8d46] text-[25px] m-3 font-serif">Geeks For Geeks</h1>
            <h4 class="mb-4 font-serif">Expense Tracker Using JavaScript</h4>
        </div>
        <div class="p-4 border-1 shadow-md h-150">
            <div class="flex items-center justify-center mb-4 ">
                <svg class="w-5 mr-1 stroke-[4px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <h2 id="balance-display" class="font-bold text-[20px] font-serif">Balance: 0</h2>
            </div>
            <div class="w-full flex mt-4">
                <div class="w-1/2 text-center text-[12px]">
                    <h1 class="font-serif text-[1rem] font-bold">Total Income</h1>
                    <p id="incomeTotal" class="mt-2 text-black font-bold text-[15px] ">0</p>
                </div>
                <div class="w-1/2 text-center text-[12px] border-l-[1px] border-gray-500">
                    <h1 class="font-serif text-[1rem] font-bold">Total Expenses</h1>
                    <p id="expenseTotal" class="mt-2  text-red-700 font-bold text-[15px]">0</p>
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-center items-center mt-4 text-xs ">
    <div class="flex flex-col sm:flex-row p-2 m-2 border-2 justify-between items-start w-[60%]">
        <div id="root" class=" p-4 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-center font-serif">Expenses</h2>
            <table class="min-w-auto  min-h-fit  bg-sky-200 rounded-lg shadow-md">
                <tr class="bg-green-400 text-black items-center font-serif">
                    <th class="py-2 px-4">S.no.</th>
                    <th class="py-2 px-4">Name</th>
                    <th class="py-2 px-4">Amount</th>
                    <th class="py-2 px-4">Type</th>
                    <th class="py-2 px-4">Delete</th>
                </tr>

                <tbody id="table-body">
                    <!-- Rows will be dynamically inserted here -->
                </tbody>
            </table>
        </div>
        <div id="addNew" class=" w-2/5  md:w-2/5  h-96 bg-white p-2 rounded-lg shadow-md ">
            <h2 class="text-center text-2xl font-bold my-4 font-serif ">Add New</h2>
            <form id="submitForm">
                <div class = "flex flex-wrap p-2 space-y-3 justify-center items-center text-center ">
                    <div class=" w-2/5 p-2 h-8 mt-3 font-serif">Entry Type:</div>
                    <select id="itemType" class=" w-3/5 p-2 h-11 border rounded-lg font-serif">
                    <option value="0">Expense</option>
                    <option value="1">Income</option>
                    </select>
                    <div class=" w-2/5 p-2 h-8 font-serif">Name:</div>
                    <input id="name" type="text" class=" w-3/5 p-2 h-11 border rounded-lg font-serif" placeholder="Name"/>
                    <div class=" w-2/5 p-2 h-8 font-serif">Amount:</div>
                    <input id="amount" type="number" class="w-3/5 h-11 p-2 border rounded-lg font-serif" placeholder="0"/>
                    <button type="button" id="add-data" class="w-3/5 p-2 h-12 border bg-blue-500 text-white rounded-lg font-serif focus:outline-none focus:shadow-outline">Submit</button>
                </div>
            </form> 
        </div>
    </div>
    </div>
</div>

`;

let data = [];
let currentId = 1;

document.getElementById("add-data").addEventListener("click", () => {
    setValue((n, a, t) => {
        if (n != 0 && a != 0) {
        const inputData = 
        { 
            id: currentId++, 
            name: n, 
            amount: a, 
            type: t
        };
        data.push(inputData);
        renderTableRows(data.reverse());
        } else {
        alert("Please enter the information to the box."); 
        }
    });
    });

//Function to render the table rows
function renderTableRows(value) {
let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // Clear any existing rows

value.forEach((item, index) => {
    let row = document.createElement("tr");
    row.classList.add("text-black", "items-center");

    // Create cells and append to the row
    row.innerHTML = `
            <td class="py-2 px-4 items-center text-center">${index + 1}</td>
            <td class="py-2 px-4 items-center text-center">${item.name}</td>
            <td class="py-2 px-4 items-center text-center">${item.amount}</td>
            <td class="py-2 px-4 items-center text-center">${item.type === "1" ? `<box-icon name='trending-up' color='#19c400' ></box-icon>`
                                                    : `<box-icon name='trending-down' color='#e00707' ></box-icon>`}</td>
            <td  class="py-2 px-4">
                <button class="delete-button bg-red-500 text-white px-2 py-1 rounded" data-id="${
                item.id
                }">Delete</button>
            </td>
            `;
    tableBody.appendChild(row);
});
  // Attach event listeners to the delete buttons
updateBalanceDisplay();
attachDeleteEventListeners();

}


// Function to delete a row by ID
function deleteRow(id) {
  // Remove the item by ID
    data = data.filter((item) => item.id !== parseInt(id));

  // Re-render the table rows
    renderTableRows(data);
}

// Function to attach delete event listeners
function attachDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        deleteRow(id);
        });
    });
}


function updateBalanceDisplay() {
    calculateBalance(data,(income,expense)=>{
        let balance = income - expense;
        document.getElementById("balance-display").innerText = `Balance: ${balance}`;
        document.getElementById("incomeTotal").innerText = `${income}`;
        document.getElementById("expenseTotal").innerText = `${expense}`;
    });
}


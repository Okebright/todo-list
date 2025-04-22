// Select the input box and list container
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const task = inputBox.value.trim(); // Trim input to remove extra spaces
    if (task === '') {
        alert("You must write something");
    } else {
        const li = document.createElement("li");
        li.textContent = task; // Use textContent for safer text insertion

        // Create the edit button as an icon
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit"></i>'; // Font Awesome edit icon
        editButton.className = "edit-btn";
        editButton.onclick = function () {
            const newTask = prompt("Edit your task:", li.firstChild.textContent);
            if (newTask !== null && newTask.trim() !== "") {
                li.firstChild.textContent = newTask.trim();
                saveData();
            }
        };

        // Create the close button
        const span = document.createElement("span");
        span.textContent = "\u00d7"; // Use textContent for the close button

        li.appendChild(editButton); // Add the edit button to the task
        li.appendChild(span); // Add the close button to the task
        listContainer.appendChild(li);
        saveData();
    }
    inputBox.value = ""; // Clear the input box
    inputBox.focus(); // Refocus the input box
}

// Add task on button click or remove task on span click
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggle checked class
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove the task
        saveData();
    }
}, false);

// Save data to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Show data from local storage
function showTask() {
    const savedData = localStorage.getItem('data');
    if (savedData) { // Check if data exists in local storage
        listContainer.innerHTML = savedData;

        // Reattach event listeners to edit buttons after loading from local storage
        const editButtons = document.querySelectorAll(".edit-btn");
        editButtons.forEach(button => {
            button.onclick = function () {
                const li = button.parentElement;
                const newTask = prompt("Edit your task:", li.firstChild.textContent);
                if (newTask !== null && newTask.trim() !== "") {
                    li.firstChild.textContent = newTask.trim();
                    saveData();
                }
            };
        });
    }
    inputBox.focus(); // Focus the input box on page load
}

// Add task on Enter key press
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

showTask();

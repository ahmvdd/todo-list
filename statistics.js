// Declare addItem in global scope so it can be accessed from HTML
window.addItem = null;

let taskData = JSON.parse(localStorage.getItem('taskData')) || {
    labels: [],
    taskCounts: []
};

function updateTaskData() {
    const currentDate = new Date().toLocaleDateString();
    const currentTaskCount = document.getElementById("content").children.length;

    if (taskData.labels.includes(currentDate)) {
        const index = taskData.labels.indexOf(currentDate);
        taskData.taskCounts[index] = currentTaskCount;
    } else {
        taskData.labels.push(currentDate);
        taskData.taskCounts.push(currentTaskCount);
    }

    localStorage.setItem('taskData', JSON.stringify(taskData));
}

function saveTasks() {
    const tasks = Array.from(document.getElementById("content").children).map(li => li.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const content = document.getElementById('content');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
    updateTaskData();
}

function addTaskToDOM(taskText) {
    const content = document.getElementById("content");
    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateTaskData();
        saveTasks();
    });

    li.appendChild(deleteIcon);
    content.appendChild(li);

    li.addEventListener("click", function (e) {
        if (e.target !== deleteIcon) {
            this.classList.toggle("done");
            saveTasks();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Simulate loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById("loadingScreen");
        if (loadingScreen) {
            loadingScreen.style.opacity = "0";
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 500);
        }
    }, 1500);

    // Auth Modal Functionality
    const profileIcon = document.getElementById("profileIcon");
    const authModal = document.getElementById("authModal");
    const closeAuthModal = document.getElementById("closeAuthModal");
    const authTabs = document.querySelectorAll(".auth-tab");

    if (profileIcon && authModal && closeAuthModal) {
        profileIcon.addEventListener("click", () => authModal.classList.add("active"));
        closeAuthModal.addEventListener("click", () => authModal.classList.remove("active"));
        authModal.addEventListener("click", (e) => {
            if (e.target === authModal) authModal.classList.remove("active");
        });
    }

    // Tab switching functionality
    authTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
            document.querySelectorAll(".auth-tab").forEach((t) => t.classList.remove("active"));
            document.querySelectorAll(".auth-form").forEach((f) => f.classList.remove("active"));
            this.classList.add("active");
            const formId = this.getAttribute("data-tab") + "Form";
            document.getElementById(formId).classList.add("active");
        });
    });

    // Todo list functionality
    const inputData = document.getElementById("inputData");
    
    window.addItem = () => {
        if (inputData.value.trim() !== "") {
            addTaskToDOM(inputData.value.trim());
            inputData.value = "";
            inputData.focus();
            updateTaskData();
            saveTasks();
        }
    };

    if (inputData) {
        inputData.addEventListener("keypress", (e) => {
            if (e.key === "Enter") window.addItem();
        });
    }

    // Load existing tasks
    loadTasks();

    // Statistics page functionality
    const taskChart = document.getElementById('taskChart');
    if (taskChart) {
        const ctx = taskChart.getContext('2d');
        const lastSevenDays = taskData.labels.slice(-7);
        const lastSevenCounts = taskData.taskCounts.slice(-7);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: lastSevenDays,
                datasets: [{
                    label: 'Nombre de tâches',
                    data: lastSevenCounts,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }
            }
        });
    }

    // Back button functionality on statistics page
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            console.log('Bouton cliqué');
            window.location.href = 'index.html';
        });
    }
});

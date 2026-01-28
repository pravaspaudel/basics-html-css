const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTask");
const todoList = document.querySelector("#todolist");
const filterSelect = document.querySelector("#filter");
const completedCountText = document.querySelector("#completedCount");

let tasks = [];
let id = 0;

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

  if (!text) {
    alert("Task should not be empty!");
    return;
  }

  tasks.push({
    id: id++,
    text,
    completed: false,
  });

  taskInput.value = "";
  renderTasks();
});

filterSelect.addEventListener("change", renderTasks);

function renderTasks() {
  todoList.innerHTML = "";

  const filter = filterSelect.value;

  tasks.forEach(task => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
        span.classList.add("completed");
        li.classList.add("completed-item");
    } else {
        li.classList.add("pending-item");
    }

    span.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  updateCompletedCount();
}

function updateCompletedCount() {
  const completedCount = tasks.filter(task => task.completed).length;
  completedCountText.textContent = `Completed Tasks: ${completedCount}`;
}

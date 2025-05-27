// script.js - منطق التحكم في المهام والتصنيفات

let tasks = [];
let categories = [];
let taskId = 0;

// عناصر DOM
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const taskCategory = document.getElementById("task-category");
const tasksContainer = document.getElementById("tasks-container");
const addTaskBtn = document.getElementById("add-task");
const addCategoryBtn = document.getElementById("add-category");
const newCategoryName = document.getElementById("new-category-name");
const saveCategoryBtn = document.getElementById("save-category");
const categoryList = document.getElementById("category-list");

// وظيفة لإنشاء بطاقة مهمة
function renderTasks() {
  tasksContainer.innerHTML = "";
  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card" + (task.completed ? " task-completed" : "");
    card.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description || "(لا يوجد وصف)"}</p>
      <small>التصنيف: ${task.category}</small><br>
      <button onclick="toggleComplete(${task.id})">${task.completed ? "إلغاء الإنجاز" : "تم الإنجاز"}</button>
      <button onclick="deleteTask(${task.id})">حذف</button>
    `;
    tasksContainer.appendChild(card);
  });
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

addTaskBtn.onclick = () => {
  if (!taskTitle.value.trim() || taskCategory.value === "اختر التصنيف") return alert("يرجى ملء عنوان المهمة واختيار التصنيف.");
  const task = {
    id: taskId++,
    title: taskTitle.value,
    description: taskDesc.value,
    category: taskCategory.value,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(task);
  taskTitle.value = "";
  taskDesc.value = "";
  renderTasks();
};

saveCategoryBtn.onclick = () => {
  const name = newCategoryName.value.trim();
  if (!name || categories.includes(name)) return;
  categories.push(name);
  newCategoryName.value = "";
  renderCategories();
};

addCategoryBtn.onclick = () => {
  const name = prompt("أدخل اسم التصنيف الجديد:");
  if (name && !categories.includes(name)) {
    categories.push(name);
    renderCategories();
  }
};

function renderCategories() {
  taskCategory.innerHTML = '<option disabled selected>اختر التصنيف</option>';
  categoryList.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    taskCategory.appendChild(option);

    const li = document.createElement("li");
    li.textContent = cat + " ";
    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.onclick = () => {
      categories = categories.filter(c => c !== cat);
      tasks = tasks.filter(t => t.category !== cat);
      renderCategories();
      renderTasks();
    };
    li.appendChild(delBtn);
    categoryList.appendChild(li);
  });
}

// أول تشغيل
renderCategories();
renderTasks();

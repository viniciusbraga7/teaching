const API = "http://127.0.0.1:8000";


async function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    if (res.ok) {
        alert("Usuário registrado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("Erro ao registrar. Verifique os dados.");
    }
}


async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        window.location.href = "tasks.html";
    } else {
        alert("Login inválido!");
    }
}


async function loadTasks() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/tasks`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    const tasks = data.tasks;

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        list.innerHTML += `
            <div class="task-item">
                <span>${task.title}</span>
                <button onclick="editTask(${task.id}, '${task.title.replace(/'/g, "\\'")}')">Editar</button>
                <button onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
    });
}  


async function createTask() {
    const token = localStorage.getItem("token");
    const text = document.getElementById("newTask").value;

    const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: text })
    });

    if (res.ok) {
        loadTasks();
        document.getElementById("newTask").value = "";
    }
}


async function deleteTask(id) {
    const token = localStorage.getItem("token");

    await fetch(`${API}/tasks/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });

    loadTasks();
}


async function editTask(id, currentTitle) {
    const token = localStorage.getItem("token");
    const newTitle = prompt("Digite o novo nome da tarefa:", currentTitle);

    if (!newTitle || newTitle.trim() === "") return;

    const res = await fetch(`${API}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: newTitle })
    });

    if (res.ok) {
        loadTasks();
    } else {
        alert("Erro ao atualizar a tarefa.");
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}


if (window.location.pathname.includes("tasks.html")) {
    loadTasks();
}

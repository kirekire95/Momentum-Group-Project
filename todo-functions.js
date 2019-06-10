// Fetch existing todos from localStorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todo by id
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = function (id) {
    const todo = todos.find(function (todo) {
        return todo.id === id
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}

// Render application todos based on filters
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
    const todoEl = document.createElement('div')
    todoEl.classList.add("todoDiv");

    const checkbox = document.createElement('input')
    checkbox.classList.add("todoDiv__checkbox");

    const todoText = document.createElement('span')
    todoText.classList.add("todoDiv__span");

    const removeButton = document.createElement('button')
    removeButton.classList.add("todoDiv__removeButton");

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', function () {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // If task is completed, mark it as complete
    if (todo.completed) {
        todoText.classList.add("todo__toggled");
    }

    // Setup the todo text
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    // Setup the remove button
    removeButton.innerHTML += '<i class="fas fa-times todoDiv__removeButtonIcon"></i>'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.classList.add("todoDiv__title");
    if (incompleteTodos.length === 0) {
        summary.textContent = `You have not created any tasks to achieve today.`
    } else if (incompleteTodos.length === 1) {
        summary.textContent = `You have ${incompleteTodos.length} task to achieve today.`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} tasks to achieve today.`
    }

    return summary
}
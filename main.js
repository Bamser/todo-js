const taskInput = document.querySelector('#taskInput')
const addButton = document.querySelector('#addButton')
const removeLastButton = document.querySelector('#removeLastButton')
const removeFirstButton = document.querySelector('#removeFirstButton')
const result = document.querySelector('#result')
const error = document.querySelector('#error')

const taskList = JSON.parse(localStorage.getItem('tasks')) || []

const displayTasks = () => {
  result.innerHTML = ''

  if (taskList.length === 0) {
    result.textContent = 'Список задач: пусто'
    return
  }

  const title = document.createElement('span')
  title.textContent = 'Список задач: '
  result.appendChild(title)

  const ol = document.createElement('ol')
  taskList.forEach((task) => {
    const li = document.createElement('li')
    const displayTask = task.charAt(0).toUpperCase() + task.slice(1)
    li.textContent = displayTask
    ol.appendChild(li)
  })
  result.appendChild(ol)

  localStorage.setItem('tasks', JSON.stringify(taskList))
}

const showError = (message) => {
  error.textContent = message
  error.style.display = 'block'

  setTimeout(() => {
    error.textContent = ''
    error.style.display = 'none'
  }, 3000)
}

displayTasks()

addButton.addEventListener('click', () => {
  let task = taskInput.value.trim()

  if (task === '') {
    showError('Ошибка: Введите задачу')
    return
  }

  const taskLower = task.toLowerCase()

  if (taskList.includes(taskLower)) {
    showError('Ошибка: Задача уже есть')
  } else {
    taskList.push(taskLower)
    displayTasks()
  }

  taskInput.value = ''
})

removeLastButton.addEventListener('click', () => {
  taskList.pop()
  displayTasks()
})

removeFirstButton.addEventListener('click', () => {
  taskList.shift()
  displayTasks()
})

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addButton.click()
  }
})

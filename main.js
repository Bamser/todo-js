const taskInput = document.querySelector('#taskInput')
const addButton = document.querySelector('#addButton')
const currentList = document.querySelector('#currentList')
const result = document.querySelector('#result')
const error = document.querySelector('#error')

const taskList = JSON.parse(localStorage.getItem('tasks')) || []

const displayTasks = () => {
  result.innerHTML = ''

  if (taskList.length === 0) {
    result.textContent = 'Список задач: пусто'
    localStorage.setItem('tasks', JSON.stringify([]))
    localStorage.removeItem('tasks')
    return
  }

  const title = document.createElement('span')
  title.textContent = 'Список задач: (кликни по задаче чтобы удалить) '
  result.appendChild(title)

  const ol = document.createElement('ol')
  taskList.forEach((task, index) => {
    const li = document.createElement('li')
    const displayTask = task.charAt(0).toUpperCase() + task.slice(1)
    li.textContent = displayTask
    li.addEventListener('click', () => {
      taskList.splice(index, 1)
      displayTasks()
    })
    ol.appendChild(li)
  })
  result.appendChild(ol)

  localStorage.setItem('tasks', JSON.stringify(taskList))
  console.log('Сохранённый taskList:', taskList)
}

const showError = (message) => {
  error.textContent = message
  error.classList.add('show')
  setTimeout(() => {
    error.classList.remove('show')
    error.textContent = ''
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

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    addButton.click()
  }
})

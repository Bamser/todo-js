const taskInput = document.querySelector('#taskInput')
const addButton = document.querySelector('#addButton')
const result = document.querySelector('#result')
const error = document.querySelector('#error')

let taskList = JSON.parse(localStorage.getItem('tasks')) || []
taskList = taskList.map((task) =>
  typeof task === 'string' ? { text: task, completed: false } : task
)

const displayTasks = () => {
  result.innerHTML = ''

  if (taskList.length === 0) {
    result.textContent = 'Список задач: пусто'
    localStorage.setItem('tasks', JSON.stringify(taskList))
    return
  }

  const title = document.createElement('span')
  title.textContent = 'Список задач:'
  result.appendChild(title)

  const ol = document.createElement('ol')
  taskList.forEach((task, index) => {
    const li = document.createElement('li')
    const taskContent = document.createElement('span')
    taskContent.classList.add('task-content')
    taskContent.textContent =
      task.text.charAt(0).toUpperCase() + task.text.slice(1)

    const completeButton = document.createElement('button')
    completeButton.classList.add('complete')
    const completeIcon = document.createElement('img')
    completeIcon.src = './complete.svg'
    completeIcon.alt = 'Выполнено'
    completeButton.appendChild(completeIcon)

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    const deleteIcon = document.createElement('img')
    deleteIcon.src = './delete.svg'
    deleteIcon.alt = 'Удалить'
    deleteButton.appendChild(deleteIcon)

    if (task.completed) {
      taskContent.classList.add('complete')
      completeButton.style.display = 'none'
    }

    const buttonsDiv = document.createElement('div')
    buttonsDiv.classList.add('buttons')
    buttonsDiv.appendChild(completeButton)
    buttonsDiv.appendChild(deleteButton)

    deleteButton.addEventListener('click', () => {
      taskList.splice(index, 1)
      displayTasks()
      localStorage.setItem('tasks', JSON.stringify(taskList))
    })

    completeButton.addEventListener('click', () => {
      taskList[index].completed = true
      displayTasks()
      localStorage.setItem('tasks', JSON.stringify(taskList))
    })

    li.appendChild(taskContent)
    li.appendChild(buttonsDiv)
    ol.appendChild(li)
  })
  result.appendChild(ol)
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

  if (taskList.some((t) => t.text.toLowerCase() === task.toLowerCase())) {
    showError('Ошибка: Задача уже есть')
    return
  }

  taskList.push({ text: task, completed: false })
  displayTasks()
  localStorage.setItem('tasks', JSON.stringify(taskList))
  taskInput.value = ''
})

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    addButton.click()
  }
})

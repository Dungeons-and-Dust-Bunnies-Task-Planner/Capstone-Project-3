// DOM ELEMENTS
const battleIcon = document.querySelector('.battle-icon')
const battleIconPopOut = document.querySelector('.battle-icon-pop-out')
// BATTLES
const battleSlideOut = document.querySelector('.battle-slide-out')
// CREATE BATTLE
const createBattleForm = document.querySelector('.create-battle-form')
const createBattleInput = document.querySelector('.create-battle-input')
const createBattleBtn = document.querySelector('.create-battle-btn')
// SHOW BATTLE
const battlesList = document.querySelector('.battles-list')
const battle = document.querySelector('.battle')
const battleTitle = document.querySelector('.battle-title')
// TASKS
const tasks = document.querySelector('.tasks')
// SHOW TASKS
const tasksList = document.querySelector('.tasks-list')
const tasksBattleTitle = document.querySelector('.tasks-battle-title')
const task = document.querySelector('.task')
const taskBody = document.querySelector('.task-body')
const completeTaskBtn = document.querySelector('.complete-task-btn')
// EDIT TASKS
const openEditTaskBtn = document.querySelector('.open-edit-task-btn')
const editTaskForm = document.querySelector('.edit-task-form')
const editTaskInput = document.querySelector('.edit-task-input')
const editTaskBtn = document.querySelector('.edit-task-submit-btn')
// DELETE TASKS
const deleteTaskBtn = document.querySelector('.delete-task-btn')
// CREATE TASKS
const createTaskForm = document.querySelector('.create-task-form')
const createTaskInput = document.querySelector('.create-task-input')
const createTaskBtn = document.querySelector('.create-task-btn')


// EVENT LISTENERS
battleIcon.addEventListener('click', () => {
		if (battleIconPopOut.classList.contains('show')) {
				setTimeout((() => battleIconPopOut.classList.toggle('show')), 200)
				battleSlideOut.classList.toggle('open')
		} else {
				setTimeout((() => battleSlideOut.classList.toggle('open')), 200)
				battleIconPopOut.classList.toggle('show')
		}
})

openEditTaskBtn.addEventListener('click', () => {

})




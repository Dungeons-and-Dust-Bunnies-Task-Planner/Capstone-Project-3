(() => {
// DOM ELEMENTS
		const battleIcon = document.querySelector('.battle-icon')
		const battleIconBanner = document.querySelector('.battle-icon-banner')
		const battleIconBannerText = document.querySelector('.battle-icon-banner-text')
// BATTLES
		const battleSlideOut = document.querySelector('.battle-slide-out')
// CREATE BATTLE
		const createBattleForm = document.querySelector('.create-battle-form')
		const createBattleInput = document.querySelector('.create-battle-input')
		const createBattleBtn = document.querySelector('.create-battle-btn')
// SHOW BATTLE
		const battlesList = document.querySelector('.battles-list')
		const battle = document.querySelectorAll('.battle')
		const battleTitle = document.querySelectorAll('.battle-title')
// TASKS
		const tasks = document.querySelector('.tasks')
		const task = document.querySelectorAll('.task')
// SHOW TASKSAll
		const tasksList = document.querySelector('.tasks-list')
		const monster = document.querySelector('.monster')

		document.addEventListener('DOMContentLoaded', function () {
				console.log('Battlegrounds page loaded')
				document.querySelectorAll('.battle').forEach(function (battleElement) {
						battleElement.addEventListener('click', function () {
								battleElement.classList.toggle('active')
								battleElement.classList.toggle('inactive')
						})
						battleElement.addEventListener('onchange', function (e) {
								console.log('onchange event fired')
								if (battleElement.classList.contains('active')) {
										battleElement.querySelectorAll('.battle-tasks').forEach(function (battleTaskElement) {
												battleTaskElement.classList.remove('hidden')
												console.log('class remove fired')
										})
								}
								if (battleElement.classList.contains('inactive')) {
										battleElement.querySelectorAll('.tasks-list').forEach(function (tasksList) {
												tasksList.classList.add('hidden')
												console.log('class add fired')
										})
								}
						})
				})
		})


// EVENT LISTENERS
		battleIcon.addEventListener('click', () => {
				battleSlideOut.classList.toggle('open')
				if (battleSlideOut.classList.contains('open')) {
						battleIconBannerText.textContent = ' << Show Tasks!'
				} else {
						battleIconBannerText.textContent = ' << Show Battles!'
				}
		})

		battle.forEach(battle => {
				const tasksList = battle.querySelector('.tasks-list')

				battle.addEventListener('click', (e) => {
						battle.classList.remove('active')
						e.target.classList.add('active')
						if (battle.classList.contains('inactive')) {
								tasksList.classList.add('hidden')
						}
						if (battle.classList.contains('active')) {
								tasksList.classList.remove('hidden')
						}
				})

				task.forEach(task => {
						const tasksBattleTitle = task.querySelector('.tasks-battle-title')
						const taskBody = task.querySelector('.task-body')
						const completeTaskBtn = task.querySelector('.complete-task-btn')
						const openEditBtn = task.querySelector('.open-edit-task-btn')
						const editTaskForm = task.querySelector('.edit-task-form')
						const editTaskInput = task.querySelector('.edit-task-input')
						const editTaskBtn = task.querySelector('.edit-task-submit-btn')
						const deleteTaskBtn = task.querySelector('.delete-task-btn')
						const deleteTaskForm = task.querySelector('.delete-task-form')
						const createTaskForm = task.querySelector('.create-task-form')
						const createTaskInput = task.querySelector('.create-task-input')
						const createTaskBtn = task.querySelector('.create-task-btn')

						task.addEventListener('click', () => {
								task.classList.toggle('complete')
						})

						openEditBtn.addEventListener('click', function () {
								task.classList.toggle('edit')
								task.classList.contains('edit') ? this.textContent = 'Cancel' : this.textContent = 'Edit'
								taskBody.classList.toggle('edit')
								editTaskInput.classList.toggle('edit')
								editTaskBtn.classList.toggle('edit')
								deleteTaskBtn.classList.toggle('edit')
						})

						editTaskForm.addEventListener('submit', () => {
								openEditBtn.textContent = 'Edit'
								taskBody.classList.toggle('edit')
								editTaskInput.classList.toggle('edit')
								editTaskBtn.classList.toggle('edit')
								deleteTaskBtn.classList.toggle('edit')
						})

						deleteTaskForm.addEventListener('submit', () => {
								openEditBtn.textContent = 'Edit'
								taskBody.classList.toggle('edit')
								editTaskInput.classList.toggle('edit')
								editTaskBtn.classList.toggle('edit')
								deleteTaskBtn.classList.toggle('edit')
						})

						deleteTaskBtn.addEventListener('click', () => {
								deleteTaskForm.submit()
						})
				})
		})


		//
		// document.querySelectorAll('.battle-tasks').forEach(function (battleTaskElement) {
		// 		battleTaskElement.addEventListener('click', function (e) {
		// 				battleTaskElement.classList.toggle('hidden')
		// 		})
		// })

		document.querySelectorAll('.task').forEach(function (taskElement) {
				taskElement.addEventListener('click', function () {
						taskElement.classList.toggle('complete')
						taskElement.classList.toggle('not-complete')
				})
		})
})()

//----------------- monster image JS ----------------




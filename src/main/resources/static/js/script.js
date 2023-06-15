(() => {
		const battleIcon = document.querySelector('.battle-icon')
		const battleSlideOut = document.querySelector('.battle-slide-out')
		// const addBattleWrap = document.querySelector('.add-battle-wrap')
		const addBattleInput = document.querySelector('.add-battle-input')
		const addBattleBtn = document.querySelector('.add-battle-btn')
		const taskModal = document.querySelector('.task-modal')
		const modalOverlay = document.querySelector('.modal-overlay')
		const slideOutOverlay = document.querySelector('.slide-out-overlay')
		// const logOutForm = document.getElementById("logOutForm");
		// const logOutButton = document.getElementById("logOutButton");
		// const taskFormOverlay = document.querySelector('.modal-overlay')
		const battlesContainerOverlay = document.querySelector('.battles-container-overlay')
		const logOutForm = document.querySelector('.logout-form')
		const logOutBtn = document.querySelector('.logout-btn')


		const checkForClassValue = (element, className) => {
				return element.classList.contains(className)
		}

		const displayBattles = (battles) => {
				// BATTLES CONTAINER
				const battlesContainer = document.querySelector('.battles')
				battlesContainer.innerHTML = ''

				// TASKS CONTAINER
				const tasksContainer = document.querySelector('.tasks')
				tasksContainer.innerHTML = ''
				// const taskModalOverlay = document.createElement('div')
				// taskModalOverlay.classList.add('task-modal-overlay hidden')
				// tasksContainer.appendChild(taskModalOverlay)


				battles.forEach(battle => {
						const battleDiv = document.createElement('div')
						battleDiv.classList.add(battle.status === 'active' ? 'battle active' : 'battle inactive')

						console.log(battle.status)
						if (battle.status === 'active') {
								battleDiv.classList.remove('inactive')
								battleDiv.classList.add('active')
								console.log(battleDiv.classList)
						}
						if (battle.status === 'inactive') {
								battleDiv.classList.remove('active')
								battleDiv.classList.add('inactive')
								console.log(battleDiv.classList)
						}
						const titleHeading = document.createElement('h2')
						titleHeading.textContent = battle.title
						battleDiv.appendChild(titleHeading)
						const statusParagraph = document.createElement('p')
						statusParagraph.textContent = `${battle.status}`
						battleDiv.appendChild(statusParagraph)


						// HIDDEN FORM TO EDIT THE BATTLE
						const editBattleForm = document.createElement('form')
						editBattleForm.classList.add('edit-battle-form')
						editBattleForm.style.display = 'none'
						editBattleForm.action = `/battlegrounds/battle/{id}/battle/?id=${battle.id}`
						editBattleForm.method = 'post'

// HIDDEN INPUT, THAT WILL SHOW WHEN THE BUTTON TO EDIT IS CLICKED
						const editBattleInput = document.createElement('input')
						editBattleInput.classList.add('edit-battle-input  hidden')
						editBattleInput.type = 'text'
						editBattleInput.name = 'battleBodyEdit'
						editBattleInput.placeholder = 'Edit your battle'
						editBattleInput.autofocus = true
						editBattleForm.appendChild(editBattleInput)

// BUTTON TO SUBMIT THE BATTLE EDIT
						const editBattleBtn = document.createElement('button')
						editBattleBtn.classList.add('edit-battle-btn hidden')
						editBattleBtn.type = 'submit'
						editBattleBtn.textContent = 'Edit battle'
						editBattleForm.appendChild(editBattleBtn)

// BUTTON TO BE DISPLAYED IN THE BATTLE, THAT WILL MAKE THE BATTLE HIDDEN, AND SHOW THE INPUT TO EDIT THE BATTLE
						const openEditBattleBtn = document.createElement('button')
						openEditBattleBtn.classList.add('open-edit-battle-btn')
						openEditBattleBtn.type = 'button'

// IMAGE FOR BUTTON
						const editBattleBtnImg = document.createElement('img')
						editBattleBtnImg.classList.add('edit-battle-btn-img')
						editBattleBtnImg.src = '../images/plus-6.png'
						editBattleBtnImg.alt = 'button icon'
						openEditBattleBtn.appendChild(editBattleBtnImg)
						editBattleForm.appendChild(openEditBattleBtn)

						battleDiv.appendChild(editBattleForm)

						battleDiv.addEventListener('click', function () {
								battleDiv.classList.toggle('active')
								battleDiv.classList.toggle('inactive')
						})


						battlesContainer.appendChild(battleDiv)


						battle.tasks.forEach(task => {
								const tasksList = document.createElement('div')
								tasksList.classList.add('tasks-list')

// INDIVIDUAL BATTLE'S TASKS WILL BE CONTAINED HERE
								const battleTasks = document.createElement('ul')
								battleTasks.classList.add('battle-tasks hidden')
								tasksList.appendChild(battleTasks)

//MODAL
// 								const taskModal = document.createElement('div')
// 								taskModal.classList.add('task-modal hidden')
// 								tasksList.appendChild(taskModal)
// 								const taskForm = document.createElement('form')
// 								taskForm.action = `/battlegrounds/battle/{id}/create-task?id=${battle.id}`
// 								taskForm.method = 'post'
// 								const taskFormInput = document.createElement('input')
// 								taskFormInput.type = 'text'
// 								taskFormInput.name = 'taskBody'
// 								taskFormInput.placeholder = 'Enter Task...'
// 								const taskFormBtn = document.createElement('button')
// 								taskFormBtn.type = 'submit'
// 								taskFormBtn.textContent = 'Create Task'
// 								taskForm.appendChild(taskFormInput)
// 								taskForm.appendChild(taskFormBtn)
// 								taskModal.appendChild(taskForm)
// 								battleTasks.appendChild(taskModal)


// TASKS LIST CONTAINER TITLE
// THIS IS WHAT GOES INSIDE THE TASKS CONTAINER, AND HOLDS AN INDIVIDUAL BATTLE'S UNIQUE TASKS
								const tasksListTitle = document.createElement('h2')
								tasksListTitle.classList.add('battle-name')
								tasksListTitle.textContent = battle.title
								battleTasks.appendChild(tasksListTitle)

// THIS WILL BE THE <LI> OF THE <UL>
								const taskItem = document.createElement('li')
								taskItem.classList.add('task')

								const taskItemTitle = document.createElement('h3')
								taskItemTitle.classList.add('task-body')
								taskItemTitle.textContent = task.taskBody

								taskItem.appendChild(taskItemTitle)

								battleTasks.appendChild(taskItem)
// HIDDEN FORM TO EDIT THE TASK
								const editTaskForm = document.createElement('form')
								editTaskForm.classList.add('edit-task-form')
								editTaskForm.style.display = 'none'
								editTaskForm.action = `/battlegrounds/battle/{b-id}/task/{t-id}/edit-task?b-id=${battle.id}&t-id=${task.id}`
								editTaskForm.method = 'post'

// HIDDEN INPUT, THAT WILL SHOW WHEN THE BUTTON TO EDIT IS CLICKED
								const editTaskInput = document.createElement('input')
								editTaskInput.classList.add('edit-task-input  hidden')
								editTaskInput.type = 'text'
								editTaskInput.name = 'taskBodyEdit'
								editTaskInput.placeholder = `${task.taskBody}`
								editTaskInput.autofocus = true
								editTaskForm.appendChild(editTaskInput)

// BUTTON SUBMIT THE TASK EDIT
								const editTaskBtn = document.createElement('button')
								editTaskBtn.classList.add('edit-task-btn hidden')
								editTaskBtn.type = 'submit'
								editTaskBtn.textContent = 'Edit task'
								editTaskForm.appendChild(editTaskBtn)

								taskItem.appendChild(editTaskForm)

// BUTTON TO BE DISPLAYED IN THE TASK, THAT WILL MAKE THE TASK HIDDEN, AND SHOW THE INPUT TO EDIT THE TASK
								const openEditTaskBtn = document.createElement('button')
								openEditTaskBtn.classList.add('open-edit-task-btn')
								openEditTaskBtn.type = 'button'

// IMAGE FOR BUTTON
								const editTaskBtnImg = document.createElement('img')
								editTaskBtnImg.classList.add('edit-task-btn-img')
								editTaskBtnImg.src = '../images/plus-6.png'
								editTaskBtnImg.alt = 'button icon'
								openEditTaskBtn.appendChild(editTaskBtnImg)

								taskItem.appendChild(openEditTaskBtn)

								tasksList.appendChild(taskItem)

								tasksContainer.appendChild(tasksList)

								// ADD EITHER A BUTTON TO OPEN THE MODAL, OR REPLACE THE MODAL WITH A HIDDEN FORM THAT WILL SHOW ONLY A SINGLE INPUT (LIKE FOR CREATING A NEW BATTLE IN THE BATTLE SLIDE OUT)
								// THE CODE IN THE HTML IS COMMENTED OUT WHERE THIS NEEDS TO PICK BACK UP FROM
								// COULD EVEN MAKE THE ENTIRE TASKSLIST ELEMENT A HIDDEN FORM THAT SHOWS A BUTTON TO ALLOW EDITING EACH TASK WHEN THE TASK IS HOVERED. WHEN THAT BUTTON IS CLICKED, REPLACE THE INNERHTML OF THE TASKITEM ELEMENT WITH AN INPUT THAT WILL UPDATE THE CONTENT OF THAT TASK


						})
				})

				// if (battles[idx].classList.contains('active')) {
				// 		battleTasks[idx].classList.remove('hidden')
				// }
				//
				// if (battles[idx].classList.contains('inactive')) {
				// 		battleTasks[idx].classList.add('hidden')
				// }
		}

		const fetchBattles = async () => {
				try {
						const res = await fetch('/battlegrounds')
						const responseText = await res.text()
						const battles = JSON.parse(responseText)

						displayBattles(battles)
				} catch (e) {
						console.log('Error fetching battles:', e)
				}
		}

		const updateBattleStatus = async (battleId, battleStatus) => {
				let url

				if (battleStatus === 'active') {
						const deactivate = 0
						url = `/battlegrounds/battle/${battleId}/${deactivate}`
				} else if (battleStatus === 'inactive') {
						const activate = 1
						url = `/battlegrounds/battle/${battleId}/${activate}`
				} else {
						return
				}

				try {
						const response = await fetch(url, {
								method: 'POST',
								headers: {
										'Content-Type': 'application/json'
								}
						})

						if (!response.ok) {
								throw new Error('Failed to update battle status')
						}

						console.log('Battle status updated successfully')
				} catch (error) {
						console.error(error)
				}
		}

		// logOutButton.addEventListener('click', () => {
		// 	logOutForm.submit();
		// })

		battleIcon.addEventListener('click', e => {
				e.preventDefault()
				battleSlideOut.classList.toggle('open')
				battlesContainerOverlay.classList.toggle('hidden')
				// addBattleWrap.classList.remove('active')
		})

		battlesContainerOverlay.addEventListener('click', e => {
				battlesContainerOverlay.classList.toggle('hidden')
				battleSlideOut.classList.toggle('open')
		})

		// addBattleBtn.addEventListener('click', (e) => {
		// 		e.preventDefault()
		// 		addBattleWrap.classList.toggle('active')
		// 		addBattleInput.focus()
		// })

		// taskFormOverlay.addEventListener('click', e => {
		// 		taskFormOverlay.classList.toggle('hidden')
		// 		taskModal.classList.toggle('hidden')
		// })

		logOutBtn.addEventListener('click', () => {
				logOutForm.submit()
		})

		document.addEventListener('DOMContentLoaded', async () => {
				console.log('Battlegrounds page loaded')
				await fetchBattles()
				document.querySelector('.battle').classList.toggle('active')
				document.querySelector('.battle').classList.toggle('inactive')
				document.querySelector('.battle-tasks').classList.toggle('hidden')
				const tasksListElement = document.querySelector('.tasks-list')
				tasksListElement.children.length <= 0 ? tasksListElement.textContent = `Activate a battle to show it's tasks` : ''


				// document.querySelectorAll('.new-task-wrap').forEach(openModalElement => {
				// 		openModalElement.addEventListener('click', e => {
				// 				const battleId = openModalElement.parentElement.querySelector('input[name="battleId"]').value
				// 				taskForm.action = taskForm.action.replace('{id}', battleId)
				// 				taskFormOverlay.classList.toggle('hidden')
				// 				taskModal.classList.toggle('hidden')
				// 		})
				// })

				document.querySelectorAll('.task').forEach(taskElement => {
						taskElement.addEventListener('click', () => {
								console.log('task click fired') // DEBUG
								taskElement.classList.toggle('complete')
								taskElement.classList.toggle('not-complete')
								console.log('task class changed') // DEBUG
						})
				})

				const battleElements = document.querySelectorAll('.task.not-complete')
				battleElements.forEach(function (battleElement) {
						battleElement.addEventListener('click', async function () {
								const battleId = battleElement.getAttribute('data-battle-id')
								const battleStatus = battleElement.getAttribute('data-battle-status')
								await updateBattleStatus(battleId, battleStatus)
						})
				})

				// const taskForm = document.querySelector('.task-modal form')
				// taskForm.addEventListener('submit', async function (event) {
				// 		event.preventDefault()
				// 		const formData = new FormData(taskForm)
				// 		console.log('event listener running')
				//
				// 		try {
				// 				const battleElement = document.querySelector('.battle')
				// 				console.log(battleElement) // DEBUG
				// 				const battleId = battleElement ? battleElement.dataset.battleId : null
				// 				console.log(battleId) // DEBUG
				//
				// 				if (!battleId) {
				// 						console.error('Failed to resolve battleId')
				// 						return
				// 				}
				//
				// 				console.log('Battle ID:', battleId) // DEBUG
				//
				// 				taskForm.action = `/battlegrounds/battle/${battleId}/create-task`
				//
				// 				// CONVERT FORM DATA TO PLAIN OBJECT
				// 				const formDataObject = {}
				// 				for (const [key, value] of formData) {
				// 						formDataObject[key] = value
				// 				}
				//
				// 				const formDataParams = new URLSearchParams(formDataObject)
				// 				const response = await fetch(taskForm.action, {
				// 						method: 'POST',
				// 						headers: {
				// 								'Content-Type': 'application/x-www-form-urlencoded',
				// 						},
				// 						body: formDataParams,
				// 				})
				//
				// 				if (!response.ok) {
				// 						throw new Error('Failed to create task')
				// 				}
				//
				// 				const battleTaskElement = document.querySelector('.battle[data-battle-id="' + battleId + '"]')
				// 				const updateElement = battleTaskElement.querySelector('.task-text')
				// 				const taskBody = formData.get('task-body')
				// 				updateElement.textContent = taskBody instanceof File ? taskBody.name : taskBody.toString()
				// 				console.log('Task created successfully') //DEBUG

				// HIDE MODAL
				// taskFormOverlay.classList.add('hidden')
				// taskModal.classList.add('hidden')

				// 				} catch (error) {
				// 						console.error(error)
				// 				}
				// 		})
		})

})()


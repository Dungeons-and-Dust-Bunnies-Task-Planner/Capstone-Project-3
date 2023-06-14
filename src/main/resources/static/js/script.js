(() => {
		const battleIcon = document.querySelector('.battle-icon')
		const battleSlideOut = document.querySelector('.battle-slide-out')
		const addBattleWrap = document.querySelector('.add-battle-wrap')
		const addBattleInput = document.querySelector('.add-battle-input')
		const addBattleBtn = document.querySelector('.add-battle-btn')
		const taskModal = document.querySelector('.task-modal')
		const modalOverlay = document.querySelector('.modal-overlay')
		const slideOutOverlay = document.querySelector('.slide-out-overlay')
		const logOutForm = document.querySelector('.logout-form')
		const logOutBtn = document.querySelector('.logout-btn')

		const checkForClassValue = (element, className) => {
				return element.classList.contains(className)
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

		battleIcon.addEventListener('click', e => {
				e.preventDefault()
				battleSlideOut.classList.toggle('open')
				slideOutOverlay.classList.toggle('hidden')
		})

		slideOutOverlay.addEventListener('click', e => {
				slideOutOverlay.classList.toggle('hidden')
				battleSlideOut.classList.toggle('open')
		})

		addBattleBtn.addEventListener('click', (e) => {
				e.preventDefault()
				addBattleWrap.classList.toggle('active')
				addBattleInput.focus()
		})

		modalOverlay.addEventListener('click', e => {
				modalOverlay.classList.toggle('hidden')
				taskModal.classList.toggle('hidden')
		})

		logOutBtn.addEventListener('click', () => {
				logOutForm.submit()
		})

		document.addEventListener('DOMContentLoaded', () => {
				console.log('Battlegrounds page loaded')
				document.querySelector('.battle').classList.toggle('active')
				document.querySelector('.battle').classList.toggle('inactive')
				document.querySelector('.battle-tasks').classList.toggle('hidden')
				const tasksListElement = document.querySelector('.tasks-list')
				tasksListElement.children.length <= 0 ? tasksListElement.textContent = `Activate a battle to show it's tasks` : ''

				document.querySelectorAll('.battle').forEach(function (battleElement, idx) {
						battleElement.addEventListener('click', function (e) {
								battleElement.classList.toggle('active')
								battleElement.classList.toggle('inactive')

								const battles = document.querySelectorAll('.battle')
								const battleTasks = document.querySelectorAll('.battle-tasks')

								if (battles[idx].classList.contains('active')) {
										battleTasks[idx].classList.remove('hidden')
								}

								if (battles[idx].classList.contains('inactive')) {
										battleTasks[idx].classList.add('hidden')
								}
						})
				})

				document.querySelectorAll('.new-task-wrap').forEach(openModalElement => {
						openModalElement.addEventListener('click', e => {
								const battleId = openModalElement.parentElement.querySelector('input[name="battleId"]').value
								taskForm.action = taskForm.action.replace('{id}', battleId)
								modalOverlay.classList.toggle('hidden')
								taskModal.classList.toggle('hidden')
						})
				})

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
						battleElement.addEventListener('click', function () {
								const battleId = battleElement.getAttribute('data-battle-id')
								const battleStatus = battleElement.getAttribute('data-battle-status')
								updateBattleStatus(battleId, battleStatus)
						})
				})


				const taskForm = document.querySelector('.task-modal form')

				taskForm.addEventListener('submit', async function (event) {
						event.preventDefault()
						const formData = new FormData(taskForm)
						console.log('event listener running')

						try {
								const battleElement = document.querySelector('.battle')
								console.log(battleElement) // DEBUG
								const battleId = battleElement ? battleElement.dataset.battleId : null
								console.log(battleId) // DEBUG

								if (!battleId) {
										console.error('Failed to resolve battleId')
										return
								}

								console.log('Battle ID:', battleId) // DEBUG

								taskForm.action = `/battlegrounds/battle/${battleId}/create-task`

								// CONVERT FORMDATA TO PLAIN OBJECT
								const formDataObject = {}
								for (const [key, value] of formData) {
										formDataObject[key] = value
								}

								const formDataParams = new URLSearchParams(formDataObject)
								const response = await fetch(taskForm.action, {
										method: 'POST',
										headers: {
												'Content-Type': 'application/x-www-form-urlencoded',
										},
										body: formDataParams,
								})

								if (!response.ok) {
										throw new Error('Failed to create task')
								}

								// HIDE MODAL
								modalOverlay.classList.add('hidden')
								taskModal.classList.add('hidden')

								const battleTaskElement = document.querySelector('.battle[data-battle-id="' + battleId + '"]')
								const updateElement = battleTaskElement.querySelector('.task-text')
								const taskBody = formData.get('task-body')
								updateElement.textContent = taskBody instanceof File ? taskBody.name : taskBody.toString()
								console.log('Task created successfully') //DEBUG


						} catch (error) {
								console.error(error)
						}
				})
		})
})()
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


/////////////////////
// FUNCTIONS
/////////////////////
		const checkForClassValue = (element, className) => {
				return element.classList.contains(className)
		}

/////////////////////
// EVENT LISTENERS
/////////////////////

// BATTLE ICON
		battleIcon.addEventListener('click', e => {
				e.preventDefault()
				battleSlideOut.classList.toggle('open')
				slideOutOverlay.classList.toggle('hidden')
		})

// SLIDEOUT OVERLAY
		slideOutOverlay.addEventListener('click', e => {
				slideOutOverlay.classList.toggle('hidden')
				battleSlideOut.classList.toggle('open')
		})

// ADD BATTLE BUTTON
		addBattleBtn.addEventListener('click', () => {
				addBattleWrap.classList.toggle('active')
				addBattleInput.focus()
		})
// OPEN TASK MODAL

// MODAL OVERLAY CLICK EVENT
		modalOverlay.addEventListener('click', e => {
				modalOverlay.classList.toggle('hidden')
				taskModal.classList.toggle('hidden')
		})
// LOGOUT BUTTON
		logOutBtn.addEventListener('click', () => {
				logOutForm.submit()
		})
// DYNAMIC TASKS
		document.addEventListener('DOMContentLoaded', () => {
				console.log('Battlegrounds page loaded')
				document.querySelector('.battle').classList.toggle('active')
				document.querySelector('.battle').classList.toggle('inactive')
				document.querySelector('.battle-tasks').classList.toggle('hidden')
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
								modalOverlay.classList.toggle('hidden')
								taskModal.classList.toggle('hidden')
						})
				})
				document.querySelectorAll('.task').forEach(taskElement => {
						taskElement.addEventListener('click', () => {
								console.log('task click fired')
								taskElement.classList.toggle('complete')
								taskElement.classList.toggle('not-complete')
								console.log('task class changed')
						})
				})
		})
})()



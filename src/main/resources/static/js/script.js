(() => {

		const battleIcon = document.querySelector('.battle-icon')
		const battleSlideOut = document.querySelector('.battle-slide-out')
		const addBattleWrap = document.querySelector('.add-battle-wrap')
		const addBattleInput = document.querySelector('.add-battle-input')
		const addBattleBtn = document.querySelector('.add-battle-btn')
		const taskModal = document.querySelector('.task-modal')
		const openTaskModal = document.querySelector('.new-task-wrap')
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
		openTaskModal.addEventListener('click', e => {
				modalOverlay.classList.toggle('hidden')
				taskModal.classList.toggle('hidden')
		})
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
				document.querySelectorAll('.battle').forEach(function (battleElement, idx){
						battleElement.addEventListener('click', function (e) {
								battleElement.classList.toggle('active')
								battleElement.classList.toggle('inactive')
								console.log('battle class toggled')

								const battles = document.querySelectorAll('.battle')
								const battleTasks = document.querySelectorAll('.battle-tasks')

								if (battles[idx].classList.contains('active')) {
										battleTasks[idx].classList.remove('hidden')
								}
								if (battles[idx].classList.contains('inactive')) {
										battleTasks[idx].classList.add('hidden')
								}
						})

						//
						// battleElement.addEventListener('click', function () {
						// 		console.log('second click event fired')
						// 		const battleTasks = document.querySelector('.battle-tasks')
						// 		if (battleElement.classList.contains('active')) {
						// 				battleTasks.classList.remove('hidden')
						// 				console.log('hidden class removed')
						// 		}
						// 		if (battleElement.classList.contains('inactive')) {
						// 				battleTasks.classList.add('hidden')
						// 				console.log('hidden class added')
						// 		}
						// })
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


// const battles = document.querySelectorAll('.battle')
// const battleTasks = document.querySelectorAll('.battle-tasks')
// for (let i = 0; i <= battles.length; i++) {
// 		for (let j = 0; i <= battleTasks.length; j++) {
// 				if (battles[i].classList.contains('active')) {
// 						battleTasks[j].classList.remove('hidden')
// 				} else {
// 						battleTasks[j].classList.add('hidden')
// 				}
// 		}
// }




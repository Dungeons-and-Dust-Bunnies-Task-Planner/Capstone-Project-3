(() => {

		const battleIcon = document.querySelector('.battle-icon')
		const battleSlideOut = document.querySelector('.battle-slide-out')
		// const battlesList = document.querySelector('.battles-list')
		// const battleCheckbox = document.querySelector('.battle-checkbox')
		// const battleText = document.querySelector('.battle-text')
		const addBattleWrap = document.querySelector('.add-battle-wrap')
		const addBattleInput = document.querySelector('.add-battle-input')
		const addBattleBtn = document.querySelector('.add-battle-btn')
		const taskModal = document.querySelector('.task-modal')
		const battleTasks = document.querySelector('.tasks-list')
		const task = document.querySelectorAll('.task')
		const battle = document.querySelector('.battle')
		const modalOverlay = document.querySelector('.modal-overlay')
		const openTaskModal = document.querySelector('.new-task-wrap')
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
				document.querySelectorAll('.task').forEach(el => {
						el.addEventListener('click', () => {
								el.classList.toggle('complete')
								el.classList.toggle('not-complete')
						})
				})
		})
})()






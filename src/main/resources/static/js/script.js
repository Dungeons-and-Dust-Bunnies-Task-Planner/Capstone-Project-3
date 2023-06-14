// (() => {
//
// 		const battleIcon = document.querySelector('.battle-icon')
// 		const battleSlideOut = document.querySelector('.battle-slide-out')
// 		const addBattleWrap = document.querySelector('.add-battle-wrap')
// 		const addBattleInput = document.querySelector('.add-battle-input')
// 		const addBattleBtn = document.querySelector('.add-battle-btn')
// 		const taskModal = document.querySelector('.task-modal')
// 		const modalOverlay = document.querySelector('.modal-overlay')
// 		const slideOutOverlay = document.querySelector('.slide-out-overlay')
// 		const logOutForm = document.querySelector('.logout-form')
// 		const logOutBtn = document.querySelector('.logout-btn')
//
//
// /////////////////////
// // FUNCTIONS
// /////////////////////
// 		const checkForClassValue = (element, className) => {
// 				return element.classList.contains(className)
// 		}
//
// 		const updateBattleStatus = (battleId, battleStatus) => {
// 				let url
//
// 				if (battleStatus === 'active') {
// 						url = `/battlegrounds/battle/ ${battleId}/deactivate`
// 				} else if (battleStatus === 'inactive') {
// 						url = `/battlegrounds/battle/${battleId}/activate`
// 				} else {
// 						return
// 				}
// 				try {
// 						fetch(url, {
// 								method: 'POST',
// 								headers: {
// 										'Content-Type': 'application/json'
// 								}
// 						})
// 								.then(function (response) {
// 										// Handle the response from the server if needed
// 										console.log('Battle status updated successfully')
// 								})
// 								.catch(function (error) {
// 										// Handle errors if any
// 										console.error(error)
// 								})
// 				} catch (error) {
// 						console.error(error)
// 				}
// 		}
//
// /////////////////////
// // EVENT LISTENERS
// /////////////////////
//
// // BATTLE ICON
// 		battleIcon.addEventListener('click', e => {
// 				e.preventDefault()
// 				battleSlideOut.classList.toggle('open')
// 				slideOutOverlay.classList.toggle('hidden')
// 		})
//
// // SLIDEOUT OVERLAY
// 		slideOutOverlay.addEventListener('click', e => {
// 				slideOutOverlay.classList.toggle('hidden')
// 				battleSlideOut.classList.toggle('open')
// 		})
//
// // ADD BATTLE BUTTON
// 		addBattleBtn.addEventListener('click', () => {
// 				addBattleWrap.classList.toggle('active')
// 				addBattleInput.focus()
// 		})
// // OPEN TASK MODAL
//
// // MODAL OVERLAY CLICK EVENT
// 		modalOverlay.addEventListener('click', e => {
// 				modalOverlay.classList.toggle('hidden')
// 				taskModal.classList.toggle('hidden')
// 		})
// // LOGOUT BUTTON
// 		logOutBtn.addEventListener('click', () => {
// 				logOutForm.submit()
// 		})
// // DYNAMIC TASKS
// 		document.addEventListener('DOMContentLoaded', () => {
// 				console.log('Battlegrounds page loaded')
// 				document.querySelector('.battle').classList.toggle('active')
// 				document.querySelector('.battle').classList.toggle('inactive')
// 				document.querySelector('.battle-tasks').classList.toggle('hidden')
// 				document.querySelectorAll('.battle').forEach(function (battleElement, idx) {
// 						battleElement.addEventListener('click', function (e) {
// 								battleElement.classList.toggle('active')
// 								battleElement.classList.toggle('inactive')
// 								const battles = document.querySelectorAll('.battle')
// 								const battleTasks = document.querySelectorAll('.battle-tasks')
// 								if (battles[idx].classList.contains('active')) {
// 										battleTasks[idx].classList.remove('hidden')
// 								}
// 								if (battles[idx].classList.contains('inactive')) {
// 										battleTasks[idx].classList.add('hidden')
// 								}
// 						})
// 				})
// 				document.querySelectorAll('.new-task-wrap').forEach(openModalElement => {
// 						openModalElement.addEventListener('click', e => {
// 								modalOverlay.classList.toggle('hidden')
// 								taskModal.classList.toggle('hidden')
// 						})
// 				})
// 				document.querySelectorAll('.task').forEach(taskElement => {
// 						taskElement.addEventListener('click', () => {
// 								console.log('task click fired')
// 								taskElement.classList.toggle('complete')
// 								taskElement.classList.toggle('not-complete')
// 								console.log('task class changed')
// 						})
// 				})
// 				const battleElements = document.querySelectorAll('.task.not-complete')
// 				battleElements.forEach(function (battleElement) {
// 						battleElement.addEventListener('click', function () {
// 								const battleId = battleElement.getAttribute('data-battle-id')
// 								const battleStatus = battleElement.getAttribute('data-battle-status')
// 								updateBattleStatus(battleId, battleStatus)
// 						})
// 				})
// 		})
//
// 		// Get the task form and the update elements selector
// const taskForm = document.querySelector('.task-modal form');
// const updateElementsSelector = taskForm.querySelector('[data-update-elements]').dataset.updateElements;
//
// // Add a submit event listener to the task form
// taskForm.addEventListener('submit', function(event) {
//   event.preventDefault();
//   const formData = new FormData(taskForm);
//
//   // Perform the AJAX request to update the database
//   fetch(taskForm.action, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams(formData)
//   })
//   .then(function(response) {
//     // Handle the response from the server if needed
//     console.log('Task created successfully');
//
//     // Update the corresponding elements in the DOM
//     const updateElements = document.querySelectorAll(updateElementsSelector);
//     updateElements.forEach(element => {
//       // Update the element content or perform any other necessary modifications
//       element.textContent = formData.get('task-body');
//     });
//   })
//   .catch(function(error) {
//     // Handle errors if any
//     console.error(error);
//   });
// });
//
//
// })()
//
// // // @Controller
// // // public class MyController {
// //
// // @PostMapping('/battlegrounds/battle/{id}/activate')
// // @ResponseBody
// // public
// // ResponseEntity < String > activateBattle(@PathVariable('id')
// // Long
// // battleId
// // )
// // {
// // 		// Update the battle's status as active in the database based on the provided ID
// // 		// Return an appropriate response
// // 		return ResponseEntity.ok('Battle activated successfully')
// // }
// //
// // @PostMapping('/battlegrounds/battle/{id}/deactivate')
// // @ResponseBody
// // public
// // ResponseEntity < String > deactivateBattle(@PathVariable('id')
// // Long
// // battleId
// // )
// // {
// // 		// Update the battle's status as inactive in the database based on the provided ID
// // 		// Return an appropriate response
// // 		return ResponseEntity.ok('Battle deactivated successfully')
// // }
// //
// // // Other controller methods if needed
// // }

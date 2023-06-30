;(async () => {
	// CHAT GPT API KEY
	const apiKey = openAiKey;
	// DOM ELEMENTS
	const alertOverlay = document.querySelector('.alert-overlay');
	const battleIcon = document.querySelector('.battle-icon');
	const battleIconBanner = document.querySelector('.battle-icon-banner');
	const battleIconBannerText = document.querySelector(
			'.battle-icon-banner-text'
	);
	// BATTLES
	const battleSlideOut = document.querySelector('.battle-slide-out');
	// CREATE BATTLE
	const createBattleForm = document.querySelector('.create-battle-form');
	const createBattleInput = document.querySelector('.create-battle-input');
	const createBattleBtn = document.querySelector('.create-battle-btn');
	// SHOW BATTLE
	const battlesList = document.querySelector('.battles-list');
	const battle = document.querySelectorAll('.battle');
	const battleTitle = document.querySelectorAll('.battle-title');

	// TASKS
	const tasks = document.querySelector('.tasks');
	const task = document.querySelectorAll('.task');
	// SHOW TASKSAll
	const tasksList = document.querySelectorAll('.tasks-list');
	const monster = document.querySelector('.monster');
	// HEALTH-BAR
	const healthBar = document.querySelector('.health-bar');
	const healthBarContainer = document.querySelector('.health-bar-container');
	// CUSTOM ALERT
	const customAlert = document.querySelector('.complete-task-alert');

	// FUNCTIONS
	function removeActiveBattles() {
		battle.forEach(battle => {
			battle.classList.add('inactive');
			battle.classList.remove('active');
		});
	}

	function removeActiveTasks() {
		tasksList.forEach(list => {
			list.classList.add('hidden');
		});
	}

	const checkForClass = (element, className) => {
		return element.classList.contains(className);
	};

	async function sendOpenAIRequest(prompt) {
		const apiUrl = "https://api.openai.com/v1/completions";
		const requestBody = {
			prompt: prompt,
			max_tokens: 100,
			model: "text-davinci-003"
		};

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		let data = await response.json();
		console.log(data);
		return data;
	}

	const monsterTalkParent = document.querySelector('.monsterTalkParent');
	let monsterResponse = await sendOpenAIRequest("You are a unclean monster who hates people cleaning! A cleaner attacks you! Respond with a quirky funny answer in only three sentences! you want them to not clean anything!")
	monsterTalkParent.innerHTML = `<h2 class="chatgptFont">${monsterResponse.choices[0].text}</h2>`;

	document.addEventListener('DOMContentLoaded', function () {
		console.log('Dynamic elements loaded'); //DEBUG
		document.querySelectorAll('.battle').forEach((battle, idx) => {
			battle.addEventListener('click', () => {
				// console.log('battle click event fired')
				removeActiveBattles();
				battle.classList.remove('inactive');
				battle.classList.add('active');
				// console.log('e.target click event fired')

				const battles = document.querySelectorAll('.battle');
				const battleTasks = document.querySelectorAll('.tasks-list');
				if (battles[idx].classList.contains('active')) {
					removeActiveTasks();
					battleTasks[idx].classList.remove('hidden');
				}
			});
		});

		const monster = document.querySelector('#monster');
		const numOfTasks = monster.dataset.tasks;
		const numOfCompleteTasks = monster.dataset.complete;

		console.log(numOfTasks);
		console.log(numOfCompleteTasks);

		const calculateMonsterHealth = (numOfTasks, numOfCompleteTasks) => {
			let monsterHealth = 100; // 100% health initially
			if (numOfTasks > 0) {
				// To avoid division by zero
				let taskValue = 100 / numOfTasks; // Each task's value percentage
				monsterHealth -= taskValue * numOfCompleteTasks; // Calculate health based on completed tasks
			}
			return monsterHealth;
		};

		let monsterHealth = calculateMonsterHealth(numOfTasks, numOfCompleteTasks);
		const healthBar = document.querySelector('.health-bar');
		healthBar.style.width = `${monsterHealth}%`;
	});

	// EVENT LISTENERS
	battleIcon.addEventListener('click', () => {
		battleSlideOut.classList.toggle('open');
		if (battleSlideOut.classList.contains('open')) {
			battleIconBannerText.textContent = ' << Show Tasks!';
		} else {
			battleIconBannerText.textContent = ' << Show Battles!';
		}
	});

	alertOverlay.addEventListener('click', () => {
		alertOverlay.classList.add('hidden');
		customAlert.classList.add('hidden');
	});

	task.forEach(task => {
		const taskId = task.dataset.taskId;
		const taskComplete = task.dataset.taskComplete;
		const tasksBattleTitle = task.querySelector('.tasks-battle-title');
		const taskBody = task.querySelector('.task-body');
		const completeTaskForm = task.querySelector('.complete-task-form');
		const openEditBtn = task.querySelector('.open-edit-task-btn');
		const openEditBtnImg = task.querySelector('.open-edit-task-btn-img');
		const editTaskForm = task.querySelector('.edit-task-form');
		const editTaskInput = task.querySelector('.edit-task-input');
		const editTaskSubmitBtn = task.querySelector('.edit-task-submit-btn');
		const deleteTaskBtn = task.querySelector('.delete-task-btn');
		const deleteTaskBtnImg = task.querySelector('.delete-task-btn-img');
		const deleteTaskForm = task.querySelector('.delete-task-form');
		const createTaskForm = task.querySelector('.create-task-form');
		const createTaskInput = task.querySelector('.create-task-input');
		const createTaskBtn = task.querySelector('.create-task-btn');
		const createTaskBtnImg = task.querySelector('.create-task-btn-img');
		//CUSTOM ALERT
		const customAlert = task.querySelector('.complete-task-alert');
		const alertTitle = task.querySelector('.alert-title');
		const cancelBtn = task.querySelector('.cancel-btn');
		const confirmBtn = task.querySelector('.confirm-btn');

		openEditBtn.addEventListener('click', function () {
			task.classList.toggle('edit');
			taskBody.classList.toggle('edit');
			editTaskInput.classList.toggle('edit');
			deleteTaskBtn.classList.toggle('edit');
			openEditBtn.classList.toggle('edit');
			if (openEditBtn.classList.contains('edit')) {
				openEditBtnImg.src = '/images/green-x.png';
			} else {
				openEditBtnImg.src = '/images/green-edit.png';
			}
			editTaskSubmitBtn.classList.toggle('edit');
		});

		editTaskForm.addEventListener('submit', () => {
			taskBody.classList.toggle('edit');
			editTaskInput.classList.toggle('edit');
			deleteTaskBtn.classList.toggle('edit');
			openEditBtn.classList.toggle('edit');
			openEditBtnImg.src = '/images/green-edit.png';
			editTaskSubmitBtn.classList.toggle('edit');
		});

		taskBody.addEventListener('click', () => {
			customAlert.classList.remove('hidden');
			alertOverlay.classList.remove('hidden');
			alertTitle.textContent = taskBody.classList.contains('not-complete') ? 'Are you ready to complete this task?' : 'Are you sure you want to reactivate this task?';
		});

		cancelBtn.addEventListener('click', e => {
			e.preventDefault();
			alertOverlay.click();
			customAlert.classList.add('hidden');

		});

		confirmBtn.addEventListener('click', e => {
			e.preventDefault();
			alertOverlay.click();
			completeTaskForm.submit();
		});

		deleteTaskForm.addEventListener('submit', () => {
			taskBody.classList.toggle('edit');
			editTaskInput.classList.toggle('edit');
			deleteTaskBtn.classList.toggle('edit');
			openEditBtn.classList.toggle('edit');
			openEditBtnImg.src = '/images/green-edit.png';
			editTaskSubmitBtn.classList.toggle('edit');
		});

		deleteTaskBtn.addEventListener('click', () => {
			deleteTaskForm.submit();
		});
	});
})();

// editTaskSubmitBtn.addEventListener('click', (e) => {
//     editTaskForm.submit()
// })
// const numOfTasks = document.querySelectorAll('.task').length;
// const monsterDamage = (numOfTasks) => {
//     const healthBar = document.querySelector('.health-bar');
//     console.log(numOfTasks)
//     const damageOutput = (100 / numOfTasks).toFixed(2);
//     console.log(damageOutput)
//     healthBar.style.width = `100 - ${damageOutput} * numOfTasks%`
//     console.log(healthBar.style.width)
// }
// const completeTask = async (taskId) => {
//     try {
//         let url = `/task/complete-task?taskId=${taskId}`;
//         let options = {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         let response = await fetch(url, options);
//         let data = await response.json();
//         console.log(data)
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// };

// ----------------------------------------------------------------------------------------------------
// Rest Controller db interaction ---------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// This function will be executed when the form is submitted.
// document.getElementById('taskForm').addEventListener('submit', async function (event) {
//     // Prevent the form from being submitted to the server.
//     event.preventDefault();
//
//     // Get the value of the taskId input.
//     let taskId = document.querySelector('#taskId').value;
//     let battleId = document.querySelector('#battleId').value;
//     const tasksParent = document.querySelector("#tasks");
//     console.log("task id:")
//     console.log(taskId)
//
//     await completeTask(taskId);
//     let tasks = await getTaskList(battleId);
//     renderTaskList(tasks, tasksParent);
// });

// console.log(`damageOutput: ${damageOutput}`)
// const newHealth = currentHealth - parseFloat(damageOutput);
// console.log(`newHealth: ${newHealth}`)
// healthBar.style.width = `${newHealth}%`;
// let healthBarWidth = healthBar.style.width
// console.log(`healthBarWidth: ${healthBarWidth}`)
// console.log(`healthBar.style.width: ${healthBar.style.width}`);
// }
// monsterDamage(numOfTasks);
// // await completeTask(taskId, isComplete)
// })
//
// editTaskSubmitBtn.addEventListener('click', (e) => {
//     editTaskForm.submit()
// })
// })

// const numOfTasks = document.querySelectorAll('.task').length;
// const monsterDamage = (numOfTasks) => {
//     const healthBar = document.querySelector('.health-bar');
//     console.log(numOfTasks)
//     const damageOutput = (100 / numOfTasks).toFixed(2);
//     console.log(damageOutput)
//     healthBar.style.width = `100 - ${damageOutput} * numOfTasks%`
//     console.log(healthBar.style.width)
// }
// const completeTask = async (taskId) => {
//     try {
//         let url = `/task/complete-task?taskId=${taskId}`;
//         let options = {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         let response = await fetch(url, options);
//         let data = await response.json();
//         console.log(data)
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// };
// })
// ()

//----------------- monster image JS ----------------

// ----------------------------------------------------------------------------------------------------
// Rest Controller db interaction ---------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// This function will be executed when the form is submitted.
// document.getElementById('taskForm').addEventListener('submit', async function (event) {
//     // Prevent the form from being submitted to the server.
//     event.preventDefault();
//
//     // Get the value of the taskId input.
//     let taskId = document.querySelector('#taskId').value;
//     let battleId = document.querySelector('#battleId').value;
//     const tasksParent = document.querySelector("#tasks");
//     console.log("task id:")
//     console.log(taskId)
//
//     await completeTask(taskId);
//     let tasks = await getTaskList(battleId);
//     renderTaskList(tasks, tasksParent);
// });

// function completeTask(taskId, isComplete) {
//     // const csrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)[1];
//     // const csrfToken = document.getElementById('csrfToken').value;
//     const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content')
//     console.log(csrfToken)
//     fetch('/battlegrounds/complete-task', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Origin': 'http://localhost:8080',
//             'X-CSRF-TOKEN': csrfToken
//         },
//         credentials: 'include',
//         body: JSON.stringify({taskID: taskId, isComplete: isComplete})
//     })
//         .catch(error => console.log('Error:', error));
// }

// const completeTask = async (taskId, isComplete) => {
//     try{
//         const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content')
//         console.log(csrfToken)
//
//         const res = await fetch('/battlegrounds/complete-task', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRF-TOKEN': csrfToken
//             },
//             credentials: 'include',
//             body: JSON.stringify({taskId: taskId, isComplete: isComplete})
//         })
//
//         if(!res.ok) {
//             throw new Error(`HTTP error status: ${res.status}`)
//         }
//
//         const data = await res.json()
//         console.log(data)
//
//     } catch (e) {
//         console.log("Error:", e.message)
//     }
// }

// function completeTask(taskId, isComplete) {
//     // const csrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)[1];
//     // const csrfToken = document.getElementById('csrfToken').value;
//     const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content')
//     console.log(csrfToken)
//     fetch('/battlegrounds/complete-task', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Origin': 'http://localhost:8080',
//             'X-CSRF-TOKEN': csrfToken
//         },
//         credentials: 'include',
//         body: JSON.stringify({taskID: taskId, isComplete: isComplete})
//     })
//         .catch(error => console.log('Error:', error));
// }

// const completeTask = async (taskId, isComplete) => {
//     try{
//         const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content')
//         console.log(csrfToken)
//
//         const res = await fetch('/battlegrounds/complete-task', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRF-TOKEN': csrfToken
//             },
//             credentials: 'include',
//             body: JSON.stringify({taskId: taskId, isComplete: isComplete})
//         })
//
//         if(!res.ok) {
//             throw new Error(`HTTP error status: ${res.status}`)
//         }
//
//         const data = await res.json()
//         console.log(data)
//
//     } catch (e) {
//         console.log("Error:", e.message)
//     }
// }

// await completeTask(taskId, isComplete)

// const numOfTasks = document.querySelectorAll('.task').length;

// const monsterDamage = (numOfTasks) => {
//     console.log(`There are - ${numOfTasks} - tasks`)
//     console.log(monsterHealth)
//     healthBar.style.width = monsterHealth
//     console.log(`This is the healthBar width: ` + healthBar.style.width)
//     const damageOutput = (100 / numOfTasks).toFixed(2);
//     console.log(`This is the damageOutput: ${damageOutput}`)
//     const newHealth = parseFloat(monsterHealth) - parseFloat(damageOutput);
//     console.log(`This is the value of newHealth: ${newHealth}`)
//     healthBar.style.width = `${newHealth}%`;
//     console.log(`This is the remaining healthBar width: ${healthBar.style.width}`)
//     return monsterHealth = newHealth
// }
// monsterDamage(numOfTasks);

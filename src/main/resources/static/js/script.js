(async () => {
	// CHAT GPT API KEY
	const apiKey = openAiKey;
	// DOM ELEMENTS
	const alertOverlay = document.querySelector('.alert-overlay');
	const battleIcon = document.querySelector('.battle-icon');
	const battleIconBannerText = document.querySelector('.battle-icon-banner-text');
	// BATTLES
	const battleSlideOut = document.querySelector('.battle-slide-out');
	const battle = document.querySelectorAll('.battle');
	// TASKS
	const task = document.querySelectorAll('.task');
	// SHOW TASKSAll
	const tasksList = document.querySelectorAll('.tasks-list');
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
	const healthBar = document.querySelector('.health-bar');
	let monsterHealth = calculateMonsterHealth(numOfTasks, numOfCompleteTasks);
	healthBar.style.width = `${monsterHealth}%`;

	async function sendOpenAIRequest(prompt) {
		const apiUrl = 'https://api.openai.com/v1/completions';
		const requestBody = {
			prompt: prompt,
			max_tokens: 100,
			model: 'text-davinci-003'
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
	let monsterResponse = await sendOpenAIRequest('You are a unclean monster who hates people cleaning! A cleaner attacks you! Respond with a quirky funny answer in only three sentences! you want them to not clean anything!');
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
		const taskBody = task.querySelector('.task-body');
		const completeTaskForm = task.querySelector('.complete-task-form');
		const openEditBtn = task.querySelector('.open-edit-task-btn');
		const openEditBtnImg = task.querySelector('.open-edit-task-btn-img');
		const editTaskForm = task.querySelector('.edit-task-form');
		const editTaskInput = task.querySelector('.edit-task-input');
		const editTaskSubmitBtn = task.querySelector('.edit-task-submit-btn');
		const deleteTaskBtn = task.querySelector('.delete-task-btn');
		const deleteTaskForm = task.querySelector('.delete-task-form');
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


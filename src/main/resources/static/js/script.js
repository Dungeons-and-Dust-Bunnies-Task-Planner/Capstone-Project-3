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
    const tasksList = document.querySelectorAll('.tasks-list')
    const monster = document.querySelector('.monster')

// FUNCTIONS
    function removeActiveBattles() {
        battle.forEach(battle => {
            battle.classList.add('inactive')
            battle.classList.remove('active')
        })
    }

    function removeActiveTasks() {
        tasksList.forEach(list => {
            list.classList.add('hidden')
        })
    }


    document.addEventListener('DOMContentLoaded', function () {
        console.log('Dynamic elements loaded') //DEBUG
        document.querySelectorAll('.battle').forEach((battle, idx) => {
            battle.addEventListener('click', () => {
                // console.log('battle click event fired')
                removeActiveBattles()
                battle.classList.remove('inactive')
                battle.classList.add('active')
                // console.log('e.target click event fired')

                const battles = document.querySelectorAll('.battle')
                const battleTasks = document.querySelectorAll('.tasks-list')
                if (battles[idx].classList.contains('active')) {
                    removeActiveTasks()
                    battleTasks[idx].classList.remove('hidden')
                }
            })
        })

        document.querySelectorAll('.task').forEach(task => {
            task.addEventListener('click', (e) => {
                console.log('task click event fired') //DEBUG
                task.classList.toggle('complete')
                task.classList.toggle('not-complete')
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

    // ----------------------------------------------------------------------------------------------------
    // Rest Controller db interaction ---------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------
    // This function will be executed when the form is submitted.
    document.getElementById('taskForm').addEventListener('submit', function(event) {
        // Prevent the form from being submitted to the server.
        event.preventDefault();

        // Get the value of the taskId input.
        let taskId = document.getElementById('taskId').value;

        completeTask(taskId);
    });

// Here is your completeTask function which sends the request to the server.
    function completeTask(taskId) {
        fetch('/battlegrounds/complete-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `taskId=${taskId}`
        })
            .then(response => response.json())
            .then(task => {
                // Assuming that task status is shown in  HTML element with id 'taskStatus'
                document.getElementById('taskStatus').innerText = task.status;
                console.log(task.status);
            })
            .catch(error => console.error('Error:', error));
    }

})()

//----------------- monster image JS ----------------




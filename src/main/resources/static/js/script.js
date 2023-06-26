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

        let hitBtn = document.querySelector('.damage'),
            hBar = document.querySelector('.health-bar'),
            bar = hBar.querySelector('.bar'),
            hit = hBar.querySelector('.hit');

        hitBtn.addEventListener("click", function(){
            let total = Number(hBar.getAttribute('data-total')),
                value = Number(hBar.getAttribute('data-value'));

            let fractional = value / 1000;
            let damage = fractional * 1000 - total;
            let newValue = value - damage;
            let barWidth = (newValue / total) * 100;
            let hitWidth = (damage / value) * 100 + "%";

            hit.style.width = hitWidth;
            hBar.setAttribute('data-value', newValue);

            setTimeout(function(){
                hit.style.width = '0';
                bar.style.width = barWidth + "%";
            }, 500);

        });

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
        const openEditBtnImg = document.querySelector('.open-edit-task-btn-img')
        const editTaskForm = task.querySelector('.edit-task-form')
        const editTaskInput = task.querySelector('.edit-task-input')
        const deleteTaskBtn = task.querySelector('.delete-task-btn')
        const deleteTaskBtnImg = document.querySelector('.delete-task-btn-img')
        const deleteTaskForm = task.querySelector('.delete-task-form')
        const createTaskForm = task.querySelector('.create-task-form')
        const createTaskInput = task.querySelector('.create-task-input')
        const createTaskBtn = task.querySelector('.create-task-btn')
        const createTaskBtnImg = document.querySelector('.create-task-btn-img')

        task.addEventListener('click', () => {
            task.classList.toggle('complete')
        })

        openEditBtn.addEventListener('click', function () {
            task.classList.toggle('edit')
            taskBody.classList.toggle('edit')
            editTaskInput.classList.toggle('edit')
            deleteTaskBtn.classList.toggle('edit')
            openEditBtn.classList.toggle('edit')
            if (openEditBtn.classList.contains('edit')) {
            openEditBtnImg.src = "/images/green-x.png"
            } else {
                openEditBtnImg.src = "/images/green-edit.png"
            }
            completeTaskBtn.classList.toggle('edit')
        })

        editTaskForm.addEventListener('submit', () => {
            taskBody.classList.toggle('edit')
            editTaskInput.classList.toggle('edit')
            deleteTaskBtn.classList.toggle('edit')
            openEditBtn.classList.toggle('edit')
            openEditBtnImg.src = "/images/green-edit.png"
            completeTaskBtn.classList.toggle('edit')
        })

        deleteTaskForm.addEventListener('submit', () => {
            taskBody.classList.toggle('edit')
            editTaskInput.classList.toggle('edit')
            deleteTaskBtn.classList.toggle('edit')
            openEditBtn.classList.toggle('edit')
            openEditBtnImg.src = "/images/green-edit.png"
            completeTaskBtn.classList.toggle('edit')
        })

        deleteTaskBtn.addEventListener('click', () => {
            deleteTaskForm.submit()
        })
    })

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

// Here is your completeTask function which sends the request to the server.
    const completeTask = async (taskId) => {
        try {
            let url = `/task/complete-task?taskId=${taskId}`;
            let options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let response = await fetch(url, options);
            let data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // const getTaskList = async (battleId) => {
    //     try {
    //         let url = `/task/task-list?battleId=${battleId}`;
    //         let options = {
    //             method: 'GET',
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
    //
    // const renderTaskList = (tasks, parent) => {
    //     parent.innerHTML = '';
    //     const element1 = document.createElement('section');
    //     element1.classList.add("tasks");
    //     const element2 = document.createElement('ul');
    //     element2.classList.add("tasks-list");
    //     tasks.forEach(task => {
    //         element2.innerHTML = `
    //         <h2 class="tasks-battle-title">${task.battleId.title}</h2>
    //
    //       <!--          TASK-->
    //       <li class="task not-complete">
    //         <!--              ADD COMPLETE TO THE CLASS FOR PRODUCTION SO THAT ONLY ONE OR THE OTHER SHOWS-->
    //         <p class="task-body">${task.taskBody}</p>
    //         <!--              <p class="task-body not-complete" th:unless="${task.taskComplete == 0}" th:text="${task.taskBody}"></p>-->
    //
    //         <!--            COMPLETE TASK FORM-->
    //         <form action="/task/complete-task" method="post" id="taskForm">
    //           <input type="hidden" name="taskId" id="taskId" value="${task.id}">
    //           <button class="hit damage" type="submit" style="z-index: 99; display: block; position: absolute;" >complete task</button>
    //         </form>
    //
    //         <!--            EDIT TASK FORM-->
    //         <form class="edit-task-form" action="/battlegrounds/edit-task-body" method="post">
    //           <input type="hidden" name="taskId" value="${task.id}">
    //           <input class="edit-task-input" type="text" name="editTaskBody"
    //                  value="${task.taskBody}">
    //           <button class="edit-task-submit-btn" type="submit">Edit task</button>
    //         </form>
    //
    //         <!--            DELETE TASK FORM-->
    //         <form class="delete-task-form" action="/battlegrounds/delete-task" method="post">
    //           <input type="hidden" name="taskId" value="${task.id}">
    //           <button class="delete-task-btn" type="submit">Delete</button>
    //         </form>
    //         <button class="open-edit-task-btn" type="button">
    //           <img src="/images/green-edit.png" alt="icon" class="open-edit-task-btn-img">
    //         </button>
    //       </li>
    //
    //       <!--            CREATE TASK FORM-->
    //       <li class="create-task-form-li">
    //         <form class="create-task-form" th:action="@{/battlegrounds/create-task}" th:method="post">
    //           <input type="hidden" name="battleId" th:value="${battle.id}" id="battleId">
    //           <input class="create-task-input" type="text" name="taskBody" placeholder="Create new task">
    //           <button class="create-task-btn" type="submit">Create task</button>
    //         </form>
    //       </li>
    //     </ul>
    //   </section>
    //         `;
    //         parent.appendChild(element1);
    //         element1.appendChild(element2);
    //     })
    // };
    // ------------------------------------------health bar---------------------------------------------

})()

//----------------- monster image JS ----------------




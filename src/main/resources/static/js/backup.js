(() => {
    const battleIcon = document.querySelector('.battle-icon')
    const battleSlideOut = document.querySelector('.battle-slide-out')
    const addBattleWrap = document.querySelector('.add-battle-wrap')
    const addBattleInput = document.querySelector('.add-battle-input')
    const addBattleBtn = document.querySelector('.add-battle-btn')
    const taskModal = document.querySelector('.task-modal')
    const modalOverlay = document.querySelector('.modal-overlay')
    const slideOutOverlay = document.querySelector('.slide-out-overlay')
    const logOutForm = document.getElementById("logOutForm");
    const logOutButton = document.getElementById("logOutButton");


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

    // logOutButton.addEventListener('click', () => {
    // 	logOutForm.submit();
    // })

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

// async function sendOpenAIRequest(prompt) {
//     const apiUrl = "https://api.openai.com/v1/completions";
//     const requestBody = {
//         prompt: prompt,
//         max_tokens: 100,
//         model: "text-davinci-003"
//     };
//
//     const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${apiKey}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//     });
//
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     let data = await response.json();
//     console.log(data);
//     return data;
// }
//
// const monsterTalkParent = document.querySelector('.monsterTalkParent');
// let monsterResponse = await sendOpenAIRequest("You are a unclean monster who hates people cleaning! A cleaner attacks you! Respond with a quirky funny answer in only three sentences! you want them to not clean anything!")
// monsterTalkParent.innerHTML = `<h2>${monsterResponse.choices[0].text}</h2>`;

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

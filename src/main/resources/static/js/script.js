(() => {

// DOM ELEMENTS
    const task = document.querySelectorAll('.task')
    const monster = document.querySelector('.monster')
    const healthBar = document.querySelector('.health-bar')


    const completedTasks = [];
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM content loaded')
        task.forEach(task => {
                // TASK ELEMENTS
                const taskBody = task.querySelector('.task-body')
                const openEditBtn = task.querySelector('.open-edit-task-btn')
                const openEditBtnImg = task.querySelector('.open-edit-task-btn-img')
                const editForm = task.querySelector('.edit-task-form')
                const editInput = task.querySelector('.edit-task-input')
                const submitBtn = task.querySelector('.edit-task-submit-btn')
                const deleteForm = task.querySelector('.delete-task-form')
                const deleteBtn = task.querySelector('.delete-task-btn')
                const completeTaskBtn = task.querySelector('.complete-task-btn')

                // TASK VARIABLES
                const taskId = task.dataset.taskId
                console.log(taskId)
                const isComplete = task.dataset.taskComplete
                console.log(isComplete)

                // TASK FUNCTIONS
                isComplete === '1' ? completedTasks.push(taskId) && taskBody.classList.remove('incomplete') && taskBody.classList.add('complete') : ''

                // TASK EVENT LISTENERS
                openEditBtn.addEventListener('click', e => {
                    console.log('open edit button clicked')
                    e.preventDefault()
                    editInput.classList.toggle('edit')
                    deleteBtn.classList.toggle('edit')
                    openEditBtn.classList.toggle('edit')
                    openEditBtn.classList.contains('edit') ? openEditBtnImg.src = '/images/green-x.png' : openEditBtnImg.src = '/images/green-edit.png'
                    submitBtn.classList.toggle('edit')
                })

                editForm.addEventListener('submit', () => {
                    console.log('edit form submitted')
                    editInput.classList.toggle('edit')
                    deleteBtn.classList.toggle('edit')
                    openEditBtn.classList.toggle('edit')
                    openEditBtnImg.src = '/images/green-edit.png'
                    submitBtn.classList.toggle('edit')
                })

                deleteBtn.addEventListener('click', () => {
                    console.log('delete button clicked')
                    deleteForm.submit()
                })

                taskBody.addEventListener('click', () => {
                    completeTaskBtn.click()
                })

                console.log(completedTasks)
                return completedTasks
            }
        )

// VARIABLES



// VARIABLES
//         let completedTasksLength = completedTasks.length
//         console.log(`Completed tasks length: ${completedTasksLength}`)
//
//         const numOfTasks = task.length
//         console.log(`Number of tasks: ${numOfTasks}`)
//
//         const taskDamage = (100 / numOfTasks).toFixed(2)
//         console.log(`Task damage: ${taskDamage}`)
//
//         let monsterHealth = 100 - (taskDamage * completedTasksLength)



        // const calculateHealthBar = (completedTasksLength) => {
        //     monsterHealth = `${(monsterHealth) - (taskDamage * completedTasksLength)}%`
        //     return monsterHealth
        // }
        // healthBar.style.width = `${monsterHealth}%`
        // console.log(`healthBar width after calculate damage: ${healthBar.style.width}`)
    })
})()
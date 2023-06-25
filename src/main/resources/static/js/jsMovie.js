const battlesParent = document.querySelector("#battles-list");
const tasksParent = document.querySelector("#tasks");


const getBattleList = async (userId) => {
    try {
        let url = `/battle/battle-list?userId=${userId}`;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
};

document.querySelector("#battle-list-form").addEventListener('submit', function(event) {
    event.preventDefault();
    let userId = document.querySelector('#userId').value;

    // Call the asynchronous function inside an immediately invoked async function
    (async () => {
        try {
            let battles = await getBattleList(userId);
            console.log(battles);
            renderBattleList(battles, battlesParent);
        } catch (error) {
            console.log(error);
        }
    })();
});

const battlesParent = document.querySelector("#battles-list");
const renderBattleList = (battles, parent) => {
    parent.innerHTML='';
    battles.forEach(battle => {
        const element = document.createElement('li');
        element.classList.add("battle", "inactive");
        element.innerHTML = `
            <h3 class="battle-title">${battle.title}</h3>

            <!--              EDIT BATTLE FORM-->
            <form class="edit-battle-form" th:action="@{/battlegrounds/edit-battle-title}" th:method="post">
              <input type="hidden" th:value="${battle.id}" name="battleId">
              <input class="edit-battle-input" th:value="${battle.title}" name="battleTitle">
              <button class="edit-battle-btn" type="submit">Change Battle Name</button>
            </form>

            <!--              DELETE BATTLE FORM-->
            <form class="delete-battle-form" th:action="@{/battlegrounds/delete-battle}" th:method="post">
              <input type="hidden" th:value="${battle.id}" name="battleId">
              <button class="delete-battle-btn" type="submit">Delete Battle</button>
            </form>
            <button class="open-edit-battle-btn" type="button">
              <img class="open-edit-battle-btn-img" src="/images/green-edit.png" alt="icon">
            </button>
          </li>
          <li>

            <!--            CREATE BATTLE FORM-->
            <form class="create-battle-form" th:action="@{/battlegrounds/create-battle}" th:method="post">
              <div class="hidden-form-wrap">
                <input class="create-battle-input" type="text" placeholder="Add your battle..."
                       name="battleTitle"/>
                <button class="create-battle-btn" type="submit">Submit</button>
              </div>
            </form>
    `;
        parent.appendChild(element);
    });
};

document.querySelector("#task-list-form").addEventListener('submit', function (event) {
    event.preventDefault();
    let battleId = document.querySelector('#battleId').value;
    (async () => {
        try {
            let tasks = await getTaskList(battleId);
            console.log(tasks);
            renderTaskList(tasks, tasksParent);
        } catch (error) {
            console.log(error);
        }
    })();
});

const getTaskList = async (battleId) => {
    try {
        let url = `/task/task-list?battleId=${battleId}`;
        let options = {
            method: 'GET',
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

const renderTaskList = (tasks, parent) => {
    parent.innerHTML = '';
    const element1 = document.createElement('section');
    element1.classList.add("tasks");
    const element2 = document.createElement('ul');
    element2.classList.add("tasks-list");
    tasks.forEach(task => {
        element2.innerHTML = `
            <h2 class="tasks-battle-title" th:text="${battle.title}"></h2>

          <!--          TASK-->
          <li class="task not-complete" th:each="task : ${battle.getTasks()}">
            <!--              ADD COMPLETE TO THE CLASS FOR PRODUCTION SO THAT ONLY ONE OR THE OTHER SHOWS-->
            <p class="task-body" th:text="${task.getTaskBody()}"></p>
            <!--              <p class="task-body not-complete" th:unless="${task.getTaskComplete() == 0}" th:text="${task.getTaskBody()}"></p>-->

            <!--            COMPLETE TASK FORM-->
            <form action="/task/complete-task" method="post" id="taskForm">
              <input type="hidden" name="taskId" id="taskId" th:value="${task.getId()}">
              <button class="hit damage" type="submit" style="z-index: 99; display: block; position: absolute;" >complete task</button>
            </form>

            <!--            EDIT TASK FORM-->
            <form class="edit-task-form" th:action="@{/battlegrounds/edit-task-body}" th:method="post">
              <input type="hidden" name="taskId" th:value="${task.getId()}">
              <input class="edit-task-input" type="text" name="editTaskBody"
                     th:value="${task.getTaskBody()}">
              <button class="edit-task-submit-btn" type="submit">Edit task</button>
            </form>

            <!--            DELETE TASK FORM-->
            <form class="delete-task-form" th:action="@{/battlegrounds/delete-task}" th:method="post">
              <input type="hidden" name="taskId" th:value="${task.getId()}">
              <button class="delete-task-btn" type="submit">Delete</button>
            </form>
            <button class="open-edit-task-btn" type="button">
              <img src="/images/green-edit.png" alt="icon" class="open-edit-task-btn-img">
            </button>
          </li>

          <!--            CREATE TASK FORM-->
          <li class="create-task-form-li">
            <form class="create-task-form" th:action="@{/battlegrounds/create-task}" th:method="post">
              <input type="hidden" name="battleId" th:value="${battle.getId()}" id="battleId">
              <input class="create-task-input" type="text" name="taskBody" placeholder="Create new task">
              <button class="create-task-btn" type="submit">Create task</button>
            </form>
          </li>
        </ul>
      </section>
            `;
        parent.appendChild(element1);
        element1.appendChild(element2);
    })
};









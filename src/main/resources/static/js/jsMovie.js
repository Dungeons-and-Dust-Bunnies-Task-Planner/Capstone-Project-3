const battlesParent = document.querySelector("#battles-list");
const tasksParent = document.querySelector("#tasks-list");


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
    tasks.forEach(task => {
        const element = document.createElement('div');
        element.classList.add("column");
        element.innerHTML = `
            <h3>${task.taskBody}</h3>
            `;
        parent.appendChild(element);
    })
};









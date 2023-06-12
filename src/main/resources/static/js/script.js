const battleIcon = document.querySelector('.battle-icon')
const battleSlideOut = document.querySelector('.battle-slide-out')
const battleCheckbox = document.querySelector('.battle-checkbox')
const battleText = document.querySelector('.battle-text')
const addBattleWrap = document.querySelector('.add-battle-wrap')
const addBattleInput = document.querySelector('.add-battle-input')
const addBattleBtn = document.querySelector('.add-battle-btn')
const taskModal = document.querySelector('.task-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const openTaskModal = document.querySelector('.new-task-wrap');
const logOutForm = document.getElementById("logOutForm");
const logOutButton = document.getElementById("logOutButton");


/////////////////////
// EVENT LISTENERS
/////////////////////

// BATTLE ICON
battleIcon.addEventListener('click', e => {
    e.preventDefault()
    battleSlideOut.classList.toggle('open')
})
// BATTLE CHECKBOX
battleCheckbox.addEventListener('click', e => {
    e.preventDefault()
    battleText.style.textDecoration === 'line-through' ? (battleText.style.textDecoration = 'none') && (battleCheckbox.style.background = 'var(--primary)') : (battleText.style.textDecoration = 'line-through') && (battleCheckbox.style.background = '#000')
    battleCheckbox.style.background === 'var(--primary)' ? battleCheckbox.style.boxShadow = 'inset 0 0 8px #000' : battleCheckbox.style.boxShadow = 'inset 0 0 8px var(--primary)'
    console.log('fired')
})
// ADD BATTLE BUTTON
addBattleBtn.addEventListener('click', () => {
    addBattleWrap.classList.toggle('active')
    addBattleInput.focus()
})
// OPEN TASK MODAL
openTaskModal.addEventListener('click', e => {
    modalOverlay.classList.toggle('hidden');
    taskModal.classList.toggle('hidden');
})
// MODAL OVERLAY CLICK EVENT
modalOverlay.addEventListener('click', e => {
    modalOverlay.classList.toggle('hidden');
    taskModal.classList.toggle('hidden')
})
// LOGOUT BUTTON
logOutButton.addEventListener('click', () => {
    logOutForm.submit();
});

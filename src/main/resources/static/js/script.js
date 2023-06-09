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

battleIcon.addEventListener('click', e => {
    e.preventDefault()
    battleSlideOut.classList.toggle('open')
})

battleCheckbox.addEventListener('click', e => {
    e.preventDefault()
    battleText.style.textDecoration === 'line-through' ? (battleText.style.textDecoration = 'none') && (battleCheckbox.style.background = 'var(--primary)') : (battleText.style.textDecoration = 'line-through') && (battleCheckbox.style.background = '#000')
    battleCheckbox.style.background === 'var(--primary)' ? battleCheckbox.style.boxShadow = 'inset 0 0 8px #000' : battleCheckbox.style.boxShadow = 'inset 0 0 8px var(--primary)'
    console.log('fired')
})

addBattleBtn.addEventListener('click', () => {
    addBattleWrap.classList.toggle('active')
    addBattleInput.focus()
})

openTaskModal.addEventListener('click', e => {
    modalOverlay.classList.toggle('hidden');
    taskModal.classList.toggle('hidden');
})

modalOverlay.addEventListener('click', e => {
    modalOverlay.classList.toggle('hidden');
    taskModal.classList.toggle('hidden')
})

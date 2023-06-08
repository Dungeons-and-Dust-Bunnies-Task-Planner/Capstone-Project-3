const battleIcon = document.querySelector('.battle-icon')
const battleSlideOut = document.querySelector('.battle-slide-out')
const battleCheckbox = document.querySelector('.battle-checkbox')
const battleText = document.querySelector('.battle-text')


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
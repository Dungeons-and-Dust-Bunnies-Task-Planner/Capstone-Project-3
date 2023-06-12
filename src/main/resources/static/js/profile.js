const openEditModal = document.querySelector('.editButton')
const editModal = document.querySelector('.edit-modal')
const editModalOverlay = document.querySelector('.edit-modal-overlay');

editModalOverlay.addEventListener('click', e => {
    editModalOverlay.classList.toggle('hidden');
    editModal.classList.toggle('row')
    editModal.classList.toggle('hidden')
})

openEditModal.addEventListener('click', e => {
    e.preventDefault();
    editModal.classList.toggle('hidden')
    editModal.classList.toggle('row')
    editModalOverlay.classList.toggle('hidden')

})
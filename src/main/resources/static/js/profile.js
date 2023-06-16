const openEditModal = document.querySelector('.editButton')
const editModal = document.querySelector('.edit-modal')
const editModalOverlay = document.querySelector('.edit-modal-overlay');
const deleteAccountButton = document.querySelector('.deleteAccount')

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

deleteAccountButton.addEventListener('click', e => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete your profile? This cannot be undone.")) {
        const deleteUrl = '/profile/' + ${id} + '/delete';
        window.location.href = deleteUrl;
    }
});
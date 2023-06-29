const editButtons = document.querySelectorAll('.editBattle');
const editModals = document.querySelectorAll('.editModal');
const editModalOverlays = document.querySelectorAll('.edit-modal-overlay');
// const blur = document.getElementById('battleDiv');
// const editModalOverlay = document.querySelector('.edit-modal-overlay');
const deleteModals = document.querySelectorAll('.delete-confirm-modal');
const cancelDeleteBtns = document.querySelectorAll('#cancel-delete');
const openDeleteBtns = document.querySelectorAll('#delete-confirm-open-btn');

editButtons.forEach((editButton, index) => {
    editButton.addEventListener('click', () => {
        editModals[index].classList.remove('hidden');
        editModalOverlays[index].classList.remove('hidden');
    });
});

editModalOverlays.forEach((modalOverlay, index) => {
    modalOverlay.addEventListener('click', () => {
        editModalOverlays[index].classList.toggle('hidden');
        editModals[index].classList.toggle('hidden');
        if (!deleteModals[index].classList.contains('hidden')){
            deleteModals[index].classList.toggle('hidden');
        }
    });
});

openDeleteBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        deleteModals[i].classList.toggle('hidden');
    })
});

cancelDeleteBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        deleteModals[i].classList.toggle('hidden');
    })
});


const editButtons = document.querySelectorAll('.editBattle');
const editModals = document.querySelectorAll('.editModal');
const editModalOverlays = document.querySelectorAll('.edit-modal-overlay');
const blur = document.getElementById('battleDiv');
const editModalOverlay = document.querySelector('.edit-modal-overlay');

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
    });
});
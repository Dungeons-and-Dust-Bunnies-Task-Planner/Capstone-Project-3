const editButtons = document.querySelectorAll('.editBattle');
const editModals = document.querySelectorAll('.editModal');
const editModalOverlays = document.querySelectorAll('.modalOverlay');
const blur = document.getElementById('battleDiv');


editButtons.forEach((editButton, index) => {
    editButton.addEventListener('click', () => {
        editModals[index].classList.remove('hidden');
        editModalOverlays[index].classList.remove('hidden');
    });
});

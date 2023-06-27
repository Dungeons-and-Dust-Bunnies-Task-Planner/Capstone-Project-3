const editModals = document.querySelectorAll('.edit-modal');
const editModalBtns = document.querySelectorAll('#battle-edit-btn');
const closeModals = document.querySelectorAll('.modal-close');


editModalBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        editModals[index].classList.add('show');
    });
});


closeModals.forEach((closeModal) => {
    closeModal.addEventListener('click', () => {
        editModals.forEach((modal) => {
            modal.classList.remove('show');
        });
    });
});
const openModal = async (event) => {
    event.preventDefault();
    var commentModal = document.getElementById("commentModal");
    commentModal.classList.add('is-active');
};

const closeModal = async (event) => {
    event.preventDefault();
    var commentModal = document.getElementById("commentModal");
    commentModal.classList.remove('is-active');
};

document.querySelector('#add-comment').addEventListener('click', openModal);
document.querySelector('#closeModal').addEventListener('click', closeModal);
document.querySelector('#closeModal2').addEventListener('click', closeModal);

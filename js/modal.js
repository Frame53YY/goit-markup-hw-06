(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  if (!refs.openModalBtn || !refs.closeModalBtn || !refs.modal) {
    console.error("Один або кілька елементів модалки не знайдені.");
    return;
  }

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  // Закриття по кліку на бекдроп (поза модалкою)
  refs.modal.addEventListener("click", (e) => {
    if (e.target === refs.modal) {
      toggleModal();
    }
  });

  // Закриття по Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && refs.modal.classList.contains("is-open")) {
      toggleModal();
      document.activeElement.blur(); // прибираємо фокус
    }
  });

  function toggleModal() {
    refs.modal.classList.toggle("is-open");
  }
})();

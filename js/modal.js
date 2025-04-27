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

  refs.openModalBtn.addEventListener("click", openModal);
  refs.closeModalBtn.addEventListener("click", closeModal);
  refs.modal.addEventListener("click", (e) => {
    if (e.target === refs.modal) {
      closeModal();
    }
  });

  let focusableElements = [];
  let firstFocusable = null;
  let lastFocusable = null;

  function trapFocus() {
    focusableElements = refs.modal.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    firstFocusable = focusableElements[0];
    lastFocusable = focusableElements[focusableElements.length - 1];

    refs.modal.addEventListener("keydown", handleTab);
    window.addEventListener("keydown", handleEscape);
    firstFocusable.focus();
  }

  function releaseFocus() {
    refs.modal.removeEventListener("keydown", handleTab);
    window.removeEventListener("keydown", handleEscape);
  }

  function handleTab(e) {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab вперед
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  function handleEscape(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  function openModal() {
    refs.modal.classList.add("is-open");
    document.body.classList.add("no-scroll"); // Блокируем скролл
    trapFocus();
  }

  function closeModal() {
    refs.modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll"); // Возвращаем скролл
    releaseFocus();
  }
})();

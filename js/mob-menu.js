(() => {
  const refs = {
    openMenuBtn: document.querySelector("[data-menu-open]"),
    closeMenuBtn: document.querySelector("[data-menu-close]"),
    menu: document.querySelector("[data-menu]"),
    body: document.querySelector("body"),
    menuList: document.querySelector(".mob-menu-list"),
  };

  refs.openMenuBtn.addEventListener("click", openMenu);
  refs.closeMenuBtn.addEventListener("click", closeMenu);
  refs.menuList.addEventListener("click", closeMenu);

  let focusableElements = [];
  let firstFocusable = null;
  let lastFocusable = null;

  function trapFocus() {
    focusableElements = refs.menu.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    firstFocusable = focusableElements[0];
    lastFocusable = focusableElements[focusableElements.length - 1];

    refs.menu.addEventListener("keydown", handleTab);
    window.addEventListener("keydown", handleEscape); // добавили слушатель на Escape
    firstFocusable.focus();
  }

  function releaseFocus() {
    refs.menu.removeEventListener("keydown", handleTab);
    window.removeEventListener("keydown", handleEscape); // убрали слушатель
  }

  function handleTab(e) {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  function handleEscape(e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  }

  function openMenu() {
    refs.menu.classList.add("is-open");
    refs.body.classList.add("no-scroll");
    trapFocus();
  }

  function closeMenu() {
    refs.menu.classList.remove("is-open");
    refs.body.classList.remove("no-scroll");
    releaseFocus();
  }
})();

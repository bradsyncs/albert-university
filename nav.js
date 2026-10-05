document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMenu() {
    navDrawer.classList.add('open');
    navBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navDrawer.classList.remove('open');
    navBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (navDrawer.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});

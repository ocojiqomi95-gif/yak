document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open', !expanded);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const yearNode = document.querySelector('.current-year');
  if (yearNode) yearNode.textContent = new Date().getFullYear();

  const fitFooterTitle = () => {
    const title = document.querySelector('.footer-title');
    const parent = title?.parentElement;
    if (!title || !parent) return;
    const maxWidth = parent.clientWidth;
    const chars = Math.max(title.textContent.trim().length, 10);
    const size = Math.max(22, Math.min(54, (maxWidth / chars) * 2.25));
    title.style.fontSize = `${size}px`;
  };
  fitFooterTitle();
  window.addEventListener('resize', fitFooterTitle);

  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const trigger = item.querySelector('[data-faq-trigger]');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
});

(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const resizeFooterTitles = () => {
    document.querySelectorAll('[data-footer-title]').forEach((title) => {
      const parentWidth = title.parentElement ? title.parentElement.clientWidth : 600;
      const size = Math.max(22, Math.min(56, parentWidth * 0.08));
      title.style.fontSize = `${size}px`;
    });
  };
  resizeFooterTitles();
  window.addEventListener('resize', resizeFooterTitles);

  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const question = item.querySelector('[data-faq-question]');
    const answer = item.querySelector('[data-faq-answer]');
    if (!question || !answer) return;
    question.addEventListener('click', () => {
      const expanded = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', String(!expanded));
      answer.hidden = expanded;
    });
  });
})();

(function () {
  const LINKS = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about/index.html' },
    { label: 'Products', href: 'products/index.html' },
    { label: 'Features', href: 'features/index.html' },
    { label: 'Deposits Products', href: 'deposits-products/index.html' },
    { label: 'Home Loans', href: 'home-loans/index.html' },
    { label: 'Business Banking', href: 'business-banking/index.html' },
    { label: 'Credit', href: 'credit/index.html' },
    { label: 'Branch & ATM Locator', href: 'branch-atm-locator/index.html' },
    { label: 'Contacts', href: 'contacts/index.html' }
  ];

  const FOOTER_EXTERNAL = [
    { label: 'Official Site', href: 'https://www.yakimafed.com/' },
    { label: 'Rates', href: 'https://www.yakimafed.com/deposit-rates/' },
    { label: 'Home Loans', href: 'https://www.yakimafed.com/home-loans/' },
    { label: 'Contact Us', href: 'https://www.yakimafed.com/contact-us/' }
  ];

  const SOCIAL = [
    'https://www.facebook.com/yakfed',
    'https://www.linkedin.com/company/yakfed',
    'https://www.youtube.com/@yakimafederal_official'
  ];

  function currentPrefix() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (!parts.length) return '';
    const rootAdjusted = parts[0] === 'yak' ? parts.slice(1) : parts;
    const depth = Math.max(0, rootAdjusted.length - 1);
    return '../'.repeat(depth);
  }

  function smoothScroll() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function buildNav() {
    const nav = document.querySelector('nav[data-section="navbar"]');
    if (!nav) return;
    const row = nav.querySelector('.flex.items-center.justify-between');
    if (!row || row.dataset.enhanced === 'true') return;
    const right = row.children[1];
    if (!right) return;
    const prefix = currentPrefix();

    const desktop = document.createElement('div');
    desktop.className = 'hidden xl:flex items-center gap-3';
    desktop.innerHTML = LINKS.map(function (l) {
      return '<a class="text-sm hover:text-primary-cta transition-colors" href="' + prefix + l.href + '">' + l.label + '</a>';
    }).join('');

    row.insertBefore(desktop, right);

    const toggle = right.querySelector('div.relative.flex.items-center.justify-center');
    if (toggle) {
      toggle.setAttribute('role', 'button');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.tabIndex = 0;

      const panel = document.createElement('div');
      panel.className = 'absolute top-full right-0 mt-3 w-[280px] card rounded p-3 hidden';
      panel.innerHTML = LINKS.map(function (l) {
        return '<a class="block px-3 py-2 rounded hover:bg-foreground/5 text-sm" href="' + prefix + l.href + '">' + l.label + '</a>';
      }).join('');
      right.style.position = 'relative';
      right.appendChild(panel);

      const switchMenu = function () {
        const open = panel.classList.contains('hidden');
        panel.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', String(open));
      };
      toggle.addEventListener('click', switchMenu);
      toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          switchMenu();
        }
      });
      document.addEventListener('click', function (e) {
        if (!right.contains(e.target)) {
          panel.classList.add('hidden');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    row.dataset.enhanced = 'true';
  }

  function enhanceFooter() {
    const footer = document.querySelector('footer[data-section="footer"]');
    if (!footer) return;

    const title = footer.querySelector('h2');
    if (title) {
      const resize = function () {
        const base = Math.max(30, Math.min(88, (footer.clientWidth - 80) / 10));
        title.style.fontSize = base.toFixed(1) + 'px';
      };
      resize();
      window.addEventListener('resize', resize);
    }

    const copy = footer.querySelector('span.text-base.opacity-75');
    if (copy) {
      const y = new Date().getFullYear();
      copy.innerHTML = '© <span data-current-year>' + y + '</span> Yakima Federal Savings & Loan. All rights reserved.';
    }

    const socials = footer.querySelectorAll('button.primary-button');
    socials.forEach(function (btn, i) {
      if (!SOCIAL[i]) return;
      const a = document.createElement('a');
      a.href = SOCIAL[i];
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = btn.className;
      a.innerHTML = btn.innerHTML;
      btn.replaceWith(a);
    });

    if (footer.querySelector('[data-footer-links]')) return;

    const prefix = currentPrefix();
    const linksWrap = document.createElement('div');
    linksWrap.setAttribute('data-footer-links', 'true');
    linksWrap.className = 'flex flex-col gap-2 md:gap-3 py-4';
    linksWrap.innerHTML =
      '<div class="flex flex-wrap gap-3 text-sm">' +
      LINKS.map(function (l) {
        return '<a class="hover:text-primary-cta transition-colors" href="' + prefix + l.href + '">' + l.label + '</a>';
      }).join('') +
      '</div>' +
      '<div class="flex flex-wrap gap-3 text-sm opacity-85">' +
      FOOTER_EXTERNAL.map(function (l) {
        return '<a class="hover:text-primary-cta transition-colors" href="' + l.href + '" target="_blank" rel="noopener noreferrer">' + l.label + '</a>';
      }).join('') +
      '</div>';

    const hr = footer.querySelector('.h-px.w-full.mb-5') || footer.querySelector('.h-px.w-full');
    if (hr && hr.parentElement) {
      hr.parentElement.insertBefore(linksWrap, hr.nextSibling);
    }
  }

  function enhanceFaq() {
    const faq = document.getElementById('faq');
    if (!faq) return;
    const cards = Array.from(faq.querySelectorAll('.card.cursor-pointer.select-none'));
    if (!cards.length) return;

    const answers = [
      'You can open an account by visiting a Yakima Federal branch or by starting with product information pages that explain checking, savings, and documentation requirements. Bringing valid identification and proof of address will help the process move quickly.',
      "Deposits are generally covered by applicable federal insurance limits through the bank's insured account structure. For exact coverage by account ownership type, you can request a personalized review with branch staff.",
      'Loan options include purchase, refinance, construction, and home equity products. A lending specialist can explain qualification, rates, and monthly payment scenarios based on your goals.'
    ];

    cards.forEach(function (card, i) {
      if (card.dataset.faqReady === 'true') return;
      const answer = document.createElement('div');
      answer.className = 'pt-3 text-sm md:text-base leading-relaxed opacity-80 hidden';
      answer.textContent = answers[i] || 'For detailed assistance, contact Yakima Federal directly and our team will provide guidance for your specific question.';
      card.appendChild(answer);
      card.addEventListener('click', function () {
        answer.classList.toggle('hidden');
      });
      card.dataset.faqReady = 'true';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    smoothScroll();
    buildNav();
    enhanceFooter();
    enhanceFaq();
  });
})();

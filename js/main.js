/*=============== NAV MENU TOGGLE (mobile) ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*=============== REMOVE MOBILE MENU ON LINK CLICK + ACTIVE LINK ===============*/
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((l) => l.classList.remove('active-link'));
    link.classList.add('active-link');
    navMenu.classList.remove('show-menu');
  });
});

/*=============== HEADER SHADOW ON SCROLL ===============*/
const header = document.getElementById('header');
const scrollUpBtn = document.getElementById('scroll-up');

window.addEventListener('scroll', () => {
  if (window.scrollY >= 80) header.classList.add('show-header');
  else header.classList.remove('show-header');

  if (window.scrollY >= 560) scrollUpBtn.classList.add('show-scroll');
  else scrollUpBtn.classList.remove('show-scroll');
});

/*=============== ACTIVE LINK ON SCROLL (scrollspy) ===============*/
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    }
  });
});

/*=============== SERVICES MODAL ===============*/
const modalButtons = document.querySelectorAll('[data-modal-target]');
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.modalTarget);
    if (modal) modal.classList.add('active-modal');
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.services__modal');
    if (modal) modal.classList.remove('active-modal');
  });
});

// Close modal when clicking the dark overlay itself
document.querySelectorAll('.services__modal').forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active-modal');
  });
});

/*=============== QUALIFICATIONS TABS ===============*/
const qualButtons = document.querySelectorAll('.qual__button');
const qualContents = document.querySelectorAll('.qual__content');

qualButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;

    qualButtons.forEach((b) => b.classList.remove('qual__active'));
    button.classList.add('qual__active');

    qualContents.forEach((content) => {
      if (content.dataset.content === target) {
        content.classList.add('qual__content-active');
      } else {
        content.classList.remove('qual__content-active');
      }
    });
  });
});

/*=============== CONTACT FORM (mailto handoff, no backend) ===============*/
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:santhoshsk9843@gmail.com?subject=${subject}&body=${body}`;

    formStatus.textContent = 'Opening your email app to send this message…';
    contactForm.reset();
  });
}

/*=============== FOOTER YEAR ===============*/
const footerCopy = document.getElementById('footer-copy');
if (footerCopy) {
  const year = new Date().getFullYear();
  footerCopy.innerHTML = `&#169; ${year} Santhoshkumar V. All rights reserved.`;
}

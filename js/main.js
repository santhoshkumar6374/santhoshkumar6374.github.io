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

    window.location.href = `mailto:santhoshak9843@gmail.com?subject=${subject}&body=${body}`;

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

/*=============== PROJECT VISUAL MODALS ===============*/
const projectTriggers = document.querySelectorAll('[data-project-modal-trigger]');
const projectCloseBtns = document.querySelectorAll('[data-project-modal-close]');
const projectModals = document.querySelectorAll('.project-modal');

projectTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const modalId = trigger.getAttribute('data-project-modal-trigger');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active-modal');
      document.body.style.overflow = 'hidden';
    }
  });
});

projectCloseBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.project-modal');
    if (modal) {
      modal.classList.remove('active-modal');
      document.body.style.overflow = '';
    }
  });
});

projectModals.forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active-modal');
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    projectModals.forEach((modal) => {
      if (modal.classList.contains('active-modal')) {
        modal.classList.remove('active-modal');
        document.body.style.overflow = '';
      }
    });
  }
});

/*=============== PROJECT MODAL TABS ===============*/
const projectTabBtns = document.querySelectorAll('.project-modal__tab');

projectTabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener('click', () => {
    const targetPaneId = tabBtn.getAttribute('data-tab');
    const parentModal = tabBtn.closest('.project-modal');

    if (parentModal) {
      const modalTabs = parentModal.querySelectorAll('.project-modal__tab');
      const modalPanes = parentModal.querySelectorAll('.project-modal__pane');

      modalTabs.forEach((tb) => tb.classList.remove('project-modal__tab--active'));
      modalPanes.forEach((pn) => pn.classList.remove('project-modal__pane--active'));

      tabBtn.classList.add('project-modal__tab--active');
      const activePane = parentModal.querySelector(`#${targetPaneId}`);
      if (activePane) activePane.classList.add('project-modal__pane--active');
    }
  });
});

/*=============== INTERACTIVE SIMULATORS LOGIC ===============*/
// 1. E-Grocery Cart Simulator
let simCart = [];

window.simAddToCart = function (name, price) {
  simCart.push({ name, price });
  renderSimCart();
};

function renderSimCart() {
  const cartList = document.getElementById('sim-cart-list');
  const totalPrice = document.getElementById('sim-total-price');

  if (!cartList || !totalPrice) return;

  if (simCart.length === 0) {
    cartList.innerHTML = `<li class="sim-cart-empty">Cart is currently empty. Click '+ Add to Cart' to test.</li>`;
    totalPrice.textContent = '$0.00';
    return;
  }

  let html = '';
  let total = 0;
  simCart.forEach((item, index) => {
    total += item.price;
    html += `
      <li class="sim-cart-item">
        <span>${item.name}</span>
        <strong>$${item.price.toFixed(2)}</strong>
      </li>
    `;
  });

  cartList.innerHTML = html;
  totalPrice.textContent = `$${total.toFixed(2)}`;
}

window.simCheckout = function () {
  const statusBox = document.getElementById('sim-order-status');
  if (!statusBox) return;

  if (simCart.length === 0) {
    statusBox.style.display = 'block';
    statusBox.style.backgroundColor = '#f8d7da';
    statusBox.style.color = '#721c24';
    statusBox.style.borderColor = '#f5c6cb';
    statusBox.innerHTML = '⚠️ Please add at least 1 item to cart before simulating checkout.';
    return;
  }

  const orderId = Math.floor(1000 + Math.random() * 9000);
  statusBox.style.display = 'block';
  statusBox.style.backgroundColor = '#d1e7dd';
  statusBox.style.color = '#0f5132';
  statusBox.style.borderColor = '#badbcc';
  statusBox.innerHTML = `
    ✅ <strong>[HTTP 200 OK] Spring Boot Order API Triggered</strong><br>
    Order <strong>#ORD-${orderId}</strong> created successfully!<br>
    <small>JWT Auth verified user role. Inventory deducted in MySQL database.</small>
  `;

  // Reset cart after 2.5s
  setTimeout(() => {
    simCart = [];
    renderSimCart();
  }, 2500);
};

// 2. Smart Health AI Simulator
window.simSetSymptom = function (symptomText) {
  const input = document.getElementById('sim-symptom-input');
  if (input) input.value = symptomText;
};

window.simRunAiAnalysis = function () {
  const input = document.getElementById('sim-symptom-input');
  const resultBox = document.getElementById('sim-ai-result');
  if (!input || !resultBox) return;

  const text = input.value.trim();
  if (!text) return;

  resultBox.style.opacity = '0.5';
  resultBox.innerHTML = `
    <div style="text-align:center; padding: 1.5rem;">
      <i class="uil uil-spinner alt" style="font-size: 2rem; display: inline-block; animation: spin 1s linear infinite;"></i>
      <p style="margin-top: 0.5rem; font-size: var(--small-font-size);">Querying OpenAI Medical Diagnosis API &amp; fetching OpenStreetMap coordinates...</p>
    </div>
  `;

  setTimeout(() => {
    resultBox.style.opacity = '1';
    resultBox.innerHTML = `
      <div class="sim-ai-result-header">
        <span class="sim-ai-tag"><i class="uil uil-brain"></i> OpenAI Diagnostic Result</span>
        <span class="sim-risk-badge sim-risk-medium">Risk Score: 72/100 (Moderate Risk)</span>
      </div>
      <div class="sim-ai-body">
        <p><strong>Primary Assessment for "${text}":</strong> Clinical pattern match indicates potential upper respiratory track infection or seasonal flu. Recommended rest and fluid intake.</p>
        <div class="sim-recommendations">
          <h5><i class="uil uil-hospital"></i> Recommended Nearby Care (Via OpenStreetMap API &amp; Geolocation):</h5>
          <ul>
            <li>🏥 <strong>City Central General Hospital</strong> - Emergency &amp; OPD (1.2 km away)</li>
            <li>🩺 <strong>Apollo Urgent Care Clinic</strong> - General Physician on duty (2.5 km away)</li>
          </ul>
        </div>
      </div>
    `;
  }, 1200);
};

// Add CSS keyframe for spinner
const style = document.createElement('style');
style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(style);


const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const countObserver = new IntersectionObserver((entries, currentObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    let current = 0;
    const tick = () => {
      current += 1;
      element.textContent = String(current).padStart(2, '0');
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
    currentObserver.unobserve(element);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach((element) => countObserver.observe(element));

const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.querySelector('.form-message');
  const phoneFrame = form.querySelector('.phone-frame');

  if (!form.checkValidity()) {
    message.textContent = 'Please fill in the required details before sending.';
    message.style.color = '#ffad4d';
    form.reportValidity();
    return;
  }

  phoneFrame?.classList.remove('sending');
  void phoneFrame?.offsetWidth;
  phoneFrame?.classList.add('sending');

  message.textContent = 'Signal received. We will be in touch shortly.';
  message.style.color = '#55d8ff';

  setTimeout(() => {
    phoneFrame?.classList.remove('sending');
  }, 900);

  form.reset();
});

const escExplorer = document.getElementById('escExplorer');
escExplorer?.addEventListener('click', () => {
  escExplorer.classList.toggle('opened');
});

escExplorer?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    escExplorer.classList.toggle('opened');
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

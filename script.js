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

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.currentTarget.querySelector('.form-message');
  message.textContent = 'Signal received. We will be in touch shortly.';
  event.currentTarget.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();

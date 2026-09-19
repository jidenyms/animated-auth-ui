const body = document.body;
const tabs = document.querySelectorAll('.auth-tab');
const tabsWrap = document.querySelector('.auth-tabs');
const nameRow = document.querySelector('.name-row');
const form = document.querySelector('.auth-form');
const title = document.querySelector('.form-title');
const subtitle = document.querySelector('.form-subtitle');
const submit = document.querySelector('.submit-button');
const buttonLabel = document.querySelector('.button-label');
const password = document.querySelector('#password');
const passwordToggle = document.querySelector('.password-toggle');
const toast = document.querySelector('.toast');
const toastMessage = document.querySelector('.toast-message');
const glow = document.querySelector('.cursor-glow');

let activeView = 'login';

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    activeView = tab.dataset.view;
    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });

    const signingUp = activeView === 'signup';
    tabsWrap.classList.toggle('signup', signingUp);
    nameRow.classList.toggle('hidden-field', !signingUp);
    nameRow.setAttribute('aria-hidden', String(!signingUp));
    nameRow.querySelectorAll('input').forEach((input) => { input.required = signingUp; });
    title.textContent = signingUp ? 'Create your orbit' : 'Welcome back';
    subtitle.textContent = signingUp
      ? 'Start building your space with Nova today.'
      : 'Sign in to continue your journey with Nova.';
    buttonLabel.textContent = signingUp ? 'Create account' : 'Enter Nova';
    password.autocomplete = signingUp ? 'new-password' : 'current-password';
    form.querySelectorAll('.invalid').forEach((field) => field.classList.remove('invalid'));
  });
});

passwordToggle.addEventListener('click', () => {
  const revealing = password.type === 'password';
  password.type = revealing ? 'text' : 'password';
  passwordToggle.setAttribute('aria-label', revealing ? 'Hide password' : 'Show password');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  form.querySelectorAll('input[required]').forEach((input) => {
    const group = input.closest('.field-group');
    const inputValid = input.checkValidity();
    if (group) group.classList.toggle('invalid', !inputValid);
    if (!inputValid) valid = false;
  });

  if (!valid) return;

  submit.classList.add('loading');
  submit.disabled = true;
  window.setTimeout(() => {
    submit.classList.remove('loading');
    submit.disabled = false;
    toastMessage.textContent = activeView === 'signup'
      ? 'Account preview complete — welcome to Nova!'
      : 'Welcome back — demo sign-in complete!';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3200);
  }, 1100);
});

form.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', () => input.closest('.field-group')?.classList.remove('invalid'));
});

document.querySelector('.theme-toggle').addEventListener('click', () => {
  body.classList.toggle('soft-mode');
});

document.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

document.querySelector('.forgot-link').addEventListener('click', () => {
  toastMessage.textContent = 'Password recovery is ready for backend integration.';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3200);
});

document.querySelectorAll('.social-row button').forEach((button) => {
  button.addEventListener('click', () => {
    toastMessage.textContent = `${button.textContent.trim()} authentication is a UI preview.`;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3200);
  });
});

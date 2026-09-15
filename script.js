const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
const links = document.querySelectorAll('.nav-link');
function closeMenu() {
  menu.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
}
document.documentElement.classList.add('js');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('active');
  toggle.setAttribute('aria-expanded', String(open));
});
links.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('active')) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.navbar')) closeMenu();
});
window.matchMedia('(min-width: 1051px)').addEventListener('change', closeMenu);
const sections = [...document.querySelectorAll('main section[id]')];
let pending = false;
function updateNavigation() {
  const current = sections.filter(section => section.getBoundingClientRect().top <= 140).pop() || sections[0];
  links.forEach(link => {
    const active = link.hash === '#' + current.id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  pending = false;
}
window.addEventListener('scroll', () => {
  if (!pending) { pending = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
updateNavigation();
const filters = document.querySelector('.project-filters');
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  let count = 0;
  document.querySelectorAll('.project-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.getElementById('filter-status').textContent = `${count} projects shown`;
});
document.getElementById('year').textContent = new Date().getFullYear();

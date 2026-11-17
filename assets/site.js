// Keep section links local on the homepage and return to it from other pages.
for (const link of document.querySelectorAll('a[data-section]')) {
  if (document.getElementById(link.dataset.section)) {
    link.setAttribute('href', '#' + link.dataset.section);
  }
}

const navigation = [...document.querySelectorAll('.site-header nav a[data-section]')];
const sections = navigation.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
const header = document.querySelector('.site-header');

if (sections.length && header) {
  let scheduled = false;
  function updateNavigation() {
    const threshold = header.offsetHeight + 56;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) active = section;
    }
    for (const link of navigation) {
      if (link.dataset.section === active.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      requestAnimationFrame(updateNavigation);
      scheduled = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  window.addEventListener('pageshow', updateNavigation);
  updateNavigation();
} else if (document.querySelector('.pub-shell')) {
  document.querySelector('.publications-link')?.setAttribute('aria-current', 'page');
}

// Keep section links local on the homepage and return to it from other pages.
for (const link of document.querySelectorAll('a[data-section]')) {
  if (document.getElementById(link.dataset.section)) {
    link.setAttribute('href', '#' + link.dataset.section);
  }
}

// News: site.css shows the newest items; this button reveals the older ones in place.
const newsList = document.getElementById('news-list');
const newsMore = document.querySelector('.news-more');
if (newsList && newsMore) {
  const hasOlderItems = [...newsList.children].some(item => getComputedStyle(item).display === 'none');
  if (!hasOlderItems) newsMore.hidden = true;
  newsMore.addEventListener('click', () => {
    const expanded = newsList.classList.toggle('is-expanded');
    newsMore.setAttribute('aria-expanded', String(expanded));
    newsMore.textContent = expanded ? 'Show less' : 'Earlier news';
  });
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

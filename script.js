// Preserve links shared before case studies moved to dedicated pages.
const legacyPages = {
  '#firstthought-story': 'firstthought.html',
  '#insurance-story': 'insurance.html',
  '#cureatr-story': 'cureatr.html'
};
function redirectLegacyStory() {
  const page = legacyPages[window.location.hash];
  if (page) window.location.replace(page);
}
window.addEventListener('hashchange', redirectLegacyStory);
redirectLegacyStory();

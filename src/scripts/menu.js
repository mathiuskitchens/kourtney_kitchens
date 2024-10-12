
const hamburger = document.getElementById('hamburger-menu');
const topBar = document.getElementById('top-bar');
const bottomBar = document.getElementById('bottom-bar');

hamburger?.addEventListener('click', () => {
  if (topBar?.classList.contains('rotate-45')) {
    // Close the menu
    topBar.classList.remove('rotate-45', 'translate-y-2');
    bottomBar?.classList.remove('-rotate-45', '-translate-y-2');

  } else {
    // Open the menu
    topBar?.classList.add('rotate-45', 'translate-y-2');
    bottomBar?.classList.add('-rotate-45', '-translate-y-2');
  }
});

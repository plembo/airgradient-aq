// Track if we're handling anchor navigation
let isAnchorNavigation = false;

// Handle both same-page and cross-page anchor links
function setupAnchorNavigation() {
  // Check for anchor on initial load
  if (window.location.hash) {
    isAnchorNavigation = true;
    handleAnchorNavigation();
  }
}

function handleAnchorNavigation() {
  // Convert lazy images to eager loading
  const allLazyImages = document.querySelectorAll('img[loading="lazy"]');
  allLazyImages.forEach(img => {
    img.loading = 'eager';
  });

  // For same-page navigation, wait briefly before scrolling
  if (isAnchorNavigation && window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      isAnchorNavigation = false;
    }, 100); // Short delay to allow DOM update
  }
}

// Event listeners
window.addEventListener('hashchange', function() {
  isAnchorNavigation = true;
  handleAnchorNavigation();
});

document.addEventListener('DOMContentLoaded', setupAnchorNavigation);

// Additional check for pages that load dynamically
document.addEventListener('click', function(e) {
  if (e.target.closest('a[href^="#"]')) {
    isAnchorNavigation = true;
  }
});
// Configure the base URL that is allowed to open links in the same tab
const configuredUrl = "https://www.notion.so/datasentics/Journal-12e7c7daedaa41b1af06b25881646adb";

// Helper function to find the closest anchor element
function findClosestAnchor(element) {
  while (element && element.tagName !== 'A') {
    element = element.parentElement;
  }
  return element;
}

// Helper function to check if an element is inside a container with the class "notion-frame"
function isInsideLayoutContent(element) {
  while (element) {
    if (element.classList && element.classList.contains('notion-frame')) {
      return true;
    }
    element = element.parentElement;
  }
  return false;
}

// Add event listener to capture link clicks
document.addEventListener('click', function (e) {
  // Find the closest anchor (a) element from the clicked element
  const anchor = findClosestAnchor(e.target);

  if (anchor) {
    // Check if the clicked link is inside an element with class 'notion-frame'
    if (isInsideLayoutContent(anchor)) {
      // Ignore this link (let the normal Notion behavior happen)
      console.log("- NLO: Ignoring link click inside notion-frame");
      return;
    }

    const linkUrl = anchor.href;

    // Allow links that start with the configured URL to open in the same tab
    if (!linkUrl.startsWith(configuredUrl)) {
      // Open the link in a new tab
      e.preventDefault();  // Prevent default behavior
      e.stopPropagation(); // Stop the event from bubbling up
      window.open(linkUrl, '_blank'); // Open the link in a new tab
    }
  }
}, true);

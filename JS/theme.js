// Theme Toggle for Light/Dark Mode

// Get theme from localStorage or default to light
function getTheme() {
  return localStorage.getItem('theme') || 'light';
}

// Set theme and save to localStorage
function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);

  // Update theme icon
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Toggle between light and dark mode
function toggleTheme() {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const savedTheme = getTheme();
  setTheme(savedTheme);

  // Add event listener to theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});
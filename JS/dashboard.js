// Dashboard JavaScript for handling user data and interactions

// Check if user is logged in
async function checkAuth() {
  try {
    const response = await fetch('/check-session');
    const data = await response.json();

    if (!data.loggedIn) {
      // Redirect to login if not authenticated
      window.location.href = '/login.html';
    }
  } catch (error) {
    console.error('Auth check error:', error);
    window.location.href = '/login.html';
  }
}

// Load dashboard data
async function loadDashboardData() {
  try {
    const response = await fetch('/dashboard');
    const data = await response.json();

    if (data.success) {
      // Update performance stats
      document.getElementById('loginCount').textContent = data.performance.loginCount;

      // Format and display last login
      const lastLogin = new Date(data.performance.lastLogin);
      const formattedDate = lastLogin.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      document.getElementById('lastLogin').textContent = formattedDate;

      // Store user info for profile modal
      window.userData = {
        username: data.user.username,
        email: data.user.email
      };
    } else {
      console.error('Failed to load dashboard data');
    }
  } catch (error) {
    console.error('Dashboard data error:', error);
  }
}

// Profile Modal Functionality
const profileModal = document.getElementById('profileModal');
const profileBtn = document.getElementById('profileBtn');
const closeModal = document.querySelector('.close');
const logoutBtn = document.getElementById('logoutBtn');

// Open profile modal
profileBtn.addEventListener('click', () => {
  if (window.userData) {
    document.getElementById('modalUsername').textContent = window.userData.username;
    document.getElementById('modalEmail').textContent = window.userData.email;
  }
  profileModal.style.display = 'block';
});

// Close modal when clicking X
closeModal.addEventListener('click', () => {
  profileModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === profileModal) {
    profileModal.style.display = 'none';
  }
});

// Handle Logout
logoutBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST'
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = '/login.html';
    }
  } catch (error) {
    console.error('Logout error:', error);
    // Still redirect to login on error
    window.location.href = '/login.html';
  }
});

// Initialize dashboard
checkAuth();
loadDashboardData();

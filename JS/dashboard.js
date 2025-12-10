
function getCurrentUser() {
  const userJson = localStorage.getItem("user");
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

// Check if user is logged in
function checkAuth() {
  const user = getCurrentUser();
  if (!user) {
    // Redirect to login if not authenticated
    window.location.href = "login.html";
    return null;
  }

  // Save globally for profile modal
  window.userData = user;

  // If modal elements exist, fill them
  const modalUsername = document.getElementById("modalUsername");
  const modalEmail = document.getElementById("modalEmail");
  if (modalUsername && modalEmail) {
    modalUsername.textContent = user.username;
    modalEmail.textContent = user.email;
  }

  return user;
}



function loadDashboardData() {
  const loginCountEl = document.getElementById("loginCount");
  const lastLoginEl = document.getElementById("lastLogin");

  // Get existing stats or create default
  let stats = null;
  const statsJson = localStorage.getItem("performance");
  if (statsJson) {
    try {
      stats = JSON.parse(statsJson);
    } catch {
      stats = null;
    }
  }
  if (!stats) {
    stats = {
      loginCount: 0,
      lastLogin: null,
    };
  }


  stats.loginCount += 1;
  stats.lastLogin = new Date().toISOString();

  
  localStorage.setItem("performance", JSON.stringify(stats));

  if (loginCountEl) {
    loginCountEl.textContent = stats.loginCount;
  }

  if (lastLoginEl) {
    const lastLoginDate = stats.lastLogin ? new Date(stats.lastLogin) : null;
    if (!lastLoginDate || isNaN(lastLoginDate.getTime())) {
      lastLoginEl.textContent = "-";
    } else {
      lastLoginEl.textContent = lastLoginDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }
}


const profileModal = document.getElementById("profileModal");
const profileBtn = document.getElementById("profileBtn");
const closeModal = document.querySelector(".close");
const logoutBtn = document.getElementById("logoutBtn");

// Open profile modal
if (profileBtn && profileModal) {
  profileBtn.addEventListener("click", () => {
    if (window.userData) {
      const modalUsername = document.getElementById("modalUsername");
      const modalEmail = document.getElementById("modalEmail");
      if (modalUsername && modalEmail) {
        modalUsername.textContent = window.userData.username;
        modalEmail.textContent = window.userData.email;
      }
    }
    profileModal.style.display = "block";
  });
}

// Close modal when clicking X
if (closeModal && profileModal) {
  closeModal.addEventListener("click", () => {
    profileModal.style.display = "none";
  });
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === profileModal) {
    profileModal.style.display = "none";
  }
});

// Handle Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // Clear local storage and go back to login
    localStorage.removeItem("user");
    localStorage.removeItem("performance");
    window.location.href = "login.html";
  });
}

// --------- INITIALIZE DASHBOARD ---------

const user = checkAuth(); // will redirect to login if not logged in
if (user) {
  loadDashboardData();
}

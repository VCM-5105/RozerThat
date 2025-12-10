// Authentication JavaScript for Register and Login pages

const API_BASE_URL = "http://localhost:5000";

// Handle Registration Form
if (document.getElementById("registerForm")) {
  document
    .getElementById("registerForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword =
        document.getElementById("confirmPassword").value;
      const messageDiv = document.getElementById("message");

      // Clear previous messages
      messageDiv.className = "message";
      messageDiv.textContent = "";

      // Validate passwords match
      if (password !== confirmPassword) {
        messageDiv.className = "message error";
        messageDiv.textContent = "Passwords do not match!";
        return;
      }

      // Validate password length
      if (password.length < 6) {
        messageDiv.className = "message error";
        messageDiv.textContent =
          "Password must be at least 6 characters long!";
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          // backend sends { error: '...' } on failure
          messageDiv.className = "message error";
          messageDiv.textContent =
            data.error || "Registration failed. Please try again.";
          return;
        }

        // success: backend sends { message: 'User registered successfully', userId: ... }
        messageDiv.className = "message success";
        messageDiv.textContent = data.message || "Registration successful!";

        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } catch (error) {
        messageDiv.className = "message error";
        messageDiv.textContent = "Registration failed. Please try again.";
        console.error("Error:", error);
      }
    });
}

// Handle Login Form
if (document.getElementById("loginForm")) {
  document
    .getElementById("loginForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // make sure your login.html has inputs with ids="email" and "password"
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const messageDiv = document.getElementById("message");

      // Clear previous messages
      messageDiv.className = "message";
      messageDiv.textContent = "";

      try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          // backend sends { error: '...' } on failure
          messageDiv.className = "message error";
          messageDiv.textContent =
            data.error || "Login failed. Please try again.";
          return;
        }

        // success: backend sends { message: 'Login successful', user: {...} }
        messageDiv.className = "message success";
        messageDiv.textContent = data.message || "Login successful!";

        // Optionally store user
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // Redirect to dashboard after 1 second
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1000);
      } catch (error) {
        messageDiv.className = "message error";
        messageDiv.textContent = "Login failed. Please try again.";
        console.error("Error:", error);
      }
    });
}

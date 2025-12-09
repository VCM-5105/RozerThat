// Authentication JavaScript for Register and Login pages

// Handle Registration Form
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('message');

    // Clear previous messages
    messageDiv.className = 'message';
    messageDiv.textContent = '';

    // Validate passwords match
    if (password !== confirmPassword) {
      messageDiv.className = 'message error';
      messageDiv.textContent = 'Passwords do not match!';
      return;
    }

    // Validate password length
    if (password.length < 6) {
      messageDiv.className = 'message error';
      messageDiv.textContent = 'Password must be at least 6 characters long!';
      return;
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (data.success) {
        messageDiv.className = 'message success';
        messageDiv.textContent = data.message;

        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = '/login.html';
        }, 2000);
      } else {
        messageDiv.className = 'message error';
        messageDiv.textContent = data.message;
      }
    } catch (error) {
      messageDiv.className = 'message error';
      messageDiv.textContent = 'Registration failed. Please try again.';
      console.error('Error:', error);
    }
  });
}

// Handle Login Form
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // Clear previous messages
    messageDiv.className = 'message';
    messageDiv.textContent = '';

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        messageDiv.className = 'message success';
        messageDiv.textContent = data.message;

        // Redirect to dashboard after 1 second
        setTimeout(() => {
          window.location.href = '/dashboard.html';
        }, 1000);
      } else {
        messageDiv.className = 'message error';
        messageDiv.textContent = data.message;
      }
    } catch (error) {
      messageDiv.className = 'message error';
      messageDiv.textContent = 'Login failed. Please try again.';
      console.error('Error:', error);
    }
  });
}

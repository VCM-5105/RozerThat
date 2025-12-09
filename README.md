# Rozer Learning Platform – Frontend

A simple and beginner-friendly **frontend-only** learning dashboard UI built using HTML, CSS, and Vanilla JavaScript.  
This project provides a clean authentication interface, a responsive dashboard layout, and a light/dark mode toggle.

---

## ✨ Features (Frontend Only)

- Clean UI for landing, login, register, and dashboard pages  
- Light/Dark mode toggle using CSS variables and `localStorage`  
- Responsive design for all screen sizes  
- Basic input validation for login & signup forms  
- Dashboard interface inspired by modern learning platforms  

---

## 🛠 Tech Stack

- **HTML5** – Structure  
- **CSS3** – Styling + Themes (light/dark)  
- **JavaScript (Vanilla)** – Form validation, theme switching, and UI interactions  

---

## 🎨 Light / Dark Mode

The project includes a theme toggle allowing users to switch between light and dark mode.

- Saves user preference using `localStorage`
- Applies smooth transitions
- Easy to customize by editing CSS variables

```css
:root {
  --bg-color: #ffffff;
  --text-color: #1f1f1f;
  --primary-color: #4caf50;
}

[data-theme="dark"] {
  --bg-color: #1e1e1e;
  --text-color: #f5f5f5;
}

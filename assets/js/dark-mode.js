// Dark mode functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.id = "theme-toggle";
  themeToggle.title = "Toggle Dark Mode";
  themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
  document.body.appendChild(themeToggle);

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
      themeToggle
        .querySelector("i")
        .classList.replace("bi-moon-fill", "bi-sun-fill");
    }
  }

  // Theme toggle functionality
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    const icon = themeToggle.querySelector("i");

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      icon.classList.replace("bi-moon-fill", "bi-sun-fill");
    } else {
      icon.classList.replace("bi-sun-fill", "bi-moon-fill");
    }
  });
});

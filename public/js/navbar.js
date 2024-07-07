document.addEventListener("click", (e) => {
  const menuIcon = document.querySelector("#menu-icon");
  const isMenuIcon = e.target === menuIcon;
  const navbar = document.querySelector(".navbar");
  const mainContent = document.querySelector(".main-content");
  if (isMenuIcon) {
    navbar.classList.toggle("active");
  } else {
    navbar.classList.remove("active");
  }
});

document.querySelector(".navbar").addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("resize", (e) => {
  const navbar = document.querySelector(".navbar");
  if (innerWidth > 768) {
    navbar.classList.remove("active");
  }
});

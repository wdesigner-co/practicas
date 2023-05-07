// Declarar las constantes para obtener los elementos del DOM
const contactButton = document.getElementById("contact-button");
const contactMenu = document.getElementById("contact-menu");
const closeButton = document.getElementById("close-button");

// Funcionnpara mostrar menú 
function showContactMenu(menu) {
  menu.classList.add("show");
}

// Funcion para ocultar el menú 
function hideContactMenu(menu) {
  menu.classList.remove("show");
}

// Evento al hacer click en el botón contactar
contactButton.addEventListener("click", function() {
  showContactMenu(contactMenu);
});

// Evento al hacer clic en el botón de cerrar
closeButton.addEventListener("click", function() {
  hideContactMenu(contactMenu);
});

// Evento al deslizar hacia abajo con el dedo en el menú emergente 
let startY = 0;
contactMenu.addEventListener("touchstart", function(event) {
  startY = event.touches[0].clientY;
});

contactMenu.addEventListener("touchmove", function(event) {
  const currentY = event.touches[0].clientY;
  const distance = currentY - startY;

  if (distance > 0) {
    hideContactMenu(contactMenu);
  }
});

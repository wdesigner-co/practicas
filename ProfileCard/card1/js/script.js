// Obtener los botones por su ID
var emailButton = document.getElementById("email-button");
var contactButton = document.getElementById("contact-button");

// Agregar un escucha de evento "click" para cada botón
emailButton.addEventListener("click", function() {
  // Abrir la ventana de redacción de email
  window.location.href = "mailto:wdesigner.co@gmail.com";
  // Cambiar el estilo del botón haciendo referencia a su clase CSS
  emailButton.classList.add("clicked");
});

contactButton.addEventListener("click", function() {
  // Abrir la ventana de chat de WhatsApp
  window.location.href = "https://api+mensaje+phone";
  // Cambiar el estilo del botón haciendo referencia a su clase CSS
  contactButton.classList.add("clicked");
});

// Compartir en RRSS
function share() {
  var url = "https://wdesigner.github.io/"; // Reemplaza con la URL de tu profile card
  var title = "Contrata a Alex Col | WDesigner- @wdesigner.co en instagram"; // Reemplaza con el título de tu profile card
  var hashtags = "profilecard"; // Reemplaza con los hashtags que desees incluir
  
  var twitter_url = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(title + " #" + hashtags);
  var facebook_url = "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(url);
  var linkedin_url = "https://www.linkedin.com/shareArticle?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title);
  
  window.open(twitter_url, "Compartir en Twitter", "width=600,height=300");
  window.open(facebook_url, "Compartir en Facebook", "width=600,height=300");
  window.open(linkedin_url, "Compartir en LinkedIn", "width=600,height=300");
}


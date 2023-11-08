const previewContainer = document.querySelector('.preview-container');
const form = document.querySelector('form');
const cssCode = document.querySelector('#css-code');

// Establecer valores iniciales para el flexbox
let flexValues = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

// Función para actualizar la vista previa
function updatePreview() {
  previewContainer.style.flexDirection = flexValues.flexDirection;
  previewContainer.style.justifyContent = flexValues.justifyContent;
  previewContainer.style.alignItems = flexValues.alignItems;

  // Actualizar el código CSS generado
  const code = `
    .preview-container {
      display: flex;
      flex-direction: ${flexValues.flexDirection};
      justify-content: ${flexValues.justifyContent};
      align-items: ${flexValues.alignItems};
    }
  
  `;
  cssCode.value = code.trim();
}

// Función para manejar el envío del formulario
function handleFormSubmit(e) {
  e.preventDefault();
  flexValues.flexDirection = form.querySelector('#flex-direction').value;
  flexValues.justifyContent = form.querySelector('#justify-content').value;
  flexValues.alignItems = form.querySelector('#align-items').value;
  updatePreview();
}

// Agregar evento de envío al formulario
form.addEventListener('submit', handleFormSubmit);

// Actualizar la vista previa con los valores iniciales
updatePreview();


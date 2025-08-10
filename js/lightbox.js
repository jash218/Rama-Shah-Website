// js/lightbox.js
document.addEventListener('DOMContentLoaded', () => {
  // Only run if we are on photo-gallery.html
  if (!window.location.pathname.endsWith('photo-gallery.html')) return;

  const images = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);

  images.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      const imgElement = document.createElement('img');
      imgElement.src = img.src;
      lightbox.innerHTML = ''; // clear previous
      lightbox.appendChild(imgElement);
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
});

// js/app.js
window.addEventListener('DOMContentLoaded', () => {
  // Fade in page
  document.body.style.opacity = '1';

  const toggle = document.getElementById('lang-toggle');
  const savedLang = localStorage.getItem('lang') || 'en';

  // Set toggle switch based on saved language
  toggle.checked = savedLang === 'gu';
  switchLanguage(savedLang);

  // Toggle change listener
  toggle.addEventListener('change', () => {
    const lang = toggle.checked ? 'gu' : 'en';
    localStorage.setItem('lang', lang);
    switchLanguage(lang);
  });

  function switchLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = el.dataset[lang];
        el.style.opacity = '1';
      }, 200);
    });
  }

  // Page transition effect
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => window.location = link.href, 500);
    });
  });

  // Book grid for publications page
  const bookGrid = document.getElementById('book-grid');
  if (bookGrid) {
    for (let i = 0; i < 32; i++) {
      const img = document.createElement('img');
      img.src = 'https://via.placeholder.com/150x200';
      img.alt = 'Book Cover';
      bookGrid.appendChild(img);
    }
  }

  document.getElementById('comment-form').addEventListener('submit', e => {
  e.preventDefault();
  const commentText = document.getElementById('comment-input').value.trim();
  if (commentText === '') return;

  const now = new Date();
  const timestamp = now.toLocaleString();

  const commentBlock = document.createElement('div');
  commentBlock.className = 'comment-thread';
  commentBlock.innerHTML = `
    <p><strong>You:</strong> ${commentText}</p>
    <small style="color: #888;">Posted on ${timestamp}</small>
    <br>
    <button onclick="replyTo(this)">Reply</button>
    <div class="replies"></div>
  `;

  document.getElementById('comments-section').appendChild(commentBlock);
  document.getElementById('comment-input').value = '';
});
  
  function postReply(button) {
  const replyBox = button.previousElementSibling;
  const text = replyBox.value.trim();
  if (!text) return;

  const now = new Date();
  const timestamp = now.toLocaleString();

  const reply = document.createElement('div');
  reply.innerHTML = `
    <p><strong class="author-reply">Author ⭐:</strong> ${text}</p>
    <small style="color: #888;">Replied on ${timestamp}</small>
  `;
  button.parentElement.replaceWith(reply);
}
});


// Function to populate book grid for a specific category
function populateBookGrid(category) {
  const gridElement = document.getElementById(`${category}-book-grid`);
  
  if (!gridElement) return;

  // Fetch PDF files for the specific category
  fetch(`assets/pdfs/${category}`)
    .then(response => response.json())
    .then(files => {
      files.forEach(file => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        const bookCover = document.createElement('img');
        bookCover.src = 'path/to/default/book-cover.png'; // Add a default book cover
        bookCover.alt = file.name;
        
        const bookTitle = document.createElement('p');
        bookTitle.textContent = file.name.replace('.pdf', '');
        
        const downloadLink = document.createElement('a');
        downloadLink.href = `assets/pdfs/${category}/${file.name}`;
        downloadLink.textContent = 'Download PDF';
        downloadLink.download = true;
        
        bookCard.appendChild(bookCover);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(downloadLink);
        
        gridElement.appendChild(bookCard);
      });
    })
    .catch(error => console.error('Error loading PDFs:', error));
}

// Populate grids when page loads
window.addEventListener('DOMContentLoaded', () => {
  populateBookGrid('prose');
  populateBookGrid('poetry');
  populateBookGrid('haiku');
  populateBookGrid('press');
});

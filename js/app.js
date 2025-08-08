// js/app.js

window.addEventListener('DOMContentLoaded', () => {
  // Fade-in effect
  document.body.style.opacity = '1';

  // Language toggle setup
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    const savedLang = localStorage.getItem('lang') || 'en';
    toggle.checked = savedLang === 'gu';
    switchLanguage(savedLang);

    toggle.addEventListener('change', () => {
      const lang = toggle.checked ? 'gu' : 'en';
      localStorage.setItem('lang', lang);
      switchLanguage(lang);
    });
  }

  function switchLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = el.dataset[lang] || el.dataset.en;
        el.style.opacity = '1';
      }, 200);
    });
  }

  // Smooth page transitions for nav links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => window.location = link.href, 500);
    });
  });

  // —— Populate “Prose” cards with the shared cover image ——
  const proseGrid = document.getElementById('prose-book-grid');
  if (proseGrid) {
    const files = [
      '99 Pankaj.pdf',
      '100 Prasadhan.pdf',
      '101 Pravdhan.pdf'
    ];

    files.forEach(name => {
      const a = document.createElement('a');
      a.href   = `pdf-viewer.html?file=assets/pdfs/prose/${encodeURIComponent(name)}`;
      a.target = '_blank';
      a.style.display        = 'inline-block';
      a.style.textAlign      = 'center';
      a.style.textDecoration = 'none';
      a.style.color          = 'inherit';
      a.style.margin         = '0.5rem';

      // Use the provided cover image for every PDF
      const img = document.createElement('img');
      img.src = 'assets/covers/wab.jpg';
      img.alt = name.replace('.pdf', '');
      a.appendChild(img);

      const cap = document.createElement('div');
      cap.textContent = name.replace('.pdf','');
      cap.style.marginTop = '0.5rem';
      cap.style.fontSize  = '0.9rem';
      a.appendChild(cap);

      proseGrid.appendChild(a);
    });
  }

  // If you have Poetry, Haiku, etc. grids and want the same cover image:
  ['poetry', 'haiku', 'press'].forEach(category => {
    const grid = document.getElementById(`${category}-book-grid`);
    if (grid) {
      // You can replace this array with real filenames when ready
      const files = ['Sample1.pdf', 'Sample2.pdf']; 
      files.forEach(name => {
        const a = document.createElement('a');
        a.href   = `pdf-viewer.html?file=assets/pdfs/${category}/${encodeURIComponent(name)}`;
        a.target = '_blank';
        a.style.display   = 'inline-block';
        a.style.textAlign = 'center';
        a.style.margin    = '0.5rem';

        const img = document.createElement('img');
        img.src = 'assets/covers/White and Blue Geometric Business Book Cover.jpg';
        img.alt = name.replace('.pdf','');
        a.appendChild(img);

        const cap = document.createElement('div');
        cap.textContent = name.replace('.pdf','');
        cap.style.marginTop = '0.5rem';
        cap.style.fontSize  = '0.9rem';
        a.appendChild(cap);

        grid.appendChild(a);
      });
    }
  });

  // Comment form (guarded in case it's not on this page)
  const form = document.getElementById('comment-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('comment-input');
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;

      const now = new Date().toLocaleString();
      const block = document.createElement('div');
      block.className = 'comment-thread';
      block.innerHTML = `
        <p><strong>You:</strong> ${text}</p>
        <small style="color:#888;">Posted on ${now}</small>
        <br>
        <button onclick="postReply(this)">Reply</button>
        <div class="replies"></div>
      `;
      document.getElementById('comments-section')?.appendChild(block);
      input.value = '';
    });
  }
});

// Reply handler (guarded)
function postReply(button) {
  const replyBox = button.previousElementSibling;
  if (!replyBox) return;
  const text = replyBox.value?.trim();
  if (!text) return;

  const now   = new Date().toLocaleString();
  const reply = document.createElement('div');
  reply.innerHTML = `
    <p><strong class="author-reply">Author ⭐:</strong> ${text}</p>
    <small style="color:#888;">Replied on ${now}</small>
  `;
  button.parentElement.replaceWith(reply);
}

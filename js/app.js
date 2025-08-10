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

    // Highlight current page in nav
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav .nav-item').forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
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

// B) GALLERY: data + renderer
const galleryData = {
  personal: [
    { src: 'assets/gallery/IMG-20250709-WA0005.jpg', alt: 'With family', en: 'With family at function', gu: 'પરિવાર સાથે કાર્યક્રમમાં' },
    { src: 'assets/gallery/IMG-20250709-WA0012.jpg', alt: 'Reading',    en: 'Reading session',         gu: 'વાંચન સત્ર' },
    { src: 'assets/gallery/IMG-20250709-WA0007.jpg', alt: 'Speech',     en: 'Speech on stage',         gu: 'મંચ પર ભાષણ' },
    { src: 'assets/gallery/IMG-20250709-WA0011.jpg', alt: 'Speech',     en: 'Speech on stage',         gu: 'મંચ પર ભાષણ' },

  ],
  awards: [
    { src: 'assets/gallery/IMG-20250709-WA0004.jpg', alt: 'Limca record', en: 'Limca Book award event',  gu: 'લિમ્કા બુક પુરસ્કાર સમારંભ' },
    { src: 'assets/gallery/WhatsApp Image 2025-07-09 at 06.26.31_3badb72f.jpg', alt: 'Felicitation', en: 'Felicitation ceremony',   gu: 'સન્માન સમારંભ' },
    { src: 'assets/gallery/IMG-20250709-WA0015.jpg', alt: 'Award talk',   en: 'Talk after receiving award', gu: 'પુરસ્કાર બાદ સંબોધન' },
  ]
};

function renderGallery(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const currentLang = (localStorage.getItem('lang') || 'en');

  items.forEach(item => {
    const fig = document.createElement('figure');
    fig.className = 'gallery-card';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt || item.en;

    const cap = document.createElement('figcaption');
    cap.className = 'img-caption';
    cap.setAttribute('data-en', item.en);
    cap.setAttribute('data-gu', item.gu);
    cap.textContent = item[currentLang];

    fig.appendChild(img);
    fig.appendChild(cap);
    container.appendChild(fig);
  });
}

// Only runs on photo-gallery.html
renderGallery('gallery-personal', galleryData.personal);
renderGallery('gallery-awards',  galleryData.awards);



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

// Open PDFs in the viewer with ?file=&title=, works for static or future items
document.addEventListener('click', (e) => {
  const a = e.target.closest('a.js-pdf[data-file]');
  if (!a) return;

  // allow Ctrl/Cmd new tab
  if (e.metaKey || e.ctrlKey) return;

  e.preventDefault();
  const file  = a.dataset.file;
  const title = a.dataset.title || a.textContent.trim();

  // Resolve relative href against current page (robust for subfolders)
  const baseHref = a.getAttribute('href') || 'pdf-viewer.html';
  const url = new URL(baseHref, window.location.href);
  url.searchParams.set('file', file);
  url.searchParams.set('title', title);

  window.location.href = url.toString();
});

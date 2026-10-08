document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.primary');
  if (toggle && nav){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.textContent = '☰';
    }));
  }

  // Portfolio filters
  const filterBtns = document.querySelectorAll('.filters button');
  const items = document.querySelectorAll('.g-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(it => {
        it.style.display = (f === 'all' || it.dataset.category === f) ? '' : 'none';
      });
    });
  });

  // Lightbox
  const lightbox = document.querySelector('.lightbox');
  if (lightbox && items.length){
    const lbImg = lightbox.querySelector('img');
    let visibleItems = [];
    let currentIndex = 0;

    function refreshVisible(){
      visibleItems = Array.from(items).filter(it => it.style.display !== 'none');
    }
    function openAt(it){
      refreshVisible();
      currentIndex = visibleItems.indexOf(it);
      lbImg.src = it.querySelector('img').src;
      lightbox.classList.add('open');
    }
    function show(delta){
      if (!visibleItems.length) return;
      currentIndex = (currentIndex + delta + visibleItems.length) % visibleItems.length;
      lbImg.src = visibleItems[currentIndex].querySelector('img').src;
    }
    items.forEach(it => it.addEventListener('click', () => openAt(it)));
    lightbox.querySelector('.close').addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.querySelector('.prev').addEventListener('click', () => show(-1));
    lightbox.querySelector('.next').addEventListener('click', () => show(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') lightbox.classList.remove('open');
      if (e.key === 'ArrowLeft') show(-1);
      if (e.key === 'ArrowRight') show(1);
    });
  }

  // Mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.primary a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Contact form (demo only — no backend)
  const form = document.querySelector('.contact-form');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✓';
      setTimeout(() => { btn.textContent = original; form.reset(); }, 1800);
    });
  }
});

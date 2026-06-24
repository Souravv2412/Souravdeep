// Navbar hamburger
document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.querySelector('.hamburger');
  var navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { navLinks.classList.remove('open'); });
    });
  }

  // Mark active nav link
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    var href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // LIGHTBOX
  var lb = document.createElement('div');
  lb.className = 'lb-overlay';
  lb.innerHTML = '<div class="lb-img-wrap"><button class="lb-close" aria-label="Close">&times;</button><button class="lb-nav lb-prev" aria-label="Previous">&#8249;</button><img src="" alt="Enlarged photo"><button class="lb-nav lb-next" aria-label="Next">&#8250;</button><div class="lb-counter"></div></div>';
  document.body.appendChild(lb);

  var lbImg     = lb.querySelector('img');
  var lbCounter = lb.querySelector('.lb-counter');
  var gallery   = [];
  var current   = 0;

  function buildGallery() {
    gallery = Array.from(document.querySelectorAll('.photo-grid img, .inv-body img'))
      .filter(function(i) { return i.src && !i.classList.contains('no-lb'); });
  }

  function showImage(idx) {
    current = (idx + gallery.length) % gallery.length;
    lbImg.src = gallery[current].src;
    lbImg.alt = gallery[current].alt || '';
    lbCounter.textContent = gallery.length > 1 ? (current + 1) + ' / ' + gallery.length : '';
  }

  function openLb(img) {
    buildGallery();
    var idx = gallery.indexOf(img);
    showImage(idx >= 0 ? idx : 0);
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(function(){ lbImg.src = ''; }, 300);
  }

  document.addEventListener('click', function(e) {
    var t = e.target;
    // image click
    if (t.tagName === 'IMG' && !t.classList.contains('no-lb')) {
      if (t.closest('.photo-grid') || t.closest('.inv-body')) { openLb(t); return; }
    }
    // backdrop
    if (t === lb) { closeLb(); return; }
    // close btn
    if (t.classList.contains('lb-close')) { closeLb(); return; }
    // prev
    if (t.classList.contains('lb-prev') || (t.closest && t.closest('.lb-prev'))) { showImage(current - 1); return; }
    // next
    if (t.classList.contains('lb-next') || (t.closest && t.closest('.lb-next'))) { showImage(current + 1); return; }
  });

  document.addEventListener('keydown', function(e) {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLb();
    if (e.key === 'ArrowLeft')  showImage(current - 1);
    if (e.key === 'ArrowRight') showImage(current + 1);
  });
});

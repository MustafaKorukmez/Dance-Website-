// GC Dance Academy - Küçük Etkileşimler

// Scroll ilerleme çubuğu
const progressBar = document.getElementById('scroll-progress');

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
};

window.addEventListener('scroll', updateProgress);
updateProgress();

// Scroll ile animasyon - tüm .section öğelerine görünürlük geçişi uygular
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // yalnızca ilk görünümde uygula
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.section').forEach(element => {
  observer.observe(element);
});

// Mobil cihazlar için eğitmen kartlarında tıklama ile flip efekti
document.querySelectorAll('.instructor-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// Eğitmen slider'ı
const instructorTrack = document.querySelector('.instructor-track');
const instructorCards = instructorTrack ? Array.from(instructorTrack.querySelectorAll('.instructor-card')) : [];
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

// Kartı merkeze kaydır
const scrollToCard = (card, smooth = true) => {
  if (!instructorTrack || !card) return;
  const left = card.offsetLeft - (instructorTrack.clientWidth - card.clientWidth) / 2;
  instructorTrack.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
};

// Aktif kartı güncelle
const updateActiveCard = () => {
  if (!instructorTrack) return;
  const trackRect = instructorTrack.getBoundingClientRect();
  const center = trackRect.left + trackRect.width / 2;
  let active = instructorCards[0];
  let minDiff = Infinity;
  instructorCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const diff = Math.abs(center - cardCenter);
    if (diff < minDiff) {
      minDiff = diff;
      active = card;
    }
  });
  instructorCards.forEach(card => card.classList.toggle('active', card === active));
};

if (instructorTrack) {
  // Başlangıçta ikinci kartı merkezle
  scrollToCard(instructorCards[1] || instructorCards[0], false);
  updateActiveCard();
  instructorTrack.addEventListener('scroll', () => window.requestAnimationFrame(updateActiveCard));
  window.addEventListener('resize', updateActiveCard);

  // Mouse tekerleğini yatay kaydırma için kullan
  instructorTrack.addEventListener('wheel', e => {
    e.preventDefault();
    instructorTrack.scrollBy({ left: e.deltaY, behavior: 'smooth' });
  }, { passive: false });
}

// Butonlar ile navigasyon
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    const index = instructorCards.findIndex(card => card.classList.contains('active'));
    if (index > 0) scrollToCard(instructorCards[index - 1]);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    const index = instructorCards.findIndex(card => card.classList.contains('active'));
    if (index < instructorCards.length - 1) scrollToCard(instructorCards[index + 1]);
  });
}

// Klavye yön tuşları
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevBtn?.click();
  if (e.key === 'ArrowRight') nextBtn?.click();
});

// Hamburger menü
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Menüden bağlantı seçildiğinde menüyü kapat
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Galeri görselleri için modal
const galleryImages = document.querySelectorAll('.gallery-grid img');
const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = imageModal.querySelector('.close');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    imageModal.classList.add('show');
  });
});

imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal || e.target === modalClose) {
    imageModal.classList.remove('show');
    modalImg.src = '';
  }
});

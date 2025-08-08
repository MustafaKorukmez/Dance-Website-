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

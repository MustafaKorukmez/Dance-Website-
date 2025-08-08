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

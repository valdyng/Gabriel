/**
 * Gabriel Christian Wicaksana - Profile Card Interactivity
 * Card Wave Theme Transition & Subtitle Typewriter
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Typewriter
  initTypewriter();

  // 2. Inisialisasi Animasi Wave Theme Khusus di Card
  initCardWaveThemeToggle();
});

/* --------------------------------------------------------------------------
   1. Typewriter Animation
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = [
    'Software Developer',
    'Fullstack Engineer',
    'Backend & API Builder',
    'Problem Solver'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseEnd = 1600;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 350;
    }

    setTimeout(type, delay);
  }

  type();
}

/* --------------------------------------------------------------------------
   2. Card-Level Wave Theme Toggle (Menyapu Kartu dari Kiri ke Kanan)
   -------------------------------------------------------------------------- */
function initCardWaveThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const cardWave = document.getElementById('card-wave');
  if (!toggleBtn || !cardWave) return;

  // Baca tema tersimpan
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  let isTransitioning = false;

  toggleBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Warna permukaan gelombang yang menyapu kartu
    const targetBg = nextTheme === 'light'
      ? 'linear-gradient(110deg, #e2e8f0 0%, #ffffff 50%, #f1f5f9 100%)'
      : 'linear-gradient(110deg, #0b0f19 0%, #111827 50%, #0d131f 100%)';

    cardWave.style.background = targetBg;

    // Picu animasi wave menyapu dari kiri ke kanan pada kartu
    cardWave.classList.remove('animating');
    void cardWave.offsetWidth; // Force reflow
    cardWave.classList.add('animating');

    // Ubah tema saat gelombang menyapu separuh kartu (~380ms)
    setTimeout(() => {
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    }, 380);

    // Selesaikan animasi dan bersihkan kelas (~900ms)
    setTimeout(() => {
      cardWave.classList.remove('animating');
      cardWave.style.background = '';
      isTransitioning = false;
    }, 900);
  });
}

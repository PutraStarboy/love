const container = document.querySelector('.love-container');
const heartCenter = document.querySelector('.heart-center');

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Buat love kecil dengan animasi terbang dari (x,y)
function createHeartParticle(x, y, sizeOverride) {
  const heart = document.createElement('div');
  heart.classList.add('heart-particle');

  // Ukuran random atau override besar jika diberi
  const size = sizeOverride ?? random(15, 28);
  heart.style.width = size + 'px';
  heart.style.height = size + 'px';

  heart.style.left = x + 'px';
  heart.style.top = y + 'px';

  // Arah dan jarak terbang acak
  const angle = random(0, 2 * Math.PI);
  const distance = random(150, 450);

  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const duration = 1200; // durasi animasi ms
    const progress = Math.min(elapsed / duration, 1);

    const currentX = x + Math.cos(angle) * distance * progress;
    const currentY = y + Math.sin(angle) * distance * progress;

    heart.style.left = currentX + 'px';
    heart.style.top = currentY + 'px';
    heart.style.opacity = 1 - progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      heart.remove();
    }
  }

  container.appendChild(heart);
  requestAnimationFrame(animate);
}

// Ledakan love besar saat klik
heartCenter.addEventListener('click', () => {
  const rect = heartCenter.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Banyaknya ledakan love kecil (lebih banyak)
  const particlesCount = 80;
  for(let i = 0; i < particlesCount; i++) {
    createHeartParticle(centerX, centerY, random(20, 40));
  }

  // Animasi sembunyi love besar sebentar
  heartCenter.style.pointerEvents = 'none';
  heartCenter.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  heartCenter.style.transform = 'rotate(-45deg) scale(0)';
  heartCenter.style.opacity = '0';

  setTimeout(() => {
    heartCenter.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    heartCenter.style.transform = 'rotate(-45deg) scale(1)';
    heartCenter.style.opacity = '1';
    heartCenter.style.pointerEvents = 'auto';
  }, 700);
});

// Fungsi untuk munculkan love kecil random di layar terus menerus
function spawnRandomHearts() {
  const maxHearts = 25; // jumlah love random yang muncul terus
  for(let i = 0; i < maxHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');

    const size = random(10, 20);
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';

    // Posisi random di viewport
    heart.style.left = random(0, window.innerWidth) + 'px';
    heart.style.top = random(0, window.innerHeight) + 'px';

    // Animasi simple gerak naik dan fade out
    let start = null;
    const startX = parseFloat(heart.style.left);
    const startY = parseFloat(heart.style.top);
    const distanceY = random(60, 150);
    const duration = random(3500, 6000);

    function animate(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      heart.style.top = startY - distanceY * progress + 'px';
      heart.style.opacity = 1 - progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Reset posisi dan animasi ulang
        heart.style.left = random(0, window.innerWidth) + 'px';
        heart.style.top = random(window.innerHeight - 30, window.innerHeight) + 'px';
        heart.style.opacity = '1';
        start = null;
        requestAnimationFrame(animate);
      }
    }

    container.appendChild(heart);
    requestAnimationFrame(animate);
  }
}

// Mulai munculkan love random kecil secara terus-menerus
spawnRandomHearts();

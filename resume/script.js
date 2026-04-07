/* ============================================================
   이력서 인터랙션 스크립트
   ============================================================ */

/* ── 다크모드 토글 ────────────────────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ── 모바일 햄버거 메뉴 ──────────────────────────────────── */
const menuToggle  = document.getElementById('menu-toggle');
const mobileMenu  = document.getElementById('mobile-menu');
const iconMenu    = document.getElementById('icon-menu');
const iconClose   = document.getElementById('icon-close');

menuToggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');

  if (isOpen) {
    mobileMenu.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
  } else {
    mobileMenu.classList.remove('hidden');
    iconMenu.classList.add('hidden');
    iconClose.classList.remove('hidden');
  }
});

// 모바일 메뉴 링크 클릭 시 자동 닫기
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

/* ── 스크롤 시 네비 그림자 ───────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('shadow-sm');
  } else {
    navbar.classList.remove('shadow-sm');
  }
});

/* ── 스크롤 상단 버튼 ────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Hero 타이핑 효과 ────────────────────────────────────── */
const typingTarget = document.getElementById('typing-text');
const phrases = [
  '프론트엔드 개발자입니다',
  'UI/UX를 사랑합니다',
  '성능 최적화에 관심이 많습니다',
  '깔끔한 코드를 추구합니다',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    // 지우기
    typingTarget.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
  } else {
    // 타이핑
    typingTarget.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
  }

  // 타이핑 완료 → 잠시 멈추고 지우기 시작
  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => { isDeleting = true; typeEffect(); }, 1800);
    return;
  }

  // 지우기 완료 → 다음 문장으로
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}

// 페이지 로드 후 잠시 뒤 시작
setTimeout(typeEffect, 800);

/* ── Intersection Observer: 페이드인 + 스킬바 ───────────── */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    // 페이드인 애니메이션 활성화
    el.classList.add('visible');

    // 스킬 바 애니메이션: .fade-in-up 안에 있는 .skill-bar 처리
    el.querySelectorAll('.skill-bar').forEach(bar => {
      const level = bar.style.getPropertyValue('--level');
      bar.style.width = level;
    });

    observer.unobserve(el);
  });
}, observerOptions);

// 페이드인 대상 요소 등록
document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

/* ── 부드러운 앵커 스크롤 (구형 브라우저 대응) ────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    const navHeight = navbar.offsetHeight;
    const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── 현재 섹션 네비 활성화 ───────────────────────────────── */
const sections  = document.querySelectorAll('main > section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = entry.target.id;
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('text-primary-600',  isActive);
      link.classList.toggle('dark:text-primary-400', isActive);
      link.classList.toggle('font-semibold', isActive);
    });
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

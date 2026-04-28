// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 50
});


// ✅ MOLECULAR PARTICLE ANIMATION
window.addEventListener("load", () => {
    if (typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80 },
                color: { value: ["#38bdf8", "#22c55e", "#a78bfa"] },
                shape: { type: "circle" },
                opacity: { value: 0.7 },
                size: { value: 4 },
                line_linked: {
                    enable: true,
                    distance: 130,
                    color: "#38bdf8",
                    opacity: 0.5,
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 2
                }
            },
            interactivity: {
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    grab: {
                        distance: 150,
                        line_linked: { opacity: 1 }
                    },
                    push: {
                        particles_nb: 6
                    }
                }
            },
            retina_detect: true
        });
    }
});


// Cursor Glow Effect
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
});


// Login Modal Logic
const modal = document.getElementById('loginModal');
const openBtn = document.getElementById('openLoginBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitLogin = document.getElementById('submitLoginBtn');
const loginMsg = document.getElementById('loginMessage');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.classList.remove('active');
    loginMsg.innerHTML = '';
    document.body.style.overflow = 'auto';
}

if (openBtn) openBtn.addEventListener('click', openModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModalFunc);

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });
}



// Smooth scroll — offset for sticky nav on mobile only
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            if (window.innerWidth <= 768) {
                // Close the drawer first, then scroll after it collapses
                const navLinksEl = document.querySelector('.nav-links');
                const toggleEl = document.getElementById('navToggle');
                if (navLinksEl) navLinksEl.classList.remove('open');
                if (toggleEl) toggleEl.classList.remove('open');
                // Wait for drawer transition (350ms) to finish, then scroll
                setTimeout(() => {
                    const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                    const top = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 8;
                    window.scrollTo({ top, behavior: 'smooth' });
                }, 360);
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});


// Scroll spy
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Card hover
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});


// Cursor hover effect
document.querySelectorAll('button, .login-btn, .nav-links a').forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (cursorGlow) {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
        }
    });
    button.addEventListener('mouseleave', () => {
        if (cursorGlow) {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
});
// ── Mobile hamburger toggle ───────────────────────────────
(function () {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (!navLinks.contains(e.target) && e.target !== toggle) {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }
  });
})();

// ── Mobile dropdown toggle (touch-friendly) ──────────────
(function () {
  const dropBtn = document.querySelector('.dropbtn');
  const dropContent = document.querySelector('.dropdown-content');
  if (!dropBtn || !dropContent) return;

  dropBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = dropContent.style.opacity === '1';
    if (isOpen) {
      dropContent.style.opacity = '0';
      dropContent.style.visibility = 'hidden';
      dropContent.style.transform = 'translateY(10px)';
    } else {
      dropContent.style.opacity = '1';
      dropContent.style.visibility = 'visible';
      dropContent.style.transform = 'translateY(0)';
      dropContent.style.display = 'block';
    }
  });

  // Close when clicking outside
  document.addEventListener('click', function () {
    dropContent.style.opacity = '0';
    dropContent.style.visibility = 'hidden';
    dropContent.style.transform = 'translateY(10px)';
  });
})();

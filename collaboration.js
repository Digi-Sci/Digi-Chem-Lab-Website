/* ============================================================
   collaborate.js — Collaborate With Us Page
   ============================================================ */


/* ============================================================
   1. EMAILJS CONFIG  ← Replace these values with yours
   ============================================================ */
const EMAILJS_CONFIG = {
  publicKey:   '7WbiGKQP6WXStFQQT',
  serviceID:   'service_zp09wna8y',
  templateID:  'template_q5q7b8k'
};

emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });


/* ============================================================
   2. EMAIL MODAL — OPEN / CLOSE
   ============================================================ */
function openEmailOptions() {
  document.getElementById('emailModal').classList.add('show');
  document.body.style.overflow = 'hidden';
  document.getElementById('collaborationForm').reset();
  var status = document.getElementById('formStatus');
  status.className = 'form-status';
  status.textContent = '';
}

function closeEmailModal() {
  document.getElementById('emailModal').classList.remove('show');
  document.body.style.overflow = '';
}

/* Close on backdrop click */
document.addEventListener('touchend', function(e) {
  if (e.target === document.getElementById('emailModal')) closeEmailModal();
});
document.addEventListener('click', function(e) {
  if (e.target === document.getElementById('emailModal')) closeEmailModal();
});

/* Close on Escape key */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeEmailModal();
});


/* ============================================================
   3. SEND EMAIL VIA EMAILJS
   ============================================================ */
function sendEmail(e) {
  e.preventDefault();

  var form   = document.getElementById('collaborationForm');
  var btn    = document.getElementById('submitBtn');
  var status = document.getElementById('formStatus');

  /* Basic HTML5 validation */
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  /* Loading state */
  btn.disabled = true;
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>Sending…</span>';
  status.className = 'form-status';
  status.textContent = '';

  /* Build explicit params object — avoids sendForm name-mapping issues */
  var templateParams = {
    from_name:    document.getElementById('from_name').value.trim(),
    from_email:   document.getElementById('from_email').value.trim(),
    organisation: document.getElementById('organisation').value.trim() || 'Not specified',
    collab_type:  document.getElementById('collab_type').value,
    message:      document.getElementById('message').value.trim()
  };

  emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
    .then(function () {
      status.className = 'form-status status-success';
      status.textContent = '✓ Message sent! We\'ll be in touch soon.';
      form.reset();
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Sent!</span>';
      setTimeout(function () {
        btn.disabled = false;
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg><span>Send Message</span>';
      }, 3000);
    }, function (error) {
      status.className = 'form-status status-error';
      status.textContent = '✗ Something went wrong (' + (error.text || 'unknown error') + '). Please try again.';
      btn.disabled = false;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg><span>Send Message</span>';
    });
}


/* ============================================================
   4. NAV — click toggle for mobile (CSS hover handles desktop)
   ============================================================ */
(function () {
  var btn     = document.querySelector('.dropbtn');
  var content = document.querySelector('.dropdown-content');
  if (!btn || !content) return;

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = content.style.opacity === '1';
    if (isOpen) {
      content.style.opacity    = '0';
      content.style.visibility = 'hidden';
      content.style.transform  = 'translateY(10px)';
    } else {
      content.style.opacity    = '1';
      content.style.visibility = 'visible';
      content.style.transform  = 'translateY(0)';
    }
  });

  document.addEventListener('click', function () {
    content.style.opacity    = '0';
    content.style.visibility = 'hidden';
    content.style.transform  = 'translateY(10px)';
  });
})();


/* ============================================================
   5. FLOATING PARTICLES GENERATOR
   ============================================================ */
(function generateParticles() {
  var container = document.getElementById('particles');
  for (var i = 0; i < 14; i++) {
    var p = document.createElement('div');
    p.className = 'particle';
    var size = Math.random() * 10 + 4;
    p.style.cssText = [
      'width:'              + size + 'px',
      'height:'             + size + 'px',
      'left:'               + (Math.random() * 100) + '%',
      'animation-duration:' + (Math.random() * 14 + 10) + 's',
      'animation-delay:'    + (Math.random() * 12) + 's',
      'opacity:'            + (Math.random() * 0.4 + 0.1)
    ].join(';');
    container.appendChild(p);
  }
})();


/* ============================================================
   6. RIPPLE EFFECT ON CARD CLICK
   ============================================================ */
function ripple(el) {
  el.classList.remove('ripple');
  void el.offsetWidth;
  el.classList.add('ripple');
  setTimeout(function() { el.classList.remove('ripple'); }, 700);
}


/* ============================================================
   7. 3D TILT EFFECT ON MOUSE MOVE (desktop / pointer only)
   ============================================================ */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        'translateY(-10px) scale(1.02) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 6) + 'deg)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
}
// Reveal sections on scroll
window.addEventListener('scroll', () => {
  document.querySelectorAll('section').forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
      sec.classList.add('show');
    }
  });
});

// WhatsApp send message
function contactWhatsApp(item) {
  const msg = encodeURIComponent(`Hello! I’d like more details about your ${item}.`);
  window.open(`https://wa.me/918826074560?text=${msg}`, '_blank');
}
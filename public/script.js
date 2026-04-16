document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('navMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            toggle.setAttribute('aria-label',
                menu.classList.contains('open') ? 'Close navigation' : 'Open navigation'
            );
        });

        menu.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', () => menu.classList.remove('open'))
        );

        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('open');
            }
        });
    }

    // Scroll reveal
    const reveal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                reveal.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.post-card, .cat-card, .hero-float-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(32px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        reveal.observe(el);
    });

    // Add CSS class for revealed elements
    const style = document.createElement('style');
    style.textContent = '.revealed{opacity:1!important;transform:translateY(0)!important}';
    document.head.appendChild(style);

    // Sticky header shadow on scroll
    const header = document.getElementById('siteHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,0.06)' : 'none';
        }, { passive: true });
    }
});
/*!
* Modern Professional Portfolio - Enhanced Scripts
* Custom JavaScript for Moustapha Daouda Dala's Portfolio
*/

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const animateElements = document.querySelectorAll('.experience-item, .education-item, .project-card, .award-item, .publication-item, .conference-item, .skill-item, .competency-item');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                observer.unobserve(el);
                // Hand control back to the stylesheet so hover effects aren't delayed
                el.addEventListener('transitionend', () => {
                    el.style.transition = '';
                    el.style.transform = '';
                    el.style.opacity = '';
                }, { once: true });
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

        animateElements.forEach(el => {
            // Stagger only among siblings in the same group, capped so nothing waits long
            const siblingIndex = Array.prototype.indexOf.call(el.parentElement.children, el);
            const delay = Math.min(siblingIndex, 4) * 0.05;
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            el.style.transition = `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`;
            observer.observe(el);
        });
    }

    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Add parallax effect to sections (subtle)
    let ticking = false;
    
    const parallaxScroll = () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.resume-section');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.05;
            const yPos = -(scrolled * speed);
            element.style.backgroundPositionY = `${yPos}px`;
        });
        
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(parallaxScroll);
            ticking = true;
        }
    });

    // Add dynamic year to footer if exists
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Enhance external links (open in new tab)
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Console welcome message
    console.log('%c👋 Hello! Welcome to my portfolio.', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cInterested in working together? Let\'s connect!', 'font-size: 14px; color: #64748b;');

});

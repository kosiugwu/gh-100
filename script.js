// Smooth Scroll Function
function scrollToDownload() {
    const downloadSection = document.getElementById('download');
    downloadSection.scrollIntoView({ behavior: 'smooth' });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and sections
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add scroll event for navbar effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 58, 122, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 58, 122, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .hero-text {
        animation: slideInLeft 0.8s ease-out forwards;
    }

    .hero-visual {
        animation: slideInRight 0.8s ease-out forwards;
    }

    .section-title {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;

document.head.appendChild(style);

// Interactive phone screen updates
const downloadBtn = document.querySelector('.btn-primary');
downloadBtn.addEventListener('mouseenter', () => {
    const screenContent = document.querySelector('.screen-content');
    screenContent.style.transform = 'scale(0.98)';
    screenContent.style.transition = 'transform 0.3s ease';
});

downloadBtn.addEventListener('mouseleave', () => {
    const screenContent = document.querySelector('.screen-content');
    screenContent.style.transform = 'scale(1)';
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn, .download-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .download-btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(rippleStyle);

// Lazy load images and optimize performance
if ('IntersectionObserver' in window) {
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    });

    document.querySelectorAll('[data-lazy]').forEach(el => {
        lazyLoadObserver.observe(el);
    });
}

// Track user interactions (for analytics)
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn, .download-btn, .nav-links a')) {
        console.log('User clicked:', e.target.closest('.btn, .download-btn, .nav-links a').textContent);
    }
});

// Mobile menu toggle (for future mobile optimization)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
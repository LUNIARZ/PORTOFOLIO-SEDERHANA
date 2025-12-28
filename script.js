// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Skills animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                    const progress = item.querySelector('.skill-progress');
                    const targetWidth = progress.getAttribute('data-progress');
                    progress.style.width = targetWidth + '%';
                }, index * 200);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-list');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// TradingView Widget
function initTradingViewWidget() {
    const widgetContainer = document.getElementById('tradingview-widget');
    
    if (widgetContainer && !widgetContainer.hasChildNodes()) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "autosize": true,
            "symbol": "OANDA:XAUUSD",
            "interval": "60",
            "timezone": "Asia/Jakarta",
            "theme": "dark",
            "style": "1",
            "locale": "id",
            "enable_publishing": false,
            "backgroundColor": "rgba(10, 10, 10, 1)",
            "gridColor": "rgba(42, 42, 42, 0.3)",
            "hide_top_toolbar": false,
            "hide_legend": false,
            "save_image": false,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
        });
        
        widgetContainer.appendChild(script);
    }
}

// Initialize TradingView widget when chart section is visible
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initTradingViewWidget();
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const chartSection = document.getElementById('chart');
if (chartSection) {
    chartObserver.observe(chartSection);
}

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
        alert('Mohon lengkapi semua field!');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Format email tidak valid!');
        return;
    }

    // Phone validation (Indonesian format)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
        alert('Format nomor telepon tidak valid! Gunakan format: +62xxx atau 08xxx');
        return;
    }

    // Success message
    alert('Terima kasih! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda.');
    
    // Reset form
    contactForm.reset();
    
    // In production, you would send this data to a server
    console.log('Form submitted:', formData);
});

// Scroll animations for elements
const fadeElements = document.querySelectorAll('.about-content, .skills-content, .chart-container, .info-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeObserver.observe(element);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

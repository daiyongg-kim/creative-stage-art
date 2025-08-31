/**
 * Creative Stage - Interactive JavaScript
 * Magical Creative Playground Interactions
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractions();
    initializeAnimations();
    initializeCounters();
    initializeMobileMenu();
    initializeScrollEffects();
    initializePaintCursor();
});

/**
 * Initialize all interactive elements
 */
function initializeInteractions() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Interactive feature cards
    initializeFeatureCards();
    
    // Form enhancements
    initializeFormEnhancements();
    
    // Dynamic smile counter
    initializeSmilesCounter();
}

/**
 * Handle smooth scrolling navigation
 */
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Initialize feature card interactions
 */
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s ease-out';
            
            // Add sparkle effect
            createSparkleEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Create sparkle effect on hover
 */
function createSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.top = '10px';
    sparkle.style.right = '10px';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    sparkle.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

/**
 * Initialize form enhancements
 */
function initializeFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentNode.classList.remove('focused');
                }
            });
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                validateInput(this);
            });
        });
    });
}

/**
 * Validate input and provide feedback
 */
function validateInput(input) {
    const isValid = input.checkValidity();
    const feedbackElement = input.nextElementSibling;
    
    if (isValid) {
        input.style.borderColor = 'var(--color-success)';
        if (feedbackElement && feedbackElement.classList.contains('error-message')) {
            feedbackElement.remove();
        }
    } else {
        input.style.borderColor = 'var(--color-primary)';
    }
}

/**
 * Initialize animated counters
 */
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number, .counter-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Animate counter numbers
 */
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(function() {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number with + if it's a stat
        if (element.classList.contains('stat-number')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

/**
 * Initialize mobile menu
 */
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Reset hamburger icon
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    // Parallax effect for hero background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.splash, .supply');
        
        parallax.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Header background opacity
        const header = document.querySelector('.header');
        const opacity = Math.min(scrolled / 100, 0.95);
        header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    });
    
    // Animate elements on scroll
    initializeScrollAnimations();
}

/**
 * Initialize scroll-triggered animations
 */
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.value-card, .program-card, .feature-card, .testimonial-card, .safety-item'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

/**
 * Initialize paint cursor effect
 */
function initializePaintCursor() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            createPaintDrop(e.clientX, e.clientY);
        });
    }
}

/**
 * Create paint drop effect at cursor position
 */
function createPaintDrop(x, y) {
    const paintDrop = document.createElement('div');
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9FF3', '#54A0FF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    paintDrop.style.position = 'fixed';
    paintDrop.style.left = x + 'px';
    paintDrop.style.top = y + 'px';
    paintDrop.style.width = '6px';
    paintDrop.style.height = '6px';
    paintDrop.style.borderRadius = '50%';
    paintDrop.style.backgroundColor = randomColor;
    paintDrop.style.pointerEvents = 'none';
    paintDrop.style.zIndex = '9999';
    paintDrop.style.animation = 'paintDrop 1s ease-out forwards';
    
    document.body.appendChild(paintDrop);
    
    setTimeout(() => {
        if (paintDrop.parentNode) {
            paintDrop.parentNode.removeChild(paintDrop);
        }
    }, 1000);
}

/**
 * Initialize dynamic smiles counter
 */
function initializeSmilesCounter() {
    const counterElement = document.getElementById('smileCounter');
    
    if (counterElement) {
        let currentCount = 1247;
        
        setInterval(() => {
            // Randomly add 1-3 smiles every 3-8 seconds
            currentCount += Math.floor(Math.random() * 3) + 1;
            counterElement.textContent = currentCount.toLocaleString();
            
            // Add a brief animation
            counterElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                counterElement.style.transform = 'scale(1)';
            }, 200);
        }, (Math.random() * 5 + 3) * 1000); // 3-8 seconds
    }
}

/**
 * Initialize additional animations
 */
function initializeAnimations() {
    // Add sparkle animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
        
        @keyframes paintDrop {
            0% {
                opacity: 1;
                transform: scale(0);
            }
            20% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(1.5) translateY(50px);
            }
        }
        
        @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            75% { transform: rotate(-5deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Add periodic wiggle to emojis
    setInterval(() => {
        const emojis = document.querySelectorAll('.program-icon, .feature-icon, .value-icon');
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        if (randomEmoji) {
            randomEmoji.style.animation = 'wiggle 0.5s ease-in-out';
            setTimeout(() => {
                randomEmoji.style.animation = '';
            }, 500);
        }
    }, 8000); // Every 8 seconds
}

/**
 * Close announcement bar
 */
function closeAnnouncement() {
    const announcementBar = document.getElementById('announcementBar');
    if (announcementBar) {
        announcementBar.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            announcementBar.style.display = 'none';
        }, 300);
    }
}

/**
 * Newsletter subscription
 */
function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    
    // Simulate API call
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = '✓ Subscribed!';
        button.style.background = 'var(--color-success)';
        form.querySelector('input[type="email"]').value = '';
        
        // Show success message
        showNotification('🎨 Welcome to our creative family! Check your email for free art activities.');
        
        setTimeout(() => {
            button.textContent = 'Subscribe';
            button.disabled = false;
            button.style.background = '';
        }, 3000);
    }, 1500);
}

/**
 * Show notification message
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '120px';
    notification.style.right = '20px';
    notification.style.background = 'var(--color-success)';
    notification.style.color = 'var(--color-text)';
    notification.style.padding = 'var(--spacing-md)';
    notification.style.borderRadius = 'var(--radius-lg)';
    notification.style.boxShadow = 'var(--shadow-lg)';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '300px';
    notification.style.fontSize = 'var(--font-size-small)';
    notification.style.fontWeight = '600';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease-out';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/**
 * Interactive feature implementations
 */
function openVirtualTour() {
    showNotification('🏠 Virtual tour feature coming soon! Take a peek at our magical studios.');
}

function openArtGenerator() {
    const projects = [
        'Rainbow Handprint Tree',
        'Paper Plate Animals',
        'Coffee Filter Flowers',
        'Rock Painting Adventure',
        'Tissue Paper Butterflies',
        'Egg Carton Creatures',
        'Painted Pasta Necklaces',
        'Cardboard Castle Building'
    ];
    
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    showNotification(`🎯 Today's Art Adventure: ${randomProject}! Perfect for little hands.`);
}

function openColorMixer() {
    showNotification('🎨 Color Mixer Game launching soon! Learn about primary and secondary colors through play.');
}

function openArtGallery() {
    showNotification('🖼️ Student Art Gallery opening soon! See amazing masterpieces from our little artists.');
}

/**
 * Accessibility enhancements
 */
function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = 'var(--color-primary)';
    skipLink.style.color = 'white';
    skipLink.style.padding = '8px';
    skipLink.style.borderRadius = '4px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.zIndex = '10000';
    skipLink.style.transition = 'top 0.3s';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // ARIA enhancements
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Button');
        }
    });
    
    // Focus management for mobile menu
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', initializeAccessibility);

/**
 * Performance monitoring
 */
function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }
    
    // Monitor loading performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
        }, 0);
    });
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initializePerformanceMonitoring();
}
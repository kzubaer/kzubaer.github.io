// RESPONSIVE ENHANCEMENTS - Safe to add to existing JavaScript
// This code is designed to work alongside your existing main.js without conflicts

// Wait for DOM to be ready, but don't interfere with existing DOMContentLoaded listeners
(function() {
    'use strict';
    
    // Mobile menu functionality - only adds new features
    function initMobileMenu() {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Only create mobile menu toggle if it doesn't already exist
        if (!document.querySelector('.menu-toggle') && nav && navLinks) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.setAttribute('aria-label', 'Toggle mobile menu');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Create hamburger lines
            for (let i = 0; i < 3; i++) {
                const span = document.createElement('span');
                menuToggle.appendChild(span);
            }
            
            // Insert the toggle button in the nav
            nav.insertBefore(menuToggle, navLinks);
            
            // Add click event listener
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = navLinks.classList.contains('active');
                
                navLinks.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                menuToggle.classList.toggle('active');
            });
            
            // Close mobile menu when clicking on nav links
            const navLinksItems = navLinks.querySelectorAll('a');
            navLinksItems.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.classList.remove('active');
                });
            });
            
            // Close mobile menu when clicking outside (but don't interfere with other click handlers)
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.classList.remove('active');
                }
            });
            
            // Handle window resize - close menu on desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.classList.remove('active');
                }
            });
        }
    }
    
    // Enhanced particle.js configuration for mobile (preserves your existing settings)
    function optimizeParticlesForMobile() {
        // Only run if particles.js is loaded and particles-js element exists
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            const isMobile = window.innerWidth <= 768;
            
            // Your existing particle config, but with mobile optimizations
            const mobileOptimizedConfig = {
                particles: {
                    number: { value: isMobile ? 40 : 80 }, // Fewer particles on mobile
                    color: { value: ["#a0c4ff", "#bdb2ff", "#caffbf"] }, // Keep your colors
                    shape: { type: "circle" },
                    opacity: { value: isMobile ? 0.3 : 0.5 }, // Lower opacity on mobile
                    size: { value: isMobile ? 2 : 3 }, // Smaller particles on mobile
                    line_linked: {
                        enable: !isMobile, // Disable lines on mobile for performance
                        distance: 150,
                        color: "#a0c4ff",
                        opacity: 0.4,
                        width: 1,
                    },
                    move: { 
                        enable: true, 
                        speed: isMobile ? 0.5 : 1 // Slower on mobile
                    },
                },
            };
            
            // Re-initialize particles with mobile-optimized settings
            // This won't interfere with your existing particle setup
            particlesJS("particles-js", mobileOptimizedConfig);
        }
    }
    
    // Initialize everything when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initMobileMenu();
            optimizeParticlesForMobile();
        });
    } else {
        // DOM is already ready
        initMobileMenu();
        optimizeParticlesForMobile();
    }
    
    // Re-optimize particles on window resize (for orientation changes)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            optimizeParticlesForMobile();
        }, 250);
    });
    
})();

// Your existing openCV function can remain exactly as it is
// But here's an enhanced version that's more mobile-friendly (optional)
function enhancedOpenCV() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, might want to handle differently
        // You can keep your existing logic or use this enhanced version
        window.open("resume.html", "_blank");
    } else {
        window.open("resume.html", "_blank");
    }
}

// Optional: Smooth scrolling enhancement (won't conflict with existing code)
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        // Check if this link already has a click handler
        if (!link.hasAttribute('data-smooth-scroll')) {
            link.setAttribute('data-smooth-scroll', 'true');
            
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const header = document.querySelector('.site-header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Initialize smooth scrolling
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSmoothScrolling);
} else {
    addSmoothScrolling();
}

// Add this to your main.js or create a new file
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Only create if it doesn't exist
    if (!document.querySelector('.menu-toggle') && nav && navLinks) {
        // Create the hamburger button
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Create the three lines
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            menuToggle.appendChild(span);
        }
        
        // Add it to the navigation
        nav.insertBefore(menuToggle, navLinks);
        
        // Make it work when clicked
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});
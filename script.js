// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    let menuOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        if (!menuOpen) {
            // Create mobile menu
            const mobileMenu = document.createElement('div');
            mobileMenu.classList.add('mobile-menu');
            
            // Clone nav links and buttons
            const navLinksClone = navLinks.cloneNode(true);
            const navButtonsClone = navButtons.cloneNode(true);
            
            // Append to mobile menu
            mobileMenu.appendChild(navLinksClone);
            mobileMenu.appendChild(navButtonsClone);
            
            // Add mobile menu after header
            const header = document.querySelector('header');
            header.after(mobileMenu);
            
            // Animate menu button
            mobileMenuBtn.classList.add('open');
            
            // Add styles for mobile menu
            const style = document.createElement('style');
            style.id = 'mobile-menu-styles';
            style.innerHTML = `
                .mobile-menu {
                    background-color: white;
                    padding: 20px;
                    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                }
                
                .mobile-menu .nav-links {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                
                .mobile-menu .nav-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .mobile-menu-btn.open span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .mobile-menu-btn.open span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-btn.open span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            `;
            document.head.appendChild(style);
            
            menuOpen = true;
        } else {
            // Remove mobile menu
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.remove();
            }
            
            // Remove mobile menu styles
            const mobileMenuStyles = document.getElementById('mobile-menu-styles');
            if (mobileMenuStyles) {
                mobileMenuStyles.remove();
            }
            
            // Reset menu button
            mobileMenuBtn.classList.remove('open');
            
            menuOpen = false;
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuOpen) {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.remove();
            }
            
            const mobileMenuStyles = document.getElementById('mobile-menu-styles');
            if (mobileMenuStyles) {
                mobileMenuStyles.remove();
            }
            
            mobileMenuBtn.classList.remove('open');
            
            menuOpen = false;
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (menuOpen) {
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu) {
                    mobileMenu.remove();
                }
                
                const mobileMenuStyles = document.getElementById('mobile-menu-styles');
                if (mobileMenuStyles) {
                    mobileMenuStyles.remove();
                }
                
                mobileMenuBtn.classList.remove('open');
                
                menuOpen = false;
            }
        });
    });
    
    // Animate stats on scroll
    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-item h3');
    
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (statsPosition < screenPosition) {
            statNumbers.forEach(stat => {
                const targetNumber = stat.textContent;
                let currentNumber = 0;
                const increment = Math.ceil(parseInt(targetNumber.replace(/[^0-9]/g, '')) / 50);
                const duration = 1500; // ms
                const interval = duration / (parseInt(targetNumber.replace(/[^0-9]/g, '')) / increment);
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    
                    if (currentNumber >= parseInt(targetNumber.replace(/[^0-9]/g, ''))) {
                        stat.textContent = targetNumber;
                        clearInterval(counter);
                    } else {
                        if (targetNumber.includes('M')) {
                            stat.textContent = currentNumber + 'M+';
                        } else if (targetNumber.includes('B')) {
                            stat.textContent = '$' + currentNumber + 'B+';
                        } else {
                            stat.textContent = currentNumber + '+';
                        }
                    }
                }, interval);
            });
            
            animated = true;
        }
    }
    
    // Check if stats are in view on scroll
    window.addEventListener('scroll', animateStats);
    
    // Check on page load
    animateStats();
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `50% ${scrollPosition * 0.5}px`;
    });
    
    // Product card hover effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
// SolarPro Website JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Form Validation
    initFormValidation();
    
    // Portfolio Filtering
    initPortfolioFilters();
    
    // Smooth Scrolling for Anchor Links
    initSmoothScrolling();
    
    // Testimonial Slider (if present)
    initTestimonialSlider();
});

/**
 * Initialize Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuButton.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

/**
 * Initialize Form Validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const subscribeForm = document.getElementById('subscribe-form');
    
    // Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            
            // Validate Name
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            
            if (!nameInput.value.trim()) {
                nameError.classList.remove('hidden');
                isValid = false;
            } else {
                nameError.classList.add('hidden');
            }
            
            // Validate Email
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.classList.remove('hidden');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
            }
            
            // Validate Phone
            const phoneInput = document.getElementById('phone');
            const phoneError = document.getElementById('phone-error');
            const phonePattern = /^[\d\s\+\-\(\)]{10,15}$/;
            
            if (!phonePattern.test(phoneInput.value.trim())) {
                phoneError.classList.remove('hidden');
                isValid = false;
            } else {
                phoneError.classList.add('hidden');
            }
            
            // Validate Message
            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            
            if (!messageInput.value.trim()) {
                messageError.classList.remove('hidden');
                isValid = false;
            } else {
                messageError.classList.add('hidden');
            }
            
            // If form is valid, show success message and reset form
            if (isValid) {
                const formSuccess = document.getElementById('form-success');
                formSuccess.classList.remove('hidden');
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }
        });
    }
    
    // Subscribe Form Validation
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = document.getElementById('subscribe-email');
            const emailError = document.getElementById('subscribe-email-error');
            const subscribeSuccess = document.getElementById('subscribe-success');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.classList.remove('hidden');
                subscribeSuccess.classList.add('hidden');
            } else {
                emailError.classList.add('hidden');
                subscribeSuccess.classList.remove('hidden');
                subscribeForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    subscribeSuccess.classList.add('hidden');
                }, 5000);
            }
        });
    }
}

/**
 * Initialize Portfolio Filters
 */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-green-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-800');
                });
                
                // Add active class to clicked button
                this.classList.remove('bg-gray-200', 'text-gray-800');
                this.classList.add('bg-green-600', 'text-white');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filter === 'all') {
                        item.classList.remove('hidden');
                    } else if (item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
}

/**
 * Initialize Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Testimonial Slider
 */
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevButton = document.getElementById('testimonial-prev');
    const nextButton = document.getElementById('testimonial-next');
    
    if (testimonialSlider && testimonials.length > 0 && prevButton && nextButton) {
        let currentIndex = 0;
        
        // Show current testimonial and hide others
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    testimonial.classList.remove('hidden');
                } else {
                    testimonial.classList.add('hidden');
                }
            });
        }
        
        // Initialize with first testimonial visible
        showTestimonial(currentIndex);
        
        // Previous button click
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Next button click
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
}

/**
 * Create a folder for images if it doesn't exist
 */
function createImagesFolder() {
    // This function is a placeholder since JavaScript in the browser
    // cannot create folders on the server. This would need to be
    // implemented server-side.
    console.log('Images folder would be created server-side');
}
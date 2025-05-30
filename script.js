
document.addEventListener('DOMContentLoaded', function() {
    // Page Navigation
    initPageNavigation();
    
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Gallery Filtering
    initGalleryFilters();
    
    // Form Submission
    initContactForm();
});
function initPageNavigation() {
    // Get all navigation links with data-page attribute
    const navLinks = document.querySelectorAll('a[data-page]');
    
    // Add click event to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get page ID from data attribute
            const pageId = this.getAttribute('data-page');
            
            // Navigate to the selected page
            navigateToPage(pageId);
            
            // Update active state in navigation
            updateActiveNavLink(pageId);
        });
    });

    
    const pageButtons = document.querySelectorAll('.btn[data-page]');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            navigateToPage(pageId);
            updateActiveNavLink(pageId);
        });
    });

    
    function navigateToPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Update active state in navigation links
    function updateActiveNavLink(pageId) {
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current nav link
        document.querySelector(`a[data-page="${pageId}"]`).classList.add('active');
    }
}

// Initialize Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        
        // Change icon based on menu state
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when a nav item is clicked
    const navItems = document.querySelectorAll('.nav-menu a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Close menu when clicking outside of it
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('show');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Initialize Gallery Filters
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value from button
            const filter = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    // Show matching items with fade-in effect
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Hide non-matching items
                    item.style.opacity = 0;
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                showFormAlert('Please fill all required fields', 'error');
                return;
            }
            
            // Email validation with regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (would be replaced with actual AJAX submission)
            const formButton = contactForm.querySelector('button[type="submit"]');
            const originalText = formButton.innerHTML;
            
            // Show loading state
            formButton.disabled = true;
            formButton.innerHTML = 'Sending...';
            
            // Simulate API call delay
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                formButton.disabled = false;
                formButton.innerHTML = originalText;
                
                // Show success message
                showFormAlert('Your message has been sent successfully! We\'ll be in touch soon.', 'success');
            }, 1500);
        });
    }
    
    // Function to show form alerts
    function showFormAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert element
        const alertElement = document.createElement('div');
        alertElement.className = `form-alert alert-${type}`;
        alertElement.innerHTML = message;
        
        // Insert alert before the form
        contactForm.parentNode.insertBefore(alertElement, contactForm);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            alertElement.style.opacity = 0;
            setTimeout(() => {
                alertElement.remove();
            }, 300);
        }, 5000);
        
        // Add the alert styles if not already in CSS
        if (!document.getElementById('alert-styles')) {
            const alertStyles = document.createElement('style');
            alertStyles.id = 'alert-styles';
            alertStyles.innerHTML = `
                .form-alert {
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                    border-radius: 5px;
                    opacity: 1;
                    transition: opacity 0.3s ease;
                }
                .alert-success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .alert-error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
            `;
            document.head.appendChild(alertStyles);
        }
    }
}

// Helper function to handle image modal/lightbox for gallery
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create modal elements if they don't exist
    if (!document.getElementById('gallery-modal')) {
        const modal = document.createElement('div');
        modal.id = 'gallery-modal';
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img id="modal-img" src="" alt="Gallery Image">
                <h3 id="modal-title"></h3>
                <p id="modal-desc"></p>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.innerHTML = `
            .gallery-modal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.9);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .modal-content {
                position: relative;
                margin: auto;
                padding: 20px;
                width: 80%;
                max-width: 900px;
                text-align: center;
                top: 50%;
                transform: translateY(-50%);
            }
            .modal-close {
                position: absolute;
                top: 10px;
                right: 10px;
                color: white;
                font-size: 40px;
                font-weight: bold;
                cursor: pointer;
                z-index: 2010;
            }
            #modal-img {
                width: 100%;
                max-height: 80vh;
                object-fit: contain;
            }
            #modal-title {
                color: white;
                margin-top: 1rem;
            }
            #modal-desc {
                color: #ddd;
            }
        `;
        document.head.appendChild(modalStyles);
        
        // Add close functionality to modal
        const closeBtn = document.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Add click event to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('.gallery-caption h3').textContent;
            const desc = this.querySelector('.gallery-caption p').textContent;
            
            // Set modal content
            document.getElementById('modal-img').src = imgSrc;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-desc').textContent = desc;
            
            // Show modal with fade-in effect
            const modal = document.getElementById('gallery-modal');
            modal.style.display = 'block';
            setTimeout(() => {
                modal.style.opacity = 1;
            }, 10);
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal function
    function closeModal() {
        const modal = document.getElementById('gallery-modal');
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
    }
    
    // Close modal when clicking outside of content
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('gallery-modal');
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Initialize gallery lightbox on page load
document.addEventListener('DOMContentLoaded', function() {
    initGalleryLightbox();
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only apply to actual hash links, not page navigation
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Handle blog "Read More" buttons
document.addEventListener('DOMContentLoaded', function() {
    const blogButtons = document.querySelectorAll('.blog-btn');
    
    blogButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get parent article
            const blogPost = this.closest('.blog-post');
            const blogTitle = blogPost.querySelector('h2').textContent;
            
            alert(`Full blog post "${blogTitle}" would open here in a real application.`);
        });
    });
});

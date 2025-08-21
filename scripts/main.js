/**
 * Livraria Entrelinhas - Main JavaScript File
 * Following Clean Code Principles
 */

// ==========================================================================
// Constants and Configuration
// ==========================================================================

const CONFIG = {
    ANIMATION_DURATION: 300,
    SCROLL_OFFSET: 80,
    INTERSECTION_THRESHOLD: 0.1,
    BOOK_CATEGORIES: {
        ALL: 'all',
        TECNOLOGIA: 'tecnologia',
        FICCAO: 'ficcao',
        DESENVOLVIMENTO: 'desenvolvimento',
        CIENCIA: 'ciencia'
    }
};

const SELECTORS = {
    NAV_TOGGLE: '#nav-toggle',
    NAV_MENU: '#nav-menu',
    NAV_LINKS: '.nav__link',
    FILTER_BUTTONS: '.filter-btn',
    BOOKS_GRID: '#books-grid',
    CONTACT_FORM: '#contact-form',
    HEADER: '.header'
};

// ==========================================================================
// Book Data - Following Single Responsibility Principle
// ==========================================================================

const bookDatabase = [
    {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        category: 'tecnologia',
        image: 'CleanCode.png',
        price: 'R$ 89,90',
        description: 'Um manual de boas práticas para escrever código limpo e sustentável.'
    },
    {
        id: 2,
        title: 'Algoritmos',
        author: 'Thomas H. Cormen',
        category: 'tecnologia',
        image: 'Algoritmos.png',
        price: 'R$ 159,90',
        description: 'Introdução completa aos algoritmos e estruturas de dados.'
    },
    {
        id: 3,
        title: 'Java: The Complete Reference',
        author: 'Herbert Schildt',
        category: 'tecnologia',
        image: 'JavaBook.png',
        price: 'R$ 149,90',
        description: 'Guia completo da linguagem Java para desenvolvedores.'
    },
    {
        id: 4,
        title: 'O Iluminado',
        author: 'Stephen King',
        category: 'ficcao',
        image: 'OIluminado.png',
        price: 'R$ 45,90',
        description: 'Um thriller psicológico sobre isolamento e loucura.'
    },
    {
        id: 5,
        title: 'Uma Breve História do Tempo',
        author: 'Stephen Hawking',
        category: 'ciencia',
        image: 'UmaBreveHistoriaDoTempo.png',
        price: 'R$ 39,90',
        description: 'Exploração fascinante do universo e suas leis fundamentais.'
    },
    {
        id: 6,
        title: 'Psicologia',
        author: 'David G. Myers',
        category: 'desenvolvimento',
        image: 'Psicologia.png',
        price: 'R$ 129,90',
        description: 'Compreenda os mecanismos da mente humana e comportamento.'
    }
];

// ==========================================================================
// Utility Functions - Pure Functions Following Functional Programming
// ==========================================================================

const utils = {
    /**
     * Debounce function to limit function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Get element by selector with error handling
     * @param {string} selector - CSS selector
     * @returns {Element|null} DOM element or null
     */
    getElement(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    },

    /**
     * Get all elements by selector
     * @param {string} selector - CSS selector
     * @returns {NodeList} NodeList of elements
     */
    getAllElements(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Add event listener with error handling
     * @param {Element} element - DOM element
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     */
    addEventListenerSafe(element, event, handler) {
        if (element && typeof handler === 'function') {
            element.addEventListener(event, handler);
        } else {
            console.warn('Invalid element or handler for event listener');
        }
    },

    /**
     * Smooth scroll to element
     * @param {string} targetSelector - CSS selector of target element
     */
    smoothScrollTo(targetSelector) {
        const targetElement = this.getElement(targetSelector);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - CONFIG.SCROLL_OFFSET;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },

    /**
     * Toggle CSS class on element
     * @param {Element} element - DOM element
     * @param {string} className - CSS class name
     */
    toggleClass(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    },

    /**
     * Remove class from all elements and add to target
     * @param {NodeList} elements - List of elements
     * @param {Element} target - Target element
     * @param {string} className - CSS class name
     */
    setActiveElement(elements, target, className) {
        elements.forEach(el => el.classList.remove(className));
        if (target) {
            target.classList.add(className);
        }
    }
};

// ==========================================================================
// Navigation Module - Single Responsibility Principle
// ==========================================================================

const NavigationModule = {
    /**
     * Initialize navigation functionality
     */
    init() {
        this.setupMobileToggle();
        this.setupSmoothScrolling();
        this.setupActiveNavLinks();
        this.setupHeaderScroll();
    },

    /**
     * Setup mobile navigation toggle
     */
    setupMobileToggle() {
        const toggleButton = utils.getElement(SELECTORS.NAV_TOGGLE);
        const navMenu = utils.getElement(SELECTORS.NAV_MENU);

        utils.addEventListenerSafe(toggleButton, 'click', () => {
            utils.toggleClass(navMenu, 'active');
        });

        // Close menu when clicking outside
        utils.addEventListenerSafe(document, 'click', (event) => {
            if (!event.target.closest('.nav') && navMenu?.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    },

    /**
     * Setup smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        const navLinks = utils.getAllElements(SELECTORS.NAV_LINKS);

        navLinks.forEach(link => {
            utils.addEventListenerSafe(link, 'click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href');
                
                if (targetId?.startsWith('#')) {
                    utils.smoothScrollTo(targetId);
                    
                    // Close mobile menu if open
                    const navMenu = utils.getElement(SELECTORS.NAV_MENU);
                    navMenu?.classList.remove('active');
                }
            });
        });
    },

    /**
     * Setup active navigation links based on scroll position
     */
    setupActiveNavLinks() {
        const sections = utils.getAllElements('section[id]');
        const navLinks = utils.getAllElements(SELECTORS.NAV_LINKS);

        const updateActiveLink = utils.debounce(() => {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - CONFIG.SCROLL_OFFSET;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && 
                    window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${currentSection}`;
                link.classList.toggle('nav__link--active', isActive);
            });
        }, 100);

        utils.addEventListenerSafe(window, 'scroll', updateActiveLink);
    },

    /**
     * Setup header background change on scroll
     */
    setupHeaderScroll() {
        const header = utils.getElement(SELECTORS.HEADER);
        
        const handleScroll = utils.debounce(() => {
            if (header) {
                const isScrolled = window.scrollY > 50;
                header.style.backgroundColor = isScrolled 
                    ? 'rgba(255, 255, 255, 0.99)' 
                    : 'rgba(255, 255, 255, 0.98)';
            }
        }, 10);

        utils.addEventListenerSafe(window, 'scroll', handleScroll);
    }
};

// ==========================================================================
// Book Catalog Module - Open/Closed Principle
// ==========================================================================

const BookCatalogModule = {
    /**
     * Initialize book catalog functionality
     */
    init() {
        this.renderBooks(bookDatabase);
        this.setupFilters();
        this.setupIntersectionObserver();
    },

    /**
     * Render books in the catalog grid
     * @param {Array} books - Array of book objects
     */
    renderBooks(books) {
        const booksGrid = utils.getElement(SELECTORS.BOOKS_GRID);
        if (!booksGrid) return;

        booksGrid.innerHTML = books.map(book => this.createBookCard(book)).join('');
    },

    /**
     * Create HTML for a single book card
     * @param {Object} book - Book object
     * @returns {string} HTML string
     */
    createBookCard(book) {
        const categoryLabel = this.getCategoryLabel(book.category);
        
        return `
            <article class="book-card" data-category="${book.category}">
                <div class="book-card__image">
                    <img src="${book.image}" 
                         alt="${book.title}" 
                         class="book-card__img"
                         loading="lazy">
                    <span class="book-card__category">${categoryLabel}</span>
                </div>
                <div class="book-card__content">
                    <h3 class="book-card__title">${book.title}</h3>
                    <p class="book-card__author">por ${book.author}</p>
                    <p class="book-card__description">${book.description}</p>
                    <div class="book-card__price">${book.price}</div>
                    <button class="btn btn--primary" onclick="BookCatalogModule.handleBookInteraction(${book.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </article>
        `;
    },

    /**
     * Get category label in Portuguese
     * @param {string} category - Category key
     * @returns {string} Category label
     */
    getCategoryLabel(category) {
        const labels = {
            tecnologia: 'Tecnologia',
            ficcao: 'Ficção',
            desenvolvimento: 'Desenvolvimento',
            ciencia: 'Ciência'
        };
        return labels[category] || 'Geral';
    },

    /**
     * Setup filter functionality
     */
    setupFilters() {
        const filterButtons = utils.getAllElements(SELECTORS.FILTER_BUTTONS);

        filterButtons.forEach(button => {
            utils.addEventListenerSafe(button, 'click', () => {
                const filterValue = button.getAttribute('data-filter');
                this.filterBooks(filterValue);
                utils.setActiveElement(filterButtons, button, 'filter-btn--active');
            });
        });
    },

    /**
     * Filter books by category
     * @param {string} category - Category to filter by
     */
    filterBooks(category) {
        const bookCards = utils.getAllElements('.book-card');

        bookCards.forEach(card => {
            const bookCategory = card.getAttribute('data-category');
            const shouldShow = category === CONFIG.BOOK_CATEGORIES.ALL || 
                             bookCategory === category;

            // Add smooth transition
            card.style.transition = 'all 0.3s ease';
            
            if (shouldShow) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    card.style.display = 'none';
                }, CONFIG.ANIMATION_DURATION);
            }
        });
    },

    /**
     * Handle book interaction (add to cart, view details, etc.)
     * @param {number} bookId - Book ID
     */
    handleBookInteraction(bookId) {
        const book = bookDatabase.find(b => b.id === bookId);
        if (book) {
            // Simulate adding to cart
            this.showNotification(`"${book.title}" foi adicionado ao carrinho!`);
        }
    },

    /**
     * Show notification to user
     * @param {string} message - Notification message
     */
    showNotification(message) {
        // Create and show a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--secondary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },

    /**
     * Setup intersection observer for animations
     */
    setupIntersectionObserver() {
        const options = {
            threshold: CONFIG.INTERSECTION_THRESHOLD,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, options);

        // Observe book cards
        setTimeout(() => {
            const bookCards = utils.getAllElements('.book-card');
            bookCards.forEach(card => observer.observe(card));
        }, 100);
    }
};

// ==========================================================================
// Contact Form Module - Single Responsibility Principle
// ==========================================================================

const ContactFormModule = {
    /**
     * Initialize contact form functionality
     */
    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
    },

    /**
     * Setup form validation
     */
    setupFormValidation() {
        const form = utils.getElement(SELECTORS.CONTACT_FORM);
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            utils.addEventListenerSafe(input, 'blur', () => {
                this.validateField(input);
            });

            utils.addEventListenerSafe(input, 'input', () => {
                this.clearFieldError(input);
            });
        });
    },

    /**
     * Validate individual form field
     * @param {HTMLElement} field - Form field element
     * @returns {boolean} Is field valid
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        }
        // Email validation
        else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um e-mail válido.';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    },

    /**
     * Show field error
     * @param {HTMLElement} field - Form field element
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    },

    /**
     * Clear field error
     * @param {HTMLElement} field - Form field element
     */
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    },

    /**
     * Setup form submission
     */
    setupFormSubmission() {
        const form = utils.getElement(SELECTORS.CONTACT_FORM);
        if (!form) return;

        utils.addEventListenerSafe(form, 'submit', (event) => {
            event.preventDefault();
            this.handleFormSubmission(form);
        });
    },

    /**
     * Handle form submission
     * @param {HTMLFormElement} form - Form element
     */
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const fields = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        // Validate all fields
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(formData, form);
        } else {
            this.showFormError('Por favor, corrija os erros antes de enviar.');
        }
    },

    /**
     * Submit form data
     * @param {FormData} formData - Form data
     * @param {HTMLFormElement} form - Form element
     */
    async submitForm(formData, form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showSuccessMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
            
        } catch (error) {
            this.showFormError('Erro ao enviar mensagem. Tente novamente.');
        } finally {
            // Restore button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    },

    /**
     * Show success message
     * @param {string} message - Success message
     */
    showSuccessMessage(message) {
        const notification = this.createNotification(message, 'success');
        document.body.appendChild(notification);
        this.autoRemoveNotification(notification);
    },

    /**
     * Show form error message
     * @param {string} message - Error message
     */
    showFormError(message) {
        const notification = this.createNotification(message, 'error');
        document.body.appendChild(notification);
        this.autoRemoveNotification(notification);
    },

    /**
     * Create notification element
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error)
     * @returns {HTMLElement} Notification element
     */
    createNotification(message, type) {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? '#27ae60' : '#e74c3c';
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        return notification;
    },

    /**
     * Auto remove notification after delay
     * @param {HTMLElement} notification - Notification element
     */
    autoRemoveNotification(notification) {
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
};

// ==========================================================================
// Performance Module - Optimization
// ==========================================================================

const PerformanceModule = {
    /**
     * Initialize performance optimizations
     */
    init() {
        this.setupLazyLoading();
        this.preloadCriticalImages();
    },

    /**
     * Setup lazy loading for images
     */
    setupLazyLoading() {
        const images = utils.getAllElements('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src || img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    },

    /**
     * Preload critical images
     */
    preloadCriticalImages() {
        const criticalImages = [
            'logoEntrelinhas.png',
            'CleanCode.png',
            'JavaBook.png',
            'Algoritmos.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
};

// ==========================================================================
// Application Initialization - Dependency Injection Pattern
// ==========================================================================

const App = {
    /**
     * Initialize the entire application
     */
    init() {
        this.waitForDOMReady(() => {
            this.initializeModules();
            this.setupGlobalEventListeners();
            this.addAnimationStyles();
        });
    },

    /**
     * Wait for DOM to be ready
     * @param {Function} callback - Callback function
     */
    waitForDOMReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    },

    /**
     * Initialize all application modules
     */
    initializeModules() {
        try {
            NavigationModule.init();
            BookCatalogModule.init();
            ContactFormModule.init();
            PerformanceModule.init();
            
            console.log('✅ Livraria Entrelinhas initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing application:', error);
        }
    },

    /**
     * Setup global event listeners
     */
    setupGlobalEventListeners() {
        // Handle window resize
        const handleResize = utils.debounce(() => {
            // Trigger any necessary layout recalculations
            window.dispatchEvent(new CustomEvent('app:resize'));
        }, 250);

        utils.addEventListenerSafe(window, 'resize', handleResize);

        // Handle visibility change for performance
        utils.addEventListenerSafe(document, 'visibilitychange', () => {
            if (document.hidden) {
                // Pause any animations or timers when tab is hidden
                window.dispatchEvent(new CustomEvent('app:hidden'));
            } else {
                // Resume when tab is visible
                window.dispatchEvent(new CustomEvent('app:visible'));
            }
        });
    },

    /**
     * Add animation styles to head
     */
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .fade-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }
};

// ==========================================================================
// Application Start
// ==========================================================================

// Initialize the application
App.init();

// Export modules for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NavigationModule,
        BookCatalogModule,
        ContactFormModule,
        PerformanceModule,
        utils,
        CONFIG
    };
}

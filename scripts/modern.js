class BookstoreApp {
    constructor() {
        this.config = {
            ANIMATION_DURATION: 300,
            SCROLL_OFFSET: 80,
            INTERSECTION_THRESHOLD: 0.1,
            CATEGORIES: {
                ALL: 'all',
                TECNOLOGIA: 'tecnologia',
                FICCAO: 'ficcao',
                DESENVOLVIMENTO: 'desenvolvimento',
                CIENCIA: 'ciencia'
            }
        };

        this.selectors = {
            PAGE_LOADER: '#page-loader',
            NAV_TOGGLE: '#nav-toggle',
            NAV_MENU: '#nav-menu',
            NAV_LINKS: '.nav__link',
            FILTER_BUTTONS: '.filter-btn',
            BOOKS_GRID: '#books-grid',
            CONTACT_FORM: '#contact-form',
            HEADER: '.header',
            SCROLL_TO_TOP: '#scroll-to-top',
            ACHIEVEMENT_NUMBERS: '.achievement__number'
        };

        this.bookDatabase = [
            {
                id: 1,
                title: 'Clean Code',
                author: 'Robert C. Martin',
                category: 'tecnologia',
                image: 'CleanCode.png',
                price: 'R$ 89,90',
                description: 'Um manual de boas práticas para escrever código limpo e sustentável que todo desenvolvedor deveria conhecer.'
            },
            {
                id: 2,
                title: 'Algoritmos',
                author: 'Thomas H. Cormen',
                category: 'tecnologia',
                image: 'Algoritmos.png',
                price: 'R$ 159,90',
                description: 'Introdução completa aos algoritmos e estruturas de dados fundamentais para a ciência da computação.'
            },
            {
                id: 3,
                title: 'Java: The Complete Reference',
                author: 'Herbert Schildt',
                category: 'tecnologia',
                image: 'JavaBook.png',
                price: 'R$ 149,90',
                description: 'Guia completo e atualizado da linguagem Java para desenvolvedores de todos os níveis.'
            },
            {
                id: 4,
                title: 'O Iluminado',
                author: 'Stephen King',
                category: 'ficcao',
                image: 'OIluminado.png',
                price: 'R$ 45,90',
                description: 'Um thriller psicológico intenso sobre isolamento, loucura e os horrores que habitam o Hotel Overlook.'
            },
            {
                id: 5,
                title: 'Uma Breve História do Tempo',
                author: 'Stephen Hawking',
                category: 'ciencia',
                image: 'UmaBreveHistoriaDoTempo.png',
                price: 'R$ 39,90',
                description: 'Exploração fascinante do universo, suas leis fundamentais e os mistérios do cosmos explicados de forma acessível.'
            },
            {
                id: 6,
                title: 'Psicologia',
                author: 'David G. Myers',
                category: 'desenvolvimento',
                image: 'Psicologia.png',
                price: 'R$ 129,90',
                description: 'Compreenda os mecanismos complexos da mente humana e os fatores que influenciam o comportamento.'
            }
        ];

        this.state = {
            currentFilter: this.config.CATEGORIES.ALL,
            isMenuOpen: false,
            hasScrolled: false
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderBooks();
        this.setupIntersectionObserver();
        this.hidePageLoader();
    }

    setupEventListeners() {
        this.setupNavigation();
        this.setupFilters();
        this.setupContactForm();
        this.setupScrollToTop();
        this.setupHeaderScroll();
        this.setupSmoothScroll();
        this.setupCounters();
    }

    setupNavigation() {
        const navToggle = document.querySelector(this.selectors.NAV_TOGGLE);
        const navMenu = document.querySelector(this.selectors.NAV_MENU);
        const navLinks = document.querySelectorAll(this.selectors.NAV_LINKS);

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavigation(e);
                this.closeMobileMenu();
            });
        });

        document.addEventListener('click', (e) => {
            if (!navToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector(this.selectors.NAV_MENU);
        const navToggle = document.querySelector(this.selectors.NAV_TOGGLE);
        
        this.state.isMenuOpen = !this.state.isMenuOpen;
        
        if (navMenu && navToggle) {
            navMenu.classList.toggle('active', this.state.isMenuOpen);
            navToggle.setAttribute('aria-expanded', this.state.isMenuOpen.toString());
            
            if (this.state.isMenuOpen) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        }
    }

    closeMobileMenu() {
        if (this.state.isMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    handleNavigation(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        
        if (targetId?.startsWith('#')) {
            this.scrollToSection(targetId);
            this.updateActiveNavLink(event.currentTarget);
        }
    }

    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll(this.selectors.NAV_LINKS);
        navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            link.removeAttribute('aria-current');
        });
        
        activeLink.classList.add('nav__link--active');
        activeLink.setAttribute('aria-current', 'page');
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll(this.selectors.FILTER_BUTTONS);
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilter(e));
        });
    }

    handleFilter(event) {
        const category = event.currentTarget.dataset.filter;
        if (category !== this.state.currentFilter) {
            this.state.currentFilter = category;
            this.updateFilterButtons(event.currentTarget);
            this.renderBooks();
        }
    }

    updateFilterButtons(activeButton) {
        const filterButtons = document.querySelectorAll(this.selectors.FILTER_BUTTONS);
        filterButtons.forEach(button => {
            button.classList.remove('filter-btn--active');
            button.setAttribute('aria-selected', 'false');
        });
        
        activeButton.classList.add('filter-btn--active');
        activeButton.setAttribute('aria-selected', 'true');
    }

    renderBooks() {
        const grid = document.querySelector(this.selectors.BOOKS_GRID);
        if (!grid) return;

        const filteredBooks = this.getFilteredBooks();
        grid.innerHTML = '';

        if (filteredBooks.length === 0) {
            grid.innerHTML = this.createEmptyStateHTML();
            return;
        }

        const fragment = document.createDocumentFragment();
        filteredBooks.forEach(book => {
            const bookCard = this.createBookCard(book);
            fragment.appendChild(bookCard);
        });

        grid.appendChild(fragment);
        this.animateBookCards();
    }

    getFilteredBooks() {
        if (this.state.currentFilter === this.config.CATEGORIES.ALL) {
            return this.bookDatabase;
        }
        return this.bookDatabase.filter(book => book.category === this.state.currentFilter);
    }

    createBookCard(book) {
        const card = document.createElement('article');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.image}" alt="Capa do livro ${book.title}" class="book-card__image" loading="lazy">
            <div class="book-card__category">${this.getCategoryLabel(book.category)}</div>
            <h3 class="book-card__title">${book.title}</h3>
            <p class="book-card__author">por ${book.author}</p>
            <p class="book-card__description">${book.description}</p>
            <div class="book-card__footer">
                <span class="book-card__price">${book.price}</span>
                <button class="book-card__action" aria-label="Adicionar ${book.title} ao carrinho">
                    Comprar
                </button>
            </div>
        `;
        return card;
    }

    getCategoryLabel(category) {
        const labels = {
            tecnologia: 'Tecnologia',
            ficcao: 'Ficção',
            desenvolvimento: 'Desenvolvimento',
            ciencia: 'Ciência'
        };
        return labels[category] || category;
    }

    createEmptyStateHTML() {
        return `
            <div class="empty-state">
                <div class="empty-state__icon">📚</div>
                <h3 class="empty-state__title">Nenhum livro encontrado</h3>
                <p class="empty-state__description">
                    Não encontramos livros nesta categoria. Tente selecionar outra categoria.
                </p>
            </div>
        `;
    }

    animateBookCards() {
        const cards = document.querySelectorAll('.book-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupContactForm() {
        const form = document.querySelector(this.selectors.CONTACT_FORM);
        if (form) {
            form.addEventListener('submit', (e) => this.handleContactSubmit(e));
            
            const messageTextarea = form.querySelector('#message');
            if (messageTextarea) {
                messageTextarea.addEventListener('input', (e) => this.updateCharacterCount(e));
            }
        }
    }

    handleContactSubmit(event) {
        event.preventDefault();
        
        if (this.validateContactForm(event.target)) {
            this.submitContactForm(event.target);
        }
    }

    validateContactForm(form) {
        const formData = new FormData(form);
        const errors = {};

        if (!formData.get('name')?.trim()) {
            errors.name = 'Nome é obrigatório';
        }

        const email = formData.get('email')?.trim();
        if (!email) {
            errors.email = 'E-mail é obrigatório';
        } else if (!this.isValidEmail(email)) {
            errors.email = 'E-mail inválido';
        }

        if (!formData.get('subject')?.trim()) {
            errors.subject = 'Assunto é obrigatório';
        }

        const message = formData.get('message')?.trim();
        if (!message) {
            errors.message = 'Mensagem é obrigatória';
        } else if (message.length < 10) {
            errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
        }

        this.displayFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    displayFormErrors(errors) {
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) {
                errorElement.textContent = errors[field];
            }
        });

        Object.keys(this.selectors).forEach(key => {
            if (!errors[key.toLowerCase()]) {
                const errorElement = document.getElementById(`${key.toLowerCase()}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
    }

    updateCharacterCount(event) {
        const textarea = event.target;
        const counter = document.getElementById('message-count');
        
        if (counter) {
            const currentLength = textarea.value.length;
            counter.textContent = currentLength;
            
            if (currentLength > 450) {
                counter.style.color = 'var(--secondary-500)';
            } else {
                counter.style.color = 'var(--neutral-400)';
            }
        }
    }

    async submitContactForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton?.innerHTML;
        
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span class="btn__content">
                    <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    <span>Enviando...</span>
                </span>
            `;
        }

        try {
            await this.simulateFormSubmission();
            this.showSuccessMessage();
            form.reset();
            this.updateCharacterCount({ target: { value: '' } });
        } catch (error) {
            this.showErrorMessage();
        } finally {
            if (submitButton && originalText) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        }
    }

    simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showSuccessMessage() {
        this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    }

    showErrorMessage() {
        this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}" aria-hidden="true"></i>
                <span>${message}</span>
            </div>
            <button class="notification__close" aria-label="Fechar notificação">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        `;

        document.body.appendChild(notification);

        notification.querySelector('.notification__close')?.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        setTimeout(() => {
            notification.classList.add('notification--visible');
        }, 100);

        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
    }

    hideNotification(notification) {
        notification.classList.remove('notification--visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    setupScrollToTop() {
        const scrollButton = document.querySelector(this.selectors.SCROLL_TO_TOP);
        if (scrollButton) {
            scrollButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupHeaderScroll() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const header = document.querySelector(this.selectors.HEADER);
        const scrollButton = document.querySelector(this.selectors.SCROLL_TO_TOP);

        if (header) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        }

        if (scrollButton) {
            if (scrollTop > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        }

        this.updateActiveNavOnScroll();
    }

    updateActiveNavOnScroll() {
        const sections = ['home', 'catalog', 'about', 'contact'];
        const scrollPosition = window.scrollY + 100;

        let currentSection = 'home';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = sectionId;
                }
            }
        });

        const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
        if (activeLink && !activeLink.classList.contains('nav__link--active')) {
            this.updateActiveNavLink(activeLink);
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        this.scrollToSection(targetId);
                    }
                }
            });
        });
    }

    setupCounters() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const countersSection = document.querySelector('.about__achievements');
        if (countersSection) {
            observer.observe(countersSection);
        }
    }

    animateCounters() {
        const numberElements = document.querySelectorAll(this.selectors.ACHIEVEMENT_NUMBERS);
        
        numberElements.forEach(element => {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = Math.floor(this.easeOutCubic(progress) * target);
                element.textContent = currentValue.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: this.config.INTERSECTION_THRESHOLD,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const elementsToObserve = document.querySelectorAll('.section-header, .book-card, .feature-card, .pillar, .method');
        elementsToObserve.forEach(el => observer.observe(el));
    }

    hidePageLoader() {
        const loader = document.querySelector(this.selectors.PAGE_LOADER);
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.remove('loading');
                
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BookstoreApp();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openMenus = document.querySelectorAll('.nav__menu.active');
        openMenus.forEach(menu => {
            const toggle = menu.parentElement?.querySelector('.nav__toggle');
            if (toggle) {
                toggle.click();
            }
        });
    }
});

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
/**
 * Sistema de Navegação de PDF Convertido em Website
 * Suporta 59 páginas com navegação fluida e otimizado para performance
 */

class PDFNavigator {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 59;
        this.pages = {};
        this.isLoading = false;
        this.pagesLoaded = false;
        this.inputDebounceTimer = null;

        this.elements = {
            pageContent: document.getElementById('page-content'),
            pageTitle: document.getElementById('page-title'),
            pageIndicator: document.getElementById('page-input'),
            footerPage: document.getElementById('footer-page'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        // Preload pages.json on initialization
        this.preloadPages();
    }

    /**
     * Preload pages.json data once on app start
     */
    preloadPages() {
        if (this.pagesLoaded) return;

        this.isLoading = true;
        fetch('pages.json')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                this.pages = data;
                this.pagesLoaded = true;
                this.isLoading = false;
                // Load initial page after data is ready
                this.displayPage(1);
            })
            .catch(error => {
                console.error('Erro ao carregar páginas:', error);
                this.elements.pageContent.innerHTML = `
                    <div style="color: red; text-align: center; padding: 2rem;">
                        <p>Erro ao carregar o conteúdo das páginas</p>
                        <p style="font-size: 0.9rem; color: #666;">${error.message}</p>
                    </div>
                `;
                this.isLoading = false;
            });
    }

    setupEventListeners() {
        // Botões de navegação
        this.elements.prevBtn.addEventListener('click', () => this.previousPage());
        this.elements.nextBtn.addEventListener('click', () => this.nextPage());

        // Input de página com debounce
        this.elements.pageIndicator.addEventListener('change', (e) => {
            this.handlePageInput(e);
        });

        // Alternativa: debounce para input em tempo real
        this.elements.pageIndicator.addEventListener('input', (e) => {
            clearTimeout(this.inputDebounceTimer);
            this.inputDebounceTimer = setTimeout(() => {
                this.handlePageInput(e);
            }, 300);
        });

        // Teclas de navegação (setas do teclado)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousPage();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextPage();
            }
        });
    }

    /**
     * Handle page input with validation
     */
    handlePageInput(e) {
        const page = parseInt(e.target.value);
        if (page >= 1 && page <= this.totalPages) {
            this.loadPage(page);
        } else {
            e.target.value = this.currentPage;
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.loadPage(this.currentPage - 1);
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.loadPage(this.currentPage + 1);
        }
    }

    /**
     * Load and display a page
     * Optimized: No fetching if pages are already preloaded
     */
    loadPage(pageNumber) {
        if (this.isLoading) return;

        pageNumber = Math.max(1, Math.min(pageNumber, this.totalPages));

        // If pages haven't loaded yet, wait
        if (!this.pagesLoaded) {
            console.warn('Pages still loading, please wait...');
            return;
        }

        this.isLoading = true;
        this.elements.pageContent.classList.add('loading');

        // Use requestAnimationFrame to batch DOM updates
        requestAnimationFrame(() => {
            this.displayPage(pageNumber);
        });
    }

    /**
     * Display the page content
     * Optimized: Efficient DOM updates, removed old event listeners
     */
    displayPage(pageNumber) {
        this.currentPage = pageNumber;

        const pageData = this.pages[pageNumber];
        if (!pageData) {
            this.elements.pageContent.innerHTML = '<p>Página não encontrada</p>';
            this.isLoading = false;
            this.elements.pageContent.classList.remove('loading');
            return;
        }

        // Batch all DOM updates
        this.elements.pageTitle.textContent = pageData.title || `Página ${pageNumber}`;
        this.elements.pageContent.innerHTML = pageData.content;
        this.elements.pageIndicator.value = pageNumber;
        this.elements.footerPage.textContent = pageNumber;

        // Update button states
        this.elements.prevBtn.disabled = pageNumber === 1;
        this.elements.nextBtn.disabled = pageNumber === this.totalPages;

        // Remove loading class
        this.elements.pageContent.classList.remove('loading');

        // Setup internal links with event delegation
        this.setupInternalLinks();

        // Defer scroll to next frame to avoid blocking
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        this.isLoading = false;
    }

    /**
     * Setup internal links with proper event delegation
     * Optimized: Removes old listeners, uses efficient querying
     */
    setupInternalLinks() {
        // Remove old listeners by cloning nodes (more efficient than manual removal)
        const links = this.elements.pageContent.querySelectorAll('a[data-page]');
        
        links.forEach(link => {
            // Clone to remove all old listeners
            const newLink = link.cloneNode(true);
            
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = parseInt(newLink.getAttribute('data-page'));
                if (targetPage >= 1 && targetPage <= this.totalPages) {
                    this.loadPage(targetPage);
                }
            });
            
            newLink.classList.add('internal-link');
            link.replaceWith(newLink);
        });
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PDFNavigator();
});

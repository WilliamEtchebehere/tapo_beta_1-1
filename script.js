/**
 * Sistema de Navegação de PDF Convertido em Website
 * Suporta 59 páginas com navegação fluida
 */

class PDFNavigator {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 59;
        this.pages = {};
        this.isLoading = false;

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
        this.loadPage(1);
    }

    setupEventListeners() {
        // Botões de navegação
        this.elements.prevBtn.addEventListener('click', () => this.previousPage());
        this.elements.nextBtn.addEventListener('click', () => this.nextPage());

        // Input de página
        this.elements.pageIndicator.addEventListener('change', (e) => {
            const page = parseInt(e.target.value);
            if (page >= 1 && page <= this.totalPages) {
                this.loadPage(page);
            } else {
                e.target.value = this.currentPage;
            }
        });

        // Teclas de navegação (setas do teclado)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousPage();
            if (e.key === 'ArrowRight') this.nextPage();
        });
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

    loadPage(pageNumber) {
        if (this.isLoading) return;

        pageNumber = Math.max(1, Math.min(pageNumber, this.totalPages));

        this.isLoading = true;
        this.elements.pageContent.classList.add('loading');

        // Se a página já foi carregada, use do cache
        if (this.pages[pageNumber]) {
            this.displayPage(pageNumber);
            this.isLoading = false;
            return;
        }

        // Carrega a página do arquivo JSON
        fetch('pages.json')
            .then(response => response.json())
            .then(data => {
                this.pages = data;
                this.displayPage(pageNumber);
                this.isLoading = false;
            })
            .catch(error => {
                console.error('Erro ao carregar página:', error);
                this.elements.pageContent.innerHTML = `
                    <div style="color: red; text-align: center; padding: 2rem;">
                        <p>Erro ao carregar a página ${pageNumber}</p>
                        <p style="font-size: 0.9rem; color: #666;">${error.message}</p>
                    </div>
                `;
                this.isLoading = false;
            });
    }

    displayPage(pageNumber) {
        this.currentPage = pageNumber;

        const pageData = this.pages[pageNumber];
        if (!pageData) {
            this.elements.pageContent.innerHTML = '<p>Página não encontrada</p>';
            return;
        }

        // Atualizar título
        this.elements.pageTitle.textContent = pageData.title || `Página ${pageNumber}`;

        // Atualizar conteúdo
        this.elements.pageContent.innerHTML = pageData.content;

        // Atualizar indicadores
        this.elements.pageIndicator.value = pageNumber;
        this.elements.footerPage.textContent = pageNumber;

        // Atualizar estado dos botões
        this.elements.prevBtn.disabled = pageNumber === 1;
        this.elements.nextBtn.disabled = pageNumber === this.totalPages;

        // Remover classe de loading
        this.elements.pageContent.classList.remove('loading');

        // Setup de links internos
        this.setupInternalLinks();

        // Scroll para o topo
        window.scrollTo(0, 0);
    }

    setupInternalLinks() {
        const links = this.elements.pageContent.querySelectorAll('a[data-page]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = parseInt(link.getAttribute('data-page'));
                this.loadPage(targetPage);
            });
            link.classList.add('internal-link');
        });
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PDFNavigator();
});
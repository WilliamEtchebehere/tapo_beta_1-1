# PDF Navegável em Website

Transformação de um PDF com 59 páginas em um website responsivo navegável, otimizado para desktop e mobile.

## 🎯 Características

- ✅ **Navegação Fluida**: Botões Anterior/Próxima e input direto de página
- ✅ **Links Internos**: Suporte para links que naveguem entre páginas
- ✅ **Responsivo**: Design adaptado para desktop, tablet e mobile
- ✅ **Teclado**: Navegação com setas do teclado (← →)
- ✅ **Cache**: Páginas carregadas ficam em cache para navegação rápida
- ✅ **Acessibilidade**: Rótulos ARIA e boas práticas de UX

## 📁 Estrutura do Projeto

```
tapo_beta_1-1/
├── index.html      # Arquivo principal HTML
├── styles.css      # Estilos CSS responsivos
├── script.js       # Lógica de navegação JavaScript
├── pages.json      # Conteúdo das 59 páginas
└── README.md       # Este arquivo
```

## 🚀 Como Usar

### 1. Preparar o Conteúdo do PDF

Extraia o conteúdo do PDF e organize-o em `pages.json` com a seguinte estrutura:

```json
{
  "1": {
    "title": "Título da Página 1",
    "content": "<h1>Página 1</h1><p>Conteúdo aqui...</p>"
  },
  "2": {
    "title": "Título da Página 2",
    "content": "<h1>Página 2</h1><p>Conteúdo aqui...</p>"
  }
}
```

### 2. Links Internos entre Páginas

Para criar um link que navega para outra página, use:

```html
<a href="#" data-page="5">Ir para Página 5</a>
```

### 3. Abrir Localmente

Abra `index.html` em um navegador web. Para melhor compatibilidade, use um servidor local:

```bash
# Com Python 3
python -m http.server 8000

# Com Python 2
python -m SimpleHTTPServer 8000

# Com Node.js (http-server)
npx http-server
```

Acesse `http://localhost:8000` no navegador.

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --background-color: #ecf0f1;
    --text-color: #2c3e50;
}
```

### Fontes
Modifique a família de fontes em `styles.css`:

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

### Total de Páginas
No arquivo `script.js`, ajuste:

```javascript
this.totalPages = 59; // Altere se necessário
```

E em `index.html`:

```html
<span> / 59</span> <!-- Alterar aqui também -->
```

## ⌨️ Navegação

- **Botão Anterior/Próxima**: Clique nos botões no topo
- **Input de Página**: Digite o número da página e pressione Enter
- **Teclado**: Setas ← e → para navegar
- **Links Internos**: Clique em links com `data-page` para pular entre páginas

## 📱 Responsividade

O site se adapta automaticamente para:
- **Desktop**: Layout completo com barra de ferramentas estendida
- **Tablet**: Ajuste automático de padding e tamanhos
- **Mobile**: Menu compacto, botões otimizados para toque

## 🔧 Desenvolvimento

### Adicionar Nova Página
1. Abra `pages.json`
2. Adicione uma nova entrada:

```json
"60": {
  "title": "Página 60",
  "content": "<h1>Página 60</h1><p>Conteúdo...</p>"
}
```

3. Atualize `totalPages` em `script.js` e o número no `index.html`

### Adicionar Estilos Customizados
Adicione classes ao HTML e defina estilos em `styles.css`:

```html
<div class="custom-class">Conteúdo</div>
```

```css
.custom-class {
    background-color: #f0f0f0;
    padding: 1rem;
}
```

## 📦 Deploy

### GitHub Pages
1. Faça push do repositório
2. Vá em **Settings** → **Pages**
3. Selecione a branch `main` como source
4. Seu site estará em `https://WilliamEtchebehere.github.io/tapo_beta_1-1/`

### Vercel / Netlify
Faça deploy diretamente do repositório GitHub.

## 🐛 Troubleshooting

**Páginas não carregam:**
- Verifique se `pages.json` está no mesmo diretório que `index.html`
- Certifique-se de que está usando um servidor HTTP (não abra diretamente com file://)

**Links internos não funcionam:**
- Verifique se está usando `data-page="X"` nos links
- Confirme que o número da página existe em `pages.json`

**Problemas de responsividade:**
- Limpe o cache do navegador (Ctrl+Shift+Delete ou Cmd+Shift+Delete)
- Verifique o zoom do navegador (deve estar em 100%)

## 📄 Extração de PDF para HTML

Se precisar extrair conteúdo do PDF, recomendo ferramentas como:
- **PDF.js**: Visualizador de PDF em JavaScript
- **Poppler**: Ferramenta CLI para converter PDF
- **Aspose.PDF**: API para conversão
- **pdfrw** (Python): Manipulação de PDF

## 📝 Licença

Este projeto é de código aberto. Sinta-se livre para usar e modificar conforme necessário.

---

**Criado com ❤️ para navegação web fluida**

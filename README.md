# 📚 Livraria Entrelinhas

![Livraria Entrelinhas](logoEntrelinhas.png)

## 🎯 Sobre o Projeto

A **Livraria Entrelinhas** é um site elegante e profissional desenvolvido para uma livraria fictícia, focando em uma experiência de usuário excepcional e design responsivo. O projeto foi construído seguindo os princípios de **Clean Code** e boas práticas de desenvolvimento web.

### ✨ Características Principais

- **Design Responsivo**: Adaptável a todos os dispositivos (desktop, tablet, mobile)
- **Performance Otimizada**: Carregamento rápido e otimizações de imagem
- **Acessibilidade**: Seguindo padrões WCAG para melhor acessibilidade
- **Clean Code**: Código limpo, modular e bem documentado
- **UX/UI Moderno**: Interface elegante e intuitiva

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com Flexbox/Grid, variáveis CSS e animações
- **JavaScript ES6+**: Funcionalidades interativas seguindo padrões modernos
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia elegante (Playfair Display + Inter)

### Arquitetura
- **Modular Design**: Separação clara de responsabilidades
- **Component-Based**: Componentes reutilizáveis
- **Progressive Enhancement**: Funcionalidade básica garantida, melhorias graduais

## 📁 Estrutura do Projeto

```
LivrariaEntrelinhas/
├── index.html              # Página principal
├── styles/
│   └── main.css            # Estilos principais
├── scripts/
│   └── main.js             # JavaScript principal
├── images/                 # Imagens do catálogo
│   ├── logoEntrelinhas.png
│   ├── CleanCode.png
│   ├── Algoritmos.png
│   ├── JavaBook.png
│   ├── OIluminado.png
│   ├── Psicologia.png
│   └── UmaBreveHistoriaDoTempo.png
└── README.md               # Documentação
```

## 🎨 Características do Design

### Paleta de Cores
- **Primária**: #2c3e50 (Azul escuro elegante)
- **Secundária**: #e67e22 (Laranja vibrante)
- **Accent**: #8e44ad (Roxo sofisticado)
- **Texto**: #2c3e50, #7f8c8d, #bdc3c7
- **Fundo**: #ffffff, #f8f9fa

### Tipografia
- **Títulos**: Playfair Display (serif elegante)
- **Corpo**: Inter (sans-serif moderna)
- **Hierarquia**: Sistema de tamanhos responsivo

### Layout
- **Container**: Máximo 1200px centralizado
- **Grid**: CSS Grid para layouts complexos
- **Flexbox**: Para alinhamentos e distribuição
- **Responsivo**: Mobile-first approach

## 🔧 Funcionalidades

### 📖 Catálogo de Livros
- Exibição em grid responsivo
- Filtros por categoria (Tecnologia, Ficção, Desenvolvimento, Ciência)
- Animações suaves de transição
- Cards informativos com preços

### 🧭 Navegação
- Menu fixo com fundo glassmorphism
- Navegação suave entre seções
- Menu mobile com animações
- Indicador de seção ativa

### 📧 Formulário de Contato
- Validação em tempo real
- Feedback visual de erros
- Simulação de envio com loading
- Notificações de sucesso/erro

### 🎭 Animações e Interações
- Intersection Observer para animações
- Hover effects nos elementos
- Transições suaves
- Loading states

## 🏗️ Princípios de Clean Code Aplicados

### 1. **Single Responsibility Principle**
- Cada módulo tem uma responsabilidade específica
- Funções pequenas e focadas
- Separação clara entre lógica e apresentação

### 2. **DRY (Don't Repeat Yourself)**
- Funções utilitárias reutilizáveis
- Variáveis CSS centralizadas
- Componentes modulares

### 3. **Readable and Meaningful Names**
- Nomes descritivos para variáveis e funções
- Convenções consistentes de nomenclatura
- Comentários explicativos quando necessário

### 4. **Modular Architecture**
```javascript
// Estrutura modular do JavaScript
const NavigationModule = { /* ... */ };
const BookCatalogModule = { /* ... */ };
const ContactFormModule = { /* ... */ };
const PerformanceModule = { /* ... */ };
```

### 5. **Error Handling**
- Validação de entrada de dados
- Tratamento de erros gracioso
- Fallbacks para funcionalidades

### 6. **Performance Optimization**
- Lazy loading de imagens
- Debounce em eventos de scroll
- Intersection Observer para animações
- Preload de recursos críticos

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

### Adaptações Mobile
- Menu hamburger animado
- Layout em coluna única
- Botões touch-friendly
- Imagens otimizadas

## 🚀 Como Executar

### Pré-requisitos
- Navegador web moderno
- Servidor local (opcional, recomendado)

### Instalação
1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` em um navegador
3. Para desenvolvimento, use um servidor local:
   ```bash
   # Com Python 3
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   
   # Com PHP
   php -S localhost:8000
   ```

## 🎯 Futuras Melhorias

### Funcionalidades
- [ ] Sistema de carrinho de compras
- [ ] Integração com gateway de pagamento
- [ ] Sistema de busca avançada
- [ ] Avaliações e comentários
- [ ] Sistema de usuários
- [ ] Wishlist de livros

### Técnicas
- [ ] Progressive Web App (PWA)
- [ ] Service Workers para cache
- [ ] Otimização de imagens WebP
- [ ] Lazy loading mais avançado
- [ ] Testes automatizados
- [ ] CI/CD pipeline

### SEO e Marketing
- [ ] Structured Data (JSON-LD)
- [ ] Meta tags OpenGraph
- [ ] Sitemap XML
- [ ] Google Analytics
- [ ] Newsletter signup

## 📊 Performance

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Otimizações Implementadas
- Imagens otimizadas e lazy loading
- CSS e JavaScript minificados
- Fontes precarregadas
- Intersection Observer para animações
- Debounce em eventos de scroll

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ seguindo os princípios de Clean Code e boas práticas de desenvolvimento web.

---

**Livraria Entrelinhas** - *Sua jornada literária começa aqui* 📚✨

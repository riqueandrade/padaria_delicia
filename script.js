document.addEventListener('DOMContentLoaded', function() {
    // Manipulação do formulário de contato
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Obrigado por entrar em contato! Responderemos em breve.');
        form.reset();
    });

    // Navegação suave para links internos e fechamento da navbar
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            // Fecha a navbar após o clique
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Botão de voltar ao topo
    const btnVoltar = document.getElementById('btnVoltar');

    // Mostrar/ocultar botão de voltar ao topo baseado na posição de rolagem
    window.onscroll = function() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            btnVoltar.style.display = "block";
        } else {
            btnVoltar.style.display = "none";
        }
    };

    // Ação do botão de voltar ao topo
    btnVoltar.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efeito de scroll na navbar
    const mainNav = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            mainNav.classList.add('navbar-scrolled');
        } else {
            mainNav.classList.remove('navbar-scrolled');
        }
    });

    // Inicialização do AOS (Animate On Scroll)
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600,
                once: true,
                offset: 100
            });
        } else {
            // Se o AOS ainda não foi carregado, tenta novamente em 100ms
            setTimeout(initAOS, 100);
        }
    }

    // Chama a função para inicializar o AOS
    initAOS();

    // Configuração do carrossel de imagens
    const carouselImages = [
        {src: "images/galery-2.jpg", alt: "Croissants frescos"},
        {src: "images/galery-1.jpg", alt: "Pães variados"},
        {src: "images/galery-3.jpg", alt: "Pão integral"}
    ];

    // Popula o carrossel com as imagens
    const carouselInner = document.getElementById('heroCarouselInner');
    carouselImages.forEach((img, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `<img src="${img.src}" class="d-block w-100" alt="${img.alt}">`;
        carouselInner.appendChild(carouselItem);
    });

    // Dados dos produtos
    const products = [
        {
            name: "Pão Francês",
            description: "Nosso delicioso pão francês, fresco todos os dias.",
            longDescription: "O pão francês é um clássico da padaria brasileira. Feito diariamente com farinha de trigo, água, sal e fermento, nosso pão francês tem uma crosta crocante e um miolo macio e aerado. Perfeito para sanduíches ou para acompanhar suas refeições.",
            image: "images/pao-frances.jpg"
        },
        {
            name: "Bolo de Chocolate",
            description: "Um irresistível bolo de chocolate para adoçar seu dia.",
            longDescription: "Nosso bolo de chocolate é uma verdadeira tentação. Feito com chocolate de alta qualidade, o bolo tem uma textura úmida e um sabor intenso. A cobertura cremosa de ganache complementa perfeitamente o sabor do bolo. Ideal para ocasiões especiais ou para se dar um presente.",
            image: "images/bolo-chocolate.jpg"
        },
        {
            name: "Croissant",
            description: "Croissants crocantes e amanteigados, perfeitos para o café da manhã.",
            longDescription: "Nossos croissants são feitos à mão, seguindo a tradicional receita francesa. Com camadas folhadas e amanteigadas, eles são assados até ficarem dourados e crocantes por fora, mantendo-se macios por dentro. Perfeitos para um café da manhã elegante ou um lanche refinado.",
            image: "images/croissant.jpg"
        },
        {
            name: "Pão Integral",
            description: "Pão integral nutritivo e saboroso, ótimo para uma alimentação equilibrada.",
            longDescription: "Nosso pão integral é feito com uma mistura especial de farinhas integrais e grãos selecionados. Rico em fibras e nutrientes, é a escolha perfeita para quem busca uma alimentação mais saudável sem abrir mão do sabor. Experimente com geleia caseira ou como base para sanduíches nutritivos.",
            image: "images/pao-integral.jpg"
        },
        {
            name: "Torta de Frutas",
            description: "Deliciosa torta recheada com frutas frescas da estação.",
            longDescription: "Nossa torta de frutas é uma explosão de sabores e cores. Feita com uma base de massa amanteigada, é recheada com um creme suave e coberta com uma seleção das melhores frutas da estação. Cada fatia é uma combinação perfeita de texturas e sabores, ideal para qualquer ocasião especial.",
            image: "images/torta-frutas.jpg"
        },
        {
            name: "Pão de Queijo",
            description: "Tradicional pão de queijo mineiro, quentinho e irresistível.",
            longDescription: "Nosso pão de queijo é uma homenagem à tradição mineira. Feito com polvilho, queijo curado de alta qualidade e um toque secreto da casa, cada bolinha é assada até ficar dourada por fora e macia por dentro. O aroma irresistível e o sabor marcante fazem deste um dos itens mais populares da nossa padaria.",
            image: "images/pao-queijo.jpeg"
        }
    ];

    // Criação dos cards de produtos
    const productContainer = document.getElementById('productContainer');
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    const productModalLabel = document.getElementById('productModalLabel');
    const productModalImage = document.getElementById('productModalImage');
    const productModalDescription = document.getElementById('productModalDescription');

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'col-lg-4 col-md-6 mb-4';
        productCard.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" alt="${product.name}" class="card-img-top">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title"><i class="material-icons">local_dining</i>${product.name}</h3>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="btn-group mt-auto" role="group" aria-label="Ações do produto">
                        <button class="btn btn-primary btn-sm view-product" data-product-id="${index}">Ver mais</button>
                        <button class="btn btn-success btn-sm order-product" data-product-id="${index}">Fazer Pedido</button>
                    </div>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    // Manipulação do clique no botão "Ver mais" dos produtos
    productContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-product')) {
            const productId = e.target.getAttribute('data-product-id');
            const product = products[productId];
            productModalLabel.textContent = product.name;
            productModalImage.src = product.image;
            productModalImage.alt = product.name;
            productModalDescription.textContent = product.longDescription;
            productModal.show();
        }
    });

    // Configuração da galeria de fotos
    const galeriaImages = products.map(product => ({ src: product.image, alt: product.name }));

    const galeriaContainer = document.getElementById('galeriaContainer');
    galeriaImages.forEach((img, index) => {
        const galeriaItem = document.createElement('div');
        galeriaItem.className = 'col-md-4 col-sm-6 mb-4';
        galeriaItem.innerHTML = `
            <div class="card">
                <img src="${img.src}" class="card-img-top" alt="${img.alt}">
                <div class="card-body">
                    <p class="card-text">${img.alt}</p>
                </div>
            </div>
        `;
        galeriaContainer.appendChild(galeriaItem);
    });

    // Sistema de avaliações de clientes
    const avaliacoes = [
        { nome: "Maria Silva", texto: "Ótimos produtos, sempre frescos!", estrelas: 5 },
        { nome: "João Santos", texto: "O pão francês é o melhor da cidade!", estrelas: 4 },
        { nome: "Ana Oliveira", texto: "Adoro os bolos, são deliciosos!", estrelas: 5 }
    ];

    function exibirAvaliacoes() {
        const avaliacoesContainer = document.getElementById('avaliacoesContainer');
        avaliacoesContainer.innerHTML = '';

        avaliacoes.forEach(avaliacao => {
            const avaliacaoElement = document.createElement('div');
            avaliacaoElement.className = 'col-md-4 mb-4';
            avaliacaoElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${avaliacao.nome}</h5>
                        <p class="card-text">${avaliacao.texto}</p>
                        <div class="text-warning">
                            ${'★'.repeat(avaliacao.estrelas)}${'☆'.repeat(5 - avaliacao.estrelas)}
                        </div>
                    </div>
                </div>
            `;
            avaliacoesContainer.appendChild(avaliacaoElement);
        });
    }

    // Manipulação do botão para adicionar nova avaliação
    document.getElementById('addAvaliacaoBtn').addEventListener('click', () => {
        const avaliacaoModal = new bootstrap.Modal(document.getElementById('avaliacaoModal'));
        avaliacaoModal.show();
    });

    // Manipulação do formulário de nova avaliação
    document.getElementById('avaliacaoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nomeCliente').value;
        const texto = document.getElementById('avaliacaoTexto').value;
        const estrelas = parseInt(document.getElementById('avaliacaoEstrelas').value);

        avaliacoes.push({ nome, texto, estrelas });
        exibirAvaliacoes();

        const avaliacaoModal = bootstrap.Modal.getInstance(document.getElementById('avaliacaoModal'));
        avaliacaoModal.hide();
        e.target.reset();
    });

    // Exibe as avaliações iniciais
    exibirAvaliacoes();

    // Sistema de pedidos online
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('order-product')) {
            const productId = e.target.getAttribute('data-product-id');
            const product = products[productId];
            document.getElementById('produtoPedido').value = product.name;
            const pedidoModal = new bootstrap.Modal(document.getElementById('pedidoModal'));
            pedidoModal.show();
        }
    });

    // Manipulação do formulário de pedido
    document.getElementById('pedidoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nomePedido').value;
        const email = document.getElementById('emailPedido').value;
        const produto = document.getElementById('produtoPedido').value;
        const quantidade = document.getElementById('quantidadePedido').value;

        alert(`Pedido recebido!\nNome: ${nome}\nEmail: ${email}\nProduto: ${produto}\nQuantidade: ${quantidade}`);

        const pedidoModal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal'));
        pedidoModal.hide();
        e.target.reset();
    });
});
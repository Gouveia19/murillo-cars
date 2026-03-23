/* Data for the 10 vehicles */
const cars = [
    { id: 'fiat-uno', name: 'Fiat Uno', desc: 'Carro econômico e confiável. O verdadeiro diferencial com a escada de teto, pronto para qualquer desafio.', price: 'R$ 15.000', img: 'images/fiat.png', alt: 'Fiat Uno prata clássico com escada de alumínio presa no teto' },
    { id: 'mclaren-720s', name: 'McLaren 720S', desc: 'Performance de pista inigualável com chassi de fibra de carbono e impressionante V8 biturbo.', price: 'R$ 3.000.000', img: 'images/prod1.png', alt: 'McLaren 720S esportiva de alta performance amarela' },
    { id: 'mercedes-sclass', name: 'Mercedes-Benz S-Class', desc: 'O ápice dos sedãs de luxo. Conforto supremo, cabine imersiva e tecnologia de ponta.', price: 'R$ 1.100.000', img: 'images/prod2.png', alt: 'Mercedes-Benz S-Class luxuoso sedã prata em estúdio' },
    { id: 'ferrari-f8', name: 'Ferrari F8 Tributo', desc: 'Tributo à perfeição italiana. O V8 biturbo mais potente que domina ruas e corações.', price: 'R$ 2.800.000', img: 'images/prod3.png', alt: 'Ferrari F8 Tributo vermelha, design italiano marcante' },
    { id: 'porsche-911', name: 'Porsche 911 GT3', desc: 'Engenharia de precisão alemã e emoção naturalmente aspirada focada no desempenho.', price: 'R$ 2.200.000', img: 'images/porsche.png', alt: 'Porsche 911 esportiva de luxo na cor azul, fotografada em estúdio escuro' },
    { id: 'lambo-urus', name: 'Lamborghini Urus', desc: 'O primeiro Super Sport Utility Vehicle do mundo. Puro DNA de touro indomável.', price: 'R$ 3.500.000', img: 'images/hero2.png', alt: 'Lamborghini Urus, SUV na cor preta com detalhes imponentes' },
    { id: 'audi-r8', name: 'Audi R8 V10', desc: 'O supercarro para o dia a dia, impulsionado por um fenomenal motor V10.', price: 'R$ 1.800.000', img: 'images/prod3.png', alt: 'Automóvel esportivo representando poder automotivo' },
    { id: 'bmw-m4', name: 'BMW M4 Competition', desc: 'Design agressivo inovador e capacidades dinâmicas na pista incrivelmente precisas.', price: 'R$ 950.000', img: 'images/porsche.png', alt: 'Automóvel coupe esportivo para pista em fundo escuro' },
    { id: 'mustang-gt', name: 'Ford Mustang GT', desc: 'Clássico muscle car americano com um ronco cavernoso e postura de campeão absoluto.', price: 'R$ 550.000', img: 'images/prod1.png', alt: 'Poderoso muscle car americano de alta resolução' },
    { id: 'aston-db11', name: 'Aston Martin DB11', desc: 'Elegância britânica combinada com um poderoso motor para viagens de longo turismo.', price: 'R$ 2.400.000', img: 'images/prod2.png', alt: 'Gran Turismo esportivo de alta elegância e sofisticação no design' }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Carousel Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;

        const updateCarousel = () => {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (dots[index]) dots[index].classList.remove('active');
                if (index === currentSlide) {
                    slide.classList.add('active');
                    if (dots[index]) dots[index].classList.add('active');
                }
            });
        };

        const nextSlide = () => { currentSlide = (currentSlide + 1) % totalSlides; updateCarousel(); };
        const prevSlide = () => { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateCarousel(); };
        const startAutoPlay = () => { autoPlayInterval = setInterval(nextSlide, 5000); };
        const resetAutoPlay = () => { clearInterval(autoPlayInterval); startAutoPlay(); };

        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
                resetAutoPlay();
            });
        });

        startAutoPlay();
    }

    // 2. Dynamic Grid Rendering
    const grid = document.getElementById('catalog-grid');
    if (grid) {
        grid.innerHTML = '';
        cars.forEach(car => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${car.img}" alt="${car.alt}">
                </div>
                <div class="card-details">
                    <!-- Headings inside structurally need to follow H1 -> H2 -> H3 -->
                    <h3>${car.name}</h3>
                    <p class="description">${car.desc}</p>
                    <div class="price-row">
                        <span class="price" aria-label="Preço: ${car.price}">${car.price}</span>
                        <div class="card-actions">
                            <a href="details.html?id=${car.id}" class="details-link" aria-label="Ver página de detalhes completas do ${car.name}">Detalhes</a>
                            <button class="buy-button purchase-btn" aria-label="Comprar ${car.name}" onclick="alert('Iniciando o processo de compra do ${car.name}.')">Comprar</button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // 3. Details Page Logic
    const detailsContainer = document.getElementById('car-details');
    if (detailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('id');
        const car = cars.find(c => c.id === carId);

        if (car) {
            const numericPrice = parseInt(car.price.replace(/\D/g, ''), 10);

            detailsContainer.innerHTML = `
                <div class="details-layout">
                    <div class="details-image-wrapper">
                        <img src="${car.img}" alt="${car.alt}" class="details-main-img">
                    </div>
                    <div class="details-info">
                        <h2>${car.name}</h2>
                        <p class="details-desc">${car.desc}</p>
                        <p class="details-price" aria-label="Preço: ${car.price}">${car.price}</p>
                        <div class="details-actions">
                            <button class="buy-button purchase-btn-large" aria-label="Comprar ${car.name} Agora" onclick="alert('Iniciando o processo de compra do ${car.name}. Nossos consultores entrarão em contato.')">Comprar Agora</button>
                            <a href="index.html#contact" class="cta-button" aria-label="Agendar Test Drive do ${car.name}">Solicitar Test Drive</a>
                            <a href="index.html#showroom" class="back-link" aria-label="Navegar de volta para a coleção do showroom">← Voltar ao Catálogo</a>
                        </div>
                        
                        <!-- Finacing Simulator System -->
                        <div class="simulator-container" aria-labelledby="sim-title">
                            <h3 id="sim-title">Simulação de Financiamento</h3>
                            <form id="simulator-form" class="simulator-form" novalidate>
                                <div class="form-group">
                                    <label for="car-value">Valor do Veículo (R$)</label>
                                    <input type="number" id="car-value" name="car-value" value="${numericPrice}" required min="1" aria-required="true">
                                </div>
                                <div class="form-group">
                                    <label for="down-payment">Valor de Entrada (R$)</label>
                                    <input type="number" id="down-payment" name="down-payment" required min="0" max="${numericPrice}" placeholder="Ex: 50000" aria-required="true">
                                </div>
                                <div class="form-group">
                                    <label for="installments">Número de Parcelas</label>
                                    <select id="installments" name="installments" required aria-required="true">
                                        <option value="12">12x</option>
                                        <option value="24">24x</option>
                                        <option value="36" selected>36x</option>
                                        <option value="48">48x</option>
                                        <option value="60">60x</option>
                                    </select>
                                </div>
                                <button type="submit" class="submit-button" aria-label="Calcular Financiamento">Calcular Financiamento</button>
                            </form>
                            <div id="simulator-result" class="simulator-result" aria-live="polite" style="display: none;">
                                <h4>Valor Estimado da Parcela</h4>
                                <p class="result-value" id="result-value">R$ 0/mês</p>
                                <p class="result-feedback" id="result-feedback"></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const simForm = document.getElementById('simulator-form');
            if (simForm) {
                simForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const carVal = parseFloat(document.getElementById('car-value').value);
                    const downPay = parseFloat(document.getElementById('down-payment').value);
                    const inst = parseInt(document.getElementById('installments').value, 10);
                    
                    const resultContainer = document.getElementById('simulator-result');
                    const resultValue = document.getElementById('result-value');
                    const feedback = document.getElementById('result-feedback');
                    
                    if (isNaN(carVal) || carVal <= 0) {
                        alert('Por favor, informe um valor de veículo válido maior que zero.');
                        return;
                    }
                    if (isNaN(downPay) || downPay < 0) {
                        alert('Por favor, informe um valor de entrada válido (não pode ser negativo e nem vazio).');
                        return;
                    }
                    if (downPay >= carVal) {
                        alert('Atenção: A entrada informada não pode ser igual ou maior que o valor total do veículo.');
                        return;
                    }
                    if (isNaN(inst) || inst <= 0) {
                        alert('Por favor, selecione um número válido de parcelas.');
                        return;
                    }
                    
                    const monthly = (carVal - downPay) / inst;
                    
                    const formatted = monthly.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    
                    resultValue.textContent = `${formatted}/mês`;
                    feedback.textContent = `Condição baseada no parcelamento sem juros do saldo devedor em ${inst} vezes.`;
                    resultContainer.style.display = 'block';
                    
                    // Foco suave para acessibilidade
                    resultValue.setAttribute('tabindex', '-1');
                    resultValue.focus();
                });
            }
        } else {
            detailsContainer.innerHTML = `
                <div class="not-found">
                    <h2>Veículo não encontrado</h2>
                    <a href="index.html" class="back-link">← Voltar ao início</a>
                </div>
            `;
        }
    }

    // 4. Test Drive Global Button Routing & Contact Form
    const testDriveBtn = document.getElementById('btn-test-drive');
    if (testDriveBtn) {
        testDriveBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                const subjectSelect = document.getElementById('subject');
                if (subjectSelect) {
                    subjectSelect.value = 'testdrive';
                    subjectSelect.focus(); // accessibility focus shift
                }
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Agradecemos seu contato! Responderemos em breve.');
            contactForm.reset();
        });
    }

    // 5. Sell Car Form Processing
    const sellForm = document.getElementById('sell-form');
    if (sellForm) {
        sellForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Proposta de avaliação enviada com sucesso! Nossos consultores retornarão rapidamente para validar seu veículo.');
            sellForm.reset();
        });
    }

    // 6. Global Accessibility Interactive Menu Setup
    const a11yToggle = document.getElementById('a11y-toggle');
    const a11yPanel = document.getElementById('a11y-panel');
    const btnIncreaseText = document.getElementById('btn-increase-text');
    const btnDecreaseText = document.getElementById('btn-decrease-text');
    const btnContrast = document.getElementById('btn-high-contrast');
    const btnDyslexic = document.getElementById('btn-dyslexic');

    if (a11yToggle && a11yPanel) {
        // Hydrate saved a11y state
        const applyA11yState = () => {
            if (localStorage.getItem('a11y-large-text') === 'true') {
                document.documentElement.classList.add('a11y-large-text');
                btnIncreaseText.setAttribute('aria-pressed', 'true');
            } else {
                document.documentElement.classList.remove('a11y-large-text');
                btnIncreaseText.setAttribute('aria-pressed', 'false');
            }

            if (localStorage.getItem('a11y-high-contrast') === 'true') {
                document.documentElement.classList.add('a11y-high-contrast');
                btnContrast.setAttribute('aria-pressed', 'true');
            }

            if (localStorage.getItem('a11y-dyslexic') === 'true') {
                document.documentElement.classList.add('a11y-dyslexic');
                btnDyslexic.setAttribute('aria-pressed', 'true');
            }
        };

        applyA11yState();

        a11yToggle.addEventListener('click', () => {
            const isExpanded = a11yToggle.getAttribute('aria-expanded') === 'true';
            a11yToggle.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                a11yPanel.style.display = 'flex';
                a11yPanel.style.animation = 'fadeIn 0.2s ease-out';
                a11yPanel.setAttribute('aria-hidden', 'false');
            } else {
                a11yPanel.style.display = 'none';
                a11yPanel.setAttribute('aria-hidden', 'true');
            }
        });

        document.addEventListener('click', (e) => {
            if (!a11yToggle.contains(e.target) && !a11yPanel.contains(e.target) && a11yToggle.getAttribute('aria-expanded') === 'true') {
                a11yToggle.setAttribute('aria-expanded', 'false');
                a11yPanel.style.display = 'none';
                a11yPanel.setAttribute('aria-hidden', 'true');
            }
        });

        // Accessibility Action Handlers
        btnIncreaseText.addEventListener('click', () => {
            document.documentElement.classList.add('a11y-large-text');
            localStorage.setItem('a11y-large-text', 'true');
            btnIncreaseText.setAttribute('aria-pressed', 'true');
        });

        btnDecreaseText.addEventListener('click', () => {
            document.documentElement.classList.remove('a11y-large-text');
            localStorage.setItem('a11y-large-text', 'false');
            btnIncreaseText.setAttribute('aria-pressed', 'false');
        });

        btnContrast.addEventListener('click', () => {
            const isActive = document.documentElement.classList.toggle('a11y-high-contrast');
            localStorage.setItem('a11y-high-contrast', isActive);
            btnContrast.setAttribute('aria-pressed', isActive);
        });

        btnDyslexic.addEventListener('click', () => {
            const isActive = document.documentElement.classList.toggle('a11y-dyslexic');
            localStorage.setItem('a11y-dyslexic', isActive);
            btnDyslexic.setAttribute('aria-pressed', isActive);
        });
    }
});

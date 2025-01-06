const data = localStorage.getItem('imovelDetalhes');
const detalhes = JSON.parse(data);

const detalhesContainer = document.querySelector('.detalhes-container');

// Crie a estrutura do carrossel
const swiperContainer = document.createElement('div');
swiperContainer.classList.add('swiper-container');

const swiperWrapper = document.createElement('div');
swiperWrapper.classList.add('swiper-wrapper');

// Converta a string JSON em um array
const imagens = JSON.parse(detalhes.data.imagens);

// Verifique se imagens é um array
if (Array.isArray(imagens)) {
    imagens.forEach(imagem => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `<img src="../assets/${imagem}" alt="Imagem do Imóvel">`;
        swiperWrapper.appendChild(slide);
    });
} else {
    console.error('imagens não é um array:', imagens);
}

// Adicione os botões de navegação
const swiperButtonNext = document.createElement('div');
swiperButtonNext.classList.add('swiper-button-next');

const swiperButtonPrev = document.createElement('div');
swiperButtonPrev.classList.add('swiper-button-prev');

// Monte a estrutura do carrossel
swiperContainer.appendChild(swiperWrapper);
swiperContainer.appendChild(swiperButtonNext);
swiperContainer.appendChild(swiperButtonPrev);

// Adicione o carrossel ao container de detalhes
detalhesContainer.appendChild(swiperContainer);

// Inicialize o Swiper
const swiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
});

// Adicione o valor do imóvel
const valorImovel = document.createElement('p');
valorImovel.classList.add('valor-imovel');
valorImovel.innerHTML = `R$ ${detalhes.data.valor.toFixed(2).replace('.', ',')}`;
swiperContainer.appendChild(valorImovel);

// Adicione os detalhes do imóvel
const detalhesImovel = document.createElement('div');
detalhesImovel.classList.add('detalhes-info');
detalhesImovel.innerHTML = `
    <h1 id="titulo-imovel">${detalhes.data.cidade} - ${detalhes.data.bairro}</h1>
    <p id="descricao-imovel">${detalhes.data.descricao || 'Descrição detalhada do imóvel.'}</p>
    <p><strong>Endereço:</strong> ${detalhes.data.endereco || 'Endereço não disponível.'}</p>
    <p><strong>Dormitórios:</strong> ${detalhes.data.dormitorios || 'N/A'}</p>
    <p><strong>Banheiros:</strong> ${detalhes.data.banheiros || 'N/A'}</p>
    <p><strong>Garagem:</strong> ${detalhes.data.garagem ? 'Sim' : 'Não'}</p>
    <p><strong>Churrasqueira:</strong> ${detalhes.data.churrasqueira ? 'Sim' : 'Não'}</p>
    <p><strong>Pátio:</strong> ${detalhes.data.patio ? 'Sim' : 'Não'}</p>
    <button class="contato-bttn" id="contato-bttn">ENTRE EM CONTATO</button>`;

detalhesContainer.appendChild(detalhesImovel);

document.getElementById('contato-bttn').addEventListener('click', () => {
    window.location.href = '../contato/index.html'; // Redireciona para a página de contato
});
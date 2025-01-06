const data = localStorage.getItem('imovelDetalhes');
const detalhes = JSON.parse(data);

const detalhesContainer = document.querySelector('.detalhes-container');
const imovel = document.createElement('div');
imovel.classList.add('detalhes-imagem');
imovel.innerHTML = `
    <div class="detalhes-imagem">
                <img src="../assets/example.png" alt="Imagem do Imóvel" id="imagem-imovel">
                    <p class="valor-imovel"> R$ ${detalhes.data.valor.toFixed(2).replace('.', ',')}</p>
            </div>`
detalhesContainer.appendChild(imovel);

const detalhesImovel = document.createElement('div');
detalhesImovel.classList.add('detalhes-info');
detalhesImovel.innerHTML = `
                    <h1 id="titulo-imovel">${detalhes.data.cidade} - ${detalhes.data.bairro}</h1>
    <p id="descricao-imovel">${detalhes.data.descricao || 'Descrição detalhada do imóvel.'}</p>
    <p><strong><iconify-icon icon="map:postal-code-prefix" id="desc_ic"></iconify-icon> Endereço:</strong> ${detalhes.data.endereco || 'Endereço não disponível.'}</p>
    <p><strong><iconify-icon icon="material-symbols:bed" id="desc_ic"></iconify-icon> Dormitórios:</strong> ${detalhes.data.dormitorios || 'N/A'}</p>
    <p><strong><iconify-icon icon="material-symbols:shower" id="desc_ic"></iconify-icon> Banheiros:</strong> ${detalhes.data.banheiros || 'N/A'}</p>
    <p><strong><iconify-icon icon="ri:car-fill"></iconify-icon>Garagem:</strong> ${detalhes.data.garagem ? 'Sim' : 'Não'}</p>
    <p><strong><iconify-icon icon="hugeicons:bbq-grill"></iconify-icon></iconify-icon> Churrasqueira:</strong> ${detalhes.data.churrasqueira ? 'Sim' : 'Não'}</p>
    <p><strong><iconify-icon icon="material-symbols:yard-outline-sharp"></iconify-icon> Pátio:</strong> ${detalhes.data.patio ? 'Sim' : 'Não'}</p>
    <button class="contato-bttn" id="contato-bttn">ENTRE EM CONTATO</button>`;

detalhesContainer.appendChild(detalhesImovel);

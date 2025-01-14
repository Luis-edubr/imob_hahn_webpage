const resultados = localStorage.getItem('resultados');
const resultadosObj = JSON.parse(resultados);

const resultadoContainer = document.getElementById('resultado-container');
let imoveis;

function loadResults(results) {
    imoveis = results;
    resultadoContainer.innerHTML = ''; // Limpa o container antes de adicionar novos resultados
    results.forEach(imovel => {
        const destaque = document.createElement('div');
        destaque.classList.add('destaque-ven-al');
        destaque.setAttribute('data-id', imovel.idcasa); // Adiciona o atributo data-id

        destaque.innerHTML = `
            <div class="top">
                <img src="../assets/example.png" class="img_casa">
                <h3>${imovel.bairro.toUpperCase()} - ${imovel.cidade.toUpperCase()}</h3>
                <p><iconify-icon icon="map:postal-code-prefix" id="desc_ic"></iconify-icon>${imovel.endereco}</p>
                <div class="line"></div>
            </div>
            <div class="bottom">
                <p>Cód:${imovel.idcasa}</p>
                <div class="icons">
                    <p><iconify-icon icon="material-symbols:shower" id="desc_ic"></iconify-icon>${imovel.banheiros}</p>
                    <p><iconify-icon icon="material-symbols:bed" id="desc_ic"></iconify-icon>${imovel.dormitorios}</p>
                    <p><iconify-icon icon="ri:car-fill"></iconify-icon>${imovel.garagem}</p>
                </div>
            </div>
            <div class="price">
                <div class="line" height="20px"></div>
                <p>R$ ${imovel.valor.toFixed(2).replace('.', ',')}</p>
            </div>
        `;

        resultadoContainer.appendChild(destaque);
    });
}

// Adiciona evento de clique ao container
resultadoContainer.addEventListener('click', (event) => {
    const destaque = event.target.closest('.destaque-ven-al');
    if (destaque) {
        const id = destaque.getAttribute('data-id');
        fetchImovelDetails(id);
    }
});

function fetchImovelDetails(id) {
    localStorage.removeItem('resultados');
    fetch(`http://localhost:3000/getHouseById/${id}`)
        .then(response => response.json())
        .then(data => {
            // Armazena os detalhes do imóvel no localStorage
            localStorage.setItem('imovelDetalhes', JSON.stringify(data));
            // Redireciona para a página de detalhes
            window.location.href = '../imovel/index.html';
        })
        .catch(error => {
            console.error('Erro na requisição:', error.message);
        });
}

window.onload = () => loadResults(resultadosObj);

const valores = document.querySelectorAll('.valor');
const dormitorios = document.querySelectorAll('.dormitorios');
const banheiros = document.querySelectorAll('.banheiros');
const vagas = document.querySelectorAll('.vagas');

function filtros(botao) {
    const grupo = botao[0].parentNode; // Obtém o grupo de botões

    botao.forEach(button => {
        button.addEventListener('click', () => {
            const isActive = button.classList.contains('active');

            // Remove a classe 'active' de todos os botões do grupo
            grupo.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Adiciona a classe 'active' apenas ao botão clicado
            if (!isActive) {
                button.classList.add('active');
            }

            const buttonName = button.id;
            
        });
    });
}

filtros(valores);
filtros(dormitorios);
filtros(banheiros);
filtros(vagas);

const dropdowns = document.querySelectorAll('.dropdown-results');
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.dropdown-results-title');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            const selectedValue = option.dataset.value; // Acessa o atributo data-value
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });

});

const minmax = document.querySelector('.min-max');
const selectMinMax = minmax.querySelector('.minmax-title');
const menuMinMax = minmax.querySelector('.menu');
const optionsMinMax = minmax.querySelectorAll('.menu li');
const selectedMinMax = minmax.querySelector('.selected');
selectMinMax.addEventListener('click', () => {
    selectMinMax.classList.toggle('select-clicked');
    menuMinMax.classList.toggle('menu-open');
});
optionsMinMax.forEach(option => {
    option.addEventListener('click', () => {
        const selectedValue = option.dataset.value; // Acessa o atributo data-value
        selectedMinMax.innerText = option.innerText;
        selectMinMax.classList.remove('select-clicked');
        menuMinMax.classList.remove('menu-open');
        optionsMinMax.forEach(option => {
            option.classList.remove('active');
        });
        option.classList.add('active');
        if (option.classList.contains('active')) {
            if (option.innerText == 'Maior preço') {
                sortByValor2(imoveis);
            } else if (option.innerText == 'Menor preço') {
                sortByValor(imoveis);
            }
        }
    });
});

function sendSearch() {
    // Objeto para armazenar os valores dos dropdowns
    let dropdownValues = {};

    // Itera pelos dropdowns
    dropdowns.forEach(dropdown => {
        const dropdownId = dropdown.id;
        const selectedOption = dropdown.querySelector('.selected');
        
        if (selectedOption) {
            const selectedValue = selectedOption.innerText.trim();
    
            if (selectedValue !== "" && selectedValue !== null) {
                // Verifica se o valor selecionado não é um valor padrão
                if (!["Cidade", "CIDADE", "Tipo", "TIPO", "Bairro", "BAIRRO", "Modalidade", "MODALIDADE"].includes(selectedValue)) {
                    if (dropdownId === 'dormitorios' || dropdownId === 'banheiros') {
                        dropdownValues[dropdownId] = parseInt(selectedValue, 10); // Converte para inteiro
                    } else {
                        dropdownValues[dropdownId] = capitalizeWords(selectedValue); // Converte para formato capitalizado
                    }
                }
            }
        }
    });
    const codigoInput = document.querySelector('#codigoInput');
    if (codigoInput) {
        const codigoValue = codigoInput.value.trim();
        if (codigoValue !== "" && codigoValue !== null) {
            dropdownValues["idcasa"] = codigoValue;
        }
    }

    const buttons = document.querySelectorAll('.botoes-filtro button');
    buttons.forEach(button => {
        const buttonId = button.id;
        const buttonClass = button.className.split(' ')[0];
        const isActive = button.classList.contains('active');

        // Verifica se o botão está ativo
        if (isActive) {
            if (buttonClass === 'dormitorios' || buttonClass === 'banheiros') {
                dropdownValues[buttonClass] = parseInt(buttonId, 10); // Converte para inteiro
            } else {
                dropdownValues[buttonClass] = buttonId;
            }
        }
    });

    console.log(dropdownValues);
    
    fetch('http://localhost:3000/getHouseByParameter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dropdownValues)
    })
        .then(response => response.json())
        .then(data => {
            
            loadResults(data.data);
        })
        .catch(error => {
            console.error('Erro na requisição:', error.message);
        });
}

const botaoPesquisa = document.querySelector('#pesquisar');
botaoPesquisa.addEventListener('click', sendSearch);

function sortByValor(objetos) {
    imoveis = objetos;
    imoveis.sort((a, b) => a.valor - b.valor); 
    loadResults(imoveis); 
}

function sortByValor2(objetos) {
    imoveis = objetos;
    imoveis.sort((a, b) => b.valor - a.valor); 
    loadResults(imoveis); 
}

function capitalizeWords(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}


window.addEventListener('beforeunload', () => {
    localStorage.removeItem('resultados');
});
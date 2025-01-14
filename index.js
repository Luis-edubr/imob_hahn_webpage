    
    const buttons = document.querySelectorAll('.filter-bttns');
    let selectedButton = null;
  
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        if (selectedButton) {
          selectedButton.classList.remove('active');
        }
        button.classList.add('active');
        selectedButton = button;
        const buttonName = button.id;
      });
    });
  
    // dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.dropdown-title');
        const menu = dropdown.querySelector('.menu');
        const options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');
  
        select.addEventListener('click', () => {
            select.classList.toggle('select-clicked');
            menu.classList.toggle('menu-open');
        });
  
        options.forEach(option => {
            option.addEventListener('click', () => {
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

  
    function sendDropdown() {
        
        let dropdownValues = {};
    
        dropdowns.forEach(dropdown => {
            const dropdownId = dropdown.id;
            const selectedOption = dropdown.querySelector('.selected');
            
            if (selectedOption) {
                const selectedValue = selectedOption.innerText.trim();
    
                if (selectedValue !== "" && selectedValue !== null) {
                  if (selectedValue.toUpperCase() !== dropdownId.toUpperCase()){
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
        const codigoValue = codigoInput ? codigoInput.value.trim() : '';
        if (codigoValue !== "") {
            dropdownValues["idcasa"] = codigoValue;
        }
  
        function capitalizeWords(str) {
            return str
                .toLowerCase()
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }
        
        
        fetch('http://localhost:3000/getHouseByParameter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dropdownValues)
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('resultados', JSON.stringify(data.data));
            window.location.href = './resultados/index.html';
        })
        .catch(error => {
            console.error('Erro na requisição:', error.message);
        });
    
        
      }
  
    const botaoPesquisa = document.querySelector('#botaoPesquisa');
    botaoPesquisa.addEventListener('click', sendDropdown);
    

  
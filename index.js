document.addEventListener('DOMContentLoaded', function () {
    // Pega o caminho completo da URL atual (ex: /inicio/index.html)

  
    document.getElementById('nav-toggle').addEventListener('click', function() {
      console.log("clicado")
      var mobileNav = document.getElementById('mobile-nav');
      mobileNav.classList.toggle('active'); // Alterna a classe 'active' para mostrar/esconder o menu
    });
  
    
  });
  
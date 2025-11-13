// Inicializar ícones Lucide
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Função para controlar a navegação por abas
function showTab(tabName) {
    // Esconder todos os conteúdos
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remover active de todos os botões
    const allTabs = document.querySelectorAll('.nav-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    // Mostrar o conteúdo selecionado
    const selectedContent = document.getElementById('tab-' + tabName);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Ativar o botão selecionado
    event.target.closest('.nav-tab').classList.add('active');
    event.target.closest('.nav-tab').setAttribute('aria-selected', 'true');
    
    // Scroll suave para o topo do conteúdo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

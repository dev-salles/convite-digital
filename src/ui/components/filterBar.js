/**
 * Componente FilterBar (Componente de Filtros)
 * Gerencia o estado das abas de categorias e emite eventos de filtragem.
 */
(function (global) {
  const FilterBar = {
    /**
     * Inicializa os botões de filtro
     * @param {string} containerSelector - Seletor do elemento com os botões
     * @param {Function} onFilterChange - Callback com a categoria selecionada ('todos', 'lua-de-mel', etc.)
     */
    init(containerSelector, onFilterChange) {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const buttons = container.querySelectorAll('.filter-tab');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const category = btn.getAttribute('data-filter') || 'todos';

          // Atualizar estado visual de todas as abas
          buttons.forEach(b => {
            b.classList.remove('bg-gold', 'text-white', 'shadow-sm');
            b.classList.add('bg-white', 'border', 'border-gold/25', 'text-muted');
          });

          // Destacar aba clicada
          btn.classList.remove('bg-white', 'border', 'border-gold/25', 'text-muted');
          btn.classList.add('bg-gold', 'text-white', 'shadow-sm');

          if (typeof onFilterChange === 'function') {
            onFilterChange(category);
          }
        });
      });
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = FilterBar;
  } else {
    global.FilterBar = FilterBar;
  }
})(typeof window !== 'undefined' ? window : globalThis);

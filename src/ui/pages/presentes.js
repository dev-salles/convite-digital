/**
 * Controlador da Página da Lista de Presentes (Page Controller)
 * Orquestra repositório, componentes de UI, modal de detalhes e modal de Pix.
 */
(function (global) {
  function initPresentesPage() {
    const gridContainer = document.getElementById('gifts-grid');
    const customAmountBtn = document.getElementById('btn-custom-amount');

    // 1. Inicializar Modais
    if (global.PixModal) {
      global.PixModal.init();
    }
    if (global.ProductModal) {
      global.ProductModal.init();
    }

    // 2. Renderizar Grade de Presentes a partir do Repositório
    function renderGifts(category = 'todos') {
      if (!gridContainer || !global.GiftsRepository || !global.GiftCard) return;

      const gifts = global.GiftsRepository.getByCategory(category);
      gridContainer.innerHTML = '';

      gifts.forEach(gift => {
        const cardElem = global.GiftCard.render(
          gift,
          // Ação: Presentear direto com Pix
          (selectedGift) => {
            if (global.PixModal) {
              global.PixModal.open(selectedGift.title, selectedGift.price);
            }
          },
          // Ação: Ver detalhes completos do produto / opção de loja externa
          (selectedGift) => {
            if (global.ProductModal) {
              global.ProductModal.open(selectedGift);
            }
          }
        );
        gridContainer.appendChild(cardElem);
      });
    }

    // Primeira renderização
    renderGifts('todos');

    // 3. Inicializar Barra de Filtros
    if (global.FilterBar) {
      global.FilterBar.init('#filter-bar-container', (selectedCategory) => {
        renderGifts(selectedCategory);
      });
    }

    // 4. Botão de Contribuição Livre / Valor Avulso
    if (customAmountBtn) {
      customAmountBtn.addEventListener('click', () => {
        if (global.PixModal) {
          global.PixModal.open('Contribuição Especial dos Noivos', '');
        }
      });
    }
  }

  // Executar após carregamento do DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentesPage);
  } else {
    initPresentesPage();
  }

  global.initPresentesPage = initPresentesPage;
})(typeof window !== 'undefined' ? window : globalThis);

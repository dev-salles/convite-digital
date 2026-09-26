/**
 * Componente GiftCard (Componente de Apresentação)
 * Responsável estritamente pela renderização de cada card de presente na grade.
 * Inclui botão elegante de "Ver detalhes do produto" e ação de presentear via Pix.
 */
(function (global) {
  const GiftCard = {
    /**
     * Formata um valor numérico para Moeda Real (BRL)
     * @param {number} value
     * @returns {string} Ex: "R$ 220,00"
     */
    formatCurrency(value) {
      return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    },

    /**
     * Obtém a URL da imagem considerando substituição local salva ou caminhos locais
     * @param {Object} gift
     * @returns {string}
     */
    resolveImageSource(gift) {
      if (typeof localStorage !== 'undefined') {
        const customImage = localStorage.getItem('wedding_gift_img_' + gift.id);
        if (customImage) return customImage;
      }
      if (gift.localImageUrl) {
        return gift.localImageUrl;
      }
      return gift.imageUrl;
    },

    /**
     * Renderiza o elemento DOM do card de presente
     * @param {Object} gift - Objeto do presente
     * @param {Function} onSelectGift - Callback ao clicar em "Presentear"
     * @param {Function} onOpenDetails - Callback ao clicar em "Ver detalhes"
     * @returns {HTMLElement}
     */
    render(gift, onSelectGift, onOpenDetails) {
      const article = document.createElement('article');
      article.className = 'gift-card bg-white rounded-2xl overflow-hidden border border-gold/20 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group';
      article.setAttribute('data-category', gift.category);
      article.setAttribute('data-id', gift.id);

      const initialSrc = this.resolveImageSource(gift);
      const fallbackSrc = gift.remoteImageUrl || gift.imageUrl;

      article.innerHTML = `
        <div class="relative h-44 overflow-hidden bg-linen-dark cursor-pointer group-hover:brightness-95 transition-all card-image-trigger" title="Clique para ver os detalhes completos deste presente">
          <img 
            src="${initialSrc}" 
            alt="${gift.imageAlt || gift.title}" 
            loading="lazy"
            onerror="if (!this.dataset.fallbackApplied && this.src !== '${fallbackSrc}') { this.dataset.fallbackApplied = '1'; this.src = '${fallbackSrc}'; }"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold text-gold-dark px-2.5 py-1 rounded-full shadow-sm">
            ${gift.categoryLabel || gift.category}
          </span>
          ${gift.isPhysical ? `
            <span class="absolute top-3 right-3 bg-charcoal/85 backdrop-blur-sm text-[9px] uppercase tracking-wider font-semibold text-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <span>📦 Opção Física</span>
            </span>
          ` : `
            <span class="absolute top-3 right-3 bg-gold/90 backdrop-blur-sm text-[9px] uppercase tracking-wider font-semibold text-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <span>✈️ Cota Virtual</span>
            </span>
          `}
        </div>

        <div class="p-5 flex flex-col flex-grow justify-between">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3 class="font-serif text-lg font-semibold text-charcoal leading-snug card-title-trigger cursor-pointer hover:text-gold-dark transition-colors">
                ${gift.title}
              </h3>
            </div>
            
            <p class="text-xs text-muted font-light leading-relaxed mb-3">
              ${gift.description}
            </p>

            <!-- Botão Discreto e Elegante de Ver Detalhes -->
            <button 
              type="button" 
              class="btn-detalhes-trigger inline-flex items-center gap-1 text-[11px] font-medium text-gold-dark hover:text-gold transition-colors py-1 cursor-pointer mb-2"
              title="Ver modelo recomendado, especificações e links de compra">
              <svg class="w-3.5 h-3.5 fill-current opacity-80" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              <span class="underline underline-offset-2 decoration-gold/40 hover:decoration-gold">Ver detalhes do produto</span>
            </button>
          </div>

          <!-- Rodapé do Card: Valor e CTA de Presentear -->
          <div class="pt-3 border-t border-linen-dark flex items-center justify-between mt-auto">
            <div>
              <span class="text-[10px] uppercase text-muted tracking-wider block">Valor</span>
              <span class="font-serif text-lg font-bold text-charcoal">${this.formatCurrency(gift.price)}</span>
            </div>
            <button 
              type="button"
              class="btn-presentear px-4 py-2 rounded-full bg-gold hover:bg-gold-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-200 shadow-sm flex items-center gap-1.5 cursor-pointer">
              <span>Presentear</span>
            </button>
          </div>
        </div>
      `;

      // Evento do botão Principal "Presentear" (Abre o fluxo Pix direto)
      const btnPresentear = article.querySelector('.btn-presentear');
      if (btnPresentear && typeof onSelectGift === 'function') {
        btnPresentear.addEventListener('click', (e) => {
          e.stopPropagation();
          onSelectGift(gift);
        });
      }

      // Evento de "Ver Detalhes do Produto"
      const detailsTriggers = article.querySelectorAll('.btn-detalhes-trigger, .card-image-trigger, .card-title-trigger');
      detailsTriggers.forEach(el => {
        el.addEventListener('click', () => {
          if (typeof onOpenDetails === 'function') {
            onOpenDetails(gift);
          }
        });
      });

      return article;
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = GiftCard;
  } else {
    global.GiftCard = GiftCard;
  }
})(typeof window !== 'undefined' ? window : globalThis);

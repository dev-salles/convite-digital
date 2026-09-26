/**
 * Componente ProductModal (Controlador do Modal de Detalhes do Produto)
 * Exibe foto real, especificações técnicas, nota afetiva dos noivos e duplo CTA (Pix vs Loja Física).
 */
(function (global) {
  class ProductModalController {
    constructor(config = {}) {
      this.weddingConfig = config.weddingConfig || global.WEDDING_CONFIG || {};
      this.clipboardService = config.clipboardService || global.ClipboardService;
      this.pixModal = config.pixModal || global.PixModal;

      this.currentGift = null;
      this.dom = {};
      this.initialized = false;
    }

    init() {
      if (this.initialized) return;

      this.dom = {
        modal: document.getElementById('product-detail-modal'),
        modalBox: document.getElementById('product-modal-box'),
        closeBtns: document.querySelectorAll('[data-action="close-product-modal"]'),
        
        // Elementos Dinâmicos
        categoryBadge: document.getElementById('pm-category-badge'),
        typeBadge: document.getElementById('pm-type-badge'),
        title: document.getElementById('pm-title'),
        model: document.getElementById('pm-model'),
        price: document.getElementById('pm-price'),
        image: document.getElementById('pm-image'),
        affectiveNote: document.getElementById('pm-affective-note'),
        specsContainer: document.getElementById('pm-specs-container'),
        specsList: document.getElementById('pm-specs-list'),
        
        // Dual CTA
        btnPixCta: document.getElementById('pm-pix-cta'),
        btnStoreCta: document.getElementById('pm-store-cta'),
        storeSection: document.getElementById('pm-store-section'),
        deliverySection: document.getElementById('pm-delivery-section'),
        deliveryText: document.getElementById('pm-delivery-text'),
        btnCopyAddress: document.getElementById('pm-btn-copy-address'),
        copyAddressText: document.getElementById('pm-copy-address-text')
      };

      if (!this.dom.modal) return;

      // Eventos de Fechamento
      this.dom.closeBtns.forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });

      this.dom.modal.addEventListener('click', (e) => {
        if (e.target === this.dom.modal) {
          this.close();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !this.dom.modal.classList.contains('hidden')) {
          this.close();
        }
      });

      // Evento de Copiar Endereço de Entrega
      if (this.dom.btnCopyAddress) {
        this.dom.btnCopyAddress.addEventListener('click', () => this.handleCopyDeliveryAddress());
      }

      // Evento do Botão de Ir para o Pix
      if (this.dom.btnPixCta) {
        this.dom.btnPixCta.addEventListener('click', () => {
          if (!this.currentGift) return;
          const gift = this.currentGift;
          this.close();
          // Pequeno timeout para transição harmoniosa entre modais
          setTimeout(() => {
            if (global.PixModal) {
              global.PixModal.open(gift.title, gift.price);
            }
          }, 200);
        });
      }

      this.initialized = true;
    }

    open(gift) {
      this.init();
      if (!gift || !this.dom.modal) return;

      this.currentGift = gift;

      // 1. Títulos e Badges
      if (this.dom.title) this.dom.title.textContent = gift.title;
      if (this.dom.model) this.dom.model.textContent = gift.productModel || gift.title;
      if (this.dom.categoryBadge) this.dom.categoryBadge.textContent = gift.categoryLabel || gift.category;
      
      if (this.dom.typeBadge) {
        if (gift.isPhysical) {
          this.dom.typeBadge.className = 'text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200';
          this.dom.typeBadge.textContent = '📦 Opção Física ou Pix';
        } else {
          this.dom.typeBadge.className = 'text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200';
          this.dom.typeBadge.textContent = '✈️ Cota de Experiência / Viagem';
        }
      }

      // 2. Preço Formatado
      if (this.dom.price) {
        const precoFormatado = Number(gift.price || 0).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
        this.dom.price.textContent = precoFormatado;
        if (this.dom.btnPixCta) {
          this.dom.btnPixCta.innerHTML = `
            <span>Contribuir com este Valor via Pix (${precoFormatado})</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          `;
        }
      }

      // 3. Imagem
      if (this.dom.image) {
        const savedImage = (typeof localStorage !== 'undefined') ? localStorage.getItem('wedding_gift_img_' + gift.id) : null;
        const initialSrc = savedImage || gift.localImageUrl || gift.remoteImageUrl || gift.imageUrl;
        const fallbackSrc = gift.remoteImageUrl || gift.imageUrl;

        this.dom.image.src = initialSrc;
        this.dom.image.alt = gift.productModel || gift.title;
        this.dom.image.onerror = function() {
          if (!this.dataset.fallback && this.src !== fallbackSrc) {
            this.dataset.fallback = '1';
            this.src = fallbackSrc;
          }
        };
      }

      // 4. Nota Afetiva dos Noivos
      if (this.dom.affectiveNote) {
        this.dom.affectiveNote.textContent = gift.affectiveNote || gift.description;
      }

      // 5. Especificações Técnicas (se houver)
      if (this.dom.specsContainer && this.dom.specsList) {
        this.dom.specsList.innerHTML = '';
        if (gift.specifications && Object.keys(gift.specifications).length > 0) {
          this.dom.specsContainer.classList.remove('hidden');
          Object.entries(gift.specifications).forEach(([key, val]) => {
            const row = document.createElement('div');
            row.className = 'flex items-center justify-between text-xs py-1.5 border-b border-linen-dark last:border-0';
            row.innerHTML = `
              <span class="text-muted font-medium">${key}:</span>
              <span class="text-charcoal font-semibold text-right">${val}</span>
            `;
            this.dom.specsList.appendChild(row);
          });
        } else {
          this.dom.specsContainer.classList.add('hidden');
        }
      }

      // 6. Configurar Opção de Loja Externa (Opção B)
      if (this.dom.storeSection && this.dom.btnStoreCta) {
        if (gift.isPhysical && gift.storeUrl) {
          this.dom.storeSection.classList.remove('hidden');
          this.dom.btnStoreCta.href = gift.storeUrl;
          this.dom.btnStoreCta.innerHTML = `
            <span>Ver Produto na Loja (${gift.storeName || 'Loja Recomendada'})</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          `;
        } else {
          this.dom.storeSection.classList.add('hidden');
        }
      }

      // 7. Endereço de Entrega dos Noivos
      if (this.dom.deliverySection && this.dom.deliveryText) {
        if (gift.isPhysical && this.weddingConfig.delivery) {
          this.dom.deliverySection.classList.remove('hidden');
          this.dom.deliveryText.textContent = this.weddingConfig.delivery.fullText || `${this.weddingConfig.delivery.address}, ${this.weddingConfig.delivery.city}`;
        } else {
          this.dom.deliverySection.classList.add('hidden');
        }
      }

      // Abrir Modal com Transição
      this.dom.modal.classList.remove('hidden');
      requestAnimationFrame(() => {
        this.dom.modal.classList.remove('opacity-0');
        if (this.dom.modalBox) {
          this.dom.modalBox.classList.remove('modal-enter');
          this.dom.modalBox.classList.add('modal-enter-active');
        }
      });

      document.body.style.overflow = 'hidden';
    }

    close() {
      if (!this.dom.modal || this.dom.modal.classList.contains('hidden')) return;

      if (this.dom.modalBox) {
        this.dom.modalBox.classList.remove('modal-enter-active');
        this.dom.modalBox.classList.add('modal-exit');
      }
      this.dom.modal.classList.add('opacity-0');

      setTimeout(() => {
        this.dom.modal.classList.add('hidden');
        if (this.dom.modalBox) {
          this.dom.modalBox.classList.remove('modal-exit');
          this.dom.modalBox.classList.add('modal-enter');
        }
        document.body.style.overflow = '';
      }, 250);
    }

    async handleCopyDeliveryAddress() {
      const addressText = this.weddingConfig.delivery?.fullText || (this.dom.deliveryText ? this.dom.deliveryText.textContent : '');
      if (!addressText) return;

      let success = false;
      if (this.clipboardService && typeof this.clipboardService.copy === 'function') {
        success = await this.clipboardService.copy(addressText);
      }

      if (this.dom.copyAddressText && this.dom.btnCopyAddress) {
        this.dom.copyAddressText.textContent = "Endereço Copiado!";
        this.dom.btnCopyAddress.classList.add('bg-green-100', 'text-green-800', 'border-green-300');

        setTimeout(() => {
          this.dom.copyAddressText.textContent = "Copiar Endereço";
          this.dom.btnCopyAddress.classList.remove('bg-green-100', 'text-green-800', 'border-green-300');
        }, 2200);
      }
    }
  }

  const ProductModal = new ProductModalController();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductModalController, ProductModal };
  } else {
    global.ProductModalController = ProductModalController;
    global.ProductModal = ProductModal;
    global.openProductModal = (gift) => ProductModal.open(gift);
    global.closeProductModal = () => ProductModal.close();
  }
})(typeof window !== 'undefined' ? window : globalThis);

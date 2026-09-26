/**
 * Componente PixModal (Controlador do Modal de Pagamento Pix)
 * Encapsula o ciclo de vida, rendering do QR code e cópia da chave.
 */
(function (global) {
  class PixModalController {
    constructor(config = {}) {
      this.pixConfig = config.pixConfig || global.PIX_CONFIG || {};
      this.weddingConfig = config.weddingConfig || global.WEDDING_CONFIG || {};
      this.clipboardService = config.clipboardService || global.ClipboardService;
      this.qrCodeService = config.qrCodeService || global.QRCodeService;
      this.whatsappService = config.whatsappService || global.WhatsAppService;
      this.pixPayloadBuilder = config.pixPayloadBuilder || global.PixPayload;

      this.currentGift = {
        title: "",
        amount: 100
      };

      this.dom = {};
      this.initialized = false;
    }

    init() {
      if (this.initialized) return;

      this.dom = {
        modal: document.getElementById('pix-modal'),
        modalBox: document.getElementById('pix-modal-box'),
        title: document.getElementById('modal-gift-title'),
        amountInput: document.getElementById('modal-gift-amount'),
        qrcodeImg: document.getElementById('pix-qrcode-img'),
        copiaColaInput: document.getElementById('pix-copia-cola'),
        whatsappBtn: document.getElementById('whatsapp-share-btn'),
        copyBtn: document.getElementById('btn-copy-pix'),
        copyText: document.getElementById('copy-text'),
        closeBtns: document.querySelectorAll('[data-action="close-modal"]'),
        keyDisplay: document.getElementById('pix-key-display'),
        beneficiaryDisplay: document.getElementById('pix-beneficiary-display')
      };

      if (!this.dom.modal) return;

      // Preencher dados informativos fixos
      if (this.dom.keyDisplay && this.pixConfig.chave) {
        this.dom.keyDisplay.textContent = this.pixConfig.chave;
      }
      if (this.dom.beneficiaryDisplay && this.pixConfig.beneficiario) {
        this.dom.beneficiaryDisplay.textContent = this.pixConfig.beneficiario;
      }

      // Eventos
      if (this.dom.amountInput) {
        this.dom.amountInput.addEventListener('input', () => this.handleAmountChange());
      }

      if (this.dom.copyBtn) {
        this.dom.copyBtn.addEventListener('click', () => this.handleCopyPix());
      }

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

      this.initialized = true;
    }

    open(giftTitle, amount) {
      this.init();
      this.currentGift.title = giftTitle || "Contribuição Especial";
      this.currentGift.amount = (amount !== undefined && amount !== null && amount !== '') ? Number(amount) : 100;

      if (this.dom.title) {
        this.dom.title.textContent = this.currentGift.title;
      }
      if (this.dom.amountInput) {
        this.dom.amountInput.value = this.currentGift.amount;
      }

      this.updatePayload();

      // Transição suave de abertura
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

    handleAmountChange() {
      const val = parseFloat(this.dom.amountInput.value) || 0;
      this.currentGift.amount = val;
      this.updatePayload();
    }

    updatePayload() {
      const amountVal = this.currentGift.amount;

      // Gerar payload BR Code Pix
      let pixPayloadString = "";
      if (this.pixPayloadBuilder && typeof this.pixPayloadBuilder.generatePixPayload === 'function') {
        pixPayloadString = this.pixPayloadBuilder.generatePixPayload({
          key: this.pixConfig.chave,
          name: this.pixConfig.beneficiario,
          city: this.pixConfig.cidade,
          amount: amountVal,
          reference: this.pixConfig.identificadorPadrao || 'NOIVOSMD'
        });
      }

      if (this.dom.copiaColaInput) {
        this.dom.copiaColaInput.value = pixPayloadString;
      }

      // QR Code
      if (this.dom.qrcodeImg && this.qrCodeService) {
        this.dom.qrcodeImg.src = this.qrCodeService.getUrl(pixPayloadString, 260);
      }

      // Link do WhatsApp
      if (this.dom.whatsappBtn && this.whatsappService) {
        const mensagem = this.whatsappService.buildGiftMessage({
          giftTitle: this.currentGift.title,
          amount: amountVal,
          brideGroomNames: `${this.weddingConfig.couple?.bride || 'Maria Eduarda'} & ${this.weddingConfig.couple?.groom || 'Davi'}`
        });
        this.dom.whatsappBtn.href = this.whatsappService.createLink(
          this.pixConfig.whatsappTelefone,
          mensagem
        );
      }
    }

    async handleCopyPix() {
      const code = this.dom.copiaColaInput ? this.dom.copiaColaInput.value : '';
      if (!code) return;

      if (this.dom.copiaColaInput) {
        this.dom.copiaColaInput.select();
        this.dom.copiaColaInput.setSelectionRange(0, 99999);
      }

      let success = false;
      if (this.clipboardService && typeof this.clipboardService.copy === 'function') {
        success = await this.clipboardService.copy(code);
      }

      if (this.dom.copyText && this.dom.copyBtn) {
        this.dom.copyText.textContent = success ? "Copiado!" : "Copiado!";
        this.dom.copyBtn.classList.remove('bg-gold', 'hover:bg-gold-hover');
        this.dom.copyBtn.classList.add('bg-green-700');

        setTimeout(() => {
          this.dom.copyText.textContent = "Copiar";
          this.dom.copyBtn.classList.remove('bg-green-700');
          this.dom.copyBtn.classList.add('bg-gold', 'hover:bg-gold-hover');
        }, 2200);
      }
    }
  }

  const PixModal = new PixModalController();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PixModalController, PixModal };
  } else {
    global.PixModalController = PixModalController;
    global.PixModal = PixModal;
    // Atalho global para compatibilidade com eventos inline se necessário
    global.openPixModal = (title, amount) => PixModal.open(title, amount);
    global.closePixModal = () => PixModal.close();
  }
})(typeof window !== 'undefined' ? window : globalThis);

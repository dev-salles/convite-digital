/**
 * Serviço de Integração com WhatsApp (WhatsApp Service)
 * Encapsula a formatação de números e geração de links universais da API do WhatsApp.
 */
(function (global) {
  const WhatsAppService = {
    /**
     * Gera URL direta para conversa no WhatsApp com texto pré-definido
     * @param {string} phone - Número no formato internacional (ex: 5561999999999)
     * @param {string} message - Texto da mensagem
     * @returns {string} Link do WhatsApp
     */
    createLink(phone, message) {
      const cleanPhone = (phone || "").replace(/\D/g, "");
      const encodedMsg = encodeURIComponent(message || "");
      return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMsg}`;
    },

    /**
     * Cria mensagem carinhosa de notificação de presente para os noivos
     * @param {Object} params
     * @param {string} params.giftTitle - Nome do presente selecionado
     * @param {number|string} params.amount - Valor contribuído
     * @param {string} [params.brideGroomNames='Maria Eduarda e Davi']
     * @returns {string}
     */
    buildGiftMessage({ giftTitle, amount, brideGroomNames = "Maria Eduarda e Davi" }) {
      const numAmount = parseFloat(amount);
      const valorFormatado = (numAmount && numAmount > 0)
        ? ` de R$ ${numAmount.toFixed(2).replace('.', ',')}`
        : '';

      return `Olá ${brideGroomNames}! Acabei de contribuir com o presente "${giftTitle}"${valorFormatado} para o casamento de vocês. Que Deus abençoe essa nova etapa com muita felicidade! ❤️✨`;
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppService;
  } else {
    global.WhatsAppService = WhatsAppService;
  }
})(typeof window !== 'undefined' ? window : globalThis);

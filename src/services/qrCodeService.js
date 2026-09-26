/**
 * Serviço de Geração de QR Code (QR Code Service)
 * Abstrai o gerador visual de QR Code para pagamentos Pix.
 */
(function (global) {
  const QRCodeService = {
    /**
     * Retorna a URL de imagem para o QR Code gerado
     * @param {string} payload - Payload textual do Pix Copia e Cola
     * @param {number} [size=260] - Dimensão em pixels (largura e altura)
     * @returns {string} URL pronta para tag <img>
     */
    getUrl(payload, size = 260) {
      if (!payload) return "";
      const encodedData = encodeURIComponent(payload);
      return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=4&data=${encodedData}`;
    },

    /**
     * Pré-carrega a imagem do QR Code para evitar piscadas na interface
     * @param {string} url - URL gerada
     * @returns {Promise<string>}
     */
    preload(url) {
      return new Promise((resolve, reject) => {
        if (!url) {
          return reject(new Error("URL vazia"));
        }
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = (err) => reject(err);
        img.src = url;
      });
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = QRCodeService;
  } else {
    global.QRCodeService = QRCodeService;
  }
})(typeof window !== 'undefined' ? window : globalThis);

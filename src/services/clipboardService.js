/**
 * Serviço de Área de Transferência (Clipboard Service)
 * Fornece cópia assíncrona resiliente com fallback para contextos restritos ou navegadores móveis.
 */
(function (global) {
  const ClipboardService = {
    /**
     * Copia texto para a área de transferência
     * @param {string} text - Texto a ser copiado
     * @returns {Promise<boolean>} Retorna true se teve sucesso
     */
    async copy(text) {
      if (!text) return false;

      // 1. Tentar API moderna do navegador
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (err) {
          console.warn("[ClipboardService] Falha na API navigator.clipboard, tentando fallback.", err);
        }
      }

      // 2. Fallback resiliente usando elemento temporário
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        textArea.style.left = "-9999px";
        textArea.setAttribute("readonly", "");
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999);

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        return successful;
      } catch (fallbackErr) {
        console.error("[ClipboardService] Não foi possível copiar para a área de transferência:", fallbackErr);
        return false;
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClipboardService;
  } else {
    global.ClipboardService = ClipboardService;
  }
})(typeof window !== 'undefined' ? window : globalThis);

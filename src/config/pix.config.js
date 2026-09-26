/**
 * Configuração dos Parâmetros do Pix para Recebimento das Cotas
 */
(function (global) {
  const PIX_CONFIG = {
    chave: "noivos.mariaedavi@gmail.com",
    beneficiario: "MARIA EDUARDA E DAVI",
    cidade: "BRASILIA",
    identificadorPadrao: "CASAMENTO",
    whatsappTelefone: "5561992705412" // Telefone para recebimento de comprovantes/mensagens
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PIX_CONFIG;
  } else {
    global.PIX_CONFIG = PIX_CONFIG;
  }
})(typeof window !== 'undefined' ? window : globalThis);

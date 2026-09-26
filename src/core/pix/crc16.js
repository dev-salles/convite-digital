/**
 * Função pura para cálculo do CRC16 (Padrão CCITT-FALSE / Polinômio 0x1021)
 * Requisito estrito da especificação EMVCo / Banco Central do Brasil para arranjos Pix.
 * 
 * @param {string} payload - String do payload sem os 4 dígitos finais do checksum
 * @returns {string} Checksum hexadecimal com 4 caracteres maiúsculos (ex: "8A2F")
 */
(function (global) {
  function computeCRC16(payload) {
    if (typeof payload !== 'string') {
      throw new TypeError("O payload para cálculo de CRC16 deve ser uma string.");
    }

    let crc = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
      crc ^= (payload.charCodeAt(i) << 8);
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
        } else {
          crc = (crc << 1) & 0xFFFF;
        }
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  const PixCRC = { computeCRC16 };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PixCRC;
  } else {
    global.PixCRC = PixCRC;
    global.computeCRC16 = computeCRC16;
  }
})(typeof window !== 'undefined' ? window : globalThis);

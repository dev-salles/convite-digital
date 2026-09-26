/**
 * Gerador de Payload Pix Copia e Cola Oficial (Padrão EMVCo / BACEN)
 * Módulo puramente funcional, sem manipulação de DOM ou efeitos colaterais.
 */
(function (global) {
  const getCRC16 = function (str) {
    if (typeof PixCRC !== 'undefined' && typeof PixCRC.computeCRC16 === 'function') {
      return PixCRC.computeCRC16(str);
    }
    if (typeof computeCRC16 === 'function') {
      return computeCRC16(str);
    }
    throw new Error("Módulo computeCRC16 não encontrado.");
  };

  /**
   * Formata um campo no padrão TLV (Tag-Length-Value) do EMVCo
   * @param {string} id - Código do campo (2 dígitos)
   * @param {string} value - Valor textual
   * @returns {string} Campo formatado (ex: "000201")
   */
  function formatField(id, value) {
    const stringVal = String(value);
    const len = stringVal.length.toString().padStart(2, '0');
    return `${id}${len}${stringVal}`;
  }

  /**
   * Remove acentos e caracteres especiais para conformidade estrita com o padrão BACEN
   * @param {string} text 
   * @returns {string}
   */
  function sanitizePixText(text) {
    if (!text) return '';
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .trim();
  }

  /**
   * Gera o código BR Code completo (Pix Copia e Cola)
   * 
   * @param {Object} params
   * @param {string} params.key - Chave Pix (E-mail, CPF/CNPJ, Telefone ou Chave Aleatória)
   * @param {string} params.name - Nome do recebedor (máx 25 chars)
   * @param {string} params.city - Cidade do recebedor (máx 15 chars)
   * @param {number|string} [params.amount] - Valor da transação (opcional ou avulso)
   * @param {string} [params.reference='CASAMENTO'] - Identificador do pagamento (máx 25 chars)
   * @returns {string} String pronta para pagamento Pix
   */
  function generatePixPayload({ key, name, city, amount, reference = 'CASAMENTO' }) {
    if (!key) {
      throw new Error("A chave Pix é obrigatória.");
    }

    const cleanName = sanitizePixText(name || 'RECEBEDOR').substring(0, 25);
    const cleanCity = sanitizePixText(city || 'BRASILIA').substring(0, 15);
    const cleanRef = (reference || 'CASAMENTO').replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);

    // Merchant Account Information (Tag 26)
    const gui = formatField('00', 'br.gov.bcb.pix');
    const pixKey = formatField('01', key.trim());
    const merchantAccount = formatField('26', `${gui}${pixKey}`);

    // Valor monetário formatado (Tag 54)
    const numericAmount = parseFloat(amount);
    const formattedAmount = (numericAmount && numericAmount > 0)
      ? numericAmount.toFixed(2)
      : '';

    const payloadParts = [
      formatField('00', '01'), // Payload Format Indicator
      merchantAccount,
      formatField('52', '0000'), // Merchant Category Code
      formatField('53', '986'),  // Transaction Currency (986 = BRL)
      formattedAmount ? formatField('54', formattedAmount) : '',
      formatField('58', 'BR'),   // Country Code
      formatField('59', cleanName),
      formatField('60', cleanCity),
      formatField('62', formatField('05', cleanRef || 'CASAMENTO')), // Additional Data Field Template
      '6304' // Checksum Indicator (Tag 63, tamanho 04)
    ];

    const rawPayload = payloadParts.join('');
    const checksum = getCRC16(rawPayload);

    return rawPayload + checksum;
  }

  const PixPayload = {
    formatField,
    sanitizePixText,
    generatePixPayload
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PixPayload;
  } else {
    global.PixPayload = PixPayload;
    global.generatePixPayload = generatePixPayload;
  }
})(typeof window !== 'undefined' ? window : globalThis);

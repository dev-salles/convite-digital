/**
 * Configuração dos Noivos e Detalhes do Grande Dia
 */
(function (global) {
  const WEDDING_CONFIG = {
    couple: {
      bride: "Maria Eduarda",
      groom: "Davi",
      monogram: "M&D",
      weddingDateDisplay: "16 de Outubro de 2027",
      weddingDateTime: "2027-10-16T20:00:00-03:00",
      locationCity: "Brasília, DF",
      verseText: "\"O amor tudo sofre, tudo crê, tudo espera, tudo suporta.\"",
      verseRef: "1 Coríntios 13:7"
    },
    ceremony: {
      title: "Cerimônia",
      time: "20h00",
      place: "Igreja Sagrada Família",
      city: "Hélio Prates | Taguatinga Norte — DF",
      mapsUrl: "https://maps.app.goo.gl/EP4xwRCQ4GPCAb1d8"
    },
    reception: {
      title: "Recepção",
      time: "21h30",
      place: "Maison Mizuno",
      city: "Brasília — DF",
      mapsUrl: "https://maps.google.com/?q=Maison+Mizuno+Brasilia"
    },
    rsvp: {
      phone: "5561992705412",
      defaultMessage: "Olá! Gostaria de confirmar minha presença no casamento de Maria Eduarda e Davi."
    },
    delivery: {
      recipient: "Maria Eduarda e Davi",
      address: "QNL 24 Conjunto E, Casa 12",
      neighborhood: "Taguatinga Norte",
      city: "Brasília — DF",
      cep: "72152-405",
      fullText: "Maria Eduarda — St. Qi QI 24 - Taguatinga, Brasília - DF, 72135-240 | Bloco A apto 502"
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = WEDDING_CONFIG;
  } else {
    global.WEDDING_CONFIG = WEDDING_CONFIG;
  }
})(typeof window !== 'undefined' ? window : globalThis);

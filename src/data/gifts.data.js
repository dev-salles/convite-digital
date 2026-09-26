/**
 * Repositório e Catálogo de Presentes (Data Layer)
 * Fornece métodos para consulta e filtragem, com dados detalhados para exibição física e via Pix.
 */
(function (global) {
  const GIFTS_DATA = [
    {
      id: "jantar-velas",
      category: "lua-de-mel",
      categoryLabel: "Lua de Mel",
      title: "Jantar à Luz de Velas",
      productModel: "Experiência Gastronômica Romântica na Lua de Mel",
      description: "Para o primeiro brinde e um jantar inesquecível olhando as estrelas da nossa lua de mel.",
      affectiveNote: "Sonhamos com esse jantar especial para celebrar os primeiros dias como marido e mulher sob o céu estrelado da nossa viagem de lua de mel!",
      price: 220.00,
      isPhysical: false,
      storeUrl: null,
      storeName: "Cota de Experiência Exclusiva",
      specifications: {
        "Tipo de Presente": "Cota de Experiência / Viagem",
        "Destino": "Lua de Mel dos Noivos",
        "Inclui": "Menu especial a dois e brinde com vinho"
      },
      localImageUrl: "images/gifts/jantar-velas.jpg",
      imageUrl: "images/gifts/jantar-velas.jpg",
      remoteImageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Jantar Romântico à Luz de Velas"
    },
    {
      id: "cafe-cama",
      category: "experiencias",
      categoryLabel: "Experiências & Mimos",
      title: "Café na Cama dos Recém-Casados",
      productModel: "Bandeja de Café da Manhã em Bambu com Pés Dobráveis",
      description: "Croissants frescos, café quentinho e mimos para a primeira manhã depois da festa!",
      affectiveNote: "Para começarmos as manhãs do fim de semana com todo aconchego e café quentinho na cama do nosso novo lar!",
      price: 95.00,
      isPhysical: true,
      storeUrl: "https://www.amazon.com.br/s?k=bandeja+cafe+da+manha+bambu+pes+dobraveis",
      storeName: "Amazon Brasil / Lojas de Utilidades",
      specifications: {
        "Material": "Bambu 100% ecológico e antibacteriano",
        "Formato": "Retangular com pés articulados",
        "Dimensões": "Aprox. 50cm x 30cm",
        "Cor": "Madeira Natural Clara"
      },
      localImageUrl: "images/gifts/cafe-cama.jpg",
      imageUrl: "images/gifts/cafe-cama.jpg",
      remoteImageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Café na Cama"
    },
    {
      id: "sofa-retratil",
      category: "casa-nova",
      categoryLabel: "Casa Nova",
      title: "Cota para o Sofá Retrátil",
      productModel: "Sofá 3 Lugares Retrátil e Reclinável em Veludo/Suede",
      description: "Para as futuras noites de filmes, séries e pipoca com os amigos em casa.",
      affectiveNote: "É o coração da nossa sala! Onde vamos descansar após a rotina de trabalho e receber nossos amigos e familiares para longas conversas.",
      price: 350.00,
      isPhysical: true,
      storeUrl: "https://www.magazineluiza.com.br/busca/sofa+retratil+reclinavel+3+lugares/",
      storeName: "Magazine Luiza / Tok&Stok / Mobly",
      specifications: {
        "Cor sugerida": "Cinza Chumbo, Bege Fendi ou Grafite",
        "Tecido": "Suede Veludo toque macio",
        "Largura": "Entre 2,10m e 2,40m",
        "Estrutura": "Assento retrátil com molas ensacadas"
      },
      localImageUrl: "images/gifts/sofa-retratil.jpg",
      imageUrl: "images/gifts/sofa-retratil.jpg",
      remoteImageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Sofá Confortável da Sala"
    },
    {
      id: "passeio-barco",
      category: "lua-de-mel",
      categoryLabel: "Lua de Mel",
      title: "Passeio de Barco ao Pôr do Sol",
      productModel: "Tour Náutico Privativo / Passeio de Escuna ao Entardecer",
      description: "Navegar com vista paradisíaca e fotos perfeitas para guardar pela vida toda.",
      affectiveNote: "Uma das experiências que mais queremos viver juntos: ver o sol se pôr em alto mar e registrar momentos inesquecíveis da nossa viagem!",
      price: 180.00,
      isPhysical: false,
      storeUrl: null,
      storeName: "Cota de Experiência da Lua de Mel",
      specifications: {
        "Tipo de Presente": "Passeio Náutico Turístico",
        "Horário": "Pôr do Sol (Golden Hour)",
        "Duração": "Aprox. 3 horas com paradas para banho"
      },
      localImageUrl: "images/gifts/passeio-barco.jpg",
      imageUrl: "images/gifts/passeio-barco.jpg",
      remoteImageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Passeio de Barco"
    },
    {
      id: "air-fryer",
      category: "casa-nova",
      categoryLabel: "Casa Nova",
      title: "Air Fryer dos Sonhos",
      productModel: "Fritadeira Elétrica sem Óleo Philips Walita Série 1000 Digital 6.2L",
      description: "O eletrodoméstico que vai salvar os jantares rápidos e saudáveis dos noivos.",
      affectiveNote: "Escolhemos este modelo específico da Philips Walita porque adoramos cozinhar de forma saudável e prática após os dias intensos de trabalho na nossa casa nova!",
      price: 390.00,
      isPhysical: true,
      storeUrl: "https://www.amazon.com.br/dp/B0D98VXWXB/?_encoding=UTF8&pd_rd_i=B0D98VXWXB&ref_=sbx_be_s_sparkle_ssd_tt&qid=1790425558&pd_rd_w=0TpdI&content-id=amzn1.sym.68201b18-13bb-49e2-811c-6327478d6bdc%3Aamzn1.sym.68201b18-13bb-49e2-811c-6327478d6bdc&pf_rd_p=68201b18-13bb-49e2-811c-6327478d6bdc&pf_rd_r=FZ65VKA8JQW5DY9V0Z1X&pd_rd_wg=Ujexs&pd_rd_r=ccabb916-d17c-4941-a0a5-fd47d91a621c&pd_rd_plhdr=t&th=1",
      storeName: "Amazon Brasil",
      specifications: {
        "Marca": "Philips Walita",
        "Linha": "Série 1000",
        "Voltagem Necessária": "220V",
        "Capacidade": "6.2 Litros",
        "Cor": "Preto"
      },
      localImageUrl: "images/gifts/air-fryer.jpg",
      imageUrl: "images/gifts/air-fryer.jpg",
      remoteImageUrl: "https://walitastore.vtexassets.com/arquivos/ids/160828/NA130_Garantia.jpg?v=638741797596300000",
      imageAlt: "Air Fryer e Eletros"
    },
    {
      id: "primeira-feira",
      category: "casa-nova",
      categoryLabel: "Casa Nova",
      title: "Primeira Feira do Mês",
      productModel: "Cota de Abastecimento da Despensa e Feira Fresca",
      description: "Para abastecer a despensa com chocolates, café, frutas e tudo que um novo lar precisa!",
      affectiveNote: "Para garantir aquele estoque inicial cheio de carinho: café moído na hora, queijos, frutas da estação e os primeiros temperos da nossa cozinha.",
      price: 150.00,
      isPhysical: false,
      storeUrl: null,
      storeName: "Cota de Mercado Virtual",
      specifications: {
        "Tipo": "Cota Financeira Direta",
        "Finalidade": "Primeiras compras de supermercado e feira orgânica",
        "Benefício": "Apoio prático para a semana de mudança"
      },
      localImageUrl: "images/gifts/primeira-feira.jpg",
      imageUrl: "images/gifts/primeira-feira.jpg",
      remoteImageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Supermercado e Feira"
    },
    {
      id: "vinhos-queijos",
      category: "experiencias",
      categoryLabel: "Experiências & Mimos",
      title: "Noite dos Vinhos & Queijos",
      productModel: "Tábua de Queijos e Frios em Bambu com Conjunto de Facas",
      description: "Uma garrafa especial para celebrar as primeiras datas comemorativas do casal.",
      affectiveNote: "Perfeita para comemorarmos pequenas conquistas e recebermos quem amamos em torno da mesa com um bom brinde!",
      price: 130.00,
      isPhysical: true,
      storeUrl: "https://www.amazon.com.br/s?k=tabua+de+frios+bambu+com+gaveta+e+facas",
      storeName: "Amazon Brasil / Camicado",
      specifications: {
        "Material": "Bambu com gaveta embutida magnética",
        "Acessórios": "4 facas e espátulas de inox especiais para queijo",
        "Design": "Canelado para biscoitos e frutas secas"
      },
      localImageUrl: "images/gifts/vinhos-queijos.jpg",
      imageUrl: "images/gifts/vinhos-queijos.jpg",
      remoteImageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Degustação de Vinhos"
    },
    {
      id: "spa-casal",
      category: "lua-de-mel",
      categoryLabel: "Lua de Mel",
      title: "Sessão Relax de Spa a Dois",
      productModel: "Massagem Relaxante com Óleos Essenciais e Aromaterapia",
      description: "Massagem relaxante pós-festa para renovar as energias na lua de mel.",
      affectiveNote: "Depois de meses de planejamento e da emoção do grande dia, nada melhor que uma tarde de massagem e descanso completo juntos!",
      price: 260.00,
      isPhysical: false,
      storeUrl: null,
      storeName: "Cota de Bem-Estar na Lua de Mel",
      specifications: {
        "Tipo": "Cota de Spa & Relaxamento",
        "Duração": "Sessão de 80 minutos para o casal",
        "Inclui": "Óleos aromáticos, banho de imersão e chá relaxante"
      },
      localImageUrl: "images/gifts/spa-casal.jpg",
      imageUrl: "images/gifts/spa-casal.jpg",
      remoteImageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Spa do Casal"
    },
    {
      id: "drinques-tropicais",
      category: "experiencias",
      categoryLabel: "Experiências & Mimos",
      title: "Rodada de Drinques Tropicais",
      productModel: "Coquetéis Autorais e Água de Coco na Praia",
      description: "Água de coco e coquetéis à beira da piscina para os noivos relaxarem.",
      affectiveNote: "Para brindar à beira da praia e celebrar o amor sob o sol da lua de mel!",
      price: 80.00,
      isPhysical: false,
      storeUrl: null,
      storeName: "Cota de Brinde",
      specifications: {
        "Tipo": "Cota de Lazer",
        "Momento": "Dias de descanso na praia",
        "Bebidas": "Drinques tropicais e frutas regionais"
      },
      localImageUrl: "images/gifts/drinques-tropicais.jpg",
      imageUrl: "images/gifts/drinques-tropicais.jpg",
      remoteImageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Drinques Tropicais na Praia"
    }
  ];

  const STORAGE_KEY = 'wedding_custom_gifts_list';

  const GiftsRepository = {
    /**
     * Retorna a lista completa de presentes (prioriza alterações salvas no navegador)
     * @returns {Array}
     */
    getAll() {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            return JSON.parse(stored);
          } catch (e) {
            console.warn("[GiftsRepository] Falha ao ler presentes customizados do localStorage.", e);
          }
        }
      }
      return [...GIFTS_DATA];
    },

    /**
     * Filtra presentes por categoria
     */
    getByCategory(category) {
      const all = this.getAll();
      if (!category || category === 'todos') {
        return all;
      }
      return all.filter(item => item.category === category);
    },

    /**
     * Localiza um presente pelo ID
     */
    getById(id) {
      return this.getAll().find(item => item.id === id) || null;
    },

    /**
     * Adiciona um novo presente à lista
     * @param {Object} giftData
     * @returns {Object}
     */
    add(giftData) {
      const all = this.getAll();
      const newId = giftData.id || this.generateSlug(giftData.title);
      
      const newGift = {
        id: newId,
        category: giftData.category || "casa-nova",
        categoryLabel: giftData.categoryLabel || this.getCategoryLabel(giftData.category),
        title: giftData.title || "Novo Presente",
        productModel: giftData.productModel || giftData.title,
        description: giftData.description || "",
        affectiveNote: giftData.affectiveNote || "",
        price: Number(giftData.price) || 100,
        isPhysical: giftData.isPhysical !== false,
        storeUrl: giftData.storeUrl || null,
        storeName: giftData.storeName || "",
        specifications: giftData.specifications || {},
        localImageUrl: giftData.localImageUrl || `images/gifts/${newId}.jpg`,
        imageUrl: giftData.imageUrl || giftData.remoteImageUrl || `images/gifts/${newId}.jpg`,
        remoteImageUrl: giftData.remoteImageUrl || giftData.imageUrl || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
        imageAlt: giftData.title
      };

      all.unshift(newGift);
      this.save(all);
      return newGift;
    },

    /**
     * Atualiza um presente existente
     * @param {string} id
     * @param {Object} updatedFields
     * @returns {boolean}
     */
    update(id, updatedFields) {
      const all = this.getAll();
      const index = all.findIndex(item => item.id === id);
      if (index === -1) return false;

      all[index] = {
        ...all[index],
        ...updatedFields,
        categoryLabel: updatedFields.category ? this.getCategoryLabel(updatedFields.category) : all[index].categoryLabel
      };

      this.save(all);
      return true;
    },

    /**
     * Remove um presente da lista
     * @param {string} id
     * @returns {boolean}
     */
    delete(id) {
      const all = this.getAll();
      const filtered = all.filter(item => item.id !== id);
      if (filtered.length === all.length) return false;

      this.save(filtered);
      return true;
    },

    /**
     * Restaura a lista original padrão
     */
    resetToDefault() {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    },

    /**
     * Salva a lista no localStorage
     * @param {Array} list
     */
    save(list) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    },

    /**
     * Gera slug simples a partir do título
     */
    generateSlug(text) {
      return (text || 'item')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
    },

    /**
     * Retorna o label legível da categoria
     */
    getCategoryLabel(category) {
      const map = {
        'lua-de-mel': 'Lua de Mel',
        'casa-nova': 'Casa Nova',
        'experiencias': 'Experiências & Mimos'
      };
      return map[category] || 'Outros';
    },

    /**
     * Exporta o JSON completo pronto para ser salvo em gifts.json
     * @returns {string}
     */
    exportJSON() {
      return JSON.stringify(this.getAll(), null, 2);
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GIFTS_DATA, GiftsRepository };
  } else {
    global.GIFTS_DATA = GIFTS_DATA;
    global.GiftsRepository = GiftsRepository;
  }
})(typeof window !== 'undefined' ? window : globalThis);

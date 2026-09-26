/**
 * Repositório e Camada de Acesso a Dados de Presentes (Data Layer)
 * Consome exclusivamente o arquivo 'src/data/gifts.json' como Fonte Única da Verdade.
 * Elimina redundância e permite que o arquivo .json seja baixado/editado com total segurança.
 */
(function (global) {
  const STORAGE_KEY = 'wedding_custom_gifts_list';
  const DATA_PATH = 'src/data/gifts.json';

  let _cachedGifts = null;
  let _loadPromise = null;

  const GiftsRepository = {
    /**
     * Carrega os presentes de forma assíncrona:
     * 1. Verifica se há edições salvas no localStorage do navegador.
     * 2. Caso contrário, faz o fetch do arquivo oficial 'src/data/gifts.json'.
     * @param {boolean} [forceReload=false]
     * @returns {Promise<Array>}
     */
    async load(forceReload = false) {
      if (_cachedGifts && !forceReload) {
        return _cachedGifts;
      }

      if (_loadPromise && !forceReload) {
        return _loadPromise;
      }

      _loadPromise = (async () => {
        // 1. Tentar ler do localStorage (alterações feitas na Área dos Noivos)
        if (typeof localStorage !== 'undefined') {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (Array.isArray(parsed) && parsed.length > 0) {
                _cachedGifts = parsed;
                return _cachedGifts;
              }
            } catch (e) {
              console.warn("[GiftsRepository] Falha ao ler cache do localStorage:", e);
            }
          }
        }

        // 2. Buscar o arquivo oficial gifts.json via fetch HTTP/HTTPS
        try {
          const response = await fetch(DATA_PATH);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              _cachedGifts = data;
              return _cachedGifts;
            }
          }
        } catch (err) {
          console.warn(
            "[GiftsRepository] Não foi possível carregar 'src/data/gifts.json' via fetch.\n" +
            "Se estiver abrindo localmente via dois cliques (file://), utilize um servidor local (ex: Live Server do VS Code) ou hospede na Vercel.",
            err
          );
        }

        // 3. Fallback seguro se não houver conexão ou se fetch falhar localmente
        _cachedGifts = _cachedGifts || [];
        return _cachedGifts;
      })();

      return _loadPromise;
    },

    /**
     * Retorna a lista completa de presentes em memória (síncrono)
     * @returns {Array}
     */
    getAll() {
      if (_cachedGifts) {
        return [..._cachedGifts];
      }

      // Fallback síncrono emergencial pelo localStorage
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            _cachedGifts = JSON.parse(stored);
            return [..._cachedGifts];
          } catch (e) {}
        }
      }

      return [];
    },

    /**
     * Filtra presentes por categoria
     * @param {string} category
     * @returns {Array}
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
     * @param {string} id
     * @returns {Object|null}
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
        modalImageUrl: giftData.modalImageUrl || giftData.imageUrl || giftData.remoteImageUrl || `images/gifts/${newId}.jpg`,
        remoteImageUrl: giftData.remoteImageUrl || giftData.imageUrl || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
        imageAlt: giftData.title
      };

      all.unshift(newGift);
      _cachedGifts = all;
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

      _cachedGifts = all;
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

      _cachedGifts = filtered;
      this.save(filtered);
      return true;
    },

    /**
     * Restaura a lista original a partir do arquivo gifts.json oficial
     */
    async resetToDefault() {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      _cachedGifts = null;
      _loadPromise = null;
      return await this.load(true);
    },

    /**
     * Salva a lista no localStorage do navegador
     * @param {Array} list
     */
    save(list) {
      _cachedGifts = list;
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
     * Exporta o JSON completo pronto para ser salvo em 'src/data/gifts.json'
     * @returns {string}
     */
    exportJSON() {
      return JSON.stringify(this.getAll(), null, 2);
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GiftsRepository };
  } else {
    global.GiftsRepository = GiftsRepository;
  }
})(typeof window !== 'undefined' ? window : globalThis);

# 💍 Plataforma de Convite Digital e Lista de Presentes com Pix

Plataforma web moderna, elegante e responsiva para **Convite de Casamento**, **Lista de Presentes Interativa** com cotas Pix (QR Code dinâmico e Pix Copia-e-Cola no padrão oficial do Banco Central do Brasil) e **Painel Administrativo dos Noivos**.

---

## 🏛️ Arquitetura do Projeto (Clean Architecture & Modular)

O projeto foi construído seguindo os princípios de **Clean Architecture**, **SOLID** e **Data-Driven UI**, separando completamente regras de domínio, dados, serviços de integração e apresentação visual:

```text
convite_casamento/
├── index.html                      # Ponto de entrada web do Convite Digital (Mobile First)
├── convite_digital.html            # Convite Digital com layout mobile vertical fluido
├── lista-de-presentes.html         # Lista de presentes interativa com cotas Pix e compras físicas
├── admin.html                      # 🔒 Painel exclusivo dos noivos (Login e CRUD de presentes)
├── gerenciar-imagens.html          # 🖼️ Painel interativo para teste e gestão de imagens locais
├── README.md                       # Documentação da arquitetura e guia de uso
│
├── images/                         # Armazenamento de mídia local
│   ├── gifts/                      # Fotos locais dos presentes (ex: jantar-velas.jpg, air-fryer.jpg)
│   └── casal/                      # Fotos do casal e ensaio pré-wedding
│
└── src/
    ├── config/                     # Configurações globais centralizadas
    │   ├── admin.config.js         # Senha de acesso e regras de autenticação dos noivos
    │   ├── wedding.config.js       # Dados dos noivos, versículo, datas, locais e endereço de entrega
    │   └── pix.config.js           # Chave Pix, beneficiário, cidade e parâmetros bancários
    │
    ├── core/                       # Domínio de Negócio Puro (Sem dependência de DOM/UI)
    │   └── pix/
    │       ├── crc16.js            # Algoritmo matemático puro de CRC16 (CCITT-FALSE 0xFFFF)
    │       └── pixPayload.js       # Montador do padrão EMVCo BR Code (BACEN)
    │
    ├── data/                       # Camada de Dados (Repository Pattern & SSOT)
    │   ├── gifts.json              # Base de dados oficial dos presentes (Fonte Única da Verdade)
    │   └── gifts.data.js           # GiftsRepository: consome gifts.json via fetch, gerencia cache e CRUD
    │
    ├── services/                   # Adaptadores de Serviços Externos e I/O
    │   ├── clipboardService.js     # Cópia para área de transferência resiliente com fallback
    │   ├── qrCodeService.js        # Geração dinâmica e pré-carregamento do QR Code Pix
    │   └── whatsappService.js      # Geração de links e mensagens personalizadas para WhatsApp
    │
    ├── ui/                         # Camada de Interface e Componentes
    │   ├── components/
    │   │   ├── giftCard.js         # Renderizador isolado de cada card com botão de detalhes
    │   │   ├── filterBar.js        # Gerenciador de estado das abas de filtro por categoria
    │   │   ├── pixModal.js         # Controlador do ciclo de vida e eventos do Modal Pix
    │   │   └── productModal.js     # Modal de detalhes do produto, specs e Duplo CTA (Pix vs Loja)
    │   └── pages/
    │       └── presentes.js        # Orquestrador da página da lista de presentes
    │
    └── styles/                     # Camada de Estilos Desacoplada
        ├── custom.css              # Tokens visuais, animações do modal e resets
        └── convite.css             # Estilos Mobile-First fluidos do convite e regras de impressão
```

---

## ✨ Funcionalidades Principais

1. **Convite Digital Interativo (Mobile First)**:
   - Construído com metodologia **Mobile First**: 100% fluido e adaptável a telas de 320px a 480px (smartphones) e elegante cartão emoldurado em telas maiores.
   - Links diretos com Google Maps da cerimônia (**Igreja Sagrada Família**) e recepção (**Maison Mizuno**).
   - Botão RSVP conectado diretamente ao WhatsApp dos noivos com mensagem pré-preenchida.

2. **Lista de Presentes com Duplo Call to Action**:
   - **Opção A (Contribuição Pix)**: Gera QR Code dinâmico e código Pix Copia-e-Cola no padrão oficial do Banco Central.
   - **Opção B (Compra Física)**: Link direto para o modelo recomendado em lojas oficiais (Amazon, Magalu, etc.) com cartão do endereço de entrega dos noivos e botão de cópia rápida.
   - **Janela Modal de Detalhes**: Exibe foto ampliada, modelo técnico, nota afetiva dos noivos e especificações (voltagem 220V, cor, capacidade).

3. **Área Exclusiva dos Noivos (`admin.html`)**:
   - Tela de login protegida por senha (padrão: `noivos.mariaedavi`).
   - Dashboard com métricas: total de itens, valor total arrecadado/cotas e divisão entre itens físicos e virtuais.
   - Formulário completo para cadastrar novos presentes ou editar os existentes.
   - Exportação em 1 clique para sincronização com o repositório (`gifts.json`).

4. **Gerenciador de Mídia Local (`gerenciar-imagens.html`)**:
   - Permite testar fotos do computador diretamente no navegador sem alterar código.
   - Baixa a imagem já renomeada com o padrão correto (ex: `jantar-velas.jpg`).
   - Fallback automático para imagens em alta resolução caso a foto local ainda não tenha sido adicionada.

---

## 🚀 Como Executar Localmente

### Opção 1: Execução Direta no Navegador
Basta dar dois cliques no arquivo:
- **Convite**: [index.html](file:///c:/Users/manod/OneDrive/Desktop/convite_casamento/index.html) ou [convite_digital.html](file:///c:/Users/manod/OneDrive/Desktop/convite_casamento/convite_digital.html)
- **Lista de Presentes**: [lista-de-presentes.html](file:///c:/Users/manod/OneDrive/Desktop/convite_casamento/lista-de-presentes.html)
- **Área dos Noivos**: [admin.html](file:///c:/Users/manod/OneDrive/Desktop/convite_casamento/admin.html)

### Opção 2: Servidor Local (Live Server ou Python)
```bash
# Com Python 3
python -m http.server 8000
```
Acesse no navegador: `http://localhost:8000`

---

## ☁️ Hospedagem na Vercel

O projeto foi estruturado para ser publicado na **Vercel** de forma imediata e com custo zero:

1. Suba as alterações para o seu repositório GitHub (`git push`).
2. Acesse [vercel.com](https://vercel.com) e importe o repositório.
3. Como o projeto utiliza HTML/JS modular estático, a Vercel detecta e publica automaticamente em segundos!
4. **Para atualizar presentes via painel administrativo**:
   - Acesse `https://seu-site.vercel.app/admin.html`
   - Adicione ou edite os presentes desejados.
   - Clique em **"📥 Baixar gifts.json"**, substitua em `src/data/gifts.json` e dê `git push`. A Vercel atualizará o site para todos os convidados automaticamente.

---

## ⚙️ Configurações Rápidas

- **Chave Pix & Telefone de Comprovantes**:
  Edite em `src/config/pix.config.js`.

- **Dados dos Noivos, Cerimônia, Festa e Endereço de Entrega**:
  Edite em `src/config/wedding.config.js`.

- **Senha de Acesso dos Noivos**:
  Edite em `src/config/admin.config.js` (variável `adminPassword`).

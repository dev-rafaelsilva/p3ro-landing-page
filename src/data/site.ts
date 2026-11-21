export const site = {
  studio: "P3ro",
  logo: "/logo/Logo3.jpeg",
  city: "Ribeirão Preto",
  email: "[E-MAIL]",
  instagram: "[INSTAGRAM]",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "16993839889",
  year: new Date().getFullYear(),
} as const;

export const nav = [
  { label: "Produtos", href: "#produtos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Preços", href: "#precos" },
  { label: "Contato", href: "#contato" },
] as const;

export const hero = {
  eyebrow: "Fotografia gastronômica",
  title: "Seu prato merece ser desejado antes da primeira garfada.",
  text: "Imagens autorais para restaurantes, confeitarias e marcas de alimentos que querem vender mais com fotos que despertam apetite. Atendemos Ribeirão Preto e região.",
  primary: "Solicitar orçamento",
  secondary: "Ver portfólio",
  image: {
    src: "/opt/hero.webp",
    tex: "/opt/hero-tex.webp",
    alt: "Bomba de chocolate artesanal com calda, em destaque sobre tábua",
    width: 1050,
    height: 1400,
  },
} as const;

export const trust = {
  label: "Quem já confiou",
  name: "Tentação Salgaderia",
} as const;

export const products = {
  eyebrow: "Fotografia de produto",
  title: "Embalagens que vendem sozinhas",
  items: [
    { src: "/opt/produto-salsicha.webp", name: "Salsicha", alt: "Embalagem de salsicha fotografada em fundo cinza" },
    { src: "/opt/produto-churros-doce-de-leite.webp", name: "Churros doce de leite", alt: "Embalagem de churros doce de leite em fundo cinza" },
    { src: "/opt/produto-coxinha-de-costela.webp", name: "Coxinha de costela", alt: "Embalagem de coxinha de costela em fundo cinza" },
    { src: "/opt/produto-croquete-de-calabresa.webp", name: "Croquete de calabresa", alt: "Embalagem de croquete de calabresa em fundo cinza" },
    { src: "/opt/produto-risoles-de-milho.webp", name: "Risóles de milho", alt: "Embalagem de risóles de milho em fundo cinza" },
    { src: "/opt/produto-croquete-de-carne.webp", name: "Croquete de carne", alt: "Embalagem de croquete de carne em fundo cinza" },
  ],
} as const;

export const lightBand = {
  image: {
    src: "/opt/faixa-luz.webp",
    tex: "/opt/faixa-luz-tex.webp",
    alt: "Bombas de chocolate vistas de cima sob luz dramática",
  },
  eyebrow: "Direção de luz",
  title: "A luz certa transforma um doce em desejo.",
} as const;

export const gallery = {
  eyebrow: "Portfólio",
  title: "Trabalhos selecionados",
  filters: ["Todos", "Doces", "Salgados"],
  items: [
    { src: "/opt/galeria-1.webp", alt: "Bomba de chocolate com calda escorrendo sobre tábua de madeira", category: "Doces" },
    { src: "/opt/galeria-2.webp", alt: "Bombas de chocolate vistas de cima, dispostas em fileiras", category: "Doces" },
    { src: "/opt/galeria-3.webp", alt: "Bomba de chocolate em close lateral, com fundo cinza", category: "Doces" },
    { src: "/opt/galeria-4.webp", alt: "Conjunto de bombas de chocolate com lascas de chocolate", category: "Doces" },
    { src: "/opt/galeria-5.webp", alt: "Bomba de chocolate partida mostrando o recheio cremoso", category: "Doces" },
    { src: "/opt/produto-coxinha-de-costela.webp", alt: "Embalagem de coxinha de costela em fundo cinza", category: "Salgados" },
    { src: "/opt/produto-croquete-de-carne.webp", alt: "Embalagem de croquete de carne em fundo cinza", category: "Salgados" },
    { src: "/opt/produto-risoles-de-milho.webp", alt: "Embalagem de risóles de milho em fundo cinza", category: "Salgados" },
    { src: "/opt/produto-salsicha.webp", alt: "Embalagem de salsicha em fundo cinza", category: "Salgados" },
  ],
} as const;

export const services = {
  eyebrow: "Serviços",
  title: "Fotografia pensada para cada objetivo",
  list: [
    {
      num: "01",
      title: "Cardápio e delivery",
      text: "Fotos de pratos para cardápio, iFood e site. [DESCRIÇÃO / QUANTIDADE DE FOTOS]",
    },
    {
      num: "02",
      title: "Produto e embalagem",
      text: "Packshots limpos para catálogo, e-commerce e redes. [DESCRIÇÃO]",
    },
    {
      num: "03",
      title: "Redes sociais",
      text: "Conteúdo recorrente para Instagram e vídeos curtos. [DESCRIÇÃO]",
    },
    {
      num: "04",
      title: "Campanhas e eventos",
      text: "Produção com direção de arte para lançamentos e eventos. [DESCRIÇÃO]",
    },
  ],
  steps: [
    { num: "01", title: "Briefing", text: "Entendemos o cardápio, o público e onde as fotos serão usadas." },
    { num: "02", title: "Direção e produção", text: "Estilo, luz, louças e composição definidos antes da sessão." },
    { num: "03", title: "Sessão", text: "No seu espaço ou em estúdio, com o prato no ponto." },
    { num: "04", title: "Entrega", text: "Tratamento e arquivos prontos para cada canal. [PRAZO]" },
  ],
} as const;

export const about = {
  eyebrow: "Sobre",
  title: "Olhar de quem entende de comida",
  photo: {
    src: "/opt/gustavo.webp",
    alt: "Retrato de Gustavo, fotógrafo gastronômico",
    width: 1326,
    height: 1599,
  },
  paragraphs: [
    "Ajudo restaurantes de alto padrão a atrair clientes por meio de marketing criativo, produção audiovisual e estratégias de posicionamento — fazendo com que a experiência de cada casa alcance mais gente através de fotos, vídeos, sites e mídia, e seja comentada em todo canto.",
    "O trabalho é guiado por criatividade, excelência, autenticidade e respeito à identidade de cada restaurante, com a visão de criar marcas que se tornam assunto dentro e fora do digital. Atende Ribeirão Preto e região, com disponibilidade para viagens.",
  ],
} as const;

export const contact = {
  eyebrow: "Contato",
  title: "Vamos fotografar o seu próximo prato?",
  text: "Conte sobre seu projeto e receba uma proposta personalizada. [PRAZO DE RESPOSTA]",
  contactLine: "[E-MAIL] · @[INSTAGRAM]",
  services: [
    "Cardápio e delivery",
    "Produto e embalagem",
    "Redes sociais",
    "Campanhas e eventos",
  ],
  submit: "Enviar pelo WhatsApp",
} as const;

export const footer = {
  ctaTitle: "Vamos fotografar o seu próximo prato?",
  ctaText: "Imagens que despertam apetite e vendem mais. Peça um orçamento sem compromisso.",
  cta: "Falar no WhatsApp",
  rights: "Todos os direitos reservados.",
} as const;

export const marquee = {
  words: [
    "Cardápio",
    "Delivery",
    "Ribeirão Preto",
    "Fotografia que vende",
    "Direção de arte",
    "Confeitaria",
    "Restaurantes",
    "Embalagens",
  ],
} as const;

export const howItWorks = {
  eyebrow: "Como funciona",
  title: "Do briefing à entrega",
  steps: [
    {
      num: "01",
      title: "Briefing",
      text: "Entendemos o cardápio, o público e onde as fotos serão usadas.",
      image: { src: "/opt/galeria-3.webp", alt: "Planejamento da sessão de fotografia gastronômica" },
    },
    {
      num: "02",
      title: "Direção e produção",
      text: "Estilo, luz, louças e composição definidos antes da sessão.",
      image: { src: "/opt/faixa-luz.webp", alt: "Direção de luz sobre as bombas de chocolate" },
    },
    {
      num: "03",
      title: "Sessão",
      text: "No seu espaço ou em estúdio, com o prato no ponto.",
      image: { src: "/opt/galeria-1.webp", alt: "Sessão de fotografia com calda de chocolate" },
    },
    {
      num: "04",
      title: "Entrega",
      text: "Tratamento e arquivos prontos para cada canal. [PRAZO]",
      image: { src: "/opt/hero.webp", alt: "Foto final tratada pronta para entrega" },
    },
  ],
} as const;

// Números ilustrativos — AJUSTE para os valores reais do Gustavo.
export const stats = {
  items: [
    { value: 5, suffix: "+", label: "Anos de experiência" },
    { value: 100, suffix: "+", label: "Ensaios realizados" },
    { value: 50, suffix: "+", label: "Marcas atendidas" },
    { value: 20, suffix: "k+", label: "Fotos entregues" },
  ],
} as const;

export const beforeAfter = {
  eyebrow: "Tratamento de imagem",
  title: "Arraste e veja a diferença",
  text: "Do clique ao resultado final: cor, luz e textura ajustados para dar água na boca.",
  before: { src: "/opt/galeria-2.webp", alt: "Foto gastronômica antes do tratamento" },
  after: { src: "/opt/galeria-1.webp", alt: "Foto gastronômica depois do tratamento" },
  labelBefore: "Antes",
  labelAfter: "Depois",
} as const;

// Preços ilustrativos — AJUSTE para os valores e pacotes reais.
export const pricing = {
  eyebrow: "Pacotes",
  title: "Planos para cada fase do seu negócio",
  note: "Valores de referência. O orçamento final é personalizado conforme o projeto.",
  packages: [
    {
      name: "Essencial",
      price: "[R$ VALOR]",
      description: "Ideal para começar a vender melhor no delivery.",
      highlight: false,
      features: ["Até [N] pratos", "Fotos tratadas em alta resolução", "Formatos para iFood e redes", "Entrega em [PRAZO]"],
    },
    {
      name: "Profissional",
      price: "[R$ VALOR]",
      description: "O favorito de quem quer um cardápio completo.",
      highlight: true,
      features: ["Até [N] pratos", "Direção de arte e composição", "Versões para cardápio, site e redes", "Fotos de ambiente do local", "Entrega em [PRAZO]"],
    },
    {
      name: "Marca",
      price: "[R$ VALOR]",
      description: "Produção completa para campanhas e lançamentos.",
      highlight: false,
      features: ["Pratos ilimitados no dia", "Conceito e direção de arte", "Pacote para campanha e mídia", "Acompanhamento do projeto", "Entrega prioritária"],
    },
  ],
} as const;

// Depoimentos ilustrativos — SUBSTITUA pelos reais (com autorização do cliente).
export const testimonials = {
  eyebrow: "Depoimentos",
  title: "Resultados que falam por si",
  items: [
    { quote: "[Depoimento do cliente sobre o resultado das fotos e o impacto nas vendas.]", name: "[Nome do cliente]", role: "[Restaurante / marca]" },
    { quote: "[Depoimento sobre a experiência de trabalhar com o Gustavo e a qualidade do material.]", name: "[Nome do cliente]", role: "[Restaurante / marca]" },
    { quote: "[Depoimento sobre pontualidade, direção de arte ou retorno obtido com as imagens.]", name: "[Nome do cliente]", role: "[Restaurante / marca]" },
  ],
} as const;

export const instagram = {
  eyebrow: "No Instagram",
  title: "Acompanhe os bastidores",
  cta: "Seguir no Instagram",
  images: [
    { src: "/opt/galeria-1.webp", alt: "Publicação de bomba de chocolate com calda" },
    { src: "/opt/galeria-3.webp", alt: "Publicação de bomba de chocolate em close" },
    { src: "/opt/produto-coxinha-de-costela.webp", alt: "Publicação de embalagem de coxinha de costela" },
    { src: "/opt/galeria-5.webp", alt: "Publicação de bomba de chocolate partida" },
    { src: "/opt/produto-churros-doce-de-leite.webp", alt: "Publicação de embalagem de churros doce de leite" },
    { src: "/opt/galeria-4.webp", alt: "Publicação de conjunto de bombas de chocolate" },
  ],
} as const;

export const faq = {
  eyebrow: "Dúvidas frequentes",
  title: "Perguntas que sempre ouvimos",
  items: [
    {
      q: "Como funciona o processo?",
      a: "Começa com um briefing para entender o cardápio, o público e onde as fotos serão usadas. Depois definimos a direção de arte, realizamos a sessão (no seu espaço ou em estúdio) e entregamos as imagens tratadas e prontas para cada canal.",
    },
    {
      q: "Quanto tempo leva para receber as fotos?",
      a: "O prazo de entrega varia conforme o volume do projeto. Combinamos tudo antes de começar e você acompanha cada etapa. [AJUSTE: informe o prazo médio do Gustavo.]",
    },
    {
      q: "Atende em qual região?",
      a: "Atendo Ribeirão Preto e região, com disponibilidade para viagens quando o projeto pede.",
    },
    {
      q: "As fotos podem ser usadas onde?",
      a: "As imagens são entregues para uso nos canais combinados — cardápio, delivery, site, redes sociais e materiais de divulgação. Condições de uso são alinhadas no orçamento.",
    },
    {
      q: "Preciso preparar os pratos?",
      a: "Sim. Os pratos e produtos ficam por conta do estabelecimento, no ponto ideal para a foto. Eu cuido da luz, da composição, das louças de apoio e da direção de arte.",
    },
  ],
} as const;

export const polaroid = {
  eyebrow: "Bastidores",
  title: "Momentos por trás da lente",
  items: [
    { src: "/opt/galeria-1.webp", alt: "Bomba de chocolate com calda escorrendo sobre tábua", caption: "Calda no ponto" },
    { src: "/opt/galeria-5.webp", alt: "Bomba de chocolate partida mostrando recheio cremoso", caption: "Recheio perfeito" },
    { src: "/opt/faixa-luz.webp", alt: "Bombas de chocolate sob luz dramática vista de cima", caption: "A luz certa" },
    { src: "/opt/galeria-3.webp", alt: "Bomba de chocolate em close lateral com fundo cinza", caption: "Close lateral" },
    { src: "/opt/galeria-4.webp", alt: "Conjunto de bombas de chocolate com lascas de chocolate", caption: "Composição final" },
    { src: "/opt/galeria-2.webp", alt: "Bombas de chocolate vistas de cima em fileiras", caption: "Vista aérea" },
  ],
} as const;

export const area = {
  eyebrow: "Área de atuação",
  title: "Baseado em Ribeirão Preto",
  text: "Atendo toda a região de Ribeirão Preto e viajo para projetos especiais.",
  mapSrc: "https://www.google.com/maps?q=Ribeir%C3%A3o%20Preto%2C%20SP&output=embed",
} as const;

// Texturas leves (WebGL) — usadas pelo hero e pelo storytelling 3D.
export const webgl = {
  heroTex: "/opt/hero-tex.webp",
  heroAspect: 1050 / 1400,
  storyTextures: [
    "/opt/galeria-1-tex.webp",
    "/opt/galeria-4-tex.webp",
    "/opt/faixa-luz-tex.webp",
    "/opt/galeria-5-tex.webp",
  ],
} as const;

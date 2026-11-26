export const site = {
  studio: "P3ro",
  logo: "/logo/Logo3.jpeg",
  city: "Ribeirão Preto",
  email: "contato@p3ro.com.br",
  instagram: "by.p3ro",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "16993839889",
  year: new Date().getFullYear(),
} as const;

export const nav = [
  { label: "Portfólio", href: "#portfolio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Preços", href: "#precos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

export const hero = {
  eyebrow: "Fotografia gastronômica · Ribeirão Preto",
  title: "Seu prato merece ser desejado antes da primeira garfada.",
  text: "Imagens autorais para restaurantes, confeitarias e marcas de alimentos que querem vender mais com fotos que despertam apetite.",
  availability: "Agenda aberta — Jan/2027",
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
      text: "Fotos de pratos para cardápio, iFood e site. Composição, luz e cor pensadas para converter visualização em pedido.",
    },
    {
      num: "02",
      title: "Produto e embalagem",
      text: "Packshots limpos para catálogo, e-commerce e redes. Fundo neutro ou ambiente — definido conforme a marca.",
    },
    {
      num: "03",
      title: "Redes sociais",
      text: "Conteúdo recorrente para Instagram e vídeos curtos. Feed coeso, identidade visual forte.",
    },
    {
      num: "04",
      title: "Campanhas e eventos",
      text: "Produção com direção de arte para lançamentos e eventos. Conceito, composição e entrega editorial.",
    },
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
    "Ajudo restaurantes de alto padrão a atrair clientes por meio de marketing criativo, produção audiovisual e estratégias de posicionamento — fazendo com que a experiência de cada casa alcance mais gente através de fotos, vídeos, sites e mídia.",
    "O trabalho é guiado por criatividade, excelência, autenticidade e respeito à identidade de cada restaurante. Atende Ribeirão Preto e região, com disponibilidade para viagens.",
  ],
} as const;

export const contact = {
  eyebrow: "Contato",
  title: "Vamos fotografar o seu próximo prato?",
  text: "Conte sobre seu projeto e receba uma proposta personalizada. Respondo em até 24h.",
  contactLine: "contato@p3ro.com.br · @by.p3ro",
  services: [
    "Cardápio e delivery",
    "Produto e embalagem",
    "Redes sociais",
    "Campanhas e eventos",
  ],
  submit: "Enviar pelo WhatsApp",
} as const;

export const footer = {
  ctaTitle: "Imagens que despertam apetite e vendem mais.",
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

export const pricing = {
  eyebrow: "Preços",
  title: "Transparência desde o primeiro contato",
  note: "Orçamento final personalizado conforme o projeto.",
  packages: [
    {
      name: "Flash",
      duration: "2 horas",
      price: "R$ 700",
      description: "Ideal para um produto específico ou conteúdo pontual para redes.",
      highlight: false,
      features: ["Até 1 produto / prato", "Fotos tratadas em alta resolução", "Entrega em 5 dias úteis"],
    },
    {
      name: "Meio dia",
      duration: "4 horas",
      price: "R$ 850",
      description: "O favorito de quem quer renovar o cardápio ou lançar uma linha.",
      highlight: true,
      features: ["Múltiplos produtos / pratos", "Direção de arte e composição", "Versões para cardápio, site e redes", "Entrega em 7 dias úteis"],
    },
    {
      name: "Diária",
      duration: "8 horas",
      price: "R$ 1.300",
      description: "Produção completa para campanhas, lançamentos e coleções.",
      highlight: false,
      features: ["Volume completo no dia", "Conceito e direção de arte", "Pacote para campanha e mídia", "Acompanhamento do projeto", "Entrega prioritária"],
    },
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
      a: "O prazo padrão é de 5 a 7 dias úteis após a sessão. Para projetos com demanda urgente, entre em contato para verificar disponibilidade.",
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

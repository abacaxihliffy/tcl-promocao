import React, { useMemo, useState } from "react";

/* ========================= Ícones (Heroicons inline) ========================= */
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5M4.5 9.75V21h15V9.75" />
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
  </svg>
);

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
    <path strokeWidth="1.5" strokeLinecap="round" d="M12 8h.01M11 12h2v5h-2z" />
  </svg>
);

const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l2 12h10l2-8H6" />
    <circle cx="9" cy="19" r="1.5" />
    <circle cx="17" cy="19" r="1.5" />
  </svg>
);

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="1.5" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="1.5" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
  </svg>
);

const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

/* ========================= Ícones sociais (SVG inline) ========================= */
// Minimalistas e leves; sem dependência externa
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.8-.9a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z"/>
  </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.6 3.2H4.4A3.4 3.4 0 0 0 1 6.6v10.8c0 1.9 1.5 3.4 3.4 3.4h15.2a3.4 3.4 0 0 0 3.4-3.4V6.6c0-1.9-1.5-3.4-3.4-3.4zM10 15.5V8.5l6 3.5-6 3.5z"/>
  </svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.7 2c.6 3.3 2.8 5 5.2 5.2V10c-1.5 0-2.9-.5-4-1.3V15a5 5 0 1 1-5-5c.3 0 .7 0 1 .1v2.2a2.8 2.8 0 1 0 2 2.7V2h.8z"/>
  </svg>
);

/* ========================= Utils ========================= */
const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type Product = {
  id: string;
  name: string;
  model: string;
  size: string;
  resolution: string;
  technology: string;
  priceCard: number;
  pixRule: { type: "half" | "percent"; value?: number };
  images: string[];
  description: string;
  comments: { name: string; date: string; rating: number; text: string }[];
};

type CartItem = { product: Product; qty: number };

function pricePix(p: Product) {
  if (p.pixRule.type === "half") return p.priceCard / 2;
  if (p.pixRule.type === "percent")
    return p.priceCard * (1 - (p.pixRule.value ?? 0) / 100);
  return p.priceCard;
}

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`Avaliação ${n} de 5`} className="text-yellow-500">
      {"★".repeat(n)}
      {"☆".repeat(5 - n)}
    </span>
  );
}

/* ========================= Dados ========================= */
const products: Product[] = [
  {
    id: "tcl-75p7k",
    name: 'Smart TV 75" TCL 4K QLED',
    model: "75P7K",
    size: '75"',
    resolution: "4K UHD",
    technology: "QLED, AiPQ, Google TV, Dolby Vision/Atmos, HDR10+",
    priceCard: 4464.05,
    pixRule: { type: "half" },
    images: Array.from({ length: 10 }).map((_, i) => `assets/TCL 75/IMG${i + 1}.webp`),
    description: `A TCL 75P7K reúne painel QLED de alto brilho, resolução 4K UHD e processador AiPQ para cores vivas e contraste preciso em 75”. Com Google TV e suporte a Google Assistente, você encontra conteúdos por voz e organiza apps com praticidade. 3 HDMI e 1 USB para conectar consoles e soundbars. Painel VA com antirreflexo e 60 Hz.`,
    comments: [
      { name: "Carolina S.", date: "12/09/2025", rating: 5, text: "Imagem muito acima do que eu esperava. Som limpo e sem ruído." },
      { name: "Marcos A.", date: "11/09/2025", rating: 5, text: "Chegou rápido e configurar foi fácil. Google TV deixa tudo prático." },
      { name: "Patrícia L.", date: "10/09/2025", rating: 4, text: "Excelente, só senti falta de mais uma USB." },
      { name: "Ricardo P.", date: "09/09/2025", rating: 5, text: "Tela gigante, perfeita para filmes e futebol. Valeu demais." },
      { name: "Bruna M.", date: "08/09/2025", rating: 5, text: "Cores vivas sem exagero. Antirreflexo ajuda durante o dia." },
    ],
  },
  {
    id: "tcl-50p7k",
    name: 'Smart TV 50" TCL 4K QLED',
    model: "50P7K",
    size: '50"',
    resolution: "4K UHD",
    technology: "QLED, AiPQ, Google TV, Dolby Vision/Atmos",
    priceCard: 2041.55,
    pixRule: { type: "percent", value: 35 },
    images: [
      "assets/TCL 50/IMG.webp",
      ...Array.from({ length: 8 }).map((_, i) => `assets/TCL 50/IMG${i + 2}.webp`),
    ],
    description: `A TCL 50P7K entrega nitidez 4K com QLED e processamento AiPQ. Cores consistentes e fluidez no dia a dia, Google TV com comandos por voz e conexões completas para consoles e mídias externas.`,
    comments: [
      { name: "Fernanda R.", date: "12/09/2025", rating: 5, text: "Compacta, imagem surreal. O som é melhor do que eu esperava." },
      { name: "Leonardo S.", date: "11/09/2025", rating: 4, text: "Custo-benefício ótimo. Controle por voz ajuda bastante." },
      { name: "Julia M.", date: "10/09/2025", rating: 5, text: "Instalação rápida. Já maratonei filmes, experiência top." },
      { name: "Paula V.", date: "09/09/2025", rating: 5, text: "Cores vivas, modo jogo atende bem o PS5." },
      { name: "Gabriel F.", date: "08/09/2025", rating: 5, text: "Chegou bem embalada, sem dead pixel. Recomendo." },
    ],
  },
  {
    id: "tcl-43s5400a",
    name: 'Smart TV 43" TCL Full HD LED',
    model: "43S5400A",
    size: '43"',
    resolution: "Full HD",
    technology: "LED, Android TV, Chromecast, HDR10",
    priceCard: 1564.26,
    pixRule: { type: "half" },
    images: [
      "assets/TCL 43/IMG.webp",
      ...Array.from({ length: 9 }).map((_, i) => `assets/TCL 43/IMG${i + 2}.webp`),
    ],
    description: `Compacta por fora, completa por dentro. Full HD nítido, Android TV com Chromecast e controle por voz. HDR10 e Dolby Audio para boas sessões de séries, esportes e games casuais.`,
    comments: [
      { name: "Roberta G.", date: "12/09/2025", rating: 5, text: "Tamanho ideal para o quarto e imagem limpa." },
      { name: "André H.", date: "11/09/2025", rating: 4, text: "Entrega ok, apps funcionam sem travar." },
      { name: "Camila S.", date: "10/09/2025", rating: 5, text: "Chromecast integrado salvou nas aulas online." },
      { name: "Thiago L.", date: "09/09/2025", rating: 4, text: "Full HD honesto. Para jogos casuais ficou ótimo." },
      { name: "Patrícia D.", date: "08/09/2025", rating: 5, text: "Pelo preço, superou as expectativas." },
    ],
  },
  {
    id: "tcl-32s5400a",
    name: 'Smart TV 32" TCL Full HD LED',
    model: "32S5400A",
    size: '32"',
    resolution: "Full HD",
    technology: "LED, Android TV",
    priceCard: 996.55,
    pixRule: { type: "half" },
    images: [
      "assets/TCL 32/IMG.webp",
      ...Array.from({ length: 7 }).map((_, i) => `assets/TCL 32/IMG${i + 2}.webp`),
    ],
    description: `Perfeita para ambientes compactos, com Android TV e comandos por voz. Conexões completas e navegação fluida para o dia a dia.`,
    comments: [
      { name: "Felipe R.", date: "12/09/2025", rating: 5, text: "Pequena, rápida e perfeita pro quarto." },
      { name: "Ana L.", date: "11/09/2025", rating: 5, text: "Instalação simples e imagem melhor do que eu esperava." },
      { name: "Marcelo T.", date: "10/09/2025", rating: 4, text: "Chegou no prazo. Som ok; com fone/soundbar fica ótimo." },
      { name: "Débora F.", date: "09/09/2025", rating: 4, text: "Android TV com os apps essenciais, sem complicação." },
      { name: "Cláudio P.", date: "08/09/2025", rating: 5, text: "Ótimo custo-benefício, canais abertos ficaram bons." },
    ],
  },
];

/* ========================= App ========================= */
export default function App() {
  const [page, setPage] = useState<"home" | "product" | "cart" | "checkout" | "about">("home");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalPix = useMemo(() => cart.reduce((a, c) => a + pricePix(c.product) * c.qty, 0), [cart]);
  const totalCard = useMemo(() => cart.reduce((a, c) => a + c.product.priceCard * c.qty, 0), [cart]);
  const cartQty = useMemo(() => cart.reduce((a, c) => a + c.qty, 0), [cart]);

  function addToCart(p: Product) {
    setCart(prev => {
      const found = prev.find(ci => ci.product.id === p.id);
      if (found) return prev.map(ci => (ci.product.id === p.id ? { ...ci, qty: ci.qty + 1 } : ci));
      return [...prev, { product: p, qty: 1 }];
    });
  }
  function setQty(id: string, qty: number) {
    if (qty <= 0) return setCart(prev => prev.filter(ci => ci.product.id !== id));
    setCart(prev => prev.map(ci => (ci.product.id === id ? { ...ci, qty } : ci)));
  }

  /* ---------------- Fonte custom (opcional) ---------------- */
  const FontHead = (
    <style>{`
      @font-face {
        font-family: 'TCLSans';
        src: url('assets/fonts/TCLSans.woff2') format('woff2');
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
      }
      .font-sans { font-family: TCLSans, Inter, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  );

  /* ---------------- Header ---------------- */
  const Header = (
    <header className="bg-white border-b sticky top-0 z-40 shadow-sm font-sans">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
          <img
            src="assets/logo/logo.webp"
            alt="TCL Promo SC"
            className="h-14 cursor-pointer"
            onClick={() => {
              setPage("home");
              setSelected(null);
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-semibold">
          <button onClick={() => setPage("home")} className="flex items-center gap-1 hover:text-red-600 transition">
            <HomeIcon className="w-4 h-4" /> Produtos
          </button>
          <button onClick={() => setPage("about")} className="flex items-center gap-1 hover:text-red-600 transition">
            <InfoIcon className="w-4 h-4" /> Sobre nós
          </button>
          <button onClick={() => setPage("cart")} className="relative flex items-center gap-1 hover:text-red-600 transition">
            <CartIcon className="w-4 h-4" /> Carrinho
            {cartQty > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] px-1.5 rounded-full">
                {cartQty}
              </span>
            )}
          </button>
        </nav>

        {/* Ação rápida no mobile */}
        <button
          onClick={() => setPage("cart")}
          className="md:hidden relative p-2"
          aria-label="Abrir carrinho"
        >
          <CartIcon className="w-6 h-6" />
          {cartQty > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded-full">
              {cartQty}
            </span>
          )}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-2 text-sm font-semibold">
            <button
              onClick={() => { setPage("home"); setMenuOpen(false); }}
              className="flex items-center gap-2 py-2"
            >
              <HomeIcon className="w-4 h-4" /> Produtos
            </button>
            <button
              onClick={() => { setPage("about"); setMenuOpen(false); }}
              className="flex items-center gap-2 py-2"
            >
              <InfoIcon className="w-4 h-4" /> Sobre nós
            </button>
          </div>
        </div>
      )}
    </header>
  );

  /* ---------------- Home ---------------- */
  const Home = (
    <section className="max-w-6xl mx-auto px-4 py-5 grid gap-5 grid-cols-1 sm:grid-cols-2">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white border rounded-2xl overflow-hidden shadow hover:shadow-md transition"
        >
          <button
            className="block w-full"
            onClick={() => {
              setSelected(p);
              setPage("product");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src={p.images[0]}
              alt={p.name}
              className="w-full h-48 sm:h-60 object-cover"
            />
          </button>

          <div className="p-4 space-y-2">
            <h3 className="font-bold text-gray-900 text-base sm:text-lg">
              {p.name} {p.model}
            </h3>
            <p className="text-xs text-gray-500">
              {p.size} • {p.resolution} • {p.technology}
            </p>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-red-600">
                {brl(pricePix(p))} <span className="text-sm font-semibold">no PIX</span>
              </p>
              <p className="text-xs line-through text-gray-400">
                {brl(p.priceCard)} no cartão
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                className="flex-1 bg-red-600 text-white rounded-lg py-2 text-sm sm:text-base hover:bg-red-700 transition"
                onClick={() => addToCart(p)}
              >
                Adicionar
              </button>
              <button
                className="flex-1 bg-black text-white rounded-lg py-2 text-sm sm:text-base hover:opacity-90 transition"
                onClick={() => {
                  setCart([{ product: p, qty: 1 }]);
                  setPage("checkout");
                }}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );

  /* ---------------- Página de produto ---------------- */
  function ProductPage({ p }: { p: Product }) {
    const [idx, setIdx] = useState(0);
    const last = p.images.length - 1;
    const prev = () => setIdx((v) => (v <= 0 ? last : v - 1));
    const next = () => setIdx((v) => (v >= last ? 0 : v + 1));

    // suporte a swipe no mobile
    const [touchX, setTouchX] = useState<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => setTouchX(e.touches[0].clientX);
    const onTouchEnd = (e: React.TouchEvent) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (dx > 40) prev();
      if (dx < -40) next();
      setTouchX(null);
    };

    return (
      <>
        <section className="max-w-6xl mx-auto px-4 py-5">
          <button
            className="text-sm underline mb-4"
            onClick={() => {
              setPage("home");
              setSelected(null);
            }}
          >
            ← Voltar
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Galeria */}
            <div>
              <div
                className="relative aspect-[16/10] w-full bg-gray-100 rounded-xl overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={p.images[idx]}
                  alt={`${p.name} imagem ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                  aria-label="Próxima imagem"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbs roláveis no mobile */}
              <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {p.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-16 w-24 flex-shrink-0 border rounded ${
                      i === idx ? "ring-2 ring-black" : ""
                    }`}
                    aria-label={`Selecionar imagem ${i + 1}`}
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt={`${p.name} miniatura ${i + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Infos */}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold">
                {p.name} {p.model}
              </h1>
              <p className="text-sm text-gray-500 mb-2">
                {p.size} • {p.resolution} • {p.technology}
              </p>

              <div className="flex items-end gap-3 mb-3">
                <p className="text-3xl font-semibold text-red-600">
                  {brl(pricePix(p))}
                </p>
                <p className="text-xs text-red-700">no PIX</p>
              </div>
              <p className="text-sm line-through text-gray-400 mb-4">
                {brl(p.priceCard)} no cartão
              </p>

              <div className="hidden sm:flex gap-2 mb-4">
                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 transition"
                  onClick={() => addToCart(p)}
                >
                  Adicionar ao carrinho
                </button>
                <button
                  className="flex-1 bg-black text-white rounded-lg py-2 hover:opacity-90 transition"
                  onClick={() => {
                    setCart([{ product: p, qty: 1 }]);
                    setPage("checkout");
                  }}
                >
                  Comprar agora
                </button>
              </div>

              <ul className="text-sm text-gray-700 space-y-1 mb-6">
                <li>✓ Frete grátis para todo o Brasil</li>
                <li>✓ Nota fiscal e garantia de 12 meses</li>
              </ul>

              <h2 className="font-semibold mb-2 text-lg">Descrição</h2>
              <div className="space-y-2 text-sm leading-relaxed text-gray-700">
                {p.description.split("\n").map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Comentários */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">O que os clientes dizem</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {p.comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-gray-400">{c.date}</span>
                  </div>
                  <Stars n={c.rating} />
                  <p className="text-sm mt-1">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Barra fixa de compra no mobile */}
        <div className="fixed bottom-0 left-0 right-0 sm:hidden border-t bg-white px-4 py-3 flex items-center gap-2">
          <div className="flex-1">
            <div className="text-xs text-gray-500">PIX</div>
            <div className="text-lg font-extrabold text-red-600">
              {brl(pricePix(p))}
            </div>
          </div>
          <button
            className="flex-1 bg-red-600 text-white rounded-lg py-2 font-semibold"
            onClick={() => addToCart(p)}
          >
            Adicionar
          </button>
          <button
            className="flex-1 bg-black text-white rounded-lg py-2 font-semibold"
            onClick={() => {
              setCart([{ product: p, qty: 1 }]);
              setPage("checkout");
            }}
          >
            Comprar
          </button>
        </div>
      </>
    );
  }

  /* ---------------- Carrinho ---------------- */
  const Cart = (
    <section className="max-w-6xl mx-auto px-4 py-5">
      <h2 className="text-xl font-semibold mb-3">Carrinho</h2>
      {cart.length === 0 && <p>Seu carrinho está vazio.</p>}
      {cart.map(({ product, qty }) => (
        <div
          key={product.id}
          className="flex items-center border rounded-2xl p-3 mb-2 bg-white"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-16 w-24 object-cover rounded mr-3"
          />
          <div className="flex-1">
            <p className="font-semibold">
              {product.name} {product.model}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setQty(product.id, qty - 1)}
              >
                -
              </button>
              <span className="px-3">{qty}</span>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setQty(product.id, qty + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="text-right">
            <p>
              {brl(pricePix(product) * qty)}{" "}
              <span className="text-xs">PIX</span>
            </p>
            <p className="text-xs line-through text-gray-400">
              {brl(product.priceCard * qty)} cartão
            </p>
          </div>
        </div>
      ))}
      {cart.length > 0 && (
        <div className="sticky bottom-2 sm:static bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/50 border rounded-2xl p-3 mt-3 flex flex-col sm:block">
          <div className="flex justify-between text-sm">
            <span>Total PIX</span>
            <b>{brl(totalPix)}</b>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Total cartão</span>
            <span>{brl(totalCard)}</span>
          </div>
          <button
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 transition"
            onClick={() => setPage("checkout")}
          >
            Finalizar compra
          </button>
        </div>
      )}
    </section>
  );

  /* ---------------- Checkout ---------------- */
  const Checkout = (
    <section className="max-w-6xl mx-auto px-4 py-5 grid md:grid-cols-2 gap-6">
      <form className="space-y-2">
        <input className="w-full border rounded px-3 py-3" placeholder="Nome completo" />
        <input className="w-full border rounded px-3 py-3" placeholder="E-mail" />
        <input className="w-full border rounded px-3 py-3" placeholder="Telefone" />
        <input className="w-full border rounded px-3 py-3" placeholder="Endereço" />
        <input className="w-full border rounded px-3 py-3" placeholder="CEP" />
        <div className="flex gap-2 pt-1">
          <button type="button" className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded py-3 transition">
            Pagar no PIX
          </button>
          <button type="button" className="flex-1 bg-black text-white rounded py-3 hover:opacity-90 transition">
            Cartão
          </button>
        </div>
      </form>
      <div className="bg-white border rounded-2xl p-4 h-fit">
        <h3 className="font-semibold mb-2">Resumo</h3>
        <p className="flex justify-between text-sm">
          <span>Total PIX</span>
          <b>{brl(totalPix)}</b>
        </p>
        <p className="flex justify-between text-xs text-gray-500">
          <span>Total cartão</span>
          <span>{brl(totalCard)}</span>
        </p>
        <p className="mt-2 text-xs text-red-700">Frete grátis</p>
      </div>
    </section>
  );

  /* ---------------- Sobre nós ---------------- */
  const About = (
    <section className="max-w-4xl mx-auto px-4 py-5">
      <h2 className="text-2xl font-bold mb-3">Sobre a TCL Promoção SC</h2>
      <p className="mb-2 text-sm leading-relaxed">
        A TCL é uma das maiores fabricantes de televisores do mundo, reconhecida
        por levar tecnologias de ponta com excelente custo-benefício.
      </p>
      <p className="mb-2 text-sm leading-relaxed">
        Esta ação especial ocorre como campanha de sell-out para a próxima linha
        2026, com condições exclusivas no PIX e envio para todo o Brasil.
      </p>
    </section>
  );

  /* ---------------- Footer (com logo + sociais + legais) ---------------- */
  const Footer = (
    <footer className="mt-auto bg-gray-100 border-t py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="assets/logo/logo.webp" alt="TCL Logo" className="h-12" />
            <div className="text-sm text-gray-600">Loja oficial — Promoção SC</div>
          </div>

          {/* Links sociais */}
          <div className="flex items-center gap-5 text-gray-600 justify-center">
            <a
              href="https://www.facebook.com/TCLBrasil"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook TCL Brasil"
              className="hover:text-red-600"
              title="Facebook"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/tclbrasiloficial/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram TCL Brasil"
              className="hover:text-red-600"
              title="Instagram"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCYEPEik2JuL-86iZ-0Ncqcw"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube TCL Brasil"
              className="hover:text-red-600"
              title="YouTube"
            >
              <YouTubeIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@tclbrasil"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok TCL Brasil"
              className="hover:text-red-600"
              title="TikTok"
            >
              <TikTokIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Legais compactos */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-700">
          <nav className="flex flex-wrap items-center gap-4 justify-center">
            <a href="#termos" className="hover:text-red-600">Termos e Condições de Uso</a>
            <a href="#privacidade" className="hover:text-red-600">Aviso de Privacidade</a>
            <a href="#cookies" className="hover:text-red-600">Aviso de Cookies</a>
          </nav>
          <div className="text-center md:text-right text-gray-600">
            Copyright © 2025 TCL. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );

  /* ---------------- Render ---------------- */
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {FontHead}
      {Header}
      {page === "home" && !selected && Home}
      {page === "product" && selected && <ProductPage p={selected} />}
      {page === "cart" && Cart}
      {page === "checkout" && Checkout}
      {page === "about" && About}
      {Footer}
    </div>
  );
}

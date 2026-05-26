/**
 * BRASA — Hamburgueria Premium
 * script.js — Lógica principal
 *
 * Estrutura:
 *  1. Dados do cardápio (produtos)
 *  2. Estado do carrinho
 *  3. Renderização dos cards
 *  4. Filtragem por categoria
 *  5. Carrinho (adicionar, remover, atualizar quantidade)
 *  6. Drawer do carrinho
 *  7. Integração WhatsApp
 *  8. Utilitários (toast, formatação)
 *  9. Init
 */

// ─────────────────────────────────────────
// 1. DADOS DO CARDÁPIO
// ─────────────────────────────────────────

// Imagens via Unsplash (públicas, sem chave)
const MENU = [
  // ── Hambúrgueres ──
  {
    id: 1,
    category: 'burgers',
    name: 'Brasa Classic',
    desc: '180g de blend angus, queijo cheddar fundido, alface americana e molho da casa.',
    price: 34.90,
    badge: 'Popular',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80'
  },
  {
    id: 2,
    category: 'burgers',
    name: 'Smokey BBQ',
    desc: 'Blend defumado 220g, cebola crispy, bacon artesanal e molho barbecue caseiro.',
    price: 42.90,
    badge: 'Chef',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80'
  },
  {
    id: 3,
    category: 'burgers',
    name: 'Double Brasa',
    desc: 'Dois blends de 150g, duplo queijo americano, picles e mostarda artesanal.',
    price: 49.90,
    badge: null,
    img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80'
  },
  {
    id: 4,
    category: 'burgers',
    name: 'Brasa Gold',
    desc: '200g wagyu nacional, brie derretido, rúcula, tomate seco e aioli trufado.',
    price: 64.90,
    badge: 'Premium',
    img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80'
  },
  {
    id: 5,
    category: 'burgers',
    name: 'Crispy Chicken',
    desc: 'Frango empanado artesanal, coleslaw cremoso, jalapeños e maionese picante.',
    price: 38.90,
    badge: null,
    img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80'
  },

  // ── Bebidas ──
  {
    id: 6,
    category: 'drinks',
    name: 'Limonada Siciliana',
    desc: 'Limão siciliano espremido na hora, leite condensado e gelo triturado.',
    price: 16.90,
    badge: 'Favorita',
    img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80'
  },
  {
    id: 7,
    category: 'drinks',
    name: 'Milkshake Nutella',
    desc: 'Sorvete de creme, Nutella, leite integral e chantilly artesanal.',
    price: 24.90,
    badge: null,
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80'
  },
  {
    id: 8,
    category: 'drinks',
    name: 'Refrigerante Lata',
    desc: 'Coca-Cola, Pepsi, Guaraná Antarctica ou Sprite. Gelada.',
    price: 8.90,
    badge: null,
    img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80'
  },
  {
    id: 9,
    category: 'drinks',
    name: 'Cerveja Artesanal',
    desc: 'IPA gelada 600ml, produção nacional. Peça a disponibilidade do dia.',
    price: 22.90,
    badge: null,
    img: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80'
  },

  // ── Combos ──
  {
    id: 10,
    category: 'combos',
    name: 'Combo Brasa Classic',
    desc: 'Brasa Classic + Batata Fritas Média + Refrigerante Lata. Economia garantida.',
    price: 52.90,
    badge: 'Econômico',
    img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80'
  },
  {
    id: 11,
    category: 'combos',
    name: 'Combo Double',
    desc: 'Double Brasa + Onion Rings + Milkshake à escolha. O favorito da casa.',
    price: 72.90,
    badge: 'Top Venda',
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80'
  },
  {
    id: 12,
    category: 'combos',
    name: 'Combo Família',
    desc: '2 Brasa Classic + 2 Batatas Grandes + 2 Refrigerantes. Para dividir.',
    price: 98.90,
    badge: 'Família',
    img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80'
  },

  // ── Sobremesas ──
  {
    id: 13,
    category: 'desserts',
    name: 'Brownie Quente',
    desc: 'Brownie de chocolate belga com sorvete de baunilha e calda de caramelo.',
    price: 22.90,
    badge: null,
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80'
  },
  {
    id: 14,
    category: 'desserts',
    name: 'Cheesecake Maracujá',
    desc: 'Base crocante de biscoito, recheio cremoso e cobertura de maracujá fresco.',
    price: 19.90,
    badge: 'Novidade',
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80'
  },
  {
    id: 15,
    category: 'desserts',
    name: 'Sorvete Artesanal',
    desc: 'Duas bolas à escolha: chocolate, baunilha, morango ou doce de leite.',
    price: 14.90,
    badge: null,
    img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80'
  },
];

// ─────────────────────────────────────────
// 2. ESTADO DO CARRINHO
// ─────────────────────────────────────────

/** @type {Array<{id: number, qty: number}>} */
let cart = [];

// ─────────────────────────────────────────
// 3. RENDERIZAÇÃO DOS CARDS
// ─────────────────────────────────────────

/**
 * Formata número como moeda brasileira
 * @param {number} value
 * @returns {string}
 */
function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Cria o HTML de um card de produto
 * @param {object} item — produto do MENU
 * @returns {HTMLElement}
 */
function createCard(item) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('data-id', item.id);

  card.innerHTML = `
    <div class="card__image-wrap">
      <img
        src="${item.img}"
        alt="${item.name}"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80'"
      />
      ${item.badge ? `<span class="card__badge">${item.badge}</span>` : ''}
    </div>

    <div class="card__body">
      <h3 class="card__name">${item.name}</h3>
      <p class="card__desc">${item.desc}</p>
    </div>

    <div class="card__footer">
      <div class="card__price">
        <span>a partir de </span>${formatBRL(item.price)}
      </div>
      <button class="card__add-btn" data-id="${item.id}" aria-label="Adicionar ${item.name} ao carrinho">
        + Adicionar
      </button>
    </div>
  `;

  // Evento do botão "Adicionar"
  card.querySelector('.card__add-btn').addEventListener('click', () => {
    addToCart(item.id);
  });

  return card;
}

/**
 * Renderiza os produtos filtrados por categoria na grid
 * @param {string} category
 */
function renderProducts(category) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  const filtered = MENU.filter(item => item.category === category);

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="products__empty">Nenhum item disponível nessa categoria.</p>';
    return;
  }

  // Animação escalonada nos cards
  filtered.forEach((item, index) => {
    const card = createCard(item);
    card.style.animationDelay = `${index * 60}ms`;
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────
// 4. FILTRAGEM POR CATEGORIA
// ─────────────────────────────────────────

function initCategoryTabs() {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active de todos
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      renderProducts(category);
    });
  });
}

// ─────────────────────────────────────────
// 5. CARRINHO — LÓGICA
// ─────────────────────────────────────────

/**
 * Adiciona item ao carrinho ou incrementa quantidade
 * @param {number} productId
 */
function addToCart(productId) {
  const existing = cart.find(i => i.id === productId);
  const product = MENU.find(p => p.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  updateCartUI();
  showToast(`${product.name} adicionado!`);
}

/**
 * Remove item do carrinho completamente
 * @param {number} productId
 */
function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
}

/**
 * Incrementa quantidade de um item
 * @param {number} productId
 */
function incrementQty(productId) {
  const item = cart.find(i => i.id === productId);
  if (item) item.qty += 1;
  updateCartUI();
}

/**
 * Decrementa quantidade; remove se chegar a zero
 * @param {number} productId
 */
function decrementQty(productId) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty -= 1;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  updateCartUI();
}

/**
 * Calcula o total do carrinho
 * @returns {number}
 */
function calcTotal() {
  return cart.reduce((acc, item) => {
    const product = MENU.find(p => p.id === item.id);
    return acc + product.price * item.qty;
  }, 0);
}

/**
 * Atualiza toda a UI do carrinho (lista, total, badge)
 */
function updateCartUI() {
  const cartList   = document.getElementById('cartList');
  const cartEmpty  = document.getElementById('cartEmpty');
  const cartTotal  = document.getElementById('cartTotal');
  const cartCount  = document.getElementById('cartCount');
  const cartFooter = document.getElementById('cartFooter');

  // Atualiza badge do ícone
  const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
  cartCount.textContent = totalQty;
  cartCount.classList.toggle('visible', totalQty > 0);

  // Lista vazia
  if (cart.length === 0) {
    cartList.innerHTML  = '';
    cartEmpty.style.display  = 'block';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmpty.style.display  = 'none';
  cartFooter.style.display = 'flex';

  // Renderiza itens
  cartList.innerHTML = '';
  cart.forEach(item => {
    const product = MENU.find(p => p.id === item.id);
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img class="cart-item__img" src="${product.img}" alt="${product.name}" />
      <div class="cart-item__info">
        <p class="cart-item__name">${product.name}</p>
        <p class="cart-item__price">${formatBRL(product.price * item.qty)}</p>
      </div>
      <div class="cart-item__controls">
        <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Diminuir quantidade">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
      </div>
      <button class="cart-item__remove" data-id="${item.id}" aria-label="Remover ${product.name}">✕</button>
    `;
    cartList.appendChild(li);
  });

  // Delega eventos nos botões da lista
  cartList.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-id'));
      btn.getAttribute('data-action') === 'inc'
        ? incrementQty(id)
        : decrementQty(id);
    });
  });

  cartList.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(Number(btn.getAttribute('data-id')));
    });
  });

  // Total
  cartTotal.textContent = formatBRL(calcTotal());
}

// ─────────────────────────────────────────
// 6. DRAWER DO CARRINHO
// ─────────────────────────────────────────

function initCartDrawer() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const openBtn = document.getElementById('cartToggle');
  const closeBtn = document.getElementById('cartClose');

  function openCart() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openCart);
  closeBtn.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  // Fecha com Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });
}

// ─────────────────────────────────────────
// 7. INTEGRAÇÃO WHATSAPP
// ─────────────────────────────────────────

const WHATSAPP_NUMBER = '5511999998888'; // Formato internacional sem + ou espaços

/**
 * Monta a mensagem do pedido e abre o WhatsApp
 */
function sendWhatsApp() {
  if (cart.length === 0) {
    showToast('Adicione itens antes de pedir!');
    return;
  }

  let msg = '🔥 *Olá! Gostaria de fazer este pedido:*\n\n';

  cart.forEach(item => {
    const product = MENU.find(p => p.id === item.id);
    msg += `• ${item.qty}x ${product.name} — ${formatBRL(product.price * item.qty)}\n`;
  });

  msg += `\n*Total: ${formatBRL(calcTotal())}*`;
  msg += '\n\nObrigado! 🍔';

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}

function initWhatsApp() {
  // Botão dentro do drawer
  document.getElementById('whatsappOrder').addEventListener('click', sendWhatsApp);

  // FAB flutuante (abre o carrinho se vazio, senão manda direto)
  document.getElementById('fabWhatsapp').addEventListener('click', e => {
    e.preventDefault();
    if (cart.length === 0) {
      // Scroll suave ao menu se carrinho vazio
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    } else {
      sendWhatsApp();
    }
  });
}

// ─────────────────────────────────────────
// 8. UTILITÁRIOS
// ─────────────────────────────────────────

let toastTimeout;

/**
 * Exibe notificação temporária no rodapé da tela
 * @param {string} message
 */
function showToast(message) {
  // Remove toast anterior se existir
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  clearTimeout(toastTimeout);

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Força reflow para animar
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─────────────────────────────────────────
// 9. INICIALIZAÇÃO
// ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Renderiza categoria inicial (hambúrgueres)
  renderProducts('burgers');

  // Inicializa abas
  initCategoryTabs();

  // Inicializa carrinho
  initCartDrawer();
  updateCartUI();

  // Inicializa WhatsApp
  initWhatsApp();

  console.log('🔥 BRASA — Cardápio carregado com sucesso!');
});

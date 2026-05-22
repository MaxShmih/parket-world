/**
 * Заміна англійських фраз у JSON теми (працює з мініфікованим JSON).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

/** Shopify locale JSON може мати блок-коментар на початку — JSON.parse його не приймає. */
function readLocaleJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const headerMatch = raw.match(/^(\/\*[\s\S]*?\*\/\s*)/);
  const header = headerMatch ? headerMatch[1] : '';
  const jsonText = header ? raw.slice(header.length) : raw;
  return { header, data: JSON.parse(jsonText.trim()) };
}

function writeLocaleJson(filePath, header, data) {
  const body = JSON.stringify(data, null, 2) + '\n';
  fs.writeFileSync(filePath, header + body, 'utf8');
}

const PHRASES = [
  // Footer / newsletter
  ['Join Our Newsletter', 'Підпишіться на розсилку'],
  [
    'Sign up to our newsletter & receive 10% off your first order.',
    'Зареєструйтесь на розсилку та отримайте знижку 10% на перше замовлення.',
  ],
  ['Terms of Services', 'Умови надання послуг'],
  ['Terms of Service', 'Умови надання послуг'],
  ['Privacy Policy', 'Політика конфіденційності'],
  ['"heading":"Company"', '"heading":"Компанія"'],
  ['"heading": "Company"', '"heading": "Компанія"'],
  ['"heading":"Collection"', '"heading":"Колекції"'],
  ['"heading": "Collection"', '"heading": "Колекції"'],
  ['"heading":"Shop"', '"heading":"Магазин"'],
  ['"heading": "Shop"', '"heading": "Магазин"'],

  // Collection page
  ['"heading":"About Garage"', '"heading":"Про Світ Паркету"'],
  ['"heading": "About Garage"', '"heading": "Про Світ Паркету"'],
  ['"heading":"Popular Search"', '"heading":"Популярний пошук"'],
  ['"heading": "Popular Search"', '"heading": "Популярний пошук"'],
  ['"heading":"Scrolling promotion"', '"heading":"Акційна стрічка"'],
  ['"heading": "Scrolling promotion"', '"heading": "Акційна стрічка"'],
  ['"text":"Fast Delivery"', '"text":"Швидка доставка"'],
  ['"text": "Fast Delivery"', '"text": "Швидка доставка"'],
  ['"text":"30 Days Free Returns"', '"text":"30 днів безкоштовного повернення"'],
  ['"text": "30 Days Free Returns"', '"text": "30 днів безкоштовного повернення"'],
  ['"text":"Secure Payment"', '"text":"Безпечна оплата"'],
  ['"text": "Secure Payment"', '"text": "Безпечна оплата"'],
  ['"text":"24/7 Customer Support"', '"text":"Підтримка 24/7"'],
  ['"text": "24/7 Customer Support"', '"text": "Підтримка 24/7"'],
  ['"text":"Sustainable Materials"', '"text":"Екологічні матеріали"'],
  ['"text": "Sustainable Materials"', '"text": "Екологічні матеріали"'],
  ['"button_label":"Living Room"', '"button_label":"Вітальня"'],
  ['"button_label": "Living Room"', '"button_label": "Вітальня"'],
  ['"button_label":"Planters"', '"button_label":"Кашпо"'],
  ['"button_label": "Planters"', '"button_label": "Кашпо"'],
  ['"button_label":"Gravel Rug"', '"button_label":"Килими"'],
  ['"button_label": "Gravel Rug"', '"button_label": "Килими"'],
  ['"button_label":"Table Mirror"', '"button_label":"Дзеркала"'],
  ['"button_label": "Table Mirror"', '"button_label": "Дзеркала"'],
  ['"button_label":"Table Wears"', '"button_label":"Столовий посуд"'],
  ['"button_label": "Table Wears"', '"button_label": "Столовий посуд"'],
  ['"button_label":"Dining Decor"', '"button_label":"Декор"'],
  ['"button_label": "Dining Decor"', '"button_label": "Декор"'],
  ['"button_label":"Ray Table Lamp"', '"button_label":"Освітлення"'],
  ['"button_label": "Ray Table Lamp"', '"button_label": "Освітлення"'],
  ['"button_label":"Chairs"', '"button_label":"Стільці"'],
  ['"button_label": "Chairs"', '"button_label": "Стільці"'],
  [
    'From classic wood and metal to contemporary acrylic and glass',
    'Широкий вибір підлогових покриттів: ламінат, вініл, паркет, SPC та супутні матеріали',
  ],
  [
    "When selecting furniture, it's important to think beyond aesthetics",
    'Допоможемо підібрати покриття під ваш стиль, навантаження та бюджет',
  ],
  [
    'This guide explores a variety of furniture styles and materials',
    'Працюємо з перевіреними брендами та надаємо консультацію з монтажу',
  ],

  // Product / sections
  ['"heading":"You May Also Like"', '"heading":"Вам також може сподобатися"'],
  ['"heading": "You May Also Like"', '"heading": "Вам також може сподобатися"'],
  ['"heading":"Recently viewed products"', '"heading":"Нещодавно переглянуті"'],
  ['"heading": "Recently viewed products"', '"heading": "Нещодавно переглянуті"'],
  ['"heading":"Free shipping on almost everything"', '"heading":"Безкоштовна доставка майже на все"'],
  ['"heading": "Free shipping on almost everything"', '"heading": "Безкоштовна доставка майже на все"'],
  ['"title":"Free Shipping"', '"title":"Безкоштовна доставка"'],
  ['"title": "Free Shipping"', '"title": "Безкоштовна доставка"'],
  ['"title":"30-Days Free Returns"', '"title":"30 днів повернення"'],
  ['"title": "30-Days Free Returns"', '"title": "30 днів повернення"'],
  ['"button_label":"Shipping Details"', '"button_label":"Деталі доставки"'],
  ['"button_label": "Shipping Details"', '"button_label": "Деталі доставки"'],
  ['"button_label":"More About Payment"', '"button_label":"Детальніше про оплату"'],
  ['"button_label": "More About Payment"', '"button_label": "Детальніше про оплату"'],
  ['"heading":"We’re on Gram"', '"heading":"Ми в Instagram"'],
  ['"heading": "We’re on Gram"', '"heading": "Ми в Instagram"'],
  ['"heading":"We\'re on Gram"', '"heading":"Ми в Instagram"'],

  // Mobile sticky bar
  ['"text":"Home"', '"text":"Головна"'],
  ['"text": "Home"', '"text": "Головна"'],
  ['"text":"Cart"', '"text":"Кошик"'],
  ['"text": "Cart"', '"text": "Кошик"'],
  ['"text":"Products"', '"text":"Каталог"'],
  ['"text": "Products"', '"text": "Каталог"'],
  ['"text":"About"', '"text":"Про нас"'],
  ['"text": "About"', '"text": "Про нас"'],
];

const FILES = [
  'templates/collection.json',
  'templates/index.json',
  'templates/product.json',
  'templates/product.coming-soon.json',
  'templates/product.flash-sale.json',
  'templates/product.grid-2-columns.json',
  'templates/product.grid-mix.json',
  'templates/product.horizontal-thumbnails.json',
  'templates/product.out-of-stock.json',
  'templates/product.product-image-swatch.json',
  'sections/footer-group.json',
];

function applyPhrases(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let s = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [from, to] of PHRASES) {
    if (s.includes(from)) {
      s = s.split(from).join(to);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(filePath, s, 'utf8');
  return changed;
}

let n = 0;
for (const rel of FILES) {
  if (applyPhrases(path.join(root, rel))) {
    console.log('Updated', rel);
    n++;
  }
}

// Shopify sort options (системні ключі + products.facets для | t у Liquid)
const SORT_UA = {
  manual: 'Рекомендовано',
  best_selling: 'Найкращі продажі',
  title_ascending: 'За назвою: А–Я',
  title_descending: 'За назвою: Я–А',
  price_ascending: 'Ціна: від низької',
  price_descending: 'Ціна: від високої',
  created_ascending: 'Дата: від старих',
  created_descending: 'Дата: від нових',
  relevance: 'Найрелевантніші',
};

const SORT_FACETS_UA = {
  sort_manual: SORT_UA.manual,
  sort_best_selling: SORT_UA.best_selling,
  sort_title_ascending: SORT_UA.title_ascending,
  sort_title_descending: SORT_UA.title_descending,
  sort_price_ascending: SORT_UA.price_ascending,
  sort_price_descending: SORT_UA.price_descending,
  sort_created_ascending: SORT_UA.created_ascending,
  sort_created_descending: SORT_UA.created_descending,
  sort_relevance: SORT_UA.relevance,
};

const SORT_FACETS_EN = {
  sort_manual: 'Featured',
  sort_best_selling: 'Best selling',
  sort_title_ascending: 'Alphabetically, A-Z',
  sort_title_descending: 'Alphabetically, Z-A',
  sort_price_ascending: 'Price, low to high',
  sort_price_descending: 'Price, high to low',
  sort_created_ascending: 'Date, old to new',
  sort_created_descending: 'Date, new to old',
  sort_relevance: 'Most relevant',
};

function patchSortLocales(rel, facetSortKeys) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) return;
  const { header, data } = readLocaleJson(p);
  if (!data.products) data.products = {};
  if (!data.products.facets) data.products.facets = {};
  data.products.facets = { ...data.products.facets, ...facetSortKeys };
  if (!data.shopify) data.shopify = {};
  if (!data.shopify.collections) data.shopify.collections = {};
  data.shopify.collections.sorting = { ...data.shopify.collections.sorting, ...SORT_UA };
  if (!data.shopify.search) data.shopify.search = {};
  data.shopify.search.sorting = { ...data.shopify.search.sorting, relevance: SORT_UA.relevance };
  writeLocaleJson(p, header, data);
  console.log('Patched sort keys in', rel);
}

for (const rel of ['locales/uk-UA.default.json', 'locales/uk-UA.json', 'locales/uk.json']) {
  patchSortLocales(rel, SORT_FACETS_UA);
}

patchSortLocales('locales/en.default.json', SORT_FACETS_EN);

// Schema: назви секцій у редакторі + дефолти
const schemaPath = path.join(root, 'locales/uk-UA.schema.json');
if (fs.existsSync(schemaPath)) {
  let s = fs.readFileSync(schemaPath, 'utf8');
  const schemaPhrases = [
    ['Recently viewed products', 'Нещодавно переглянуті товари'],
    ['Alphabetically, A-Z', 'За назвою: А–Я'],
    ['Alphabetically, Z-A', 'За назвою: Я–А'],
    ['Price, low to high', 'Ціна: від низької'],
    ['Price, high to low', 'Ціна: від високої'],
    ['Date, old to new', 'Дата: від старих'],
    ['Date, new to old', 'Дата: від нових'],
    ['Most relevant', 'Найрелевантніші'],
    ['Best selling', 'Найкращі продажі'],
  ];
  for (const [from, to] of schemaPhrases) {
    if (s.includes(from)) s = s.split(from).join(to);
  }
  fs.writeFileSync(schemaPath, s, 'utf8');
  console.log('Updated uk-UA.schema.json phrases');
}

console.log('Done. JSON files updated:', n);

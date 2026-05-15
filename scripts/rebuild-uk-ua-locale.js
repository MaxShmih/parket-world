/**
 * Збирає uk-UA.default.json з uk.json + shopify/checkout з поточного файлу.
 * Доповнює пропуски з en.default.json і виправляє залишки англійською.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'));

const en = read('locales/en.default.json');
const uk = read('locales/uk.json');
const ukUAOld = read('locales/uk-UA.default.json');

/** Точні заміни EN → UA (залишки в uk.json і пропуски) */
const EXACT = {
  'Spend {{ remaining_amount }} more to reach free shipping!':
    'Додайте товарів на {{ remaining_amount }}, щоб отримати безкоштовну доставку!',
  'You are eligible for free shipping.': 'Ви маєте право на безкоштовну доставку.',
  '{{ count }} item': '{{ count }} товар',
  '{{ count }} items': '{{ count }} товарів',
  'For {{ price }}, please wrap the products in this order.':
    'За {{ price }} ми подарунково упакуємо товари в цьому замовленні.',
  'Gift message (free and optional)': 'Подарункове повідомлення (безкоштовно, за бажанням)',
  'Tagged "{{ tags }}"': 'Мітки: «{{ tags }}»',
  'Page {{ page }}': 'Сторінка {{ page }}',
  'Payment methods': 'Способи оплати',
  'Opens in a new window.': 'Відкривається в новому вікні.',
  'View as': 'Перегляд:',
  'View as list': 'Списком',
  'View as grid': 'Сіткою',
  '{{ count }} Comment': '{{ count }} коментар',
  '{{ count }} Comments': '{{ count }} коментарів',
  'Blog post': 'Запис у блозі',
  'May 27, 2024': '27 травня 2024',
  'Give your customers a summary of your blog post':
    'Короткий опис запису для ваших клієнтів',
  'Example product title': 'Приклад назви товару',
  "This area is used to describe your product’s details. Tell customers about the look, feel, and style of your product. Add details on color, materials used, sizing, and where it was made.":
    'Опишіть товар: зовнішній вигляд, матеріали, розміри та особливості.',
  "Collection's name": 'Назва колекції',
  "Collection's description here that provides details about the collection.":
    'Опис колекції з деталями для покупців.',
  'Please enable Javascript to use this feature.':
    'Увімкніть JavaScript, щоб користуватися цією функцією.',
  '404 Page not found': '404 — сторінку не знайдено',
  'The page you requested does not exist.': 'Запитаної сторінки не існує.',
  '{{ count }} result': '{{ count }} результат',
  '{{ count }} results': '{{ count }} результатів',
  '{{ count }} result found for “{{ terms }}”': 'Знайдено {{ count }} результат для «{{ terms }}»',
  '{{ count }} results found for “{{ terms }}”': 'Знайдено {{ count }} результатів для «{{ terms }}»',
  Account: 'Обліковий запис',
  'Account details': 'Дані облікового запису',
  'View addresses': 'Переглянути адреси',
  'Return to Account details': 'Повернутися до облікового запису',
  'Use the gift card code online or QR code in-store':
    'Використайте код подарункової картки онлайн або QR у магазині',
  "Here's your {{ value }} gift card for {{ shop }}!":
    'Ваша подарункова картка на {{ value }} для {{ shop }}!',
  'Your gift card': 'Ваша подарункова картка',
  'Visit online store': 'Перейти в інтернет-магазин',
  'Add to Apple Wallet': 'Додати в Apple Wallet',
  'QR code — scan to redeem gift card': 'QR-код — відскануйте для активації',
  'Copy gift card code': 'Скопіювати код картки',
  Expired: 'Протерміновано',
  'Code copied successfully': 'Код скопійовано',
  'Expires {{ expires_on }}': 'Дійсна до {{ expires_on }}',
};

function deepClone(o) {
  return JSON.parse(JSON.stringify(o));
}

function deepMergeFill(enNode, ukNode, outNode) {
  if (typeof enNode === 'string') {
    return typeof ukNode === 'string' ? ukNode : enNode;
  }
  if (!enNode || typeof enNode !== 'object' || Array.isArray(enNode)) return outNode ?? ukNode;

  const out = outNode && typeof outNode === 'object' && !Array.isArray(outNode) ? outNode : {};
  for (const key of Object.keys(enNode)) {
    out[key] = deepMergeFill(enNode[key], ukNode?.[key], out[key]);
  }
  return out;
}

function translateLeaves(obj) {
  if (typeof obj === 'string') {
    return EXACT[obj] ?? obj;
  }
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    for (const k of Object.keys(obj)) obj[k] = translateLeaves(obj[k]);
  }
  return obj;
}

const themeKeys = Object.keys(en).filter((k) => !['shopify', 'customer_accounts'].includes(k));
const theme = {};
for (const key of themeKeys) {
  theme[key] = deepMergeFill(en[key], uk[key], deepClone(uk[key] || {}));
}

const merged = {
  ...translateLeaves(theme),
  shopify: ukUAOld.shopify,
  customer_accounts: ukUAOld.customer_accounts,
};

const json = JSON.stringify(merged, null, 2) + '\n';
for (const rel of ['locales/uk-UA.default.json', 'locales/uk-UA.json', 'locales/uk.json']) {
  fs.writeFileSync(path.join(root, rel), json, 'utf8');
  console.log('Written', rel);
}

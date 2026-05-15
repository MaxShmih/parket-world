/**
 * Доповнює locales/uk.json усіма ключами теми + українські рядки для пропусків.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const en = JSON.parse(fs.readFileSync(path.join(root, 'locales/en.default.json'), 'utf8'));
const uk = JSON.parse(fs.readFileSync(path.join(root, 'locales/uk.json'), 'utf8'));

const UA = {
  'general.social.links.pinterest': 'Pinterest',
  'general.social.links.instagram': 'Instagram',
  'general.social.links.tumblr': 'Tumblr',
  'general.social.links.snapchat': 'Snapchat',
  'general.social.links.youtube': 'YouTube',
  'general.social.links.vimeo': 'Vimeo',
  'general.pagination.page': 'Сторінка {{ number }}',
  'general.pagination.show_more': 'Показати ще',
  'general.breadcrumbs.collections': 'Колекція',
  'general.search.search': 'Пошук',
  'general.search.reset': 'Очистити пошук',
  'general.search.placeholder': 'Що ви шукаєте?',
  'general.search.all_products': 'Усі категорії',
  'general.search.close_search': 'Закрити пошук',
  'general.cart.title': 'Ваш кошик',
  'general.cart.view_empty_cart': 'Переглянути кошик',
  'general.cart.remove': 'Видалити',
  'general.cart.continue_shopping': 'Продовжити покупки',
  'general.cart.note.title': 'Примітка до замовлення',
  'general.cart.note.caption': 'Особливі побажання до замовлення',
  'general.cart.coupon.title': 'Промокод',
  'general.cart.coupon.remove': 'Видалити {{ code }}',
  'general.cart.coupon.caption': 'Введіть код знижки',
  'general.cart.coupon.duplicate_error_message': 'Цей промокод уже застосовано до кошика.',
  'general.cart.coupon.apply_error_message': 'Цей промокод не можна застосувати до кошика.',
  'general.cart.shipping_calculator.title': 'Розрахунок доставки',
  'general.cart.shipping_calculator.button': 'Розрахувати',
  'general.cart.shipping_calculator.not_found': 'На жаль, ми не доставляємо за вашою адресою.',
  'general.cart.shipping_calculator.one_result': 'Для вашої адреси є один тариф доставки:',
  'general.cart.shipping_calculator.multiple_results': 'Для вашої адреси є кілька тарифів доставки:',
  'general.slider.previous_slide': 'Попередній слайд',
  'newsletter.success': 'Дякуємо за підписку',
  'newsletter.already_subscribed': 'Ви вже підписані!',
  'newsletter.button_label': 'Підписатися',
  'newsletter.placeholder': 'Введіть email',
  'accessibility.skip_to_text': 'Перейти до вмісту',
  'accessibility.skip_to_product_info': 'Перейти до інформації про товар',
  'accessibility.vendor': 'Виробник:',
  'accessibility.refresh_page': 'Вибір варіанту оновлює сторінку.',
  'accessibility.complementary_products': 'Додаткові товари',
  'accessibility.view_more': 'Показати більше',
  'accessibility.view_less': 'Показати менше',
  'accessibility.show_more': 'Показати ще',
  'accessibility.show_less': 'Згорнути',
  'accessibility.play_video': 'Відтворити відео',
  'accessibility.load_video': 'Завантажити відео: {{ description }}',
  'accessibility.select_variant': 'Обрати варіант',
  'blogs.article.comment_form_title': 'Залишити коментар',
  'blogs.article.message': 'Коментар',
  'blogs.article.post': 'Надіслати',
  'blogs.article.success': 'Ваш коментар опубліковано. Дякуємо!',
  'blogs.article.success_moderated': 'Коментар надіслано. Ми опублікуємо його після модерації.',
  'blogs.article.article_button_label': 'Читати далі',
  'blogs.article.previous_post': 'Попередня публікація',
  'blogs.article.next_post': 'Наступна публікація',
  'blogs.article.related_posts_title': 'Схожі публікації',
  'products.product.add_all_to_cart': 'Додати все в кошик',
  'products.product.buy_it_now': 'Купити зараз',
  'products.product.choose_options': 'Обрати параметри',
  'products.product.quick_view': 'Швидкий перегляд',
  'products.product.quick_view_title': 'Оберіть варіант',
  'products.product.volume_pricing.minimum': '{{ quantity }}+',
  'products.product.volume_pricing.price_range': '{{ minimum }} – {{ maximum }}',
  'templates.search.products': 'Пов’язані товари',
  'templates.search.title': 'Результати пошуку',
  'templates.search.search_for': 'Усі результати для «{{ terms }}»',
  'templates.search.articles_pages': 'Статті та сторінки',
  'templates.search.most_searched_keywords': 'Популярні запити',
  'templates.search.most_searched_products': 'Популярні товари',
  'templates.contact.form.title': 'Форма зворотного зв’язку',
  'templates.contact.form.phone': 'Номер телефону',
  'templates.contact.form.comment': 'Ваше повідомлення',
  'templates.contact.form.send': 'Надіслати',
  'templates.contact.form.error_heading': 'Будь ласка, виправте таке:',
  'localization.country_label': 'Країна/регіон',
  'localization.country_results_count': 'Знайдено країн/регіонів: {{ count }}',
  'customer.account_fallback': 'Обліковий запис',
  'customer.activate_account.title': 'Активувати обліковий запис',
  'customer.activate_account.subtext': 'Створіть пароль, щоб активувати обліковий запис.',
  'customer.activate_account.password_confirm': 'Підтвердіть пароль',
  'customer.activate_account.submit': 'Активувати',
  'customer.activate_account.cancel': 'Відхилити запрошення',
  'customer.addresses.title': 'Адреси',
  'customer.addresses.default': 'За замовчуванням',
  'customer.addresses.add_new': 'Додати нову адресу',
  'customer.addresses.edit_address': 'Редагувати адресу',
  'customer.addresses.first_name': "Ім'я",
  'customer.addresses.last_name': 'Прізвище',
  'customer.addresses.company': 'Компанія',
  'customer.addresses.address1': 'Адреса 1',
  'customer.addresses.address2': 'Адреса 2',
  'customer.addresses.country': 'Країна/регіон',
  'customer.addresses.zip': 'Поштовий індекс',
  'customer.addresses.set_default': 'Зробити адресою за замовчуванням',
  'customer.addresses.update': 'Оновити адресу',
  'customer.addresses.cancel': 'Скасувати',
  'customer.addresses.delete': 'Видалити',
  'customer.addresses.delete_confirm': 'Видалити цю адресу?',
  'customer.log_out': 'Вийти',
  'customer.account_action': 'Увійти / Зареєструватися',
  'customer.login_page.cancel': 'Скасувати',
  'customer.login_page.create_account': 'Створити обліковий запис',
  'customer.login_page.forgot_password': 'Забули пароль?',
  'customer.login_page.guest_title': 'Продовжити як гість',
  'customer.login_page.sign_in': 'Увійти',
  'customer.login_page.submit': 'Надіслати',
  'customer.order.title': 'Замовлення {{ name }}',
  'customer.order.date_html': 'Оформлено {{ date }}',
  'customer.order.cancelled_html': 'Скасовано {{ date }}',
  'customer.order.cancelled_reason': 'Причина: {{ reason }}',
  'customer.order.billing_address': 'Адреса для рахунку',
  'customer.order.payment_status': 'Статус оплати',
  'customer.order.shipping_address': 'Адреса доставки',
  'customer.order.fulfillment_status': 'Статус виконання',
  'customer.order.product': 'Товар',
  'customer.order.fulfilled_at_html': 'Виконано {{ date }}',
  'customer.order.track_shipment': 'Відстежити відправлення',
  'customer.order.total_duties': 'Мито',
  'customer.orders.title': 'Історія замовлень',
  'customer.orders.order_number_link': 'Замовлення №{{ number }}',
  'customer.orders.payment_status': 'Статус оплати',
  'customer.orders.fulfillment_status': 'Статус виконання',
  'customer.orders.none': 'У вас ще немає замовлень.',
  'customer.recover_password.title': 'Скинути пароль',
  'customer.recover_password.subtext': 'Ми надішлемо email для скидання пароля',
  'customer.register.title': 'Створити обліковий запис',
  'customer.register.first_name': "Ім'я",
  'customer.register.last_name': 'Прізвище',
  'customer.register.submit': 'Створити',
  'customer.reset_password.title': 'Новий пароль',
  'customer.reset_password.subtext': 'Введіть новий пароль',
  'customer.reset_password.password_confirm': 'Підтвердіть пароль',
  'customer.reset_password.submit': 'Скинути пароль',
  'recipient.form.checkbox': 'Надіслати як подарунок',
  'recipient.form.expanded': 'Форму одержувача розгорнуто',
  'recipient.form.collapsed': 'Форму одержувача згорнуто',
  'recipient.form.email_label': 'Email одержувача',
  'recipient.form.email_label_optional_for_no_js_behavior': 'Email одержувача (необов’язково)',
  'recipient.form.name_label': "Ім'я одержувача (необов’язково)",
  'recipient.form.message_label': 'Повідомлення (необов’язково)',
  'recipient.form.message': 'Повідомлення',
  'recipient.form.max_characters': 'Максимум {{ max_chars }} символів',
  'recipient.form.send_on': 'РРРР-ММ-ДД',
  'recipient.form.send_on_label': 'Дата надсилання (необов’язково)',
};

function deepMerge(target, source) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) return target;
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      out[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      out[key] = source[key];
    }
  }
  return out;
}

function setByPath(obj, dotPath, value) {
  const parts = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!cur[parts[i]] || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

// База: en + накладення існуючого uk (shopify checkout тощо)
let merged = deepMerge(JSON.parse(JSON.stringify(en)), uk);

for (const [path, value] of Object.entries(UA)) {
  setByPath(merged, path, value);
}

// Перевірка пропусків
function missingAll(enObj, ukObj, path = '', m = []) {
  for (const k of Object.keys(enObj || {})) {
    const p = path ? `${path}.${k}` : k;
    if (ukObj?.[k] === undefined) m.push(p);
    else if (typeof enObj[k] === 'object' && enObj[k] && !Array.isArray(enObj[k]))
      missingAll(enObj[k], ukObj[k], p, m);
  }
  return m;
}

const stillMissing = missingAll(en, merged).filter((p) => {
  const parts = p.split('.');
  let v = en;
  for (const part of parts) v = v?.[part];
  return typeof v === 'string';
});

if (stillMissing.length) {
  console.warn('Still missing', stillMissing.length, stillMissing.slice(0, 10));
  process.exitCode = 1;
}

const json = JSON.stringify(merged, null, 2) + '\n';
const targets = ['locales/uk.json', 'locales/uk-UA.json', 'locales/uk-UA.default.json'];
for (const rel of targets) {
  fs.writeFileSync(path.join(root, rel), json, 'utf8');
  console.log('Written', rel);
}
console.log('Theme locale keys complete (uk + uk-UA).');

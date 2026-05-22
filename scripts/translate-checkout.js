/**
 * Доповнює переклади чекауту (shopify.checkout) та рядки теми для замовлення без оплати.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

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

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const value = source[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
}

/** Ключові рядки чекауту, які часто лишаються англійськими */
const CHECKOUT_PATCH = {
  general: {
    complete_purchase_button_label: 'Оформити заявку',
    pay_now_button_label: 'Оформити заявку',
    submit_order_button_label: 'Оформити заявку',
    confirm_order_button_label: 'Оформити заявку',
    continue_button_label: 'Продовжити',
    back_to_contact_information: 'Назад до контактів',
    back_to_shipping_method: 'Назад до доставки',
    back_to_payment_method: 'Назад до замовлення',
    edit_contact_information: 'Редагувати контакт',
    edit_shipping_method: 'Редагувати спосіб доставки',
    edit_payment_method: 'Редагувати замовлення',
    edit_billing_address: 'Редагувати платіжну адресу',
    choose_shipping_method: 'Оберіть спосіб доставки',
    choose_payment_method: 'Оберіть спосіб замовлення',
    choose_billing_address: 'Оберіть платіжну адресу',
  },
  contact: {
    title: 'Контакт',
    contact_method_title: 'Контакт',
    email_or_phone_label: 'Email або номер мобільного',
    email_or_phone_placeholder: 'Email або номер мобільного',
    email_label: 'Email',
    email_placeholder: 'Email',
    first_name_label: "Ім'я",
    optional_first_name_label: "Ім'я (необов'язково)",
    first_name_placeholder: "Ім'я",
    optional_first_name_placeholder: "Ім'я (необов'язково)",
    last_name_label: 'Прізвище',
    last_name_placeholder: 'Прізвище',
    address1_label: 'Адреса',
    address1_placeholder: 'Адреса',
    address2_label: 'Квартира, офіс тощо',
    optional_address2_label: "Квартира, офіс тощо (необов'язково)",
    address2_placeholder: 'Квартира, офіс тощо',
    optional_address2_placeholder: "Квартира, офіс тощо (необов'язково)",
    country_label: 'Країна/регіон',
    country_placeholder: 'Країна/регіон',
    company_label: 'Компанія',
    optional_company_label: "Компанія (необов'язково)",
    shipping_address_title: 'Адреса доставки',
    address_title: 'Адреса',
  },
  delivery: {
    title: 'Доставка',
  },
  delivery_address: {
    title: 'Доставка',
  },
  shipping: {
    title: 'Спосіб доставки',
    shipping_method_title: 'Спосіб доставки',
    please_enter_your_shipping_information_notice:
      'Введіть адресу доставки, щоб переглянути доступні способи доставки.',
    no_rates_contact_notice: 'Зв’яжіться з нами для деталей',
    free_rate_label: 'Безкоштовно',
  },
  payment: {
    title: 'Замовити',
    billing_address_title: 'Платіжна адреса',
    same_billing_address_label: 'Та сама, що й адреса доставки',
    different_billing_address_label: 'Інша платіжна адреса',
    billing_address_description: 'Вкажіть адресу для рахунку або документів.',
  },
  billing: {
    billing_address_title: 'Платіжна адреса',
    same_as_shipping: 'Та сама, що й адреса доставки',
    use_different_billing_address: 'Інша платіжна адреса',
    different_billing_address_label: 'Інша платіжна адреса',
  },
  order_summary: {
    title: 'Ваше замовлення',
    subtotal_label: 'Підсумок',
    shipping_label: 'Доставка',
    shipping_pending_message: 'Введіть адресу доставки',
    shipping_pending_value: '—',
    total_label: 'Усього',
    taxes_label: 'Податки',
    free_total_label: 'Безкоштовно',
    expand_order_summary: 'Показати замовлення',
    collapse_order_summary: 'Сховати замовлення',
  },
  marketing: {
    accept_marketing_checkbox_label: 'Надсилати мені новини та пропозиції',
    email_me_with_news_and_offers: 'Надсилати мені новини та пропозиції',
  },
  shop_policies: {
    privacy_policy: 'Політика конфіденційності',
    terms_of_service: 'Умови використання',
    refund_policy: 'Умови повернення',
  },
  customer_account: {
    have_an_account_label: 'Вже маєте обліковий запис?',
    sign_in_link_label: 'Увійти',
    save_my_information_label: 'Зберегти цю інформацію на наступний раз',
  },
};

const THEME_UA = {
  products: {
    product: {
      buy_it_now: 'Оформити заявку',
    },
  },
  sections: {
    cart: {
      checkout: 'Замовити',
    },
  },
};

const LOCALE_FILES = [
  'locales/uk-UA.json',
  'locales/uk-UA.default.json',
  'locales/uk.json',
];

function patchFile(rel) {
  const filePath = path.join(root, rel);
  if (!fs.existsSync(filePath)) return;
  const { header, data } = readLocaleJson(filePath);
  if (!data.shopify) data.shopify = {};
  if (!data.shopify.checkout) data.shopify.checkout = {};
  deepMerge(data.shopify.checkout, CHECKOUT_PATCH);
  deepMerge(data, THEME_UA);
  writeLocaleJson(filePath, header, data);
  console.log('Patched checkout + theme strings in', rel);
}

for (const rel of LOCALE_FILES) {
  patchFile(rel);
}

console.log('Checkout translation patch done.');

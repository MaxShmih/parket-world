/**
 * Замінює демо-англійський текст у templates/*.json на український.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const templatesDir = path.join(root, 'templates');

const REPLACEMENTS = [
  ['"heading_1": "Modern"', '"heading_1": "Сучасний дизайн"'],
  ['"heading_2": "Eco-certified"', '"heading_2": "Еко-сертифікація"'],
  ['"heading_3": "Warranty"', '"heading_3": "Гарантія"'],
  [
    '"heading_1": "Free International Shipping over $500"',
    '"heading_1": "Безкоштовна доставка від 500 $"',
  ],
  [
    '"heading_2": "Free Returns Within 30 days"',
    '"heading_2": "Безкоштовне повернення протягом 30 днів"',
  ],
  ['"heading": "Limited time offer"', '"heading": "Обмежена пропозиція"'],
  [
    '"description": "<p>Get $20 off when you spend $1,000 or more! <a href=\\"/collections/all\\" title=\\"All products\\">Learn more</a></p>"',
    '"description": "<p>Знижка 20 $ при замовленні від 1 000 $! <a href=\\"/collections/all\\" title=\\"Усі товари\\">Детальніше</a></p>"',
  ],
  [
    '"description": "<p>Get $20 off when you spend $1,000 or more! <a href=\\"/collections/all\\" title=\\"All products\\">Shop now</a></p>"',
    '"description": "<p>Знижка 20 $ при замовленні від 1 000 $! <a href=\\"/collections/all\\" title=\\"Усі товари\\">Купити зараз</a></p>"',
  ],
  ['"block_heading": "Perfect Match With"', '"block_heading": "Ідеально поєднується з"'],
  ['"heading": "Specifications"', '"heading": "Характеристики"'],
  ['"heading": "Product Details"', '"heading": "Деталі товару"'],
  ['"heading": "Materials & Care"', '"heading": "Матеріали та догляд"'],
  ['"heading": "Payment & Security"', '"heading": "Оплата та безпека"'],
  [
    '"description": "<p>Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.</p>"',
    '"description": "<p>Ваші платіжні дані обробляються безпечно. Ми не зберігаємо дані банківських карток і не маємо до них доступу.</p>"',
  ],
  ['"heading": "Clients Love Us"', '"heading": "Клієнти нам довіряють"'],
  ['"bio": "Verified Buyer"', '"bio": "Підтверджений покупець"'],
  ['"heading": "Testimonials"', '"heading": "Відгуки"'],
  ['"navigation_title": "Specifications"', '"navigation_title": "Характеристики"'],
  ['"navigation_title": "About Brand"', '"navigation_title": "Про бренд"'],
  ['"navigation_title": "Shipping & Return"', '"navigation_title": "Доставка та повернення"'],
  ['"heading": "Take A Closer Look"', '"heading": "Подивіться детальніше"'],
  ['"title": "Make it yours"', '"title": "Зробіть на свій смак"'],
  ['"title": "Climate footprint"', '"title": "Екологічний слід"'],
  ['"title": "Sustainability"', '"title": "Сталість"'],
  ['"title": "All eco-certified"', '"title": "Еко-сертифіковано"'],
  ['"heading": "Timeless Design"', '"heading": "Безчасний дизайн"'],
  ['"heading": "About Garage"', '"heading": "Про Світ Паркету"'],
  ['"heading": "Popular Search"', '"heading": "Популярний пошук"'],
  ['"heading": "Scrolling promotion"', '"heading": "Бігуча стрічка"'],
  ['"text": "Fast Delivery"', '"text": "Швидка доставка"'],
  ['"text": "30 Days Free Returns"', '"text": "30 днів безкоштовного повернення"'],
  ['"text": "Secure Payment"', '"text": "Безпечна оплата"'],
  ['"text": "24/7 Customer Support"', '"text": "Підтримка 24/7"'],
  ['"text": "Sustainable Materials"', '"text": "Екологічні матеріали"'],
  ['"button_label": "Living Room"', '"button_label": "Вітальня"'],
  ['"button_label": "Planters"', '"button_label": "Кашпо"'],
  ['"button_label": "Gravel Rug"', '"button_label": "Килим Gravel"'],
  ['"button_label": "Table Mirror"', '"button_label": "Дзеркало"'],
  ['"button_label": "Table Wears"', '"button_label": "Столовий посуд"'],
  ['"button_label": "Dining Decor"', '"button_label": "Декор для їдальні"'],
  ['"button_label": "Ray Table Lamp"', '"button_label": "Настільна лампа Ray"'],
  ['"button_label": "Chairs"', '"button_label": "Стільці"'],
  ['"heading": "Image card"', '"heading": "Зображення"'],
  ['"button_label": "Button label"', '"button_label": "Дізнатися більше"'],
  [
    '"description": "<p>Combine images with text and a stand-out offer</p>"',
    '"description": "<p>Поєднайте зображення з текстом та вигідною пропозицією</p>"',
  ],
  ['"size_title": "Size"', '"size_title": "Розмір"'],
  [
    '"content": "<p>Designed with care and crafted from premium materials, our products combine durability, comfort, and timeless style. Each piece is thoughtfully made to enhance your living space, offering a perfect balance of functionality and elegance that complements any home and suits your unique lifestyle.</p>"',
    '"content": "<p>Якісні матеріали, стійкість до навантажень і сучасний вигляд — наша підлога створена для комфорту щодня. Підходить для житлових і комерційних приміщень, легко поєднується з різними стилями інтер’єру.</p>"',
  ],
  [
    '"content": "<p>Carefully crafted from durable, sustainable materials, each piece is designed for long-lasting use and timeless style. For proper care, wipe gently with a soft, damp cloth to remove dust and dirt. Avoid using harsh chemicals, abrasive cleaners, or excessive moisture to protect the finish and maintain its pristine look.</p>"',
    '"content": "<p>Для догляду використовуйте м’яку вологу ганчірку без агресивних засобів. Не залишайте стоячу воду та уникайте абразивів — так покриття довше зберігатиме вигляд і властивості.</p>"',
  ],
  [
    '"heading": "Inspired to create a chair where the back and arms are moulded from a single piece of plywood"',
    '"heading": "Детальна інформація про покриття та монтаж"',
  ],
  [
    '"description": "<p>Inspired to create a chair where the back and arms are moulded from a single piece of plywood, Hecht and Colin describe employing a process similar to that a tailor might use to cut a pattern in fabric. This approach resulted in the beautiful structure wherein the moulded back and arms component is supported by a simple A-frame wood dowel construction. One of the benefits of this design is an increase in comfort due to natural movement in the plywood back.</p>"',
    '"description": "<p>У розділі зібрано технічні характеристики, рекомендації щодо підготовки основи та монтажу. Дотримуйтесь інструкції виробника — це гарантує стабільний результат і збереження гарантії.</p>"',
  ],
  [
    '"heading": "Danish Design With Global Outlook"',
    '"heading": "Якість та сервіс Світ Паркету"',
  ],
  [
    '"description": "<p>The good design concepts at the heart of Danish design are functionality, beauty and the needs of the many. This is a strong tradition. And when a tradition is strong enough, it leaves room for innovation that allows us to always move forward.</p>"',
    '"description": "<p>Ми працюємо з перевіреними брендами підлогових покриттів, допомагаємо з підбором, розрахунком кількості та консультацією щодо укладання.</p>"',
  ],
  ['"button_label": "Shop More Products"', '"button_label": "Переглянути каталог"'],
  [
    '"text": "<p>Personalize your furniture to match your unique style, with customizable options for colors, finishes, materials, and fabrics.</p>"',
    '"text": "<p>Широкий вибір декорів, фактур і форматів панелей — підберіть рішення під ваш інтер’єр.</p>"',
  ],
  [
    '"text": "<p>Discover the eco-impact with insights into our materials, production processes, and commitment to sustainable practices.</p>"',
    '"text": "<p>Екологічні сертифікати та відповідальне виробництво — важливі критерії при виборі покриття.</p>"',
  ],
  [
    '"text": "<p>Learn how our furniture supports a greener future through responsible sourcing and eco-friendly manufacturing practices.</p>"',
    '"text": "<p>Ми пропонуємо рішення зі сталих матеріалів для дому та бізнесу.</p>"',
  ],
  [
    '"text": "<p>Rest assured knowing every piece is crafted with care, meeting rigorous eco-certification standards for sustainability.</p>"',
    '"text": "<p>Уся продукція відповідає вимогам безпеки та якості для житлового використання.</p>"',
  ],
  [
    '"description": "<p>Blending comfort and style, perfect for elevating any living space.</p>"',
    '"description": "<p>Надійне покриття для комфорту щодня.</p>"',
  ],
  ['"heading": "Get Inspired by Spaces"', '"heading": "Натхнення для вашого простору"'],
  ['"title": "Secure Payment"', '"title": "Безпечна оплата"'],
  ['"button_label": "More About Payment"', '"button_label": "Детальніше про оплату"'],
  [
    '"text": "<p>“I am extremely happy about both design and comfort. I am a furniture designer myself, and your product makes me happy.”</p>"',
    '"text": "<p>«Дуже задоволений якістю та зовнішнім виглядом. Рекомендую!»</p>"',
  ],
  [
    '"text": "<p>The story behind, sustainable production, and the risk-free feeling with the free return policy make this a great choice.</p>"',
    '"text": "<p>Якісне покриття, відповідальне виробництво та зручна політика повернення — чудовий вибір.</p>"',
  ],
  [
    '"text": "<p>“High-quality furniture, crafted with passion and care, fantastic in appearance and use, reasonably priced, and excellent custome.”</p>"',
    '"text": "<p>«Відмінна підлога за адекватною ціною. Монтаж пройшов без проблем, сервіс на висоті.»</p>"',
  ],
  [
    '"text": "<p>The craftsmanship, eco-friendly materials, and excellent customer service truly make this product an outstanding standout.</p>"',
    '"text": "<p>Якісні матеріали, еко-підхід і уважний сервіс — саме те, що потрібно для дому.</p>"',
  ],
  [
    '"description": "<p>Sustainably sourced for a soft, breathable, and eco-friendly lounging experience.</p>"',
    '"description": "<p>Екологічні матеріали та комфорт у щоденному використанні.</p>"',
  ],
  [
    '"description": "<p>Premium materials and expert craftsmanship ensure durability and long-lasting support.</p>"',
    '"description": "<p>Міцність і довговічність завдяки якісним матеріалам.</p>"',
  ],
  [
    '"heading": "Inspired to create a chair where the back"',
    '"heading": "Професійний підбір покриття"',
  ],
  [
    '"text": "<p>Made entirely of oak, the Bow Chair is comfortable, visually pleasing and brimming with character.  The moulded plywood seat is unusually wide in proportion to its depth and a waterfall edge at the front softens contact with the hamstrings. </p>"',
    '"text": "<p>Допоможемо обрати покриття під ваш стиль, навантаження та бюджет.</p>"',
  ],
  [
    '"text": "<p>All orders over $500 are delivered to your doorstep at no extra charge.</p>"',
    '"text": "<p>Безкоштовна доставка для замовлень від 500 $.</p>"',
  ],
  [
    '"text": "<p>Enjoy the freedom of stress-free shopping with our hassle-free and return policy.</p>"',
    '"text": "<p>Зручне повернення протягом 30 днів — купуйте без зайвих ризиків.</p>"',
  ],
  [
    '"text": "<p>Shop with confidence knowing your payments are secure and your information</p>"',
    '"text": "<p>Оплата захищена — ваші дані в безпеці.</p>"',
  ],
  ['"heading": "furniturelover"', '"heading": "svitparketu"'],
];

function walk(dir, fn) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, fn);
    else if (ent.name.endsWith('.json')) fn(p);
  }
}

let count = 0;
walk(templatesDir, (file) => {
  let s = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [from, to] of REPLACEMENTS) {
    if (s.includes(from)) {
      s = s.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, s, 'utf8');
    count++;
    console.log('Updated', path.relative(root, file));
  }
});

// settings_data.json — порожній кошик
const settingsPath = path.join(root, 'config/settings_data.json');
if (fs.existsSync(settingsPath)) {
  let s = fs.readFileSync(settingsPath, 'utf8');
  const from =
    '<p>Not sure where to start? Try these collections:</p>';
  const to =
    '<p>Не знаєте, з чого почати? Перегляньте ці колекції:</p>';
  if (s.includes(from)) {
    s = s.split(from).join(to);
    fs.writeFileSync(settingsPath, s, 'utf8');
    console.log('Updated config/settings_data.json');
  }
}

console.log('Done. Template files updated:', count);

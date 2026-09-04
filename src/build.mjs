/* Генератор сайта: контент из data.js → готовые HTML-страницы в корне. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE, ABOUT, ADVANTAGES, SERVICES, TERMS, OBJECTS, SPACES, USE_NAMES,
  SPACE_SAMPLE, SALE, NEWS, ARTICLES, FAQ, USE_FILTERS
} from './data.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '..');

const NAV = [
  ['objects.html', 'Площадки'],
  ['spaces.html', 'Площади'],
  ['sale.html', 'Продажа'],
  ['tenants.html', 'Арендаторам'],
  ['about.html', 'О сети'],
  ['contacts.html', 'Контакты']
];

const ICONS = {
  shield: '<path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.4 7.5 9.5 4.4-1.1 7.5-5.1 7.5-9.5V6L12 3Z"/>',
  route: '<circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/><path d="M9 6.5h5a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h5"/>',
  cup: '<path d="M5 8h11v6a5.5 5.5 0 0 1-11 0V8Z"/><path d="M16 9.5h1.8a2.2 2.2 0 1 1 0 4.4H16"/><path d="M4 21h13"/>',
  car: '<path d="M4 16v2.5M20 16v2.5M3.5 16h17v-3l-1.6-4.2A2 2 0 0 0 17 7.5H7A2 2 0 0 0 5.1 8.8L3.5 13v3Z"/><circle cx="7.5" cy="13.5" r="0.6"/><circle cx="16.5" cy="13.5" r="0.6"/>',
  doc: '<path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3Z"/><path d="M13.8 3.2V8h4.6M9 12.5h6M9 16h4"/>',
  percent: '<circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/><path d="M18 6 6 18"/>',
  pin: '<path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  phone: '<path d="M6.2 4h3l1.5 3.8-2 1.4a11 11 0 0 0 5.1 5.1l1.4-2L19 13.8v3a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 4.2 6.2 2 2 0 0 1 6.2 4Z"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.6"/><path d="m4 7 8 5.5L20 7"/>',
  lift: '<rect x="4.5" y="3.5" width="15" height="17" rx="1.5"/><path d="M12 3.5v17M8.2 9l-1.4 2h2.8L8.2 9Zm0 6 1.4-2H6.8l1.4 2Z"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>'
};
const ic = (n, s = 22) =>
  `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[n] || ''}</svg>`;

/* фото-заглушка: не «уродская фотка», а спокойный фирменный слот с подписью */
const ph = (caption, style = '', cls = '') =>
  `<div class="imgph ${cls}" style="${style}"><i></i><span>${caption}</span></div>`;

const fmt = (n) => n.toFixed(2).replace('.', ',');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function header(active) {
  const nav = NAV.map(([h, t]) => `<a href="${h}"${h === active ? ' class="on"' : ''}>${t}</a>`).join('');
  const mob = NAV.map(([h, t]) => `<a href="${h}" style="padding:13px 0;border-bottom:1px solid var(--line2)">${t}</a>`).join('');
  return `
<div class="topbar"><div class="wrap topbar-in">
  <span>Санкт-Петербург, Выборгский и Калининский районы · ${SITE.hours}</span>
  <span>Отдел аренды <a class="mono" href="tel:${SITE.rentHref}">${SITE.rent}</a></span>
</div></div>
<header class="hdr"><div class="wrap hdr-in">
  <a class="logo" href="index.html"><img src="assets/logo.svg" alt="БАСТИОН — сеть бизнес-центров" width="152" height="97"></a>
  <nav class="nav">${nav}</nav>
  <div style="display:flex;align-items:center;gap:18px">
    <a class="mono hdr-cta" href="tel:${SITE.phoneHref}" style="font-size:18px;font-weight:600;color:var(--brand-dk);white-space:nowrap">${SITE.phone}</a>
    <a class="btn btn-g auto hdr-cta" href="spaces.html">Подобрать</a>
    <button class="burger" data-burger aria-label="Меню"><i></i><i></i><i></i></button>
  </div>
</div>
<div class="wrap hide" data-mobnav style="padding-bottom:18px"><div class="col" style="gap:0">${mob}
  <a href="sitemap.html" style="padding:13px 0">Карта сайта</a></div></div>
</header>`;
}

function footer() {
  const objs = OBJECTS.map(o => `<a href="${o.slug}.html">${o.short}</a>`).join('<br>');
  return `
<footer class="ftr"><div class="wrap">
  <div class="ftr-cols">
    <div class="ftr-brand">
      <img src="assets/logo-gold.svg" alt="БАСТИОН" width="164" height="105">
      <p style="margin-top:18px">Сеть офисно-производственных комплексов класса C+ в Санкт-Петербурге.</p>
      <p><a href="${SITE.presentation}" target="_blank" rel="noopener">Скачать презентацию сети (PDF)</a></p>
    </div>
    <div class="ftr-col"><div class="cap" style="margin-bottom:14px">Площадки</div><div class="ftr-list">${objs}</div></div>
    <div class="ftr-col"><div class="cap" style="margin-bottom:14px">Аренда</div><div class="ftr-list">
      <a href="spaces.html">Свободные площади</a><br><a href="about.html#usloviya">Условия аренды</a><br>
      <a href="tenants.html">Документы</a><br><a href="sale.html">Продажа объектов</a></div></div>
    <div class="ftr-col"><div class="cap" style="margin-bottom:14px">Арендаторам</div><div class="ftr-list">
      <a href="tenants.html">Бланки и документы</a><br><a href="tenants.html#propuska">Пропуска</a><br>
      <a href="tenants.html#zayavka-inzheneru">Заявка инженеру</a><br><a href="tenants.html#grafik">График работы</a></div></div>
    <div class="ftr-col"><div class="cap" style="margin-bottom:14px">Контакты</div><div class="ftr-list mono">
      <a href="tel:${SITE.phoneHref}">${SITE.phone}</a><br><a href="tel:${SITE.rentHref}">${SITE.rent}</a><br>
      <a href="mailto:${SITE.email}">${SITE.email}</a></div>
      <div class="ftr-list" style="margin-top:10px">${SITE.addr}</div></div>
  </div>
  <div class="ftr-btm">
    <div>© 2026 БАСТИОН · сеть бизнес-центров</div>
    <div><a href="privacy.html">Политика обработки персональных данных</a> · <a href="sitemap.html">Карта сайта</a></div>
  </div>
</div></footer>`;
}

function page({ file, title, desc, active, crumbs = '', body, sticky }) {
  const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="assets/favicon.ico">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/logo.svg">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bitter:wght@500;600;700&family=Golos+Text:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="assets/bastion.css">
</head>
<body>
${header(active)}
${crumbs ? `<div class="wrap crumbs">${crumbs}</div>` : ''}
${body}
${footer()}
${sticky || ''}
<script src="assets/app.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT, file), html, 'utf8');
  return file;
}

const stickyCta = (href = 'spaces.html', label = 'Подобрать помещение') => `
<div class="sticky-cta">
  <a class="btn btn-g" href="${href}" style="flex-grow:1">${label}</a>
  <a class="btn btn-s auto" href="tel:${SITE.rentHref}" style="width:56px;padding:0" aria-label="Позвонить">${ic('phone', 20)}</a>
</div>`;

/* ---------- переиспользуемые блоки ---------- */

const leadForm = (key, title, note) => `
<form data-form="${key}">
  <div class="h3">${title}</div>
  <div class="cap" style="margin:22px 0 8px">Что нужно</div>
  <div style="display:flex;gap:8px;flex-wrap:wrap" data-chipgroup>
    <button type="button" class="chip chip-sm on">Офис</button>
    <button type="button" class="chip chip-sm">Склад</button>
    <button type="button" class="chip chip-sm">Производство</button>
    <button type="button" class="chip chip-sm">Торговое</button>
  </div>
  <div class="row" style="margin-top:16px">
    <div class="grow"><div class="cap" style="margin-bottom:6px">Площадь, м²</div><input class="fld" placeholder="от — до"></div>
    <div class="grow"><div class="cap" style="margin-bottom:6px">Когда заезжать</div><input class="fld" placeholder="в этом месяце"></div>
  </div>
  <div style="margin-top:12px"><div class="cap" style="margin-bottom:6px">Телефон</div><input class="fld" type="tel" required placeholder="+7 ___ ___-__-__"></div>
  <div style="margin-top:12px"><div class="cap" style="margin-bottom:6px">Имя</div><input class="fld" placeholder="Как к вам обращаться"></div>
  <button class="btn btn-p btn-lg btn-block" style="margin-top:22px" type="submit">Отправить заявку</button>
  <p class="small" style="margin-top:12px;font-size:13px">${note}</p>
</form>
<div class="hide" data-form-done="${key}" style="text-align:center;padding:44px 0">
  <div class="h3">Заявка отправлена</div>
  <p class="small" style="margin-top:12px">Менеджер отдела аренды перезвонит на указанный номер.</p>
  <button class="btn btn-s auto" style="margin-top:24px" data-form-reset>Отправить ещё одну</button>
</div>`;

const ctaBlock = (h, p) => `
<section class="sec-tight sec-cream">
  <div class="wrap" style="display:flex;align-items:center;justify-content:space-between;gap:48px;flex-wrap:wrap">
    <div style="max-width:56ch"><hr class="rule-gold"><h2 class="h2">${h}</h2><p class="lead" style="margin-top:14px">${p}</p></div>
    <div style="flex-shrink:0">
      <div class="cap">Отдел аренды</div>
      <a class="mono" href="tel:${SITE.rentHref}" style="font-family:var(--disp);font-size:32px;color:var(--brand);display:block;margin:8px 0 18px">${SITE.rent}</a>
      <div class="row"><a class="btn btn-p auto" href="index.html#zayavka">Оставить заявку</a>
      <a class="btn btn-s auto" href="contacts.html">Все контакты</a></div>
    </div>
  </div>
</section>`;

/* ---------- Главная ---------- */

function buildIndex() {
  const useCount = (u) => SPACES.filter(s => s.u === u).length;
  const chips = USE_FILTERS.map(f =>
    { const c = f.id === 'all' ? SPACES.length : useCount(f.id);
      return `<button class="chip${f.id === 'all' ? ' on' : ''}${c === 0 ? ' is-off' : ''}" data-use="${f.id}">${f.label} <span class="n">${c}</span></button>`; }).join('');

  const cards = OBJECTS.map(o => `
    <a class="card" href="${o.slug}.html" data-sitecard="${o.id}" style="display:block">
      ${ph(o.short, 'height:230px;border:none;border-bottom:1px solid var(--line)')}
      <div class="pad">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px">
          <div><div class="h3">${o.name}</div><div class="cap" style="margin-top:8px">${o.district}</div></div>
          <span class="badge badge-free" style="flex-shrink:0">${SPACES.filter(s => s.s === o.id).length} свободно</span>
        </div>
        <p class="small" style="margin-top:14px">${o.lead}</p>
        <div class="figs" style="margin-top:22px;padding-top:22px;border-top:1px solid var(--line2)">
          ${o.figures.slice(0, 4).map(([n, l]) => `<div class="fig"><div class="n">${n}</div><div class="l">${l}</div></div>`).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:22px">
          <span class="small">${o.transport[0][0]} — ${o.transport[0][1]}</span>
          <span class="cap gold" style="white-space:nowrap">Смотреть →</span>
        </div>
      </div>
    </a>`).join('');

  const services = SERVICES.map(s => `
    <a class="card pad" href="spaces.html" style="display:block">
      <div class="h4">${s.t}</div>
      <p class="small" style="margin-top:10px">${s.d}</p>
      <div class="cap gold" style="margin-top:16px">Смотреть предложения →</div>
    </a>`).join('');

  const advs = ADVANTAGES.map(a => `
    <div class="adv"><div class="adv-i">${ic(a.icon)}</div>
      <div><div class="h4">${a.t}</div><p class="small" style="margin-top:6px">${a.d}</p></div></div>`).join('');

  const terms = TERMS.map(t => `
    <div class="card pad"><div class="stat-n">${t.n}</div>
      <div class="h4" style="margin-top:14px">${t.t}</div>
      <p class="small" style="margin-top:8px">${t.d}</p></div>`).join('');

  const sale = SALE.slice().sort((a, b) => parseFloat(a.area) - parseFloat(b.area)).map(o => `
    <a class="card" href="sale-${o.slug}.html" style="display:block">
      ${ph(o.addr, 'height:150px;border:none;border-bottom:1px solid var(--line)', 'sm')}
      <div style="padding:20px">
        <div class="mono" style="font-size:21px;font-weight:600;color:var(--brand)">${o.area} м²</div>
        <div class="small" style="margin-top:6px">${o.name}</div>
        <div class="mono" style="font-size:16px;font-weight:600;margin-top:14px">${o.price} ₽</div>
        <div class="small" style="margin-top:6px">Окупаемость ${o.payback}</div>
      </div>
    </a>`).join('');

  const news = NEWS.slice(0, 3).map(n => `
    <a class="card pad" href="news.html" style="display:block">
      <div class="cap">${n.d}</div>
      <div class="h4" style="margin-top:10px">${n.t}</div>
      <p class="small" style="margin-top:10px">${n.x.slice(0, 130)}…</p>
    </a>`).join('');

  const faq = FAQ.map((f, i) => `
    <div class="acc${i === 0 ? ' on' : ''}">
      <button class="acc-q"><span class="h4">${f[0]}</span><span class="acc-sign">+</span></button>
      <div class="acc-a">${f[1]}</div>
    </div>`).join('');

  const body = `
<section class="wrap sec" style="padding-bottom:56px">
  <div class="split">
    <div class="grow" style="grid-column:span 7">
      <div class="cap">Сеть бизнес-центров · Санкт-Петербург</div>
      <h1 class="d1" style="margin-top:14px">Производство, склад<br>и офис на одной территории</h1>
      <p class="lead" style="margin-top:20px;max-width:54ch">Сдаём офисы, склады, производственные и торговые помещения на четырёх площадках в Выборгском и Калининском районах. Корпуса сообщаются цельными этажами: цех, склад и отдел продаж стоят рядом.</p>
      <div class="figs" style="margin-top:34px;padding-top:26px;border-top:1px solid var(--line)">
        <div class="fig"><div class="n" style="font-size:24px">10—200</div><div class="l">м² офисы</div></div>
        <div class="fig"><div class="n" style="font-size:24px">40—500</div><div class="l">м² склад, произв.</div></div>
        <div class="fig"><div class="n" style="font-size:24px">55 800</div><div class="l">м² в сети</div></div>
        <div class="fig"><div class="n" style="font-size:24px">${SPACES.length}</div><div class="l">свободно</div></div>
      </div>
      <div class="row" style="margin-top:30px">
        <a class="btn btn-p btn-lg" href="spaces.html">Свободные площади</a>
        <a class="btn btn-s btn-lg" href="#zayavka">Записаться на просмотр</a>
      </div>
    </div>
    <div class="side" style="grid-column:span 5">
      <div class="map" data-map style="height:330px">
        <div class="map-kad"></div>
        <div class="map-road" style="left:-10%;top:33%;width:120%;height:1px;transform:rotate(-4deg)"></div>
        <div class="map-road" style="left:-10%;top:66%;width:120%;height:1px;transform:rotate(3deg)"></div>
        <div class="map-road" style="left:38%;top:-10%;width:1px;height:120%;transform:rotate(9deg)"></div>
        <div class="map-neva"></div>
        <div class="cap" style="position:absolute;left:6%;bottom:6%">Нева</div>
        <div class="cap" style="position:absolute;right:7%;top:8%">КАД</div>
      </div>
      <div class="card" style="margin-top:16px" data-map-card></div>
    </div>
  </div>
</section>

<section class="wrap sec">
  <div style="border:1px solid var(--line);border-top:3px solid var(--gold);border-radius:0 0 var(--r3) var(--r3);padding:30px 34px;background:var(--bg2)">
    <div class="sechead" style="margin-bottom:20px">
      <h2 class="h3">Подобрать помещение</h2>
      <span class="cap">Каталог обновлён ${SITE.updated}</span>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px" data-homechips>${chips}</div>
    <div class="row">
      <input class="fld" placeholder="Площадь, м² — от 10 до 200">
      <input class="fld" placeholder="Площадка — любая">
      <input class="fld" placeholder="Этаж — любой">
      <a class="btn btn-p auto" href="spaces.html" style="min-width:210px">Показать <span data-homecount>${SPACES.length}</span></a>
    </div>
  </div>
</section>

<section class="wrap sec">
  <div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Что сдаём</h2></div></div>
  <div class="g4">${services}</div>
</section>

<section class="wrap sec">
  <div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Четыре площадки</h2></div>
    <a class="cap gold" href="objects.html">Все площадки →</a></div>
  <div class="g2">${cards}</div>
</section>

<section class="sec sec-cream">
  <div class="wrap split">
    <div class="side">
      <hr class="rule-gold">
      <h2 class="h2">Полный цикл<br>на одной территории</h2>
      <p class="lead" style="margin-top:20px">Так устроены все четыре комплекса. Корпуса сообщаются цельными этажами, поэтому производство, склад, продажи и отгрузка живут в одном контуре. Обычный бизнес-центр так не умеет.</p>
      <a class="btn btn-s auto" style="margin-top:28px" href="about.html">О сети подробнее</a>
    </div>
    <div class="grow g4">
      ${[['Производство', '40—500 м²', 'Отдельные корпуса, свободные мощности'],
         ['Склад', '40—500 м²', 'Грузовой лифт, разгрузка во дворе'],
         ['Офис', '10—200 м²', 'Этажом выше, кабинет или опенспейс'],
         ['Отгрузка', 'Охраняемый двор', 'Въезд для фуры, охрана 24 часа']]
        .map(([t, n, d], i) => `<div class="card" style="background:#fff">
          <div class="pad" style="display:flex;flex-direction:column">
            <div class="cap">Этап ${i + 1}</div>
            <div class="h4" style="margin-top:12px">${t}</div>
            <div class="mono" style="font-size:16px;font-weight:600;color:var(--brand);margin-top:12px">${n}</div>
            <p class="small" style="margin:10px 0 0">${d}</p>
          </div></div>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sechead">
      <div><hr class="rule-gold"><h2 class="h2">Свободно сейчас</h2></div>
      <div style="display:flex;align-items:baseline;gap:26px">
        <span class="cap"><span data-homecount>${SPACES.length}</span> из ${SPACES.length} · обновлено ${SITE.updated}</span>
        <a class="cap gold" href="spaces.html">Весь каталог →</a>
      </div>
    </div>
    <table class="tbl"><thead><tr>
      <th>Площадка</th><th>Помещение</th><th class="r">Площадь</th><th class="r">Этаж</th>
      <th>Назначение</th><th>Статус</th><th></th>
    </tr></thead><tbody data-hometable></tbody></table>
  </div>
</section>

<section class="wrap sec">
  <div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Что есть на площадках</h2></div></div>
  <div class="g3">${advs}</div>
</section>

<section class="sec sec-cream" id="usloviya">
  <div class="wrap">
    <div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Условия аренды</h2></div>
      <a class="cap gold" href="tenants.html">Документы и бланки →</a></div>
    <div class="g4">${terms}</div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Продажа объектов</h2>
      <p class="lead" style="margin-top:14px;max-width:60ch">Пять объектов от собственника. Все сданы в аренду, платят федеральные сети: FixPrice, «Много Лосося», «Важная Рыба».</p></div>
      <a class="cap gold" href="sale.html">Все объекты →</a></div>
    <div class="g3">${sale}</div>
  </div>
</section>

<section class="wrap sec">
  <div class="split">
    <div class="side">
      <hr class="rule-gold">
      <h2 class="h2">Вопросы</h2>
      <p class="lead" style="margin-top:16px">Не нашли свой вопрос? Позвоните в отдел аренды. Отвечаем в тот же день.</p>
      <a class="mono" href="tel:${SITE.rentHref}" style="font-family:var(--disp);font-size:26px;color:var(--brand);display:inline-block;margin-top:20px">${SITE.rent}</a>
    </div>
    <div class="grow" data-acc>${faq}</div>
  </div>
</section>

<section class="sec sec-cream">
  <div class="wrap">
    <div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Новости</h2></div>
      <a class="cap gold" href="news.html">Все новости →</a></div>
    <div class="g3">${news}</div>
  </div>
</section>

<section class="sec" id="zayavka" style="border-top:1px solid var(--line)">
  <div class="wrap split">
    <div class="grow">
      <hr class="rule-gold">
      <h2 class="h2">Приезжайте посмотреть</h2>
      <p class="lead" style="margin-top:18px;max-width:48ch">Назовите площадь и назначение. Покажем всё подходящее за один визит, на любой площадке сети.</p>
      <div class="stats" style="margin-top:40px">
        <div><div class="cap">Отдел аренды</div><a class="mono" href="tel:${SITE.rentHref}" style="font-family:var(--disp);font-size:26px;color:var(--brand);display:block;margin-top:8px">${SITE.rent}</a></div>
        <div><div class="cap">Общий телефон</div><a class="mono" href="tel:${SITE.phoneHref}" style="font-family:var(--disp);font-size:26px;color:var(--brand);display:block;margin-top:8px">${SITE.phone}</a></div>
      </div>
      <div style="margin-top:26px"><div class="cap">Почта</div>
        <a class="mono" href="mailto:${SITE.email}" style="font-size:17px;color:var(--brand);display:block;margin-top:8px">${SITE.email}</a></div>
      <p class="small" style="margin-top:26px">${SITE.addr}<br>${SITE.hours}</p>
    </div>
    <div class="side" style="background:#fff;border:1px solid var(--line);border-radius:var(--r3);padding:32px">
      ${leadForm('home', 'Подобрать помещение', 'Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.')}
    </div>
  </div>
</section>`;

  return page({
    file: 'index.html', active: 'objects.html',
    title: 'БАСТИОН — сеть бизнес-центров в Санкт-Петербурге. Аренда офисов, складов, производства',
    desc: SITE.descr, body, sticky: stickyCta()
  });
}

/* ---------- Площадки: список ---------- */

function buildObjects() {
  const cards = OBJECTS.map(o => `
  <div class="card" style="margin-bottom:26px">
    <div class="split" style="gap:0;align-items:stretch">
      <div style="width:44%;flex-shrink:0">${ph(o.short, 'height:100%;min-height:300px;border:none;border-right:1px solid var(--line)')}</div>
      <div class="pad grow" style="padding:32px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:20px">
          <div><div class="cap">${o.district}</div><div class="h2" style="margin-top:8px">${o.name}</div>
            <p class="small" style="margin-top:8px">${o.addr}</p></div>
          <span class="badge badge-free" style="flex-shrink:0">${SPACES.filter(s => s.s === o.id).length} свободно</span>
        </div>
        <p style="margin-top:16px;max-width:60ch">${o.lead}</p>
        <div class="figs" style="margin-top:24px;padding-top:24px;border-top:1px solid var(--line2)">
          ${o.figures.slice(0, 4).map(([n, l]) => `<div class="fig"><div class="n">${n}</div><div class="l">${l}</div></div>`).join('')}
        </div>
        <div class="row" style="margin-top:26px">
          <a class="btn btn-p auto" href="${o.slug}.html">О площадке</a>
          <a class="btn btn-s auto" href="spaces.html">Свободные площади</a>
        </div>
      </div>
    </div>
  </div>`).join('');

  const body = `
<section class="wrap sec">
  <hr class="rule-gold"><h1 class="h1">Площадки сети</h1>
  <p class="lead prose" style="margin-top:16px">Четыре комплекса общей площадью 55 800 м² в Выборгском и Калининском районах. Везде есть офисы, склады и производство. На Карпинского — торговый комплекс с федеральными сетями.</p>
</section>
<section class="wrap sec">${cards}
  <div class="card pad" style="background:var(--bg2)">
    <div class="h3">Другие объекты</div>
    <p class="small" style="margin-top:10px;max-width:70ch">Кроме четырёх основных площадок сеть работает с отдельными объектами. Например, с офисно-производственным зданием на Электропультовцев, 7К. Они попадают в каталог свободных площадей и в раздел продажи.</p>
    <div class="row" style="margin-top:20px"><a class="btn btn-s auto" href="spaces.html">Каталог площадей</a><a class="btn btn-q auto" href="sale.html">Объекты на продажу</a></div>
  </div>
</section>
${ctaBlock('Покажем любую площадку', 'За один визит увидите всё свободное на объекте. Отдел аренды согласует время.')}`;

  return page({
    file: 'objects.html', active: 'objects.html', title: 'Площадки сети — БАСТИОН',
    desc: 'Четыре бизнес-центра сети «Бастион» в Санкт-Петербурге: Литовская 10, Менделеевский, Ручьи, Карпинского 38к1.',
    crumbs: '<a href="index.html">Главная</a> / Площадки', body, sticky: stickyCta()
  });
}

/* ---------- Страница площадки ---------- */

function buildObject(o) {
  const own = SPACES.filter(s => s.s === o.id);
  const thumbs = o.photos.map((p, i) =>
    `<button class="thumb imgph xs${i === 0 ? ' on' : ''}" data-name="${p}"><i></i></button>`).join('');
  const specs = o.specs.map(([k, v]) => `<div class="spec"><b>${k}</b><span class="mono" style="font-weight:600">${v}</span></div>`).join('');
  const bodyText = o.body.map(([h, t]) => `<h3 class="h3" style="margin-top:32px">${h}</h3><p style="margin-top:12px">${t}</p>`).join('');
  const transport = o.transport.map(([k, v]) => `<div style="padding:14px 0;border-bottom:1px solid var(--line2)"><div class="cap">${k}</div><p class="small" style="margin:6px 0 0">${v}</p></div>`).join('');
  const services = o.services.map(s => `<li>${s}</li>`).join('');
  const tenantServices = o.tenantServices.map(s => `<li>${s}</li>`).join('');
  const terms = o.terms.map((t, i) => `<div style="display:flex;gap:14px;padding:12px 0;border-bottom:1px solid var(--line2)"><span class="mono" style="color:var(--gold-dk);font-weight:600">${i + 1}</span><span class="small" style="color:var(--ink)">${t}</span></div>`).join('');
  const infra = o.infra ? `<div class="card pad" style="margin-top:24px"><div class="h4">Инфраструктура на территории</div><ul style="margin-top:16px">${o.infra.map(x => `<li>${x}</li>`).join('')}</ul></div>` : '';

  const docs = o.docs.length ? o.docs.map(g => `
    <div class="cap" style="margin-top:34px;margin-bottom:6px">${g.g}</div>
    ${g.items.map(([e, n]) => `<div class="doc"><span class="ext">${e}</span><span class="nm">${n}</span><span class="go">Скачать</span></div>`).join('')}`).join('')
    : `<p class="lead" style="margin-top:20px">Пакет документов по этому объекту передаёт отдел аренды при заключении договора.</p>`;

  const plans = o.plans.length ? `
    <div class="split" style="margin-top:28px;gap:32px">
      <div class="side-xs" data-floors>
        <div class="cap" style="margin-bottom:12px">Этаж</div>
        ${o.plans.map((p, i) => `<button class="opt${i === 0 ? ' on' : ''}" data-floor="${i}" data-floor-name="${p}"><span>${p}</span></button>`).join('')}
      </div>
      <div class="grow">
        ${ph('План этажа', 'height:520px;border-radius:var(--r3)')}
        <div class="row" style="margin-top:16px;align-items:center">
          <span class="small">Показан <span data-floor-label>${o.plans[0]}</span></span>
          <span class="grow"></span>
          <a class="btn btn-q btn-sm auto" href="#">Скачать план</a>
        </div>
      </div>
    </div>` : `<p class="lead" style="margin-top:20px">Поэтажные планы этого объекта предоставляет отдел аренды по запросу.</p>`;

  const contacts = o.contacts.map(c => `
    <div class="card pad" style="padding:24px">
      <div class="cap">${c.role}</div>
      <a class="mono" href="${c.href.startsWith('mailto') ? c.href : 'tel:' + c.href}" style="font-family:var(--disp);font-size:22px;color:var(--brand);display:block;margin-top:10px">${c.v}</a>
      <p class="small" style="margin-top:10px">${c.d}</p>
    </div>`).join('');

  const spacesRows = own.map(r => `
    <tr class="${r.hold ? 'hold' : ''}" onclick="location.href='space.html'">
      <td data-l="Код" class="mono" style="color:var(--ink3);font-size:13px">${r.id}</td>
      <td data-l="Помещение" style="font-weight:700">${r.t}</td>
      <td data-l="Площадь" class="r num">${fmt(r.a)}</td>
      <td data-l="Этаж" class="r mono">${r.f}</td>
      <td data-l="Назначение" style="color:var(--ink2)">${USE_NAMES[r.u]}</td>
      <td data-l="Статус"><span class="badge ${r.hold ? 'badge-hold' : 'badge-free'}">${r.hold ? 'бронь' : 'свободно'}</span></td>
      <td class="r"><span class="btn btn-s btn-sm auto">Смотреть</span></td>
    </tr>`).join('');

  const body = `
<section class="wrap sec">
  <div class="split">
    <div class="grow" data-gallery>
      ${ph(o.photos[0], 'height:460px;border-radius:var(--r3)')}
      <div class="thumbs" style="margin-top:12px">${thumbs}</div>
      <p class="small" style="margin-top:12px"><span data-gallery-label>${o.photos[0]}</span></p>
    </div>
    <div class="side">
      <div class="cap">${o.district}</div>
      <h1 class="h1" style="margin-top:10px">${o.name}</h1>
      <p class="lead" style="margin-top:12px">${o.addr}</p>
      <div class="statbox" style="margin-top:26px">
        ${o.figures.slice(0, 4).map(([n, l]) => `<div class="fig"><div class="n">${n}</div><div class="l">${l}</div></div>`).join('')}
      </div>
      <div style="background:var(--bg2);border-top:3px solid var(--gold);border-radius:0 0 var(--r2) var(--r2);padding:22px;margin-top:18px">
        <div class="cap">Ставка аренды</div>
        <p style="margin:10px 0 0;font-size:17px">Назовём на звонке — зависит от площади, этажа и назначения. В ставку включено отопление.</p>
      </div>
      <div class="col" style="margin-top:22px">
        <a class="btn btn-p btn-lg btn-block" href="#zayavka">Записаться на просмотр</a>
        <div class="row">
          <a class="btn btn-s grow" href="spaces.html">${own.length} свободных площадей</a>
          <a class="btn btn-q grow" href="${SITE.presentation}" target="_blank" rel="noopener">Презентация</a>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:14px;margin-top:24px;padding-top:24px;border-top:1px solid var(--line)">
        <div class="adv-i" style="width:48px;height:48px">${ic('phone', 22)}</div>
        <div class="grow"><div class="cap">Отдел аренды</div>
          <a class="mono" href="tel:${SITE.rentHref}" style="font-family:var(--disp);font-size:21px;color:var(--brand)">${SITE.rent}</a></div>
      </div>
    </div>
  </div>
</section>

<div class="wrap"><div class="tabs" data-tabs="p">
  <button class="tab on" data-tab="about">О площадке</button>
  <button class="tab" data-tab="spaces">Свободные площади<span class="n">${own.length}</span></button>
  <button class="tab" data-tab="plans">Поэтажные планы${o.plans.length ? `<span class="n">${o.plans.length}</span>` : ''}</button>
  <button class="tab" data-tab="docs">Документы${o.docs.length ? `<span class="n">${o.docs.reduce((a, g) => a + g.items.length, 0)}</span>` : ''}</button>
  <button class="tab" data-tab="contacts">Контакты</button>
</div></div>

<section class="wrap sec split">
  <div class="grow prose">
    <hr class="rule-gold"><h2 class="h2">${o.lead}</h2>
    ${bodyText}
    <h3 class="h3" style="margin-top:36px">Технические характеристики</h3>
    <div style="margin-top:14px">${specs}</div>
    <h3 class="h3" style="margin-top:36px">Условия аренды</h3>
    <div style="margin-top:12px">${terms}</div>
  </div>
  <aside class="side">
    <div class="card pad"><div class="h4">Как добраться</div><div style="margin-top:8px">${transport}</div>
      ${ph('Карта проезда', 'height:180px;border-radius:var(--r2);margin-top:18px', 'sm')}</div>
    <div class="card pad" style="margin-top:24px"><div class="h4">Дополнительные услуги</div><ul style="margin-top:16px">${services}</ul></div>
    <div class="card pad" style="margin-top:24px"><div class="h4">К услугам арендаторов</div><ul style="margin-top:16px">${tenantServices}</ul></div>
    ${infra}
  </aside>
</section>

<section class="wrap sec hide" data-panel="spaces" data-scope="p" >
  <div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Свободные площади</h2>
    <p class="small" style="margin-top:8px">Обновлено ${SITE.updated}</p></div>
    <a class="cap gold" href="spaces.html">Весь каталог сети →</a></div>
  <table class="tbl"><thead><tr>
    <th>Код</th><th>Помещение</th><th class="r">Площадь</th><th class="r">Этаж</th><th>Назначение</th><th>Статус</th><th class="r">Действие</th>
  </tr></thead><tbody>${spacesRows}</tbody></table>
</section>

<section class="wrap sec hide" data-panel="plans" data-scope="p" >
  <hr class="rule-gold"><h2 class="h2">Поэтажные планы</h2>${plans}
</section>

<section class="wrap sec hide" data-panel="docs" data-scope="p" >
  <div class="split">
    <div class="grow prose"><hr class="rule-gold"><h2 class="h2">Документы</h2>${docs}</div>
    <aside class="side">
      <div style="background:var(--bg2);border-radius:var(--r3);padding:28px">
        <div class="h4">Как проходит заезд</div>
        <div class="col" style="margin-top:20px;gap:18px">
          ${['Смотрим помещение', 'Согласуем условия: площадь, срок, каникулы', 'Подписываем договор на 11 месяцев', 'Оформляем пропуска по списку сотрудников', 'Принимаем помещение по акту и заезжаем']
            .map((s, i) => `<div style="display:flex;gap:14px"><span class="mono" style="font-weight:600;color:var(--gold-dk)">0${i + 1}</span><span>${s}</span></div>`).join('')}
        </div>
      </div>
    </aside>
  </div>
</section>

<section class="wrap sec hide" data-panel="contacts" data-scope="p" >
  <hr class="rule-gold"><h2 class="h2">Контакты площадки</h2>
  <div class="g3" style="margin-top:28px">${contacts}</div>
  <div class="row" style="margin-top:28px;flex-wrap:wrap">
    <div class="small"><b style="color:var(--brand)">График работы:</b> ${o.hours}</div>
    <div class="small"><b style="color:var(--brand)">Адрес:</b> ${o.zip}, ${o.addr}</div>
  </div>
</section>

<section class="sec" id="zayavka" style="border-top:1px solid var(--line)">
  <div class="wrap split">
    <div class="grow"><hr class="rule-gold"><h2 class="h2">Посмотреть помещение<br>на площадке «${o.short}»</h2>
      <p class="lead" style="margin-top:18px;max-width:46ch">Покажем всё свободное за один визит и ответим на вопросы по условиям.</p>
      <a class="mono" href="tel:${SITE.rentHref}" style="font-family:var(--disp);font-size:30px;color:var(--brand);display:block;margin-top:28px">${SITE.rent}</a>
    </div>
    <div class="side" style="background:#fff;border:1px solid var(--line);border-radius:var(--r3);padding:32px">
      ${leadForm('obj-' + o.id, 'Записаться на просмотр', 'Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.')}
    </div>
  </div>
</section>`;

  return page({
    file: `${o.slug}.html`, active: 'objects.html',
    title: `${o.name} — аренда офисов, складов и производства · БАСТИОН`,
    desc: o.lead,
    crumbs: `<a href="index.html">Главная</a> / <a href="objects.html">Площадки</a> / ${o.short}`,
    body, sticky: stickyCta('#zayavka', 'Записаться на просмотр')
  });
}

/* ---------- Каталог ---------- */

function buildSpaces() {
  const siteOpts = OBJECTS.map(o => `<button class="opt" data-f-site="${o.id}"><span class="box">✓</span><span>${o.short}</span><span class="n" data-count-site="${o.id}"></span></button>`).join('');
  const useOpts = Object.entries(USE_NAMES).map(([k, v]) => `<button class="opt" data-f-use="${k}"><span class="box">✓</span><span>${v}</span><span class="n" data-count-use="${k}"></span></button>`).join('');

  const body = `
<section class="wrap sec">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:40px;flex-wrap:wrap">
    <div><hr class="rule-gold"><h1 class="h1">Свободные площади</h1>
      <p class="lead prose" style="margin-top:14px">Офисы, склады, производство, торговля и земельные участки на четырёх площадках. От 5 до 1800 м².</p></div>
    <div style="text-align:right;flex-shrink:0">
      <div class="stat-n" data-k-total>${SPACES.length}</div>
      <div class="cap" style="margin-top:6px">найдено · обновлено ${SITE.updated}</div>
    </div>
  </div>
</section>

<div class="wrap split" style="padding-bottom:72px;gap:44px" data-katalog>
  <aside class="side-sm">
    <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:14px;border-bottom:2px solid var(--brand)">
      <div class="h4">Фильтры</div>
      <button class="cap gold" data-f-reset style="background:none;border:none;cursor:pointer;padding:0">Сбросить</button>
    </div>
    <div class="fgroup"><div class="cap" style="margin-bottom:10px">Площадка</div>${siteOpts}</div>
    <div class="fgroup"><div class="cap" style="margin-bottom:10px">Назначение</div>${useOpts}</div>
    <div class="fgroup"><div class="cap" style="margin-bottom:10px">Площадь, м²</div>
      <div class="row" style="gap:8px;margin-bottom:12px"><input class="fld" style="height:42px" placeholder="от"><input class="fld" style="height:42px" placeholder="до"></div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        <button class="chip chip-sm on" data-f-area="any">любая</button>
        <button class="chip chip-sm" data-f-area="s">до 30</button>
        <button class="chip chip-sm" data-f-area="m">30—100</button>
        <button class="chip chip-sm" data-f-area="l">100—500</button>
        <button class="chip chip-sm" data-f-area="xl">от 500</button>
      </div></div>
    <div class="fgroup"><div class="cap" style="margin-bottom:10px">Что важно</div>
      <button class="opt" data-f-ready><span class="box">✓</span><span>Заехать сразу</span><span class="n" data-count-ready></span></button>
      <button class="opt" data-f-hold><span class="box">✓</span><span>Скрыть бронь</span><span class="n">2</span></button>
    </div>
    <div style="background:var(--brand-dk);color:#fff;border-radius:var(--r3);padding:24px;margin-top:22px">
      <div class="h4" style="color:#fff">Не нашли подходящее?</div>
      <p class="small" style="color:rgba(255,255,255,.68);margin-top:10px">Помещения освобождаются каждый месяц. Опишите задачу: подберём вручную, в том числе из того, что ещё не выложено.</p>
      <a class="btn btn-g btn-block" style="margin-top:16px" href="#podbor">Оставить заявку</a>
    </div>
  </aside>

  <div class="grow">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;padding-bottom:16px;border-bottom:2px solid var(--brand);flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap" data-k-chips></div>
      <div style="display:flex;align-items:center;gap:18px;flex-shrink:0;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:8px"><span class="cap">Сортировка</span>
          <button class="chip chip-sm on" data-f-sort="area-asc">площадь ↑</button>
          <button class="chip chip-sm" data-f-sort="area-desc">площадь ↓</button>
          <button class="chip chip-sm" data-f-sort="floor">этаж</button></div>
        <div style="display:flex;border:1px solid var(--line);border-radius:var(--r2);overflow:hidden">
          <button class="chip chip-sm on" style="border:none;border-radius:0" data-f-view="list">Список</button>
          <button class="chip chip-sm" style="border:none;border-radius:0" data-f-view="grid">Плитка</button></div>
      </div>
    </div>

    <div class="empty hide" data-k-empty>
      <div class="h3">Под такие условия ничего нет</div>
      <p class="lead" style="margin-top:12px;max-width:46ch;margin-left:auto;margin-right:auto">Попробуйте расширить диапазон площади или снять часть фильтров. А лучше опишите задачу — подберём вручную.</p>
      <div class="row" style="justify-content:center;margin-top:24px">
        <button class="btn btn-s auto" data-f-reset>Сбросить фильтры</button>
        <a class="btn btn-p auto" href="#podbor">Оставить заявку</a></div>
    </div>

    <table class="tbl"><thead><tr>
      <th>Код</th><th>Помещение</th><th class="r">Площадь</th><th class="r">Этаж</th>
      <th>Назначение</th><th>Статус</th><th class="r">Действие</th>
    </tr></thead><tbody data-k-list></tbody></table>

    <div class="g3 hide" data-k-grid style="margin-top:26px"></div>
    <div class="hide" data-k-more style="display:flex;justify-content:center;margin-top:28px">
      <button class="btn btn-s auto">Показать ещё <span>18</span></button></div>

    <div id="podbor" style="display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:48px;padding:30px 34px;background:var(--bg2);border-top:3px solid var(--gold);border-radius:0 0 var(--r3) var(--r3);flex-wrap:wrap">
      <div><div class="h4">Узнавать о новых помещениях первым</div>
        <p class="small" style="margin-top:8px">Подписка на рассылку предложений сети. Пишем, только когда освобождается подходящее.</p></div>
      <form class="row" style="flex-shrink:0;min-width:400px" data-form="sub">
        <input class="fld" type="email" required placeholder="Ваш e-mail" style="background:#fff">
        <button class="btn btn-p auto" type="submit">Подписаться</button></form>
      <div class="hide" data-form-done="sub" style="flex-shrink:0;min-width:400px">
        <div class="h4">Готово</div><p class="small" style="margin-top:6px">Напишем, когда появится подходящее.
        <button class="small" data-form-reset style="background:none;border:none;text-decoration:underline;cursor:pointer;font-family:inherit;padding:0;color:var(--gold-dk)">Изменить адрес</button></p></div>
    </div>
  </div>
</div>`;

  return page({
    file: 'spaces.html', active: 'spaces.html', title: 'Свободные площади — БАСТИОН',
    desc: 'Каталог свободных помещений сети «Бастион»: офисы, склады, производство, торговля, участки. От 5 до 1800 м².',
    crumbs: '<a href="index.html">Главная</a> / Свободные площади', body, sticky: stickyCta('#podbor', 'Оставить заявку')
  });
}

/* ---------- Карточка помещения ---------- */

function buildSpace() {
  const s = SPACE_SAMPLE;
  const thumbs = s.photos.map((p, i) => `<button class="thumb imgph xs${i === 0 ? ' on' : ''}" data-name="${p}"><i></i></button>`).join('');
  const similar = SPACES.filter(x => x.u === 'off' && x.a > 90 && x.id !== s.id).slice(0, 3).map(x => `
    <a class="card" href="space.html" style="display:block">
      ${ph(USE_NAMES[x.u], 'height:170px;border:none;border-bottom:1px solid var(--line)', 'sm')}
      <div style="padding:20px"><div class="mono" style="font-size:22px;font-weight:600;color:var(--brand)">${fmt(x.a)} м²</div>
        <div style="font-weight:700;margin-top:8px">${x.t}</div>
        <div class="small" style="margin-top:6px">${x.f} этаж · ${OBJECTS.find(o => o.id === x.s).name}</div></div>
    </a>`).join('');

  const body = `
<section class="wrap sec">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:40px;flex-wrap:wrap">
    <div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="badge badge-free">${s.status}</span><span class="mono cap">${s.id}</span>
      </div>
      <h1 class="h1" style="margin-top:14px">${s.title} — ${s.area} м²</h1>
      <p class="lead" style="margin-top:10px">${s.floor}, ${s.object} · ${s.addr}</p>
    </div>
    <div class="row" style="flex-shrink:0">
      <button class="btn btn-q auto" data-toggle data-on="В избранном" data-off="В избранное">В избранное</button>
      <button class="btn btn-q auto" data-toggle data-on="Ссылка скопирована" data-off="Поделиться">Поделиться</button>
    </div>
  </div>
</section>

<section class="wrap sec split">
  <div class="grow" data-gallery>
    ${ph(s.photos[0], 'height:520px;border-radius:var(--r3)')}
    <div class="thumbs" style="margin-top:12px">${thumbs}</div>
    <p class="small" style="margin-top:12px"><span data-gallery-label>${s.photos[0]}</span></p>
  </div>
  <aside class="side" id="zayavka">
    <div style="border:1px solid var(--line);border-radius:var(--r3);overflow:hidden">
      <div style="padding:28px;border-bottom:1px solid var(--line);background:var(--bg2)">
        <div class="cap">Ставка аренды</div>
        <p style="margin:12px 0 0;font-size:18px">Назовём на звонке. В ставку включено отопление, электроэнергия и вывоз мусора оплачиваются отдельно по счётчику. УСН.</p>
      </div>
      <div class="statbox" style="border:none;border-radius:0">
        <div><div class="mono" style="font-size:24px;font-weight:600;color:var(--brand)">${s.area}</div><div class="cap" style="margin-top:5px">м²</div></div>
        <div><div class="mono" style="font-size:24px;font-weight:600;color:var(--brand)">3</div><div class="cap" style="margin-top:5px">этаж из 11</div></div>
        <div><div class="mono" style="font-size:24px;font-weight:600;color:var(--brand)">Офис</div><div class="cap" style="margin-top:5px">назначение</div></div>
        <div><div class="mono" style="font-size:24px;font-weight:600;color:var(--brand)">сразу</div><div class="cap" style="margin-top:5px">можно заезжать</div></div>
      </div>
      <div style="padding:28px;border-top:1px solid var(--line)">
        <form data-form="room">
          <div class="col"><input class="fld" type="tel" required placeholder="Телефон · +7 ___ ___-__-__"><input class="fld" placeholder="Имя"></div>
          <button class="btn btn-p btn-lg btn-block" style="margin-top:14px" type="submit">Записаться на просмотр</button>
          <p class="small" style="margin-top:12px;font-size:13px">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
        </form>
        <div class="hide" data-form-done="room" style="text-align:center;padding:24px 0">
          <div class="h3">Заявка отправлена</div>
          <p class="small" style="margin-top:10px">Менеджер перезвонит и согласует время просмотра.</p>
          <button class="btn btn-q btn-sm auto" style="margin-top:18px" data-form-reset>Отправить ещё одну</button></div>
      </div>
      <div style="padding:22px 28px;background:var(--bg2);border-top:1px solid var(--line);display:flex;align-items:center;gap:14px">
        <div class="adv-i">${ic('phone', 22)}</div>
        <div class="grow"><div class="cap">Отдел аренды</div>
          <a class="mono" href="tel:${SITE.rentHref}" style="font-family:var(--disp);font-size:20px;color:var(--brand)">${SITE.rent}</a></div>
      </div>
    </div>
    <div class="row" style="margin-top:14px">
      <a class="btn btn-q btn-sm grow" href="object-ruchi.html">О площадке</a>
      <a class="btn btn-q btn-sm grow" href="tenants.html">Документы</a>
    </div>
  </aside>
</section>

<div class="wrap"><div class="tabs" data-tabs="r">
  <button class="tab on" data-tab="about">Описание</button>
  <button class="tab" data-tab="plan">Планировка</button>
  <button class="tab" data-tab="docs">Документы</button>
</div></div>

<section class="wrap sec split">
  <div class="grow prose"><hr class="rule-gold"><h2 class="h2">О помещении</h2>
    <div style="margin-top:18px;font-size:17px">${s.body.map(p => `<p>${p}</p>`).join('')}</div>
    <h3 class="h3" style="margin-top:36px">Характеристики</h3>
    <div style="margin-top:14px">
      ${[['Площадь', '128,00 м²'], ['Этаж', '3 из 11'], ['Корпус', 'АБК, административно-бытовой'], ['Назначение', 'офисное помещение'], ['Пассажирские лифты в корпусе', '2'], ['Санузлы на этаже', '2'], ['Интернет и телефония', 'выделенный канал, линии ПТС'], ['Налоговый режим', 'УСН']]
        .map(([k, v]) => `<div class="spec"><b>${k}</b><span class="mono" style="font-weight:600">${v}</span></div>`).join('')}
    </div>
    <h3 class="h3" style="margin-top:36px">Что входит в ставку</h3>
    <div class="g2">
      ${[['+', 'Отопление'], ['+', 'Охрана 24 ч, видеонаблюдение, пропускной режим'], ['+', 'Клининг мест общего пользования'], ['+', 'Гостевая парковка'], ['—', 'Электроэнергия по счётчику'], ['—', 'Вывоз мусора']]
        .map(([m, t]) => `<div style="display:flex;gap:12px;padding:15px 18px;background:${m === '+' ? 'var(--bg2)' : 'transparent'};border:1px solid ${m === '+' ? 'transparent' : 'var(--line)'};border-radius:var(--r2)"><b style="color:${m === '+' ? 'var(--gold-dk)' : 'var(--ink3)'}">${m}</b><span>${t}</span></div>`).join('')}
    </div>
  </div>
  <aside class="side">
    <div class="card pad"><div class="h4">Транспорт</div>
      <div style="margin-top:8px">
        ${[['Метро «Академическая»', '10 минут'], ['Метро «Гражданский проспект»', '10 минут'], ['Платформа Ручьи', '50 метров'], ['До КАД', '500 метров'], ['До Финляндского вокзала', '18 минут на электричке']]
          .map(([k, v]) => `<div style="display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid var(--line2)"><span class="small">${k}</span><span class="mono" style="font-weight:600;white-space:nowrap">${v}</span></div>`).join('')}
      </div>
      ${ph('Карта проезда', 'height:180px;border-radius:var(--r2);margin-top:18px', 'sm')}
    </div>
    <div class="card pad" style="margin-top:24px"><div class="h4">Условия аренды</div>
      <div style="margin-top:14px">
        ${[['Срок договора', '11 месяцев'], ['Первый платёж', '1 месяц + обеспечительный'], ['Налоговый режим', 'УСН'], ['Юридический адрес', 'предоставляем'], ['Арендные каникулы', 'для свободных планировок']]
          .map(([k, v]) => `<div class="spec" style="padding:12px 0"><b>${k}</b><span class="mono" style="font-weight:600">${v}</span></div>`).join('')}
      </div>
    </div>
  </aside>
</section>

<section class="wrap sec split hide" data-panel="plan" data-scope="r" >
  <div class="grow"><hr class="rule-gold"><h2 class="h2">Планировка</h2>
    <p class="lead" style="margin-top:12px">Помещение 307 на плане третьего этажа административно-бытового корпуса.</p>
    ${ph('План 3 этажа, помещение 307', 'height:500px;border-radius:var(--r3);margin-top:22px')}
    <div class="row" style="margin-top:18px"><a class="btn btn-q btn-sm auto" href="#">Скачать план этажа</a>
      <a class="btn btn-q btn-sm auto" href="object-ruchi.html">Все планы площадки</a></div>
  </div>
  <aside class="side">
    <div style="background:var(--bg2);border-radius:var(--r3);padding:28px">
      <div class="h4">Можно расшириться</div>
      <p class="small" style="margin-top:12px">На той же площадке свободны другие помещения — при росте компании можно занять соседнее или добавить склад, не переезжая по городу.</p>
      <a class="btn btn-s btn-block" style="margin-top:18px" href="spaces.html">Что ещё свободно на Ручьях</a>
    </div>
  </aside>
</section>

<section class="wrap sec split hide" data-panel="docs" data-scope="r" >
  <div class="grow prose"><hr class="rule-gold"><h2 class="h2">Документы для заезда</h2>
    <p class="lead" style="margin-top:12px">Можно изучить до просмотра — на подписании ничего не всплывёт.</p>
    <div style="margin-top:24px">
      ${[['PDF', 'Договор аренды', 'Основной документ, 11 месяцев'], ['PDF', 'Приложение 2 — переменная часть аренды', 'Как считаются электроэнергия и вывоз мусора'], ['PDF', 'Акт приёма-передачи', 'Подписывается при получении ключей'], ['DOC', 'Список документов для договора', 'Что подготовить со своей стороны'], ['DOC', 'Список сотрудников для пропусков', 'Заполняется после подписания']]
        .map(([e, t, d]) => `<div class="doc"><span class="ext">${e}</span><span class="nm"><b>${t}</b><div class="small">${d}</div></span><span class="go">Скачать</span></div>`).join('')}
    </div>
  </div>
  <aside class="side">
    <div style="border:1px solid var(--line);border-top:3px solid var(--gold);border-radius:0 0 var(--r3) var(--r3);padding:28px">
      <div class="h4">Вопросы по договору</div>
      <p class="small" style="margin-top:12px">Отдел аренды разберёт любой пункт до подписания.</p>
      <a class="mono" href="tel:${SITE.rentHref}" style="font-family:var(--disp);font-size:24px;color:var(--brand);display:block;margin-top:16px">${SITE.rent}</a>
      <a class="btn btn-p btn-block" style="margin-top:18px" href="#zayavka">Задать вопрос</a>
    </div>
  </aside>
</section>

<section class="sec-tight sec-cream">
  <div class="wrap"><div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Похожие помещения</h2></div>
    <a class="cap gold" href="spaces.html">Весь каталог →</a></div>
    <div class="g3">${similar}</div></div>
</section>`;

  return page({
    file: 'space.html', active: 'spaces.html',
    title: `${s.title} — ${s.area} м² в ${s.object} · БАСТИОН`,
    desc: `Офисное помещение ${s.area} м² на 3 этаже, ${s.object}, ${s.addr}. Отопление в ставке, УСН, юридический адрес.`,
    crumbs: `<a href="index.html">Главная</a> / <a href="spaces.html">Свободные площади</a> / <a href="object-ruchi.html">БЦ «Ручьи»</a> / ${s.id}`,
    body, sticky: stickyCta('#zayavka', 'Записаться на просмотр')
  });
}

/* ---------- Продажа ---------- */

function buildSale() {
  const rows = SALE.slice().sort((a, b) => parseFloat(a.price.replace(/\s/g, '')) - parseFloat(b.price.replace(/\s/g, ''))).map(o => `
  <a class="card" href="sale-${o.slug}.html" style="display:block;margin-bottom:24px">
    <div class="split" style="gap:0;align-items:stretch">
      <div style="width:38%;flex-shrink:0">${ph(o.addr, 'height:100%;min-height:260px;border:none;border-right:1px solid var(--line)')}</div>
      <div class="grow" style="padding:30px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:20px">
          <div><div class="cap">${o.addr}</div><div class="h2" style="margin-top:8px">${o.area} м²</div></div>
          <span class="badge badge-sale" style="flex-shrink:0">В продаже</span>
        </div>
        <p style="margin-top:14px;max-width:62ch">${o.lead}</p>
        <div class="g4">
          <div><div class="mono" style="font-size:20px;font-weight:600;color:var(--brand)">${o.price} ₽</div><div class="cap" style="font-size:10px;margin-top:3px">цена</div></div>
          <div><div class="mono" style="font-size:20px;font-weight:600;color:var(--brand)">${o.map}</div><div class="cap" style="font-size:10px;margin-top:3px">арендный поток</div></div>
          <div><div class="mono" style="font-size:20px;font-weight:600;color:var(--brand)">${o.payback}</div><div class="cap" style="font-size:10px;margin-top:3px">окупаемость</div></div>
          <div style="align-self:end;text-align:right"><span class="cap gold">Подробнее →</span></div>
        </div>
      </div>
    </div>
  </a>`).join('');

  const body = `
<section class="wrap sec">
  <hr class="rule-gold"><h1 class="h1">Продажа объектов</h1>
  <p class="lead prose" style="margin-top:16px">Готовый арендный бизнес от собственника: торговые помещения в комплексе на Карпинского с федеральными сетевыми арендаторами и офисно-производственно-складское здание на Электропультовцев. Все объекты сданы в аренду, коммунальные услуги оплачивают арендаторы.</p>
  <div class="stats" style="margin-top:32px">
    <div><div class="stat-n">5</div><div class="cap" style="margin-top:6px">объектов</div></div>
    <div><div class="stat-n">264—1432</div><div class="cap" style="margin-top:6px">м²</div></div>
    <div><div class="stat-n">7—9</div><div class="cap" style="margin-top:6px">лет окупаемость</div></div>
    <div><div class="stat-n">2%</div><div class="cap" style="margin-top:6px">комиссия агентам</div></div>
  </div>
</section>
<section class="wrap sec">${rows}</section>
${ctaBlock('Посмотреть объект и документы', 'Организуем просмотр, покажем договоры аренды и подтверждение арендного потока.')}`;

  return page({
    file: 'sale.html', active: 'sale.html', title: 'Продажа объектов — готовый арендный бизнес · БАСТИОН',
    desc: 'Пять объектов готового арендного бизнеса в Санкт-Петербурге от собственника: от 264 до 1432 м², окупаемость 7–9 лет.',
    crumbs: '<a href="index.html">Главная</a> / Продажа объектов', body, sticky: stickyCta('sale.html', 'Смотреть объекты')
  });
}

function buildSaleItem(o) {
  const thumbs = o.photos.map((p, i) => `<button class="thumb imgph xs${i === 0 ? ' on' : ''}" data-name="${p}"><i></i></button>`).join('');
  const facts = o.facts.map(([k, v]) => `<div class="spec"><b>${k}</b><span class="mono" style="font-weight:600">${v}</span></div>`).join('');
  const others = SALE.filter(x => x.slug !== o.slug).slice(0, 3).map(x => `
    <a class="card" href="sale-${x.slug}.html" style="display:block">
      ${ph(x.addr, 'height:150px;border:none;border-bottom:1px solid var(--line)', 'sm')}
      <div style="padding:20px"><div class="mono" style="font-size:20px;font-weight:600;color:var(--brand)">${x.area} м²</div>
        <div class="small" style="margin-top:6px">${x.name}</div>
        <div class="mono" style="font-size:16px;font-weight:600;margin-top:12px">${x.price} ₽</div></div></a>`).join('');

  const body = `
<section class="wrap sec">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:40px;flex-wrap:wrap">
    <div><span class="badge badge-sale">В продаже</span>
      <h1 class="h1" style="margin-top:14px">${o.name} — ${o.area} м²</h1>
      <p class="lead" style="margin-top:10px">${o.addr}, Санкт-Петербург</p></div>
    <div style="text-align:right"><div class="stat-n">${o.price} ₽</div>
      <div class="cap" style="margin-top:6px">НДС 5% включён в стоимость</div></div>
  </div>
</section>

<section class="wrap sec split">
  <div class="grow" data-gallery>
    ${ph(o.photos[0], 'height:500px;border-radius:var(--r3)')}
    <div class="thumbs" style="margin-top:12px">${thumbs}</div>
    <p class="small" style="margin-top:12px"><span data-gallery-label>${o.photos[0]}</span></p>

    <div class="prose" style="margin-top:44px">
      <hr class="rule-gold"><h2 class="h2">Об объекте</h2>
      <p class="lead" style="margin-top:16px">${o.lead}</p>
      <div style="margin-top:18px;font-size:17px">${o.body.map(p => `<p>${p}</p>`).join('')}</div>
      <h3 class="h3" style="margin-top:36px">Ключевые цифры</h3>
      <div style="margin-top:14px">${facts}</div>
    </div>
  </div>

  <aside class="side" id="zayavka">
    <div style="border:1px solid var(--line);border-radius:var(--r3);overflow:hidden;position:sticky;top:108px">
      <div class="statbox" style="border:none;border-radius:0">
        <div><div class="mono" style="font-size:22px;font-weight:600;color:var(--brand)">${o.area}</div><div class="cap" style="margin-top:5px">м²</div></div>
        <div><div class="mono" style="font-size:22px;font-weight:600;color:var(--brand)">${o.payback}</div><div class="cap" style="margin-top:5px">окупаемость</div></div>
      </div>
      <div style="padding:26px;background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
        <div class="cap">Месячный арендный поток</div>
        <div class="mono" style="font-family:var(--disp);font-size:26px;color:var(--brand);margin-top:8px">${o.map}</div>
      </div>
      <div style="padding:26px">
        <form data-form="sale-${o.slug}">
          <div class="h4">Запросить документы</div>
          <p class="small" style="margin:10px 0 16px">Пришлём договоры аренды, подтверждение потока и организуем просмотр.</p>
          <div class="col"><input class="fld" type="tel" required placeholder="Телефон"><input class="fld" placeholder="Имя"></div>
          <button class="btn btn-p btn-lg btn-block" style="margin-top:14px" type="submit">Отправить запрос</button>
        </form>
        <div class="hide" data-form-done="sale-${o.slug}" style="text-align:center;padding:20px 0">
          <div class="h3">Запрос отправлен</div>
          <p class="small" style="margin-top:10px">Свяжемся с вами и пришлём документы.</p>
          <button class="btn btn-q btn-sm auto" style="margin-top:16px" data-form-reset>Отправить ещё один</button></div>
      </div>
      <div style="padding:20px 26px;background:var(--brand-dk);color:#fff;display:flex;align-items:center;gap:14px">
        <div class="grow"><div class="cap">Отдел продаж</div>
          <a class="mono" href="tel:${SITE.phoneHref}" style="font-family:var(--disp);font-size:20px;color:#fff">${SITE.phone}</a></div>
      </div>
    </div>
  </aside>
</section>

<section class="sec-tight sec-cream">
  <div class="wrap"><div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Другие объекты</h2></div>
    <a class="cap gold" href="sale.html">Все объекты →</a></div><div class="g3">${others}</div></div>
</section>`;

  return page({
    file: `sale-${o.slug}.html`, active: 'sale.html',
    title: `${o.name}, ${o.area} м² за ${o.price} ₽ — готовый арендный бизнес · БАСТИОН`,
    desc: o.lead,
    crumbs: `<a href="index.html">Главная</a> / <a href="sale.html">Продажа объектов</a> / ${o.area} м²`,
    body, sticky: stickyCta('#zayavka', 'Запросить документы')
  });
}

/* ---------- Арендаторам ---------- */

function buildTenants() {
  const allDocs = OBJECTS.filter(o => o.docs.length).map(o => `
    <div style="margin-bottom:44px">
      <div class="h3">${o.name}</div>
      ${o.docs.map(g => `<div class="cap" style="margin-top:26px;margin-bottom:6px">${g.g}</div>
        ${g.items.map(([e, n]) => `<div class="doc"><span class="ext">${e}</span><span class="nm">${n}</span><span class="go">Скачать</span></div>`).join('')}`).join('')}
    </div>`).join('');

  const schedule = OBJECTS.map(o => `<div class="spec"><b>${o.short}</b><span class="mono" style="font-weight:600">${o.hours}</span></div>`).join('');

  const body = `
<section class="wrap sec">
  <hr class="rule-gold"><h1 class="h1">Арендаторам</h1>
  <p class="lead prose" style="margin-top:16px">Бланки и документы по каждой площадке, порядок оформления пропусков, заявка в службу эксплуатации, график работы.</p>
</section>

<div class="wrap"><div class="tabs" data-tabs="t">
  <button class="tab on" data-tab="docs">Документы и бланки</button>
  <button class="tab" data-tab="propuska">Пропуска</button>
  <button class="tab" data-tab="zayavka">Заявка инженеру</button>
  <button class="tab" data-tab="grafik">График работы</button>
</div></div>

<section class="wrap sec split">
  <div class="grow">${allDocs}</div>
  <aside class="side">
    <div style="background:var(--bg2);border-radius:var(--r3);padding:28px">
      <div class="h4">Сервисная служба</div>
      <p class="small" style="margin-top:12px">Личный кабинет арендатора: заявки, статусы, история обращений.</p>
      <div class="col" style="margin-top:18px">
        <input class="fld" placeholder="Пользователь"><input class="fld" type="password" placeholder="Пароль">
        <button class="btn btn-p btn-block">Войти</button>
      </div>
    </div>
    <div class="card pad" style="margin-top:24px">
      <div class="h4">Порядок заезда</div>
      <div class="col" style="margin-top:18px;gap:16px">
        ${['Согласуем условия и подписываем договор на 11 месяцев', 'Вносим первый месяц и обеспечительный платёж', 'Подаём список сотрудников на пропуска', 'Принимаем помещение по акту приёма-передачи', 'Получаем ключи и заезжаем']
          .map((s, i) => `<div style="display:flex;gap:14px"><span class="mono" style="font-weight:600;color:var(--gold-dk)">0${i + 1}</span><span class="small" style="color:var(--ink)">${s}</span></div>`).join('')}
      </div>
    </div>
  </aside>
</section>

<section class="wrap sec split hide" data-panel="propuska" data-scope="t" id="propuska" >
  <div class="grow prose">
    <hr class="rule-gold"><h2 class="h2">Пропускной режим</h2>
    <p class="lead" style="margin-top:16px">На всех объектах сети действует пропускной режим, охрана работает круглосуточно. Пропуска оформляются по заявке от арендатора.</p>
    <h3 class="h3" style="margin-top:32px">Сотрудники</h3>
    <p>Список сотрудников подаётся на бланке «Список сотрудников фирмы». По нему выдаются постоянные пропуска. При изменении состава подаётся обновлённый список.</p>
    <h3 class="h3" style="margin-top:28px">Автотранспорт</h3>
    <p>Постоянный и временный автотранспортный пропуск оформляются служебной запиской. Отдельные бланки предусмотрены для проезда на мотоцикле, велосипеде и самокате.</p>
    <h3 class="h3" style="margin-top:28px">Работы и подрядчики</h3>
    <p>Допуск подрядчиков оформляется заявкой. На ночные работы подаётся служебная записка, на высотные, пожароопасные и огневые работы — разрешение. Заявка на проезд крупногабаритного транспорта в выходной день подаётся заранее.</p>
    <h3 class="h3" style="margin-top:28px">Выходные дни</h3>
    <p>Проход сотрудников в выходные дни при неработающем ресепшн оформляется отдельной заявкой.</p>
  </div>
  <aside class="side">
    <div class="card pad"><div class="h4">Бланки для пропусков</div>
      <div style="margin-top:10px">
        ${['Список сотрудников фирмы', 'Список на получение ключей', 'Служебная записка на постоянный автопропуск', 'Служебная записка на временный автопропуск', 'Пропуск для велосипеда или самоката', 'Пропуск для проезда на мотоцикле', 'Заявка на допуск подрядчиков', 'Заявка на проход в выходные дни']
          .map(n => `<div class="doc"><span class="ext">DOC</span><span class="nm">${n}</span><span class="go">Скачать</span></div>`).join('')}
      </div>
    </div>
  </aside>
</section>

<section class="wrap sec split hide" data-panel="zayavka" data-scope="t" id="zayavka-inzheneru" >
  <div class="grow prose">
    <hr class="rule-gold"><h2 class="h2">Заявка в службу эксплуатации</h2>
    <p class="lead" style="margin-top:16px">Электрика, отопление, водоснабжение, замки и двери — по заявке к главному инженеру объекта. Аварийные ситуации решаются по телефону напрямую.</p>
    <h3 class="h3" style="margin-top:32px">Главные инженеры по объектам</h3>
    <div style="margin-top:14px">
      ${OBJECTS.map(o => {
        const e = o.contacts.find(c => c.role.includes('инженер'));
        return e ? `<div class="spec"><b>${o.short}</b><a class="mono" href="tel:${e.href}" style="font-weight:600">${e.v}</a></div>` : '';
      }).join('')}
      <div class="spec"><b>Охрана БЦ «Ручьи», круглосуточно</b><a class="mono" href="tel:+78122991010" style="font-weight:600">+7 812 299-10-10</a></div>
      <div class="spec"><b>Ресепшн технопарка «Литовская, 10»</b><a class="mono" href="tel:+78122928415" style="font-weight:600">+7 812 292-84-15</a></div>
    </div>
  </div>
  <aside class="side">
    <div style="border:1px solid var(--line);border-top:3px solid var(--gold);border-radius:0 0 var(--r3) var(--r3);padding:30px">
      <form data-form="eng">
        <div class="h4">Новая заявка</div>
        <div class="cap" style="margin:18px 0 8px">Что случилось</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap" data-chipgroup>
          <button type="button" class="chip chip-sm on">Отопление</button>
          <button type="button" class="chip chip-sm">Электрика</button>
          <button type="button" class="chip chip-sm">Вода</button>
          <button type="button" class="chip chip-sm">Замок, дверь</button>
          <button type="button" class="chip chip-sm">Другое</button>
        </div>
        <div style="margin-top:14px"><div class="cap" style="margin-bottom:6px">Площадка и помещение</div><input class="fld" placeholder="Например: Ручьи, каб. 307"></div>
        <div style="margin-top:12px"><div class="cap" style="margin-bottom:6px">Описание</div><textarea class="fld" required placeholder="Опишите, что не работает"></textarea></div>
        <div style="margin-top:12px"><div class="cap" style="margin-bottom:6px">Контактный телефон</div><input class="fld" type="tel" required placeholder="+7 ___ ___-__-__"></div>
        <button class="btn btn-p btn-block" style="margin-top:20px" type="submit">Отправить заявку</button>
      </form>
      <div class="hide" data-form-done="eng" style="text-align:center;padding:34px 0">
        <div class="h3">Заявка создана</div>
        <p class="small" style="margin-top:10px">Инженер объекта получит её сразу и свяжется с вами.</p>
        <button class="btn btn-q btn-sm auto" style="margin-top:18px" data-form-reset>Создать ещё одну</button></div>
    </div>
  </aside>
</section>

<section class="wrap sec hide" data-panel="grafik" data-scope="t" id="grafik" >
  <div class="split">
    <div class="grow prose"><hr class="rule-gold"><h2 class="h2">График работы</h2>
      <p class="lead" style="margin-top:16px">Режим работы бизнес-центров сети. Охрана на объектах работает круглосуточно; проход в нерабочие часы — по заявке.</p>
      <div style="margin-top:24px">${schedule}</div>
      <h3 class="h3" style="margin-top:36px">Праздничные дни</h3>
      <p>В государственные праздники бизнес-центры «Технопарк», «Менделеевский» и «Ручьи» работают в режиме выходного дня. Об изменениях графика сообщаем заранее в разделе «Новости».</p>
      <a class="btn btn-s auto" style="margin-top:18px" href="news.html">Смотреть объявления</a>
    </div>
    <aside class="side">
      <div class="card pad"><div class="h4">Полезные телефоны</div>
        <div style="margin-top:16px">
          <div class="spec"><b>Отдел аренды</b><a class="mono" href="tel:${SITE.rentHref}" style="font-weight:600">${SITE.rent}</a></div>
          <div class="spec"><b>Общий телефон сети</b><a class="mono" href="tel:${SITE.phoneHref}" style="font-weight:600">${SITE.phone}</a></div>
          <div class="spec"><b>Секретарь генерального директора</b><a class="mono" href="tel:${SITE.secretaryHref}" style="font-weight:600">${SITE.secretary}</a></div>
          <div class="spec"><b>Реклама и маркетинг</b><a class="mono" href="mailto:${SITE.emailAds}" style="font-weight:600">${SITE.emailAds}</a></div>
        </div>
      </div>
    </aside>
  </div>
</section>

${ctaBlock('Выросли и нужно больше места?', 'Подберём помещение крупнее на той же площадке. Переезжать по городу не придётся.')}`;

  return page({
    file: 'tenants.html', active: 'tenants.html', title: 'Арендаторам — документы, пропуска, график работы · БАСТИОН',
    desc: 'Документы и бланки по всем площадкам сети «Бастион», порядок оформления пропусков, заявка в службу эксплуатации, график работы бизнес-центров.',
    crumbs: '<a href="index.html">Главная</a> / Арендаторам', body, sticky: stickyCta('tenants.html#zayavka-inzheneru', 'Заявка инженеру')
  });
}

/* ---------- О сети ---------- */

function buildAbout() {
  const advs = ADVANTAGES.map(a => `<div class="adv"><div class="adv-i">${ic(a.icon)}</div>
    <div><div class="h4">${a.t}</div><p class="small" style="margin-top:6px">${a.d}</p></div></div>`).join('');
  const arts = ARTICLES.map(a => `<a class="doc" href="${a.u}" target="_blank" rel="noopener">
    <span class="ext" style="background:var(--gold);color:var(--brand-dk)">СТ</span>
    <span class="nm"><b>${a.t}</b><div class="small">${a.s}</div></span><span class="go">Читать →</span></a>`).join('');

  const body = `
<section class="wrap sec">
  <hr class="rule-gold"><h1 class="h1">О сети «Бастион»</h1>
</section>
<section class="wrap sec split">
  <div class="grow prose" style="font-size:17px">
    ${ABOUT.map(p => `<p>${p}</p>`).join('')}
    <div class="stats" style="margin-top:40px">
      <div><div class="stat-n">55 800</div><div class="cap" style="margin-top:8px">м² в сети</div></div>
      <div><div class="stat-n">4</div><div class="cap" style="margin-top:8px">площадки</div></div>
      <div><div class="stat-n">C+</div><div class="cap" style="margin-top:8px">класс объектов</div></div>
    </div>
  </div>
  <aside class="side">
    ${ph('Панорама технопарка «Литовская, 10»', 'height:280px;border-radius:var(--r3)')}
    <div class="card pad" style="margin-top:24px">
      <div class="h4">Реквизиты и документы</div>
      <p class="small" style="margin-top:12px">Полные реквизиты и правоустанавливающие документы предоставляет отдел аренды при заключении договора.</p>
      <a class="btn btn-s btn-block" style="margin-top:18px" href="${SITE.presentation}" target="_blank" rel="noopener">Презентация сети (PDF)</a>
    </div>
  </aside>
</section>

<section class="sec sec-cream">
  <div class="wrap"><div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Что есть на площадках</h2></div></div>
  <div class="g3">${advs}</div></div>
</section>

<section class="sec" id="usloviya">
  <div class="wrap">
    <div class="sechead"><div><hr class="rule-gold"><h2 class="h2">Условия аренды</h2>
      <p class="lead" style="margin-top:14px;max-width:64ch">Условия едины для всех площадок сети. Различается только налоговый режим: технопарк «Литовская, 10» работает с НДС, БЦ «Ручьи» — на УСН.</p></div></div>
    <div class="g4">${TERMS.map(t => `<div class="card pad"><div class="stat-n">${t.n}</div>
      <div class="h4" style="margin-top:14px">${t.t}</div><p class="small" style="margin-top:8px">${t.d}</p></div>`).join('')}</div>
    <div class="row" style="margin-top:32px"><a class="btn btn-p auto" href="spaces.html">Свободные площади</a>
      <a class="btn btn-s auto" href="tenants.html">Документы и бланки</a></div>
  </div>
</section>

<section class="sec sec-cream">
  <div class="wrap split">
    <div class="side"><hr class="rule-gold"><h2 class="h2">Публикации</h2>
      <p class="lead" style="margin-top:16px">Материалы «Делового Петербурга» с участием сети — о выборе помещения и рынке аренды.</p></div>
    <div class="grow">${arts}</div>
  </div>
</section>

${ctaBlock('Продаёте коммерческий объект в Петербурге?', 'Рассматриваем предложения по приобретению в собственность. Напишите или позвоните — посмотрим.')}`;

  return page({
    file: 'about.html', active: 'about.html', title: 'О сети бизнес-центров «Бастион» — класс C+ в Санкт-Петербурге',
    desc: 'Сеть офисно-производственных комплексов класса C+ в Санкт-Петербурге: единый стандарт услуг, низкие ставки, полный цикл на одной территории.',
    crumbs: '<a href="index.html">Главная</a> / О сети', body, sticky: stickyCta()
  });
}

/* ---------- Контакты ---------- */

function buildContacts() {
  const objs = OBJECTS.map(o => `
    <div class="card" style="margin-bottom:24px">
      <div class="pad" style="padding:30px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap">
          <div><div class="cap">${o.district}</div><div class="h3" style="margin-top:8px">${o.name}</div>
            <p class="small" style="margin-top:8px">${o.zip}, ${o.addr}</p>
            <p class="small">График работы: ${o.hours}</p></div>
          <a class="btn btn-s btn-sm auto" href="${o.slug}.html">О площадке</a>
        </div>
        <div class="g3">
          ${o.contacts.map(c => `<div><div class="cap">${c.role}</div>
            <a class="mono" href="${c.href.startsWith('mailto') ? c.href : 'tel:' + c.href}" style="font-family:var(--disp);font-size:19px;color:var(--brand);display:block;margin-top:6px">${c.v}</a>
            <p class="small" style="margin-top:4px">${c.d}</p></div>`).join('')}
        </div>
      </div>
    </div>`).join('');

  const body = `
<section class="wrap sec">
  <hr class="rule-gold"><h1 class="h1">Контакты</h1>
  <p class="lead prose" style="margin-top:16px">Общие телефоны сети и контакты по каждой площадке: отдел аренды, управляющий, главный инженер, охрана.</p>
</section>

<section class="wrap sec">
  <div class="g4">
    <div class="card pad"><div class="adv-i" style="margin-bottom:16px">${ic('phone')}</div>
      <div class="cap">Общий телефон сети</div>
      <a class="mono" href="tel:${SITE.phoneHref}" style="font-family:var(--disp);font-size:23px;color:var(--brand);display:block;margin-top:8px">${SITE.phone}</a></div>
    <div class="card pad"><div class="adv-i" style="margin-bottom:16px">${ic('grid')}</div>
      <div class="cap">Отдел аренды</div>
      <a class="mono" href="tel:${SITE.rentHref}" style="font-family:var(--disp);font-size:23px;color:var(--brand);display:block;margin-top:8px">${SITE.rent}</a></div>
    <div class="card pad"><div class="adv-i" style="margin-bottom:16px">${ic('mail')}</div>
      <div class="cap">Почта</div>
      <a class="mono" href="mailto:${SITE.email}" style="font-family:var(--disp);font-size:19px;color:var(--brand);display:block;margin-top:8px">${SITE.email}</a>
      <a class="mono" href="mailto:${SITE.emailOffice}" style="font-size:14px;display:block;margin-top:6px">${SITE.emailOffice}</a></div>
    <div class="card pad"><div class="adv-i" style="margin-bottom:16px">${ic('clock')}</div>
      <div class="cap">Режим работы</div>
      <p style="margin-top:8px;font-size:16px">${SITE.hours}</p></div>
  </div>
</section>

<section class="wrap sec"><h2 class="h2">Контакты по площадкам</h2></section>
<section class="wrap sec">${objs}</section>

<section class="wrap sec">
  ${ph('Карта: четыре площадки сети в Санкт-Петербурге', 'height:400px;border-radius:var(--r3)')}
</section>

<section class="sec" id="zayavka" style="border-top:1px solid var(--line)">
  <div class="wrap split">
    <div class="grow"><hr class="rule-gold"><h2 class="h2">Обратный звонок</h2>
      <p class="lead" style="margin-top:18px;max-width:46ch">Оставьте номер — менеджер сети перезвонит по указанному телефону и ответит на вопросы по аренде.</p>
      <p class="small" style="margin-top:26px">${SITE.addr}</p></div>
    <div class="side" style="background:#fff;border:1px solid var(--line);border-radius:var(--r3);padding:32px">
      ${leadForm('contacts', 'Заказать звонок', 'Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.')}
    </div>
  </div>
</section>`;

  return page({
    file: 'contacts.html', active: 'contacts.html', title: 'Контакты — БАСТИОН, сеть бизнес-центров в Санкт-Петербурге',
    desc: 'Телефоны отдела аренды, управляющих, главных инженеров и охраны по всем площадкам сети «Бастион».',
    crumbs: '<a href="index.html">Главная</a> / Контакты', body, sticky: stickyCta('#zayavka', 'Заказать звонок')
  });
}

/* ---------- Новости ---------- */

function buildNews() {
  const item = (n) => `
    <article class="card pad" style="padding:30px">
      <div style="display:flex;align-items:center;gap:14px">
        <span class="cap">${n.d}</span>
        <span class="badge ${n.c === 'company' ? 'badge-hold' : 'badge-busy'}">${n.c === 'company' ? 'Новости компании' : 'Недвижимость'}</span>
      </div>
      <h2 class="h3" style="margin-top:14px">${n.t}</h2>
      <p style="margin-top:12px;max-width:80ch">${n.x}</p>
    </article>`;

  const body = `
<section class="wrap sec">
  <hr class="rule-gold"><h1 class="h1">Новости</h1>
  <p class="lead prose" style="margin-top:16px">Объявления для арендаторов: график работы в праздники, тренировки по пожарной безопасности, поздравления. Ниже — новости рынка недвижимости.</p>
</section>
<section class="wrap sec">
  <div class="col" style="gap:24px">${NEWS.filter(n => n.c === 'company').map(item).join('')}</div>
  <h2 class="h2" style="margin-top:56px;margin-bottom:24px">Новости недвижимости</h2>
  <div class="col" style="gap:24px">${NEWS.filter(n => n.c === 'estate').map(item).join('')}</div>
</section>
${ctaBlock('График работы в праздники', 'Об изменениях режима сообщаем заранее: здесь и в разделе «Арендаторам».')}`;

  return page({
    file: 'news.html', active: 'news.html', title: 'Новости — БАСТИОН, сеть бизнес-центров',
    desc: 'Новости и объявления сети бизнес-центров «Бастион»: график работы в праздники, пожарная безопасность, новости рынка недвижимости.',
    crumbs: '<a href="index.html">Главная</a> / Новости', body, sticky: stickyCta()
  });
}

/* ---------- Политика и карта сайта ---------- */

function buildPrivacy() {
  const body = `
<section class="wrap sec split">
  <div class="grow prose">
    <hr class="rule-gold"><h1 class="h1">Политика в отношении обработки персональных данных</h1>
    <p class="lead" style="margin-top:18px">Настоящая политика определяет порядок обработки персональных данных пользователей сайта сети бизнес-центров «Бастион».</p>
    <h3 class="h3" style="margin-top:32px">Какие данные мы собираем</h3>
    <p>Персональные данные — любая информация, относящаяся прямо или косвенно к определённому или определяемому пользователю сайта. При заполнении форм обратной связи это имя, номер телефона, адрес электронной почты и текст сообщения.</p>
    <h3 class="h3" style="margin-top:28px">Зачем мы их обрабатываем</h3>
    <p>Данные используются только для того, чтобы связаться с вами по вашему обращению: подобрать помещение, согласовать просмотр, ответить на вопрос по условиям аренды или направить документы. Мы не передаём их третьим лицам и не используем для рассылок, на которые вы не подписывались.</p>
    <h3 class="h3" style="margin-top:28px">Файлы cookies</h3>
    <p>Мы используем два типа файлов cookies: технические, необходимые для работы сайта (пользовательские сессии, защита от спама, сохранение согласия), и аналитические — Яндекс.Метрика, для оценки посещаемости и поведения пользователей.</p>
    <p>Вы можете принять все cookies, только необходимые или изменить выбор в настройках. Согласие сохраняется в браузере и может быть изменено по ссылке «Настройки cookies» внизу страницы.</p>
    <h3 class="h3" style="margin-top:28px">Ваши права</h3>
    <p>Вы вправе получить сведения об обработке ваших персональных данных, потребовать их уточнения, блокирования или уничтожения, а также отозвать согласие на обработку. Для этого напишите на <a href="mailto:${SITE.email}">${SITE.email}</a> или позвоните по телефону <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>.</p>
    <h3 class="h3" style="margin-top:28px">Контакты</h3>
    <p>Сеть бизнес-центров «Бастион», ${SITE.addr}. Телефон ${SITE.phone}, почта ${SITE.email}.</p>
  </div>
  <aside class="side">
    <div class="card pad"><div class="h4">Настройки cookies</div>
      <p class="small" style="margin-top:12px">Технические cookies необходимы для работы сайта и всегда включены. Аналитические можно отключить.</p>
      <div class="col" style="margin-top:18px">
        <span class="opt on"><span class="box">✓</span><span>Необходимые</span></span>
        <span class="opt on"><span class="box">✓</span><span>Аналитические</span></span>
      </div>
      <div class="row" style="margin-top:18px"><button class="btn btn-p btn-sm grow">Сохранить</button></div>
    </div>
  </aside>
</section>`;

  return page({
    file: 'privacy.html', active: '', title: 'Политика обработки персональных данных — БАСТИОН',
    desc: 'Политика в отношении обработки персональных данных сети бизнес-центров «Бастион».',
    crumbs: '<a href="index.html">Главная</a> / Политика обработки персональных данных', body
  });
}

function buildSitemap() {
  const objLinks = OBJECTS.map(o => `<li><a href="${o.slug}.html">${o.name}</a>
    <ul><li>О площадке</li><li>Свободные площади (${SPACES.filter(s => s.s === o.id).length})</li>
    <li>Поэтажные планы${o.plans.length ? ` (${o.plans.length})` : ''}</li>
    <li>Документы${o.docs.length ? ` (${o.docs.reduce((a, g) => a + g.items.length, 0)})` : ''}</li><li>Контакты</li></ul></li>`).join('');
  const saleLinks = SALE.map(o => `<li><a href="sale-${o.slug}.html">${o.name} — ${o.area} м², ${o.price} ₽</a></li>`).join('');

  const body = `
<section class="wrap sec">
  <hr class="rule-gold"><h1 class="h1">Карта сайта</h1>
  <p class="lead prose" style="margin-top:16px">Структура сайта целиком. Витрина для тех, кто выбирает помещение, и раздел «Арендаторам» для тех, кто уже работает в сети, разведены.</p>
</section>
<section class="wrap sec split">
  <div class="grow tree">
    <ul>
      <li><a href="index.html">Главная</a></li>
      <li><a href="objects.html">Площадки</a><ul>${objLinks}<li>Другие объекты</li></ul></li>
      <li><a href="spaces.html">Свободные площади</a>
        <ul><li>Фильтр по площадке, назначению, площади и готовности</li>
        <li><a href="space.html">Карточка помещения</a></li>
        <li>Подписка на новые предложения</li></ul></li>
      <li><a href="sale.html">Продажа объектов</a><ul>${saleLinks}</ul></li>
      <li><a href="tenants.html">Арендаторам</a>
        <ul><li><a href="tenants.html">Документы и бланки по площадкам</a></li>
        <li><a href="tenants.html#propuska">Пропускной режим</a></li>
        <li><a href="tenants.html#zayavka-inzheneru">Заявка в службу эксплуатации</a></li>
        <li><a href="tenants.html#grafik">График работы</a></li>
        <li>Сервисная служба — личный кабинет</li></ul></li>
      <li><a href="about.html">О сети</a><ul><li>Преимущества</li>
        <li><a href="about.html#usloviya">Условия аренды</a></li><li>Публикации</li></ul></li>
      <li><a href="news.html">Новости</a><ul><li>Новости компании</li><li>Новости недвижимости</li></ul></li>
      <li><a href="contacts.html">Контакты</a><ul><li>Общие телефоны сети</li><li>Контакты по каждой площадке</li><li>Обратный звонок</li></ul></li>
      <li><a href="privacy.html">Политика обработки персональных данных</a></li>
    </ul>
  </div>
  <aside class="side">
    <div class="card pad"><div class="h4">Что изменилось в структуре</div>
      <div class="col" style="margin-top:16px;gap:14px">
        <p class="small" style="margin:0"><b style="color:var(--brand)">Витрина и обслуживание разведены.</b> «Площадки» — для того, кто выбирает помещение. «Арендаторам» — для того, кто уже арендует: бланки, пропуска, заявки, график.</p>
        <p class="small" style="margin:0"><b style="color:var(--brand)">У каждого помещения своё действие.</b> С карточки можно записаться на просмотр, скачать документы и поделиться ссылкой.</p>
        <p class="small" style="margin:0"><b style="color:var(--brand)">Продажа связана с площадками.</b> Объекты на Карпинского ведут на страницу торгового комплекса и обратно.</p>
      </div>
    </div>
  </aside>
</section>`;

  return page({
    file: 'sitemap.html', active: '', title: 'Карта сайта — БАСТИОН',
    desc: 'Полная структура сайта сети бизнес-центров «Бастион».',
    crumbs: '<a href="index.html">Главная</a> / Карта сайта', body
  });
}

/* ---------- app.js с данными ---------- */

function buildApp() {
  const src = fs.readFileSync(path.join(HERE, 'app.src.js'), 'utf8');
  const inject = `var SITES=${JSON.stringify(OBJECTS.map(o => ({
    id: o.id, short: o.short, name: o.name, district: o.district, slug: o.slug,
    figures: o.figures.slice(0, 3),
    free: SPACES.filter(s => s.s === o.id).length,
    metro: o.transport[0][0] + ' — ' + o.transport[0][1], x: o.x, y: o.y
  })))};
var SPACES=${JSON.stringify(SPACES)};
var SITE_NAMES=${JSON.stringify(Object.fromEntries(OBJECTS.map(o => [o.id, o.short])))};
var USE_NAMES=${JSON.stringify(USE_NAMES)};`;
  fs.writeFileSync(path.join(OUT, 'assets/app.js'), src.replace('/*__DATA__*/', inject), 'utf8');
}

/* ---------- сборка ---------- */

const made = [];
made.push(buildIndex());
made.push(buildObjects());
OBJECTS.forEach(o => made.push(buildObject(o)));
made.push(buildSpaces());
made.push(buildSpace());
made.push(buildSale());
SALE.forEach(o => made.push(buildSaleItem(o)));
made.push(buildTenants());
made.push(buildAbout());
made.push(buildContacts());
made.push(buildNews());
made.push(buildPrivacy());
made.push(buildSitemap());
buildApp();

console.log('Собрано страниц: ' + made.length);
made.forEach(f => console.log('  ' + f));

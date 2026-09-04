/* БАСТИОН — интерактив сайта. Без зависимостей. Данные подставляются сборщиком. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return n.toFixed(2).replace('.', ','); };

  var SITES=[{"id":"L10","short":"Литовская, 10","name":"Технопарк «Литовская, 10»","district":"Выборгский район","slug":"object-litovskaya","figures":[["32 000","м²"],["5","корпусов"],["5","этажей"]],"free":14,"metro":"Метро «Лесная» — 10 минут пешком","x":20,"y":66},{"id":"M9","short":"Менделеевский","name":"БЦ «Менделеевский»","district":"Калининский район","slug":"object-mendeleevsky","figures":[["11 500","м²"],["2","корпуса"],["6","этажей"]],"free":7,"metro":"Метро — пешая доступность","x":42,"y":28},{"id":"R13","short":"Ручьи","name":"БЦ «Ручьи»","district":"Калининский район","slug":"object-ruchi","figures":[["12 316","м²"],["2","корпуса"],["11","этажей"]],"free":7,"metro":"Метро «Академическая» — 10 минут на транспорте — 5 остановок трамваем № 9, 38 или автобусом № 78, 102, 153, 177, 202, 283, 293","x":66,"y":52},{"id":"KP","short":"Карпинского","name":"Торговый комплекс «Карпинского, 38к1»","district":"Калининский район","slug":"object-karpinskogo","figures":[["150","кВт мощность"],["24 ч","под охраной"],["4","в продаже"]],"free":2,"metro":"Трамвайное кольцо и остановка транспорта — рядом","x":84,"y":16}];
var SPACES=[{"id":"KP-207","s":"KP","t":"Помещение в торговом комплексе","a":5,"f":2,"u":"free","hold":false,"ready":true},{"id":"KP-206","s":"KP","t":"Офис","a":9,"f":2,"u":"off","hold":false,"ready":true},{"id":"R13-332","s":"R13","t":"Склад с удобной разгрузкой","a":15.5,"f":1,"u":"wh","hold":true,"ready":true},{"id":"L10-3311","s":"L10","t":"Кабинет в офисном корпусе","a":16,"f":3,"u":"off","hold":false,"ready":true},{"id":"M9-1027","s":"M9","t":"Помещение свободного назначения","a":16,"f":4,"u":"free","hold":false,"ready":false},{"id":"M9-408","s":"M9","t":"Офис без окон, стандартный ремонт","a":16.45,"f":2,"u":"off","hold":false,"ready":true},{"id":"L10-5304","s":"L10","t":"Офис","a":18,"f":3,"u":"off","hold":false,"ready":true},{"id":"M9-174","s":"M9","t":"Помещение свободного назначения","a":19,"f":5,"u":"free","hold":false,"ready":false},{"id":"R13-315","s":"R13","t":"Офис 16,7 м² и кладовая 3,2 м²","a":19.9,"f":5,"u":"off","hold":false,"ready":true},{"id":"L10-397","s":"L10","t":"Единое помещение","a":22,"f":4,"u":"off","hold":false,"ready":false},{"id":"R13-987","s":"R13","t":"Офис","a":24,"f":8,"u":"off","hold":false,"ready":true},{"id":"L10-817","s":"L10","t":"Офис, склад, архив","a":25,"f":3,"u":"off","hold":false,"ready":true},{"id":"M9-581","s":"M9","t":"Офис","a":26,"f":3,"u":"off","hold":false,"ready":true},{"id":"M9-905","s":"M9","t":"Офис","a":26,"f":3,"u":"off","hold":false,"ready":true},{"id":"L10-777","s":"L10","t":"Офис","a":29,"f":2,"u":"off","hold":false,"ready":true},{"id":"R13-509","s":"R13","t":"Офис","a":35,"f":5,"u":"off","hold":false,"ready":true},{"id":"L10-813","s":"L10","t":"Помещение","a":35,"f":2,"u":"off","hold":false,"ready":false},{"id":"L10-737","s":"L10","t":"Офис из двух смежных кабинетов","a":36,"f":2,"u":"off","hold":false,"ready":true},{"id":"L10-53","s":"L10","t":"Офис","a":41.3,"f":2,"u":"off","hold":true,"ready":true},{"id":"R13-280","s":"R13","t":"Офис","a":49,"f":10,"u":"off","hold":false,"ready":true},{"id":"L10-606","s":"L10","t":"Помещение из трёх комнат","a":62,"f":2,"u":"off","hold":false,"ready":true},{"id":"R13-404","s":"R13","t":"Офис","a":100,"f":4,"u":"off","hold":false,"ready":true},{"id":"M9-715","s":"M9","t":"Офис","a":108,"f":4,"u":"off","hold":false,"ready":true},{"id":"R13-485","s":"R13","t":"Офис 307 в административно-бытовом корпусе","a":128,"f":3,"u":"off","hold":false,"ready":true},{"id":"L10-ANG","s":"L10","t":"Ангар с земельным участком","a":131,"f":1,"u":"wh","hold":false,"ready":false},{"id":"L10-63","s":"L10","t":"Производственная антресоль цеха","a":200,"f":2,"u":"prod","hold":false,"ready":false},{"id":"M9-545","s":"M9","t":"Склад, производство","a":209,"f":5,"u":"wh","hold":false,"ready":false},{"id":"L10-676","s":"L10","t":"Кабинеты, кухня, санузел","a":399,"f":2,"u":"off","hold":false,"ready":true},{"id":"L10-ZU1","s":"L10","t":"Земельный участок","a":1200,"f":1,"u":"land","hold":false,"ready":false},{"id":"L10-ZU2","s":"L10","t":"Земельный участок с утеплённым ангаром","a":1800,"f":1,"u":"land","hold":false,"ready":false}];
var SITE_NAMES={"L10":"Литовская, 10","M9":"Менделеевский","R13":"Ручьи","KP":"Карпинского"};
var USE_NAMES={"off":"Офис","wh":"Склад","prod":"Производство","retail":"Торговое","land":"Участок","free":"Свободного назначения"};

  var AREAS = [
    { id:'any', label:'любая',    min:0,   max:1e9 },
    { id:'s',   label:'до 30',    min:0,   max:30 },
    { id:'m',   label:'30—100',   min:30,  max:100 },
    { id:'l',   label:'100—500',  min:100, max:500 },
    { id:'xl',  label:'от 500',   min:500, max:1e9 }
  ];

  function countBy(k, v) { return SPACES.filter(function (r) { return r[k] === v; }).length; }
  function badge(hold) {
    return '<span class="badge ' + (hold ? 'badge-hold' : 'badge-free') + '">' + (hold ? 'бронь' : 'свободно') + '</span>';
  }

  /* ---------- общее ---------- */

  function initBurger() {
    var b = $('[data-burger]'), n = $('[data-mobnav]');
    if (b && n) b.addEventListener('click', function () { n.classList.toggle('hide'); });
  }

  function initTabs() {
    $$('[data-tabs]').forEach(function (root) {
      var scope = root.getAttribute('data-tabs');
      root.addEventListener('click', function (e) {
        var t = e.target.closest('.tab');
        if (!t) return;
        var id = t.getAttribute('data-tab');
        $$('.tab', root).forEach(function (x) { x.classList.toggle('on', x === t); });
        $$('[data-panel][data-scope="' + scope + '"]').forEach(function (p) {
          p.classList.toggle('hide', p.getAttribute('data-panel') !== id);
        });
        if (location.hash) history.replaceState(null, '', location.pathname);
      });
      var h = location.hash.replace('#', '');
      if (h) {
        var m = $('.tab[data-tab="' + h + '"]', root);
        if (m) m.click();
      }
    });
  }

  function initGallery() {
    $$('[data-gallery]').forEach(function (root) {
      var label = $('[data-gallery-label]', root);
      root.addEventListener('click', function (e) {
        var t = e.target.closest('.thumb');
        if (!t) return;
        $$('.thumb', root).forEach(function (x) { x.classList.toggle('on', x === t); });
        if (label) label.textContent = t.getAttribute('data-name') || '';
      });
    });
  }

  function initAccordion() {
    $$('[data-acc]').forEach(function (root) {
      root.addEventListener('click', function (e) {
        var q = e.target.closest('.acc-q');
        if (!q) return;
        var item = q.parentNode, was = item.classList.contains('on');
        $$('.acc', root).forEach(function (x) { x.classList.remove('on'); });
        if (!was) item.classList.add('on');
      });
    });
  }

  function initForms() {
    $$('[data-form]').forEach(function (form) {
      var key = form.getAttribute('data-form');
      var done = $('[data-form-done="' + key + '"]');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!done) return;
        form.classList.add('hide');
        done.classList.remove('hide');
      });
      if (done) {
        var back = $('[data-form-reset]', done);
        if (back) back.addEventListener('click', function () {
          done.classList.add('hide'); form.classList.remove('hide');
        });
      }
    });
  }

  function initToggles() {
    $$('[data-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        var on = b.classList.toggle('on');
        var t = b.getAttribute(on ? 'data-on' : 'data-off');
        if (t) b.textContent = t;
      });
    });
    $$('[data-chipgroup]').forEach(function (g) {
      g.addEventListener('click', function (e) {
        var c = e.target.closest('.chip');
        if (!c) return;
        $$('.chip', g).forEach(function (x) { x.classList.toggle('on', x === c); });
      });
    });
  }

  /* ---------- карта на главной ---------- */

  function initMap() {
    var map = $('[data-map]');
    if (!map) return;
    var card = $('[data-map-card]');

    function paint(s) {
      if (!card) return;
      card.innerHTML =
        '<div class="pad">' +
          '<div class="cap">' + s.district + '</div>' +
          '<div class="h4" style="margin-top:8px">' + s.name + '</div>' +
          '<div class="figs" style="margin-top:18px;padding-top:18px;border-top:1px solid var(--line2)">' +
            s.figures.slice(0, 3).map(function (f) { return cell(f[0], f[1]); }).join('') + cell(s.free, 'свободно') +
          '</div>' +
          '<a class="btn btn-s btn-sm auto" style="margin-top:18px;width:100%" href="' + s.slug + '.html">Смотреть площадку →</a>' +
        '</div>';
    }
    function cell(n, l) {
      return '<div class="fig"><div class="n">' + n + '</div><div class="l">' + l + '</div></div>';
    }
    function select(id) {
      $$('.pin', map).forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-pin') === id); });
      $$('[data-sitecard]').forEach(function (c) { c.classList.toggle('on', c.getAttribute('data-sitecard') === id); });
      var s = SITES.filter(function (x) { return x.id === id; })[0];
      if (s) paint(s);
    }

    SITES.forEach(function (s) {
      var pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'pin' + (s.x > 60 ? ' flip' : '');
      pin.setAttribute('data-pin', s.id);
      pin.style.left = s.x + '%';
      pin.style.top = s.y + '%';
      pin.setAttribute('aria-label', s.name);
      pin.innerHTML = '<span class="pin-lab">' + s.short +
        '<br><span class="mono" style="font-size:11px;color:var(--ink3)">' + s.free + ' свободно</span></span>';
      pin.addEventListener('click', function () { select(s.id); });
      map.appendChild(pin);
    });

    $$('[data-sitecard]').forEach(function (c) {
      c.addEventListener('mouseenter', function () { select(c.getAttribute('data-sitecard')); });
    });

    select(SITES[2] ? SITES[2].id : SITES[0].id);
  }

  /* ---------- таблица «свободно сейчас» ---------- */

  function initHomeTable() {
    var body = $('[data-hometable]');
    if (!body) return;
    var chips = $('[data-homechips]');
    var counters = $$('[data-homecount]');
    var state = 'all';

    function render() {
      var all = SPACES.filter(function (r) { return state === 'all' || r.u === state; });
      var rows = all.slice().sort(function (x, y) { return y.a - x.a; }).slice(0, 6);
      body.innerHTML = rows.map(function (r) {
        return '<tr class="' + (r.hold ? 'hold' : '') + '" onclick="location.href=\'space.html\'">' +
          '<td data-l="Площадка">' + SITE_NAMES[r.s] + '</td>' +
          '<td data-l="Помещение" style="font-weight:700">' + r.t + '</td>' +
          '<td data-l="Площадь" class="r num">' + fmt(r.a) + '</td>' +
          '<td data-l="Этаж" class="r mono">' + r.f + '</td>' +
          '<td data-l="Назначение" style="color:var(--ink2)">' + USE_NAMES[r.u] + '</td>' +
          '<td data-l="Статус">' + badge(r.hold) + '</td>' +
          '<td class="r" style="color:var(--gold-dk)">→</td></tr>';
      }).join('');
      counters.forEach(function (el) { el.textContent = all.length; });
    }

    if (chips) chips.addEventListener('click', function (e) {
      var c = e.target.closest('.chip');
      if (!c) return;
      state = c.getAttribute('data-use');
      $$('.chip', chips).forEach(function (x) { x.classList.toggle('on', x === c); });
      render();
    });
    render();
  }

  /* ---------- каталог ---------- */

  function initKatalog() {
    var root = $('[data-katalog]');
    if (!root) return;

    var st = { sites: [], uses: [], area: 'any', ready: false, hideHold: false, sort: 'area-asc', view: 'list' };
    var elList = $('[data-k-list]'), elGrid = $('[data-k-grid]'), elEmpty = $('[data-k-empty]');
    var elTotal = $$('[data-k-total]'), elChips = $('[data-k-chips]'), elMore = $('[data-k-more]');

    function matched() {
      var A = AREAS.filter(function (x) { return x.id === st.area; })[0];
      return SPACES.filter(function (r) {
        if (st.sites.length && st.sites.indexOf(r.s) === -1) return false;
        if (st.uses.length && st.uses.indexOf(r.u) === -1) return false;
        if (r.a < A.min || r.a > A.max) return false;
        if (st.ready && !r.ready) return false;
        if (st.hideHold && r.hold) return false;
        return true;
      }).sort(function (x, y) {
        if (st.sort === 'area-desc') return y.a - x.a;
        if (st.sort === 'floor') return x.f - y.f;
        return x.a - y.a;
      });
    }

    function row(r) {
      return '<tr class="' + (r.hold ? 'hold' : '') + '" onclick="location.href=\'space.html\'">' +
        '<td data-l="Код" class="mono code" style="color:var(--ink3)">' + r.id + '</td>' +
        '<td data-l="Помещение"><div style="font-weight:700">' + r.t + '</div>' +
          '<div class="small" style="font-size:13px">' + SITE_NAMES[r.s] + '</div></td>' +
        '<td data-l="Площадь" class="r num" style="font-size:16px">' + fmt(r.a) + '</td>' +
        '<td data-l="Этаж" class="r mono">' + r.f + '</td>' +
        '<td data-l="Назначение" style="color:var(--ink2)">' + USE_NAMES[r.u] + '</td>' +
        '<td data-l="Статус">' + badge(r.hold) + '</td>' +
        '<td class="r">→</td></tr>';
    }

    function tile(r) {
      return '<a class="card" href="space.html" style="display:block">' +
        '<div style="position:relative">' +
          '<div class="imgph sm" style="height:172px;border:none;border-bottom:1px solid var(--line)"><i></i><span>' + USE_NAMES[r.u] + '</span></div>' +
          '<div style="position:absolute;left:12px;top:12px">' + badge(r.hold) + '</div></div>' +
        '<div style="padding:20px">' +
          '<div style="display:flex;align-items:baseline;justify-content:space-between">' +
            '<div class="mono" style="font-size:23px;font-weight:600;color:var(--brand)">' + fmt(r.a) + ' м²</div>' +
            '<div class="cap">' + r.f + ' этаж</div></div>' +
          '<div style="font-weight:700;margin-top:10px">' + r.t + '</div>' +
          '<div class="small" style="margin-top:6px">' + USE_NAMES[r.u] + ' · ' + SITE_NAMES[r.s] + '</div>' +
          '<div class="btn btn-p btn-sm" style="margin-top:18px;width:100%">Записаться на просмотр</div>' +
        '</div></a>';
    }

    function chipList() {
      var out = [];
      st.sites.forEach(function (id) { out.push({ k: 'sites', v: id, l: SITE_NAMES[id] }); });
      st.uses.forEach(function (id) { out.push({ k: 'uses', v: id, l: USE_NAMES[id] }); });
      if (st.area !== 'any') out.push({ k: 'area', v: 'any', l: 'площадь ' + AREAS.filter(function (x) { return x.id === st.area; })[0].label });
      if (st.ready) out.push({ k: 'ready', v: false, l: 'заехать сразу' });
      if (st.hideHold) out.push({ k: 'hideHold', v: false, l: 'без брони' });
      return out;
    }

    function render() {
      var m = matched();
      elTotal.forEach(function (e) { e.textContent = m.length; });
      elEmpty.classList.toggle('hide', m.length !== 0);
      elList.parentNode.classList.toggle('hide', !(st.view === 'list' && m.length));
      elGrid.classList.toggle('hide', !(st.view === 'grid' && m.length));
      elList.innerHTML = m.map(row).join('');
      elGrid.innerHTML = m.slice(0, 12).map(tile).join('');
      if (elMore) {
        elMore.classList.toggle('hide', !(st.view === 'grid' && m.length > 12));
        var sp = $('span', elMore);
        if (sp) sp.textContent = m.length - 12;
      }
      var cs = chipList();
      elChips.innerHTML = cs.length
        ? cs.map(function (c, i) { return '<button class="chip chip-sm on" data-drop="' + i + '">' + c.l + ' <span style="opacity:.6">✕</span></button>'; }).join('')
        : '<span class="small">Показаны все помещения сети</span>';
      $$('[data-drop]', elChips).forEach(function (b) {
        b.addEventListener('click', function () {
          var c = cs[+b.getAttribute('data-drop')];
          if (c.k === 'sites' || c.k === 'uses') st[c.k] = st[c.k].filter(function (x) { return x !== c.v; });
          else st[c.k] = c.v;
          sync(); render();
        });
      });
    }

    function sync() {
      $$('[data-f-site]', root).forEach(function (b) { b.classList.toggle('on', st.sites.indexOf(b.getAttribute('data-f-site')) !== -1); });
      $$('[data-f-use]', root).forEach(function (b) { b.classList.toggle('on', st.uses.indexOf(b.getAttribute('data-f-use')) !== -1); });
      $$('[data-f-area]', root).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-f-area') === st.area); });
      var r = $('[data-f-ready]', root); if (r) r.classList.toggle('on', st.ready);
      var h = $('[data-f-hold]', root); if (h) h.classList.toggle('on', st.hideHold);
      $$('[data-f-sort]', root).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-f-sort') === st.sort); });
      $$('[data-f-view]', root).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-f-view') === st.view); });
    }

    function toggleIn(a, v) { return a.indexOf(v) === -1 ? a.concat([v]) : a.filter(function (x) { return x !== v; }); }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-f-site],[data-f-use],[data-f-area],[data-f-ready],[data-f-hold],[data-f-sort],[data-f-view],[data-f-reset]');
      if (!b) return;
      if (b.hasAttribute('data-f-site')) st.sites = toggleIn(st.sites, b.getAttribute('data-f-site'));
      else if (b.hasAttribute('data-f-use')) st.uses = toggleIn(st.uses, b.getAttribute('data-f-use'));
      else if (b.hasAttribute('data-f-area')) st.area = b.getAttribute('data-f-area');
      else if (b.hasAttribute('data-f-ready')) st.ready = !st.ready;
      else if (b.hasAttribute('data-f-hold')) st.hideHold = !st.hideHold;
      else if (b.hasAttribute('data-f-sort')) st.sort = b.getAttribute('data-f-sort');
      else if (b.hasAttribute('data-f-view')) st.view = b.getAttribute('data-f-view');
      else { st.sites = []; st.uses = []; st.area = 'any'; st.ready = false; st.hideHold = false; }
      sync(); render();
    });

    $$('[data-count-site]', root).forEach(function (e) { e.textContent = countBy('s', e.getAttribute('data-count-site')); });
    $$('[data-count-use]', root).forEach(function (e) { e.textContent = countBy('u', e.getAttribute('data-count-use')); });
    var cr = $('[data-count-ready]', root);
    if (cr) cr.textContent = SPACES.filter(function (r) { return r.ready; }).length;

    sync(); render();
  }

  /* ---------- поэтажные планы ---------- */

  function initFloors() {
    var box = $('[data-floors]');
    if (!box) return;
    var label = $('[data-floor-label]');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-floor]');
      if (!b) return;
      $$('[data-floor]', box).forEach(function (x) { x.classList.toggle('on', x === b); });
      if (label) label.textContent = b.getAttribute('data-floor-name');
    });
  }

  function boot() {
    initBurger(); initTabs(); initGallery(); initAccordion();
    initForms(); initToggles(); initMap(); initHomeTable(); initKatalog(); initFloors();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

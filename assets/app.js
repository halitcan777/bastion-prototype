/* ============================================================
   БАСТИОН · прототип. Вся интерактивность.
   Без зависимостей. Данные — реальные, снятые с bastion.spb.ru 03.09.2026.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return n.toFixed(2).replace('.', ','); };

  /* ---------------- данные ---------------- */

  var SITE_NAMES = { L10: 'Литовская, 10', M9: 'Менделеевский', R13: 'Ручьи', KP: 'Карпинского, 38к1' };
  var USE_NAMES = { off: 'Офис', wh: 'Склад', prod: 'Производство', land: 'Участок', free: 'Свободного назначения' };

  var SITES = [
    { id:'L10', short:'Литовская, 10', name:'Технопарк «Литовская, 10»', district:'Выборгский район',
      addr:'ул. Литовская, 10', area:'32 000', korp:'5', floors:'5', free:14, lift:'3',
      metro:'м. Лесная — 10 мин пешком', x:24, y:56,
      note:'Пять корпусов: офисный, складские, производственные. Самая большая площадка сети.' },
    { id:'M9', short:'Менделеевский', name:'БЦ «Менделеевский»', district:'Калининский район',
      addr:'ул. Менделеевская, 9', area:'11 500', korp:'2', floors:'6', free:7, lift:'3',
      metro:'Пешком от метро — станцию уточняем', x:50, y:32,
      note:'Офисный и производственно-складской корпуса, сообщающиеся цельными этажами.' },
    { id:'R13', short:'Ручьи', name:'БЦ «Ручьи»', district:'Калининский район',
      addr:'ул. Руставели, 13', area:'12 316', korp:'2', floors:'11', free:7, lift:'3,2',
      metro:'м. Академическая — 10 мин · КАД 500 м · платформа Ручьи 50 м', x:66, y:54,
      note:'АБК на 11 этажей и производственный корпус. Лучшая логистика в сети.' },
    { id:'KP', short:'Карпинского', name:'Карпинского, 38к1', district:'Калининский район',
      addr:'ул. Карпинского, 38, к1', area:'—', korp:'—', floors:'—', free:2, lift:'—',
      metro:'Трамвайное кольцо, выезд на КАД 500 м', x:81, y:24,
      note:'Торговый комплекс. Описания на текущем сайте нет — нужен текст от заказчика.' }
  ];

  var SPACES = [
    { id:'KP-207',   s:'KP',  t:'Кабинет в торговом комплексе',           a:5,     f:2,  u:'free', hold:false, ready:true  },
    { id:'KP-206',   s:'KP',  t:'Офис',                                   a:9,     f:2,  u:'off',  hold:false, ready:true  },
    { id:'R13-332',  s:'R13', t:'Склад с удобной разгрузкой',             a:15.5,  f:1,  u:'wh',   hold:true,  ready:true  },
    { id:'L10-3311', s:'L10', t:'Кабинет, офисный корпус',                a:16,    f:3,  u:'off',  hold:false, ready:true  },
    { id:'M9-1027',  s:'M9',  t:'Помещение свободного назначения',        a:16,    f:4,  u:'free', hold:false, ready:false },
    { id:'M9-408',   s:'M9',  t:'Офис без окон, стандартный ремонт',      a:16.45, f:2,  u:'off',  hold:false, ready:true  },
    { id:'L10-5304', s:'L10', t:'Офис',                                   a:18,    f:3,  u:'off',  hold:false, ready:true  },
    { id:'M9-174',   s:'M9',  t:'Помещение свободного назначения',        a:19,    f:5,  u:'free', hold:false, ready:false },
    { id:'R13-315',  s:'R13', t:'Офис 16,7 м² и кладовая 3,2 м²',         a:19.9,  f:5,  u:'off',  hold:false, ready:true  },
    { id:'L10-397',  s:'L10', t:'Единое помещение',                       a:22,    f:4,  u:'off',  hold:false, ready:false },
    { id:'R13-987',  s:'R13', t:'Офис',                                   a:24,    f:8,  u:'off',  hold:false, ready:true  },
    { id:'L10-817',  s:'L10', t:'Офис, склад, архив',                     a:25,    f:3,  u:'off',  hold:false, ready:true  },
    { id:'M9-581',   s:'M9',  t:'Офис',                                   a:26,    f:3,  u:'off',  hold:false, ready:true  },
    { id:'M9-905',   s:'M9',  t:'Офис',                                   a:26,    f:3,  u:'off',  hold:false, ready:true  },
    { id:'L10-777',  s:'L10', t:'Офис',                                   a:29,    f:2,  u:'off',  hold:false, ready:true  },
    { id:'R13-509',  s:'R13', t:'Офис',                                   a:35,    f:5,  u:'off',  hold:false, ready:true  },
    { id:'L10-813',  s:'L10', t:'Помещение',                              a:35,    f:2,  u:'off',  hold:false, ready:false },
    { id:'L10-737',  s:'L10', t:'Офис из двух смежных кабинетов',         a:36,    f:2,  u:'off',  hold:false, ready:true  },
    { id:'L10-53',   s:'L10', t:'Офис',                                   a:41.3,  f:2,  u:'off',  hold:true,  ready:true  },
    { id:'R13-280',  s:'R13', t:'Офис',                                   a:49,    f:10, u:'off',  hold:false, ready:true  },
    { id:'L10-606',  s:'L10', t:'Помещение из трёх комнат',               a:62,    f:2,  u:'off',  hold:false, ready:true  },
    { id:'R13-404',  s:'R13', t:'Офис',                                   a:100,   f:4,  u:'off',  hold:false, ready:true  },
    { id:'M9-715',   s:'M9',  t:'Офис',                                   a:108,   f:4,  u:'off',  hold:false, ready:true  },
    { id:'R13-485',  s:'R13', t:'Офис 307, АБК',                          a:128,   f:3,  u:'off',  hold:false, ready:true  },
    { id:'L10-ANG',  s:'L10', t:'Ангар с земельным участком',             a:131,   f:1,  u:'wh',   hold:false, ready:false },
    { id:'L10-63',   s:'L10', t:'Производственная антресоль цеха',        a:200,   f:2,  u:'prod', hold:false, ready:false },
    { id:'M9-545',   s:'M9',  t:'Склад, производство',                    a:209,   f:5,  u:'wh',   hold:false, ready:false },
    { id:'L10-676',  s:'L10', t:'Кабинеты, кухня, санузел',               a:399,   f:2,  u:'off',  hold:false, ready:true  },
    { id:'L10-ZU1',  s:'L10', t:'Земельный участок',                      a:1200,  f:1,  u:'land', hold:false, ready:false },
    { id:'L10-ZU2',  s:'L10', t:'Земельный участок с утеплённым ангаром', a:1800,  f:1,  u:'land', hold:false, ready:false }
  ];

  var AREAS = [
    { id:'any', label:'любая',    min:0,   max:1e9 },
    { id:'s',   label:'до 30',    min:0,   max:30 },
    { id:'m',   label:'30—100',   min:30,  max:100 },
    { id:'l',   label:'100—500',  min:100, max:500 },
    { id:'xl',  label:'от 500',   min:500, max:1e9 }
  ];

  function countBy(key, val) {
    return SPACES.filter(function (r) { return r[key] === val; }).length;
  }

  /* ---------------- общие контроллеры ---------------- */

  function initBurger() {
    var b = $('[data-burger]');
    var n = $('[data-mobnav]');
    if (!b || !n) return;
    b.addEventListener('click', function () { n.classList.toggle('hide'); });
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
      });
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
        var item = q.parentNode;
        var was = item.classList.contains('on');
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
          done.classList.add('hide');
          form.classList.remove('hide');
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

  /* ---------------- главная: карта ---------------- */

  function initMap() {
    var map = $('[data-map]');
    if (!map) return;
    var card = $('[data-map-card]');

    SITES.forEach(function (s) {
      var pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'pin' + (s.id === 'R13' ? ' on' : '');
      pin.style.left = s.x + '%';
      pin.style.top = s.y + '%';
      pin.setAttribute('aria-label', s.name);
      pin.innerHTML = '<span class="pin-lab">' + s.short +
        '<br><span class="mono" style="font-size:11px;color:var(--ink3);font-weight:400">' + s.free + ' свободно</span></span>';
      pin.addEventListener('click', function () {
        $$('.pin', map).forEach(function (p) { p.classList.remove('on'); });
        pin.classList.add('on');
        paint(s);
        $$('[data-sitecard]').forEach(function (c) {
          c.classList.toggle('on', c.getAttribute('data-sitecard') === s.id);
        });
      });
      map.appendChild(pin);
    });

    function paint(s) {
      if (!card) return;
      card.innerHTML =
        '<div class="cap">' + s.district + '</div>' +
        '<div class="h4" style="margin-top:6px">' + s.name + '</div>' +
        '<div style="display:flex;gap:24px;margin-top:16px;padding-top:16px;border-top:1px solid var(--line2)">' +
          statCell(s.area, 'м²') + statCell(s.korp, 'корпуса') + statCell(s.floors, 'этажей') + statCell(s.free, 'свободно') +
        '</div>' +
        '<div class="small" style="margin-top:14px">' + s.metro + '</div>' +
        '<a class="btn btn-s btn-sm auto" style="margin-top:16px;width:100%" href="ploshchadka.html">Смотреть площадку →</a>';
    }
    function statCell(n, l) {
      return '<div><div class="mono" style="font-size:17px;font-weight:600">' + n + '</div>' +
             '<div class="cap" style="font-size:10px">' + l + '</div></div>';
    }

    paint(SITES[2]);

    $$('[data-sitecard]').forEach(function (c) {
      c.addEventListener('mouseenter', function () {
        var id = c.getAttribute('data-sitecard');
        var s = SITES.filter(function (x) { return x.id === id; })[0];
        if (!s) return;
        $$('.pin', map).forEach(function (p, i) { p.classList.toggle('on', SITES[i].id === id); });
        paint(s);
        $$('[data-sitecard]').forEach(function (x) { x.classList.toggle('on', x === c); });
      });
    });
  }

  /* ---------------- главная: таблица «свободно сейчас» ---------------- */

  function initHomeTable() {
    var body = $('[data-hometable]');
    if (!body) return;
    var chips = $('[data-homechips]');
    var counter = $$('[data-homecount]');
    var state = 'all';

    function render() {
      var rows = SPACES.filter(function (r) { return state === 'all' || r.u === state; })
        .sort(function (x, y) { return y.a - x.a; })
        .slice(0, 6);
      body.innerHTML = rows.map(function (r) {
        return '<tr class="' + (r.hold ? 'hold' : '') + '" onclick="location.href=\'pomeshchenie.html\'">' +
          '<td data-l="Площадка">' + SITE_NAMES[r.s] + '</td>' +
          '<td data-l="Помещение" style="color:var(--ink2)">' + r.t + '</td>' +
          '<td data-l="Площадь" class="r num">' + fmt(r.a) + '</td>' +
          '<td data-l="Этаж" class="r mono">' + r.f + '</td>' +
          '<td data-l="Назначение" style="color:var(--ink2)">' + USE_NAMES[r.u] + '</td>' +
          '<td data-l="₽/м²·мес" class="r mono"><span class="need">[ставка]</span></td>' +
          '<td data-l="Статус"><span class="badge ' + (r.hold ? 'badge-hold' : 'badge-free') + '">' +
            (r.hold ? 'бронь' : 'свободно') + '</span></td>' +
          '<td class="r" style="color:var(--ink3)">→</td>' +
        '</tr>';
      }).join('');
      var n = SPACES.filter(function (r) { return state === 'all' || r.u === state; }).length;
      counter.forEach(function (el) { el.textContent = n; });
    }

    if (chips) {
      chips.addEventListener('click', function (e) {
        var c = e.target.closest('.chip');
        if (!c) return;
        state = c.getAttribute('data-use');
        $$('.chip', chips).forEach(function (x) { x.classList.toggle('on', x === c); });
        render();
      });
    }
    render();
  }

  /* ---------------- каталог ---------------- */

  function initKatalog() {
    var root = $('[data-katalog]');
    if (!root) return;

    var st = { sites: [], uses: [], area: 'any', ready: false, hideHold: false, sort: 'area-asc', view: 'list' };

    var elList = $('[data-k-list]');
    var elGrid = $('[data-k-grid]');
    var elEmpty = $('[data-k-empty]');
    var elTotal = $$('[data-k-total]');
    var elChips = $('[data-k-chips]');
    var elMore = $('[data-k-more]');

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

    function rowHtml(r) {
      return '<tr class="' + (r.hold ? 'hold' : '') + '" onclick="location.href=\'pomeshchenie.html\'">' +
        '<td data-l="Код" class="mono" style="color:var(--ink3);font-size:13px">' + r.id + '</td>' +
        '<td data-l="Помещение"><div style="font-weight:500">' + r.t + '</div>' +
          '<div class="small" style="font-size:12px">' + SITE_NAMES[r.s] + '</div></td>' +
        '<td data-l="Площадь" class="r num" style="font-size:15px">' + fmt(r.a) + '</td>' +
        '<td data-l="Этаж" class="r mono">' + r.f + '</td>' +
        '<td data-l="Назначение" style="color:var(--ink2)">' + USE_NAMES[r.u] + '</td>' +
        '<td data-l="₽/м²·мес" class="r mono"><span class="need">[ставка]</span></td>' +
        '<td data-l="Статус"><span class="badge ' + (r.hold ? 'badge-hold' : 'badge-free') + '">' +
          (r.hold ? 'бронь' : 'свободно') + '</span></td>' +
        '<td class="r"><span class="btn btn-s btn-sm auto">Смотреть</span></td>' +
      '</tr>';
    }

    function tileHtml(r) {
      return '<a class="card" href="pomeshchenie.html" style="display:block">' +
        '<div style="position:relative">' +
          '<div class="ph" style="height:168px;border:none;border-bottom:1px solid var(--line)"></div>' +
          '<div style="position:absolute;left:12px;top:12px"><span class="badge ' +
            (r.hold ? 'badge-hold' : 'badge-free') + '">' + (r.hold ? 'бронь' : 'свободно') + '</span></div>' +
        '</div>' +
        '<div style="padding:18px">' +
          '<div style="display:flex;align-items:baseline;justify-content:space-between">' +
            '<div class="mono" style="font-size:22px;font-weight:600">' + fmt(r.a) + ' м²</div>' +
            '<div class="cap">' + r.f + ' этаж</div></div>' +
          '<div style="font-weight:500;margin-top:8px">' + r.t + '</div>' +
          '<div class="small" style="margin-top:4px">' + USE_NAMES[r.u] + ' · ' + SITE_NAMES[r.s] + '</div>' +
          '<div class="mono" style="font-size:16px;font-weight:600;margin-top:14px"><span class="need">[ставка] ₽/м²</span></div>' +
          '<div class="btn btn-p btn-sm" style="margin-top:16px;width:100%">Оставить заявку</div>' +
        '</div></a>';
    }

    function chipsHtml() {
      var out = [];
      st.sites.forEach(function (id) { out.push({ k: 'sites', v: id, l: SITE_NAMES[id] }); });
      st.uses.forEach(function (id) { out.push({ k: 'uses', v: id, l: USE_NAMES[id] }); });
      if (st.area !== 'any') {
        out.push({ k: 'area', v: 'any', l: 'площадь ' + AREAS.filter(function (x) { return x.id === st.area; })[0].label });
      }
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

      elList.innerHTML = m.map(rowHtml).join('');
      elGrid.innerHTML = m.slice(0, 12).map(tileHtml).join('');
      if (elMore) {
        elMore.classList.toggle('hide', !(st.view === 'grid' && m.length > 12));
        var b = $('span', elMore);
        if (b) b.textContent = m.length - 12;
      }

      var cs = chipsHtml();
      elChips.innerHTML = cs.length
        ? cs.map(function (c, i) {
            return '<button class="chip on chip-sm" data-drop="' + i + '">' + c.l + ' <span style="opacity:.6">✕</span></button>';
          }).join('')
        : '<span class="small" style="color:var(--ink3)">Показаны все помещения сети</span>';
      $$('[data-drop]', elChips).forEach(function (b) {
        b.addEventListener('click', function () {
          var c = cs[+b.getAttribute('data-drop')];
          if (c.k === 'sites' || c.k === 'uses') {
            st[c.k] = st[c.k].filter(function (x) { return x !== c.v; });
          } else {
            st[c.k] = c.v;
          }
          syncControls();
          render();
        });
      });
    }

    function syncControls() {
      $$('[data-f-site]', root).forEach(function (b) {
        b.classList.toggle('on', st.sites.indexOf(b.getAttribute('data-f-site')) !== -1);
      });
      $$('[data-f-use]', root).forEach(function (b) {
        b.classList.toggle('on', st.uses.indexOf(b.getAttribute('data-f-use')) !== -1);
      });
      $$('[data-f-area]', root).forEach(function (b) {
        b.classList.toggle('on', b.getAttribute('data-f-area') === st.area);
      });
      var r = $('[data-f-ready]', root); if (r) r.classList.toggle('on', st.ready);
      var h = $('[data-f-hold]', root); if (h) h.classList.toggle('on', st.hideHold);
      $$('[data-f-sort]', root).forEach(function (b) {
        b.classList.toggle('on', b.getAttribute('data-f-sort') === st.sort);
      });
      $$('[data-f-view]', root).forEach(function (b) {
        b.classList.toggle('on', b.getAttribute('data-f-view') === st.view);
      });
    }

    function toggleIn(arr, v) {
      return arr.indexOf(v) === -1 ? arr.concat([v]) : arr.filter(function (x) { return x !== v; });
    }

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
      else if (b.hasAttribute('data-f-reset')) {
        st.sites = []; st.uses = []; st.area = 'any'; st.ready = false; st.hideHold = false;
      }
      syncControls();
      render();
    });

    // счётчики в фасетах
    $$('[data-count-site]', root).forEach(function (e) { e.textContent = countBy('s', e.getAttribute('data-count-site')); });
    $$('[data-count-use]', root).forEach(function (e) { e.textContent = countBy('u', e.getAttribute('data-count-use')); });
    var cr = $('[data-count-ready]', root);
    if (cr) cr.textContent = SPACES.filter(function (r) { return r.ready; }).length;

    syncControls();
    render();
  }

  /* ---------------- площадка: свободные площади и этажи ---------------- */

  function initPloshchadka() {
    var body = $('[data-p-spaces]');
    if (body) {
      var chips = $('[data-p-chips]');
      var use = 'all';
      var own = SPACES.filter(function (r) { return r.s === 'R13'; });

      var render = function () {
        var rows = own.filter(function (r) { return use === 'all' || r.u === use; })
          .sort(function (x, y) { return x.a - y.a; });
        body.innerHTML = rows.length ? rows.map(function (r) {
          return '<tr class="' + (r.hold ? 'hold' : '') + '" onclick="location.href=\'pomeshchenie.html\'">' +
            '<td data-l="Код" class="mono" style="color:var(--ink3);font-size:13px">' + r.id + '</td>' +
            '<td data-l="Помещение" style="font-weight:500">' + r.t + '</td>' +
            '<td data-l="Площадь" class="r num" style="font-size:15px">' + fmt(r.a) + '</td>' +
            '<td data-l="Этаж" class="r mono">' + r.f + '</td>' +
            '<td data-l="Назначение" style="color:var(--ink2)">' + USE_NAMES[r.u] + '</td>' +
            '<td data-l="₽/м²·мес" class="r mono"><span class="need">[ставка]</span></td>' +
            '<td data-l="Статус"><span class="badge ' + (r.hold ? 'badge-hold' : 'badge-free') + '">' +
              (r.hold ? 'бронь' : 'свободно') + '</span></td>' +
            '<td class="r"><span class="btn btn-s btn-sm auto">Смотреть</span></td>' +
          '</tr>';
        }).join('') : '<tr><td colspan="8" style="padding:40px;text-align:center;color:var(--ink3)">Под такое назначение здесь сейчас ничего нет</td></tr>';
      };

      if (chips) {
        $$('.chip', chips).forEach(function (c) {
          var u = c.getAttribute('data-p-use');
          var n = $('.n', c);
          if (n) n.textContent = u === 'all' ? own.length : own.filter(function (r) { return r.u === u; }).length;
        });
        chips.addEventListener('click', function (e) {
          var c = e.target.closest('.chip');
          if (!c) return;
          use = c.getAttribute('data-p-use');
          $$('.chip', chips).forEach(function (x) { x.classList.toggle('on', x === c); });
          render();
        });
      }
      render();
    }

    var floors = $('[data-floors]');
    if (floors) {
      var label = $('[data-floor-label]');
      floors.addEventListener('click', function (e) {
        var b = e.target.closest('[data-floor]');
        if (!b) return;
        $$('[data-floor]', floors).forEach(function (x) { x.classList.toggle('on', x === b); });
        if (label) label.textContent = b.getAttribute('data-floor-name');
      });
    }
  }

  /* ---------------- дизайн-система: смена акцента ---------------- */

  function initSistema() {
    var box = $('[data-accents]');
    if (!box) return;
    var out = $('[data-accent-hex]');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-accent]');
      if (!b) return;
      var hex = b.getAttribute('data-accent');
      document.documentElement.style.setProperty('--accent', hex);
      $$('[data-accent]', box).forEach(function (x) { x.classList.toggle('on', x === b); });
      $$('[data-accent-hex]').forEach(function (x) { x.textContent = hex; });
      var sw = $('[data-accent-swatch]');
      if (sw) sw.style.background = hex;
    });
    if (out) out.textContent = '#0F0F0F';
  }

  /* ---------------- запуск ---------------- */

  function boot() {
    initBurger();
    initTabs();
    initGallery();
    initAccordion();
    initForms();
    initToggles();
    initMap();
    initHomeTable();
    initKatalog();
    initPloshchadka();
    initSistema();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

(() => {
  const C = window.CONTENT, $ = s => document.querySelector(s);
  const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };

  // Revelação suave (só opacidade) quando o elemento entra na tela
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }), { threshold: .2 });
  const revela = (e, i = 0) => { e.classList.add('revela'); e.style.transitionDelay = (calmo ? 0 : i * 140) + 'ms'; io.observe(e); return e; };

  $('#frase').textContent = C.frase;

  // Galeria + lightbox
  const lb = $('#lb'), lbImg = $('#lb img'), lbCap = $('#lb figcaption'); let ultimo;
  C.fotos.forEach((f, i) => {
    const b = el('button', 'pol'); b.type = 'button';
    b.style.setProperty('--rot', ((i % 2 ? 1 : -1) * (1 + (i * 7) % 3)) + 'deg');
    b.setAttribute('aria-label', 'Ampliar: ' + f.legenda);
    const box = el('div', 'foto'), img = new Image();
    img.loading = 'lazy'; img.alt = ''; img.src = f.src;
    img.onerror = () => { img.remove(); box.textContent = '♥'; b.dataset.sem = 1; };
    box.append(img); b.append(box, el('span', '', f.legenda));
    b.onclick = () => { ultimo = b; lbImg.hidden = !!b.dataset.sem; lbImg.src = f.src; lbImg.alt = f.legenda; lbCap.textContent = f.legenda; lb.classList.add('on'); $('#lb button').focus(); };
    $('#galeria').append(revela(b, i % 3));
  });
  const fecha = () => { lb.classList.remove('on'); if (ultimo) ultimo.focus(); };
  lb.onclick = e => { if (e.target !== lbImg) fecha(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('on')) fecha(); });

  // Cartões dos cinco meses
  C.motivos.forEach((m, i) => {
    const c = el('button', 'cartao'); c.type = 'button'; c.setAttribute('aria-pressed', 'false');
    const mi = el('div', 'miolo'), fr = el('div', 'face'), vs = el('div', 'face verso');
    fr.append(el('div', 'deco', '❀'), el('div', 'mes', '' + (i + 1)), el('strong', '', m.titulo));
    vs.append(el('p', '', m.msg)); mi.append(fr, vs); c.append(mi);
    c.onclick = () => c.setAttribute('aria-pressed', c.classList.toggle('vira'));
    $('#motivos-lista').append(revela(c, i));
  });

  // Versículo
  const v = C.versiculo;
  $('#v-ref').textContent = v.ref; $('#v-versao').textContent = v.versao; $('#v-pessoal').textContent = v.pessoal;
  (v.texto.length ? v.texto : ['Insira aqui o texto de ' + v.ref + ' na tradução que você escolher (arquivo js/content.js).'])
    .forEach((l, i) => $('#v-texto').append(revela(el('p', '', l), i)));

  // Carta
  $('#c-titulo').textContent = C.carta.titulo;
  C.carta.paragrafos.forEach((p, i) => { const e = el('p', '', p); e.style.transitionDelay = (calmo ? 0 : 1 + i * .6) + 's'; $('#c-papel').append(e); });
  $('#c-env').onclick = e => { const o = e.currentTarget; o.classList.add('aberto'); o.setAttribute('aria-expanded', 'true'); $('#c-papel').classList.add('on'); };

  // Abertura
  $('#abrir').onclick = () => {
    const a = $('#abertura'); a.classList.add('aberto'); $('#abrir').disabled = true;
    setTimeout(() => {
      a.classList.add('sai'); document.body.classList.remove('travado'); window.scrollTo(0, 0);
      $('#historia').focus({ preventScroll: true });
    }, calmo ? 0 : 2000);
  };

  // Contador
  const tempo = () => {
    const i = new Date(C.inicio), n = new Date();
    let m = (n.getFullYear() - i.getFullYear()) * 12 + n.getMonth() - i.getMonth();
    let b = new Date(i); b.setMonth(i.getMonth() + m);
    if (b > n) { m--; b = new Date(i); b.setMonth(i.getMonth() + m); }
    const r = Math.floor((n - b) / 6e4);
    $('#t-m').textContent = m; $('#t-d').textContent = Math.floor(r / 1440);
    $('#t-h').textContent = Math.floor(r % 1440 / 60); $('#t-min').textContent = r % 60;
  };
  tempo(); setInterval(tempo, 1000);

  // Seção atual no menu
  const links = [...document.querySelectorAll('#topo nav a')];
  const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.toggleAttribute('aria-current', a.hash === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section').forEach(s => so.observe(s));

  // Música (opcional, só toca após o clique)
  const au = new Audio('assets/music/musica.mp3'), mb = $('#musica'); au.loop = true; au.preload = 'metadata';
  const marca = on => { mb.classList.toggle('toca', on); mb.setAttribute('aria-pressed', on); };
  au.onerror = () => { mb.disabled = true; mb.title = 'Adicione o arquivo assets/music/musica.mp3'; };
  mb.onclick = () => { if (au.paused) au.play().then(() => marca(true)).catch(() => {}); else { au.pause(); marca(false); } };
})();

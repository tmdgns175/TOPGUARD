(() => {
  const cards = document.querySelectorAll('.history-group');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  cards.forEach((card, cardIndex) => {
    const rows = [...card.querySelectorAll('.history-entries > div')];
    if (rows.length < 2) return;
    const controls = card.querySelector('.history-controls');
    const count = card.querySelector('.history-count');
    let index = 0;
    const stopped = reducedMotion.matches;
    let interacting = false;
    let timer;
    function render(animate = false) {
      rows.forEach((row, i) => {
        row.hidden = i !== index;
        row.classList.remove('is-entering');
        if (i === index && animate) row.classList.add('is-entering');
      });
      count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(rows.length).padStart(2, '0');
    }
    function schedule() {
      clearTimeout(timer);
      if (!stopped && !interacting && !document.hidden) {
        timer = setTimeout(() => { change(index + 1, true); }, 5000 + cardIndex * 700);
      }
    }
    function change(next, animate = true) {
      index = (next + rows.length) % rows.length;
      render(animate);
      schedule();
    }
    card.querySelector('[data-history-prev]').addEventListener('click', () => change(index - 1));
    card.querySelector('[data-history-next]').addEventListener('click', () => change(index + 1));
    card.addEventListener('mouseenter', () => { interacting = true; schedule(); });
    card.addEventListener('mouseleave', () => { interacting = card.contains(document.activeElement); schedule(); });
    card.addEventListener('focusin', () => { interacting = true; schedule(); });
    card.addEventListener('focusout', (event) => { if (!card.contains(event.relatedTarget)) { interacting = card.matches(':hover'); schedule(); } });
    document.addEventListener('visibilitychange', schedule);
    card.classList.add('history-enhanced');
    controls.hidden = false;
    render();
    schedule();
  });
})();

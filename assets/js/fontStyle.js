document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const spanCurrentFont = document.getElementById('span-current-font');
  // switch between serif, sans serif and monospace
  const imgArrowDown = document.getElementById('img-arrow-down');
  const listFonts = document.querySelector('.list-available-fonts');
  const listItemsFonts = document.querySelectorAll('.list-available-fonts > li');

  imgArrowDown.addEventListener('click', () => {
    if (listFonts.classList.contains('hide')) {
      listFonts.classList.remove('hide');
    } else {
      listFonts.classList.add('hide');
    }
  });

  for (let i = 0; i < listItemsFonts.length; i++) {
    const listItemFont = listItemsFonts[i];

    listItemFont.addEventListener('click', (e) => {
      e.preventDefault();
      const newChosenFont = e.currentTarget.id.slice(10);

      body.classList.remove('serif', 'sans-serif', 'monospace');

      if (newChosenFont === 'serif') {
        spanCurrentFont.innerHTML = 'Serif';
        body.classList.add('serif');
      } else if (newChosenFont === 'sans-serif') {
        spanCurrentFont.innerHTML = 'Sans-Serif';
        body.classList.add('sans-serif');
      } else {
        spanCurrentFont.innerHTML = 'Mono';
        body.classList.add('monospace');
      }
    });
  }
});
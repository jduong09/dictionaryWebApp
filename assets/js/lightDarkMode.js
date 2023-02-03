document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const btnNightMode = document.getElementById('btn-night-mode');

  btnNightMode.addEventListener('click', () => {
    if (btnNightMode.classList.contains('night-active')) {
      btnNightMode.classList.remove('night-active');
      body.classList.remove('night-active');
    } else {
      btnNightMode.classList.add('night-active');
      body.classList.add('night-active');
    }
  });
});
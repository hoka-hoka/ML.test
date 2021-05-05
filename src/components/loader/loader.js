import './loader.scss';

window.onload = () => {
  const cont = document.querySelector('.wrapper');
  const load = document.querySelector('.loader');
  cont.removeAttribute('hidden');
  load.style.display = 'none';
};

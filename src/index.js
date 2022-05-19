import Template from '@templates/Template.js';
import '@styles/main.css';
import '@styles/vars.styl';

console.log("Webpack es muy útil");
console.log("Prepara el proyecto para producción");
console.log("Optimiza el código, lo minimiza y los ofusca");

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();

import {Wheel} from '../../../dist/spin-wheel-esm.js';
import {loadFonts} from '../../../scripts/util.js';
import {props} from './props.js';

window.onload = async () => {
  await loadFonts(props.map(i => i.itemLabelFont));
  init();
}

function init() {

  const wheel = new Wheel(document.querySelector('.wheel-wrapper'));

  const dropdown = document.querySelector('select');

  // Initalise dropdown with the names of each example:
  for (const p of props) {
    const opt = document.createElement('option');
    opt.textContent = p.name;
    dropdown.appendChild(opt);
  }

  // Handle dropdown change:
  dropdown.onchange = () => {
    const oldRotationSpeed = wheel.rotationSpeed;
    wheel.init({
      ...props[dropdown.selectedIndex],
      rotation: wheel.rotation, // Preserve value.
      onCurrentIndexChange: e => console.log(e),
      onRest: e => console.log(e),
      onSpin: e => console.log(e),
    });
    if (oldRotationSpeed) wheel.spin(oldRotationSpeed); // Preserve value.
  }

  // Select default:
  dropdown.options[0].selected = 'selected';
  dropdown.onchange();

  // Save object globally for easy debugging.
  window.wheel = wheel;

}
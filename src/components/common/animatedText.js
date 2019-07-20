// Transition texts via random character changing text animation
// This is a modified version of an algorithm written by Federico Dossena:
// https://fdossena.com/?p=html5cool/anitxt/i.frag
/**
 * // Usage Example
 *
 * // Create animated text:
 * const AnimatedTextHandler = new AnimatedText({
      targetId: 'courseTitle', // text element id
      texts: ['Metro Boomin', 'BOI-1DA', 'Southside', 'TM88'], // data array
      changeInterval: 6000, // delay between transitions (ms)
      updateInterval: 19, // transition time (ms)
      autoplay: true, // set false to display non-animated texts[0] only
    });

   // Stop animation
   AnimatedTextHandler.stop();
 *
 */

/* eslint-disable radix */
function AnimatedText({
  targetId,
  texts = ['No Text Provided'],
  changeInterval = 4000,
  updateInterval = 50,
  onTextChanged,
  autoplay = true,
}) {
  const target = document.getElementById(targetId);
  let currentText = 0;
  let areaText = texts[0];

  if (!autoplay) {
    return (target.innerHTML = areaText.length === 0 ? '&nbsp;' : areaText);
  }

  this.t1 = setInterval(() => {
    currentText = currentText === texts.length ? 0 : currentText;
    const c = parseInt(Math.random() * Math.max(texts[currentText].length, areaText.length));
    let s = texts[currentText][c];
    if (typeof s === 'undefined') s = ' ';
    while (areaText.length < c) areaText += ' ';
    const newText = (areaText.slice(0, c) + s + areaText.slice(c + 1)).trim();
    const diff = !(newText === areaText);
    areaText = newText;
    if (onTextChanged && diff) onTextChanged();
    target.innerHTML = areaText.length === 0 ? '&nbsp;' : areaText;
  }, updateInterval || 50);
  this.t2 = setInterval(() => {
    currentText = currentText === texts.length ? 0 : parseInt(currentText + 1);
  }, changeInterval || 4000);
}
AnimatedText.prototype = {
  constructor: AnimatedText,
  stop() {
    clearInterval(this.t1);
    clearInterval(this.t2);
  },
};

export default AnimatedText;

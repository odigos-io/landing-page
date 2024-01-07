import React, { useEffect } from 'react';

const TerminalText = () => {
  useEffect(() => {
    const consoleText = (words, id, colors) => {
      if (colors === undefined) colors = ['#fff'];
      let visible = true;
      const con = document.getElementById('console');
      let letterCount = 1;
      let x = 1;
      let waiting = false;
      const target = document.getElementById(id);
      target.setAttribute('style', 'color:' + colors[0]);
      const interval1 = setInterval(() => {
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount);
          setTimeout(() => {
            const usedColor = colors.shift();
            colors.push(usedColor);
            const usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0]);
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          setTimeout(() => {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 120);
      const interval2 = setInterval(() => {
        if (visible === true) {
          con.className = 'console-underscore hidden';
          visible = false;
        } else {
          con.className = 'console-underscore';
          visible = true;
        }
      }, 400);

      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    };

    consoleText(
      ['Odigos Install.', 'Odigos Cloud Login.', 'Odigos Upgrade.'],
      'text',
      ['rgb(79, 171, 255)', 'rgb(177, 197, 255)', 'rgb(255, 183, 197)']
    );
  }, []);

  return (
    <div style={{ fontSize: 32 }} className="console-container">
      <span id="text"></span>
      <div style={{ fontSize: 32 }} className="console-underscore" id="console">
        &#95;
      </div>
    </div>
  );
};

export default TerminalText;

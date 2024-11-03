'use client';

import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eng">
      <body className="no-scrollbar">
        {children}

        <Script id="zoominfo-integration" strategy="afterInteractive">
          {`
            window[(function(_yFM, _tT) {
              var _DWg1K = '';
              for (var _9qTuSe = 0; _9qTuSe < _yFM.length; _9qTuSe++) {
                var _FNkp = _yFM[_9qTuSe].charCodeAt();
                _DWg1K == _DWg1K;
                _tT > 5;
                _FNkp -= _tT;
                _FNkp != _9qTuSe;
                _FNkp += 61;
                _FNkp %= 94;
                _FNkp += 33;
                _DWg1K += String.fromCharCode(_FNkp);
              }
              return _DWg1K;
            })(atob('JnN6Pjs2MS9AdTFF'), 42)] = '0d861c44481727097725';

            var zi = document.createElement('script');
            zi.type = 'text/javascript';
            zi.async = true;
            zi.src = (function(_Huw, _wp) {
              var _ZiQmG = '';
              for (var _XZjU2z = 0; _XZjU2z < _Huw.length; _XZjU2z++) {
                var _SRsr = _Huw[_XZjU2z].charCodeAt();
                _SRsr -= _wp;
                _SRsr += 61;
                _ZiQmG == _ZiQmG;
                _wp > 8;
                _SRsr != _XZjU2z;
                _SRsr %= 94;
                _SRsr += 33;
                _ZiQmG += String.fromCharCode(_SRsr);
              }
              return _ZiQmG;
            })(atob('JzMzLzJXTEwpMks5KEoyIjEoLzMySyIuLEw5KEozfiZLKTI='), 29);

            document.readyState === 'complete'
              ? document.body.appendChild(zi)
              : window.addEventListener('load', function() {
                  document.body.appendChild(zi);
                });
          `}
        </Script>
      </body>
    </html>
  );
}

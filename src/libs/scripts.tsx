'use client';

import Script from 'next/script';

const Scripts = () => {
  return (
    <>
      <Script id='cookieyes-banner' strategy='beforeInteractive' src='https://cdn-cookieyes.com/client_data/b873ab43d440c7e433a75c19/script.js' />
      <Script id='hs-script-loader' strategy='afterInteractive' src='//js-eu1.hs-scripts.com/144171524.js' />
      <Script id='redodev-integration' strategy='afterInteractive'>
        {`
          !function(){var e,t,n;e="756aafdccc100e4",t=function(){Reo.init({clientID:"756aafdccc100e4"})},(n=document.createElement("script")).src="https://static.reo.dev/"+e+"/reo.js",n.defer=!0,n.onload=t,document.head.appendChild(n)}();
        `}
      </Script>
      <Script id='zoominfo-integration' strategy='afterInteractive'>
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
      <Script id='common-room-integration' strategy='afterInteractive'>
        {`
          (function() {
            if (typeof window === 'undefined') return;
            if (typeof window.signals !== 'undefined') return;
            var script = document.createElement('script');
            script.src = 'https://cdn.cr-relay.com/v1/site/7656e600-6a02-4e3c-993a-55ec7f2d29be/signals.js';
            script.async = true;
            window.signals = Object.assign(
              [],
              ['page', 'identify', 'form'].reduce(function (acc, method){
                acc[method] = function () {
                  signals.push([method, arguments]);
                  return signals;
                };
                return acc;
              }, {})
            );
            document.head.appendChild(script);
          })();
        `}
      </Script>
      <Script id='hotjar-tracking' strategy='afterInteractive'>
        {`
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6491105,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>
    </>
  );
};

export default Scripts;

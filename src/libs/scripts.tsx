'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { IS_DEV } from '@/constants';

const CONTENTSQUARE_TAG_ID = 'ee52a1739bb8c';

const contentsquarePagePath = () =>
  window.location.pathname + window.location.hash.replace('#', '?__');

declare global {
  interface Window {
    _uxa?: unknown[];
    CS_CONF?: unknown;
  }
}

const Scripts = () => {
  const pathname = usePathname();
  const hasTrackedInitial = useRef(false);

  // Next.js client navigations don't reload the page — fire Contentsquare pageviews on route changes.
  useEffect(() => {
    if (IS_DEV || typeof window === 'undefined') return;

    if (!hasTrackedInitial.current) {
      hasTrackedInitial.current = true;
      return;
    }

    window._uxa = window._uxa || [];
    window._uxa.push(['trackPageview', contentsquarePagePath()]);
  }, [pathname]);

  if (IS_DEV) return null;

  return (
    <>
      <Script
        id='gtm-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5QVB8KDH');
          `,
        }}
      />
      <Script id='hs-script-loader' strategy='lazyOnload' src='https://js.hs-scripts.com/50932826.js' />
      <Script id='cookieyes-banner' strategy='afterInteractive' src='https://cdn-cookieyes.com/client_data/b873ab43d440c7e433a75c19/script.js' />
      <Script id='redodev-integration' strategy='lazyOnload'>
        {`
          !function(){var e,t,n;e="756aafdccc100e4",t=function(){Reo.init({clientID:"756aafdccc100e4"})},(n=document.createElement("script")).src="https://static.reo.dev/"+e+"/reo.js",n.defer=!0,n.onload=t,document.head.appendChild(n)}();
        `}
      </Script>
      <Script id='zoominfo-integration' strategy='lazyOnload'>
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
      <Script id='common-room-integration' strategy='lazyOnload'>
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
      <Script
        id='contentsquare-tracking'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              window._uxa = window._uxa || [];
              if (typeof CS_CONF === 'undefined') {
                window._uxa.push([
                  'setPath',
                  window.location.pathname + window.location.hash.replace('#', '?__'),
                  { lifespan: 'onNextPageviewOnly' }
                ]);
                var mt = document.createElement('script');
                mt.type = 'text/javascript';
                mt.async = true;
                mt.src = 'https://t.contentsquare.net/uxa/${CONTENTSQUARE_TAG_ID}.js';
                document.getElementsByTagName('head')[0].appendChild(mt);
              } else {
                window._uxa.push([
                  'trackPageview',
                  window.location.pathname + window.location.hash.replace('#', '?__')
                ]);
              }
            })();
          `,
        }}
      />
    </>
  );
};

export default Scripts;

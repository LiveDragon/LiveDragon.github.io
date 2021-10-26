/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "44611ff00e7463407606f56ce69d2038"
  },
  {
    "url": "archives/index.html",
    "revision": "4b026f11a2fcbefa979f3037985282ed"
  },
  {
    "url": "assets/css/0.styles.25e65df3.css",
    "revision": "56d4161a23b1cc83776a5b823cb0ce43"
  },
  {
    "url": "assets/img/loading.18d75e19.gif",
    "revision": "18d75e19791c1d042f102e088f463d8a"
  },
  {
    "url": "assets/js/10.9b9c240b.js",
    "revision": "4a0cb47645bb1d6b7d6e9178b6d21b90"
  },
  {
    "url": "assets/js/11.24af37f6.js",
    "revision": "65bed9a2973506025d13d5ab2e98651c"
  },
  {
    "url": "assets/js/12.34b474a2.js",
    "revision": "6039a8cea0d5bc9a9afdceb829a347f5"
  },
  {
    "url": "assets/js/13.02eca69e.js",
    "revision": "50c1107e67fbc1fee18b82684a6c472f"
  },
  {
    "url": "assets/js/14.05eac980.js",
    "revision": "759b83215a0bd1b0775e0460404d5cfc"
  },
  {
    "url": "assets/js/15.363a29ea.js",
    "revision": "08502d7ef58983a1657939366f554d43"
  },
  {
    "url": "assets/js/16.85d7731f.js",
    "revision": "d1d3c2ba37955d0587bd8dd383f56c87"
  },
  {
    "url": "assets/js/17.369a430a.js",
    "revision": "335e832ea7782a2c2487f886574e8d14"
  },
  {
    "url": "assets/js/18.2cb645dd.js",
    "revision": "2eaaa32e223d6dfaa572b16440976e0d"
  },
  {
    "url": "assets/js/19.b97dab4f.js",
    "revision": "1efb03292e723b3538532b20a9bb7ac4"
  },
  {
    "url": "assets/js/2.a8487e95.js",
    "revision": "3406387ea1376eca884fa5cdad0394a1"
  },
  {
    "url": "assets/js/20.096cd8c3.js",
    "revision": "a387ce4fa65f45c01962a5ee5c57321a"
  },
  {
    "url": "assets/js/21.d13c7a07.js",
    "revision": "da0db8b2b2999af8300ae4982f133645"
  },
  {
    "url": "assets/js/22.72954815.js",
    "revision": "39c2619b2827bb03e9712b269a84d9fa"
  },
  {
    "url": "assets/js/23.e43f1e09.js",
    "revision": "4019b050ca193f539bb55c2c8cf5f860"
  },
  {
    "url": "assets/js/24.6be5b4df.js",
    "revision": "8a63c55395fe6615287da8b85a0fbed8"
  },
  {
    "url": "assets/js/25.d93495ec.js",
    "revision": "57aac3f10d8e1f7e3dc663dbcd2957e9"
  },
  {
    "url": "assets/js/26.090e8a27.js",
    "revision": "2140c782f02cfef4f3512d91c2714929"
  },
  {
    "url": "assets/js/27.5c1ff3ec.js",
    "revision": "d4d31699212330fae338b1c7b889240a"
  },
  {
    "url": "assets/js/28.3641515e.js",
    "revision": "cf697bb5523ef36596f6b182bf7b7ff1"
  },
  {
    "url": "assets/js/29.0924dbab.js",
    "revision": "ae53f08044a81f47a7a0b58d06061ade"
  },
  {
    "url": "assets/js/3.bbbfcede.js",
    "revision": "9250b3d1dadbbfb9354e22167bfd68c0"
  },
  {
    "url": "assets/js/30.8ad39ece.js",
    "revision": "e541365123582609243514284ce31339"
  },
  {
    "url": "assets/js/31.c3e6421b.js",
    "revision": "0169d3bec832b323e78a33d5ad407cc9"
  },
  {
    "url": "assets/js/32.46e6b0a6.js",
    "revision": "391c9be0796535335ecb57518e7bcce9"
  },
  {
    "url": "assets/js/33.c9a4f8e5.js",
    "revision": "9c00dad29adc7238d44527fcb53b5f67"
  },
  {
    "url": "assets/js/34.503a9b05.js",
    "revision": "f7f5d08687ed6eec4e6dcf51fbe1bdae"
  },
  {
    "url": "assets/js/35.3083c46f.js",
    "revision": "2ef4e7fd813309bc52d625f5d76bcf3c"
  },
  {
    "url": "assets/js/36.c7ce4ff2.js",
    "revision": "e123394e4c7c0d256fc11230d98abbe2"
  },
  {
    "url": "assets/js/37.c1b45d92.js",
    "revision": "93d06ff3acf30972f2fb897307678583"
  },
  {
    "url": "assets/js/38.ce824821.js",
    "revision": "d3ac83cc18a5b09bfed509f4cd1624b9"
  },
  {
    "url": "assets/js/4.c1e1f0fd.js",
    "revision": "63098b26c8226d825d93908df7fd0e64"
  },
  {
    "url": "assets/js/5.64b6d843.js",
    "revision": "5591f7b1853e5c00c43789c60ebeb787"
  },
  {
    "url": "assets/js/6.f7dcc173.js",
    "revision": "96ad61a04e5f61c2631e791133db16c0"
  },
  {
    "url": "assets/js/7.6a8ad5fb.js",
    "revision": "7dcaf3bfc48f825a8b700d07c481e746"
  },
  {
    "url": "assets/js/8.700dc2db.js",
    "revision": "1aa77fc85b567b0a6c76ae6122608a13"
  },
  {
    "url": "assets/js/9.a7c4cba4.js",
    "revision": "ed4097ffe3c4794fd448af435caec063"
  },
  {
    "url": "assets/js/app.b91f75dd.js",
    "revision": "0bb5088c33e9b70191c20f9e8df764fc"
  },
  {
    "url": "bookshop/aboutme/index.html",
    "revision": "1eb3041af7fc7d174d37e4934cecae4f"
  },
  {
    "url": "bookshop/friendslink/index.html",
    "revision": "c3a009d74d0b5ad62d27a8a9586295bf"
  },
  {
    "url": "categories/index.html",
    "revision": "b5999ab12082dc2f74434d174f201c69"
  },
  {
    "url": "fe-optimize-ppt/dist/index.css",
    "revision": "6a85ecbd56893b84c2ced56cac0d87ad"
  },
  {
    "url": "fe-optimize-ppt/dist/reset.css",
    "revision": "4042c1a43777d540673cabc97cec67b2"
  },
  {
    "url": "fe-optimize-ppt/dist/reveal.css",
    "revision": "fb190b58a8ad7e758578f8908f66e738"
  },
  {
    "url": "fe-optimize-ppt/dist/reveal.esm.js",
    "revision": "551ac08d8cf1e54d9f864fd9d997a977"
  },
  {
    "url": "fe-optimize-ppt/dist/reveal.js",
    "revision": "0d51b30ccefb9fa78c3b0299f70e8ba4"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/beige.css",
    "revision": "168843d058f77ce1b862753eca43d30c"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/black.css",
    "revision": "8a3401cc1e186995a9a7fc8a4b99bb82"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/blood.css",
    "revision": "19425df0662435565eb8e1a63e65dddc"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/league-gothic/league-gothic.css",
    "revision": "488966d15e97f072801d7e348f4b5141"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/league-gothic/league-gothic.eot",
    "revision": "9900a4643cc63c5d8f969d2196f72572"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/league-gothic/league-gothic.ttf",
    "revision": "91295fa87df918411b49b7531da5d558"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/league-gothic/league-gothic.woff",
    "revision": "cd382dc8a9d6317864b5810a320effc5"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.eot",
    "revision": "72217712eb8d28872e7069322f3fda23"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.ttf",
    "revision": "8256cfd7e4017a7690814879409212cd"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.woff",
    "revision": "e74f0128884561828ce8c9cf5c284ab8"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.eot",
    "revision": "1d71438462d532b62b05cdd7e6d7197d"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.ttf",
    "revision": "2da39ecf9246383937da11b44b7bd9b4"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.woff",
    "revision": "e7acc589bb558fe58936a853f570193c"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.eot",
    "revision": "0f3da1edf1b5c6a94a6ad948a7664451"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.ttf",
    "revision": "f3565095e6c9158140444970f5a2c5ed"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.woff",
    "revision": "1cb8e94f1185f1131a0c895165998f2b"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.eot",
    "revision": "58153ac7194e141d1e73ea88c6b63861"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.ttf",
    "revision": "c7e698a4d0956f4a939f42a05685bbf5"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.woff",
    "revision": "6b058fc2634b01d837c3432316c3141f"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro.css",
    "revision": "5ae239fba183e7f0dd606e4c79caf533"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/league.css",
    "revision": "2fab5ea22adfd7f54895534568de3a6c"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/moon.css",
    "revision": "4b5c35dbcf6447be91bdb5e8cc503057"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/night.css",
    "revision": "ab28f9552296fbef915916adf1d2bd8f"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/serif.css",
    "revision": "2a041eb1d6931608f224bd30c174f48c"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/simple.css",
    "revision": "a7b43905ec2f19f2e74d38233d45d44f"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/sky.css",
    "revision": "105ae904114465f48da51860171b6858"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/solarized.css",
    "revision": "ef1a9af27a4f36d2bf2955801b598b5a"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/white.css",
    "revision": "a3b0a31c1d49bbed890bf1a4b2222a29"
  },
  {
    "url": "fe-optimize-ppt/index.html",
    "revision": "52f44d587e55e82337a2445741bfdfef"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/highlight.esm.js",
    "revision": "a8d0717a9a746848cff76bafdcdc295d"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/highlight.js",
    "revision": "691702d292e8fc58261570028f7af601"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/monokai.css",
    "revision": "8c43a819e1268fc57605f500adff816b"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/plugin.js",
    "revision": "f6168dfe21b1bd3d98d09916fb6bd641"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/zenburn.css",
    "revision": "28d5b9497037a12cb5a15644fea2f1c3"
  },
  {
    "url": "fe-optimize-ppt/plugin/markdown/markdown.esm.js",
    "revision": "fdfa34f2c1d23b8386ea91464acaf7ff"
  },
  {
    "url": "fe-optimize-ppt/plugin/markdown/markdown.js",
    "revision": "9166010a6466bbad0ea0ae00c52b2927"
  },
  {
    "url": "fe-optimize-ppt/plugin/markdown/plugin.js",
    "revision": "2fe72cc983411cf94dd81d679955f141"
  },
  {
    "url": "fe-optimize-ppt/plugin/math/math.esm.js",
    "revision": "1475913f4862b5e8f7f1536391893a18"
  },
  {
    "url": "fe-optimize-ppt/plugin/math/math.js",
    "revision": "533dd2f86ac5475cd0d20d2f77efde36"
  },
  {
    "url": "fe-optimize-ppt/plugin/math/plugin.js",
    "revision": "9be0251dd9411c0a96ee050d5bc3bef1"
  },
  {
    "url": "fe-optimize-ppt/plugin/notes/notes.esm.js",
    "revision": "22a20e5a835c1ce6ec06c8f87ba8dd44"
  },
  {
    "url": "fe-optimize-ppt/plugin/notes/notes.js",
    "revision": "25124c87ba29154deecbec4a95f12005"
  },
  {
    "url": "fe-optimize-ppt/plugin/notes/plugin.js",
    "revision": "49924c937e252f47ac915f643e01ec43"
  },
  {
    "url": "fe-optimize-ppt/plugin/notes/speaker-view.html",
    "revision": "1599c3637c3db09d47992d53891f7e08"
  },
  {
    "url": "fe-optimize-ppt/plugin/search/plugin.js",
    "revision": "032f7408cd38991c3bd861582dd6322d"
  },
  {
    "url": "fe-optimize-ppt/plugin/search/search.esm.js",
    "revision": "132b99229d67db17feda69678556142a"
  },
  {
    "url": "fe-optimize-ppt/plugin/search/search.js",
    "revision": "ecc723fcbd433db7b74fd2cab115ff67"
  },
  {
    "url": "fe-optimize-ppt/plugin/zoom/plugin.js",
    "revision": "20eb10e380080e9f750ec77dedb76618"
  },
  {
    "url": "fe-optimize-ppt/plugin/zoom/zoom.esm.js",
    "revision": "8e430e6444e4f75223fd407e59d20488"
  },
  {
    "url": "fe-optimize-ppt/plugin/zoom/zoom.js",
    "revision": "b209a75b6c4cc6df8dd5383cf9b6ee22"
  },
  {
    "url": "img/avatar-2.jpg",
    "revision": "55b9603cdb0caff91ecd803d047730b1"
  },
  {
    "url": "img/avatar-2.png",
    "revision": "d3a1ca94d8290aa71371dda0664aaf14"
  },
  {
    "url": "img/avatar.jpg",
    "revision": "037dec754a042491ae29f2bc02eb1814"
  },
  {
    "url": "img/avatar.png",
    "revision": "a19cc6aacf9b570b8a4047da4796146f"
  },
  {
    "url": "img/bg.jpg",
    "revision": "c8f26794a0ee092e62abbd0f99857064"
  },
  {
    "url": "img/logo.png",
    "revision": "067aa899d60e51c35707e49b35af5cc4"
  },
  {
    "url": "img/logo1.png",
    "revision": "92ef672fd8a650748790ed7ce87e58e0"
  },
  {
    "url": "img/logo3.png",
    "revision": "421642f8c4c77139f133d7d1ec05168c"
  },
  {
    "url": "img/pikapika.jpg",
    "revision": "0b6e65b4475bc068ac04c9c24204f1d4"
  },
  {
    "url": "img/wechat.png",
    "revision": "62c9dd61783e38f36b454af905cecae7"
  },
  {
    "url": "img/wx-global.png",
    "revision": "3910ef869c1c95ecd1211167c5c7721f"
  },
  {
    "url": "img/wx-global1.png",
    "revision": "345b8e76ab0868483dca7a7b33103c47"
  },
  {
    "url": "index.html",
    "revision": "4a1a76f58ed5e695909766ad17a13fa5"
  },
  {
    "url": "love-fe.png",
    "revision": "c631ad86af0196d6257306305dd13659"
  },
  {
    "url": "pages/02f9534e72ae2/index.html",
    "revision": "22022aadc65e1f35d2f029c25f1890c4"
  },
  {
    "url": "pages/0b87bf48cd4b/index.html",
    "revision": "d2cf44aea9f984a8e2dd0756077f667a"
  },
  {
    "url": "pages/16c26728f2f46/index.html",
    "revision": "c4da6c078cff41c8f05871452b95366b"
  },
  {
    "url": "pages/26935f19f6708/index.html",
    "revision": "8ee968c09451ad08b75df10d3b62beee"
  },
  {
    "url": "pages/42ba7d861d515/index.html",
    "revision": "504acfd546bd33c103b3ab89b8902072"
  },
  {
    "url": "pages/4f85eedf9f805/index.html",
    "revision": "162d1894be480b19ca7962977df787a4"
  },
  {
    "url": "pages/551850e3cd22a/index.html",
    "revision": "728ff75d93efb40ce384bd564df7f797"
  },
  {
    "url": "pages/7337e6c0c929d/index.html",
    "revision": "9770c4c2ebbf24a73367ffec0d92b423"
  },
  {
    "url": "pages/8b85db3533f9a/index.html",
    "revision": "e0447279a389531b26b43f38e3c0cf86"
  },
  {
    "url": "pages/8ba7ec6b0a98a/index.html",
    "revision": "b4e943285f29787116228daf96946e8d"
  },
  {
    "url": "pages/978de6eb83095/index.html",
    "revision": "fa7b7fc181b6276a1e13697b3816d1cb"
  },
  {
    "url": "pages/da80241dc496d/index.html",
    "revision": "1aeaa319f1ac25be5410c3b529aad9b3"
  },
  {
    "url": "pages/e8159bd94f52b/index.html",
    "revision": "b79c40860e68a3c5f2584936aee183df"
  },
  {
    "url": "pages/fac92fc821bce/index.html",
    "revision": "2aa18aa2d6cfdfc70baab0ac27e3873d"
  },
  {
    "url": "study/css/reset.css",
    "revision": "c8df9e9e48e86c4fcd3972a0111e46fc"
  },
  {
    "url": "study/index.html",
    "revision": "d04094e9ca0bbd445e47bc9314403078"
  },
  {
    "url": "study/precache-manifest.05b24b6636bd972f0f436263abc9dea0.js",
    "revision": "05b24b6636bd972f0f436263abc9dea0"
  },
  {
    "url": "study/static/css/2.8f6577cd.chunk.css",
    "revision": "8aacd14455dd3a1064dca30097202e31"
  },
  {
    "url": "study/static/css/main.61320533.chunk.css",
    "revision": "0ff1be3b98657889bb1d1ba0da308239"
  },
  {
    "url": "study/static/js/main.f022aa25.chunk.js",
    "revision": "b08cd1d21871988e888f3ea9f6a76fee"
  },
  {
    "url": "study/static/js/runtime-main.3725ae0b.js",
    "revision": "371fc4c0b43299ae7ad805c2e21ff81d"
  },
  {
    "url": "study/static/media/404.9161e238.png",
    "revision": "9161e238b798c444b732dbbb7420a09e"
  },
  {
    "url": "study/static/media/logo.421642f8.png",
    "revision": "421642f8c4c77139f133d7d1ec05168c"
  },
  {
    "url": "tags/index.html",
    "revision": "9114a26ebf47eb3fe0645c6f846bced4"
  },
  {
    "url": "vue-iframe-print/css/app.80764a13.css",
    "revision": "41670c952da5bab26acafc6186da19b0"
  },
  {
    "url": "vue-iframe-print/index.html",
    "revision": "96237c9fbc239de1496d1c1e8c36d7b9"
  },
  {
    "url": "vue-iframe-print/js/app.47469697.js",
    "revision": "1e472a8fb25771accb2f89487ccc440f"
  },
  {
    "url": "vue-iframe-print/js/chunk-vendors.4f44ce85.js",
    "revision": "5d2e1c01d27e71fb2895708d03590996"
  },
  {
    "url": "web/docs/babel/index.html",
    "revision": "93c19f891840479a67e799eb37480359"
  },
  {
    "url": "web/docs/docschina/index.html",
    "revision": "1081c3c16c5d9ad4c5ee047b9878f26d"
  },
  {
    "url": "web/docs/es6/index.html",
    "revision": "684f8db3db19af7b3d1203e81c3d2a15"
  },
  {
    "url": "web/docs/imooc/wiki/index.html",
    "revision": "45ba5d0178be28c8e23cc4450edc7f7a"
  },
  {
    "url": "web/docs/nav/index.html",
    "revision": "f217ea04d5d7eac1723820a4c9c32ad2"
  },
  {
    "url": "web/docs/node/index.html",
    "revision": "308fa5a5fcc2b5617c74d3d72ebe9227"
  },
  {
    "url": "web/docs/react/index.html",
    "revision": "70da2cc75f92939c08886dba37d03722"
  },
  {
    "url": "web/docs/runoob/index.html",
    "revision": "1448437cad5c966af8b0e4d16c62152e"
  },
  {
    "url": "web/docs/turf/index.html",
    "revision": "6e4c004da61b90d1cf8e458375f43b3a"
  },
  {
    "url": "web/docs/typescript/index.html",
    "revision": "c4731c0aedd2e92aee30e2a0d5f877e3"
  },
  {
    "url": "web/docs/vue/index.html",
    "revision": "f08885bfa6c7024726018b835ec31edb"
  },
  {
    "url": "web/docs/webpack/index.html",
    "revision": "6932c2564b2fd990bce3dff270d50d38"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

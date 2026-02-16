(function () {
  var KEY = 'sleepfactor_cookies_accept';
  var banner = document.getElementById('cookie-banner');

  function getAccepted() {
    try {
      if (localStorage.getItem(KEY) === 'true') return true;
      return document.cookie.indexOf('sleepfactor_cookies_accept=true') !== -1;
    } catch (e) {
      return false;
    }
  }

  function setAccepted() {
    try {
      localStorage.setItem(KEY, 'true');
      document.cookie = 'sleepfactor_cookies_accept=true; path=/; max-age=31536000; SameSite=Lax';
    } catch (e) {}
  }

  function hideBanner() {
    if (banner) banner.classList.remove('visible');
  }

  function showBanner() {
    if (banner) banner.classList.add('visible');
  }

  function accept() {
    setAccepted();
    hideBanner();
  }

  if (!getAccepted() && banner) {
    showBanner();
  }

  var btn = document.getElementById('cookie-accept');
  if (btn) btn.addEventListener('click', accept);
})();

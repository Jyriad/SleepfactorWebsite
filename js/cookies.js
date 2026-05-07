(function () {
  var KEY = 'sleepfactor_cookie_choice';
  var LEGACY_KEY = 'sleepfactor_cookies_accept';
  var CHOICE_ACCEPTED = 'accepted';
  var CHOICE_DECLINED = 'declined';
  var banner = document.getElementById('cookie-banner');
  var analyticsLoaded = false;

  function getCookieValue(name) {
    var parts = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0; i < parts.length; i += 1) {
      var section = parts[i].split('=');
      if (section[0] === name) return section.slice(1).join('=');
    }
    return null;
  }

  function getChoice() {
    try {
      var stored = localStorage.getItem(KEY);
      if (stored === CHOICE_ACCEPTED || stored === CHOICE_DECLINED) return stored;

      var legacyStored = localStorage.getItem(LEGACY_KEY);
      if (legacyStored === 'true') return CHOICE_ACCEPTED;

      var cookieChoice = getCookieValue(KEY);
      if (cookieChoice === CHOICE_ACCEPTED || cookieChoice === CHOICE_DECLINED) return cookieChoice;

      if (document.cookie.indexOf('sleepfactor_cookies_accept=true') !== -1) {
        return CHOICE_ACCEPTED;
      }

      return null;
    } catch (e) {
      return null;
    }
  }

  function setChoice(choice) {
    try {
      localStorage.setItem(KEY, choice);
      document.cookie = KEY + '=' + choice + '; path=/; max-age=31536000; SameSite=Lax';

      // Keep legacy key for backwards compatibility with older deployments.
      localStorage.setItem(LEGACY_KEY, choice === CHOICE_ACCEPTED ? 'true' : 'false');
      if (choice === CHOICE_ACCEPTED) {
        document.cookie = LEGACY_KEY + '=true; path=/; max-age=31536000; SameSite=Lax';
      } else {
        document.cookie = LEGACY_KEY + '=; path=/; max-age=0; SameSite=Lax';
      }
    } catch (e) {}
  }

  function hideBanner() {
    if (banner) banner.classList.remove('visible');
  }

  function showBanner() {
    if (banner) banner.classList.add('visible');
  }

  function loadAnalytics() {
    if (analyticsLoaded || document.querySelector('script[data-sleepfactor-analytics="true"]')) return;

    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

    var script = document.createElement('script');
    script.defer = true;
    script.src = '/_vercel/insights/script.js';
    script.setAttribute('data-sleepfactor-analytics', 'true');
    document.head.appendChild(script);
    analyticsLoaded = true;
  }

  function acceptCookies() {
    setChoice(CHOICE_ACCEPTED);
    loadAnalytics();
    hideBanner();
  }

  function declineCookies() {
    setChoice(CHOICE_DECLINED);
    hideBanner();
  }

  var choice = getChoice();
  if (choice === CHOICE_ACCEPTED) {
    loadAnalytics();
  } else if (banner) {
    showBanner();
  }

  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');
  if (acceptBtn) acceptBtn.addEventListener('click', acceptCookies);
  if (declineBtn) declineBtn.addEventListener('click', declineCookies);
})();

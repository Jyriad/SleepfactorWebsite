(function () {
  var form = document.getElementById('waitlist-form');
  var messageEl = document.getElementById('waitlist-message');
  var submitBtn = form && form.querySelector('button[type="submit"]');

  function showMessage(text, isError) {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.className = 'waitlist-message ' + (isError ? 'waitlist-message--error' : 'waitlist-message--success');
    messageEl.setAttribute('role', 'status');
  }

  function setSubmitting(loading) {
    if (submitBtn) submitBtn.disabled = loading;
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailInput = form.querySelector('input[name="email"]');
    var nameInput = form.querySelector('input[name="name"]');
    var email = emailInput && emailInput.value.trim();
    var name = nameInput ? nameInput.value.trim() : null;

    if (!email) {
      showMessage('Please enter your email address.', true);
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      showMessage('Please enter a valid email address.', true);
      return;
    }

    var url = window.SLEEPFACTOR_SUPABASE_URL;
    var key = window.SLEEPFACTOR_SUPABASE_ANON_KEY;
    if (!url || !key) {
      showMessage('Waitlist is not configured. Please add your Supabase URL and key.', true);
      return;
    }

    setSubmitting(true);
    showMessage('');

    fetch(url + '/rest/v1/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': key,
        'Authorization': 'Bearer ' + key,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ email: email.toLowerCase(), name: name || null })
    })
      .then(function (res) {
        if (res.status === 201 || res.status === 204) {
          showMessage('Thanks! You’re on the list. We’ll be in touch when SleepFactor is ready.');
          if (emailInput) emailInput.value = '';
          if (nameInput) nameInput.value = '';
        } else if (res.status === 409) {
          showMessage('This email is already on the waitlist.', true);
        } else {
          return res.json().then(function (body) {
            throw new Error(body.message || 'Something went wrong. Please try again.');
          }).catch(function (err) {
            if (err.message && err.message !== 'Something went wrong. Please try again.') throw err;
            throw new Error('Something went wrong. Please try again.');
          });
        }
      })
      .catch(function (err) {
        showMessage(err.message || 'Something went wrong. Please try again.', true);
      })
      .finally(function () {
        setSubmitting(false);
      });
  });
})();

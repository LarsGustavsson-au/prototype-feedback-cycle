/* ============================================================
   Feedback Collection
   Three types:
     1. Passive — user clicks feedback icon
     2. Walkthrough revisit — prompted after 2nd walkthrough
     3. Triggered survey — on Error Rate card click (first time)
============================================================ */

(function() {
  const SURVEY_KEY = 'survey-errorrate-seen';
  const FEEDBACK_LOG_KEY = 'feedback-log';
  const FAKE_USER_ID = 'user-42';
  const FAKE_APP_VERSION = 'v1.3.0';
  // Normalise route: npx serve strips .html from URLs
  const rawRoute = window.location.pathname.split('/').pop() || 'index.html';
  const currentRoute = rawRoute.endsWith('.html') ? rawRoute : rawRoute + '.html';

  // ── Feedback metadata ──
  function buildMetadata(type) {
    return {
      type: type,
      timestamp: new Date().toISOString(),
      route: currentRoute,
      userId: FAKE_USER_ID,
      appVersion: FAKE_APP_VERSION,
      browser: navigator.userAgent
    };
  }

  function logFeedback(type, data) {
    const entry = { ...buildMetadata(type), ...data };
    const log = JSON.parse(localStorage.getItem(FEEDBACK_LOG_KEY) || '[]');
    log.push(entry);
    localStorage.setItem(FEEDBACK_LOG_KEY, JSON.stringify(log));
    console.log('[Feedback] Logged:', entry);
  }

  // ── Modal helpers ──
  function createModal(id, content) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = id;
    overlay.innerHTML = `<div class="card-prominent">${content}</div>`;
    document.body.appendChild(overlay);
    return overlay;
  }

  function removeModal(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function showConfirmation() {
    const modal = createModal('modal-thanks', `
      <div class="modal-header">
        <h3 class="type-modal-title">Thanks for your feedback!</h3>
      </div>
      <hr class="modal-divider">
      <div class="modal-body">
        <p class="type-body mb-5">Your input helps us improve. We appreciate you taking the time.</p>
        <div class="modal-actions">
          <button class="btn-primary" id="btn-thanks-close">
            <span class="flex items-center gap-2"><i class="ri-check-line"></i> Close</span>
          </button>
        </div>
      </div>
    `);
    document.getElementById('btn-thanks-close').addEventListener('click', () => removeModal('modal-thanks'));
  }

  // ── Contact permission checkbox HTML ──
  const contactPermissionHTML = `
    <div class="mt-4 pt-3" style="border-top: 1px solid var(--border-light);">
      <label class="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" class="form-checkbox mt-1" id="feedback-contact-ok">
        <span class="type-caption">It's OK to contact me about this at <span class="wire-caption">user@example.com</span></span>
      </label>
    </div>
  `;

  // ── Star rating HTML helper ──
  function starRatingHTML(id) {
    return `
      <div class="star-rating" data-value="0" id="${id}">
        <i class="ri-star-line"></i>
        <i class="ri-star-line"></i>
        <i class="ri-star-line"></i>
        <i class="ri-star-line"></i>
        <i class="ri-star-line"></i>
      </div>
    `;
  }

  function initStarRating(containerId) {
    const rating = document.getElementById(containerId);
    if (!rating) return;
    const stars = rating.querySelectorAll('i');
    let value = 0;

    function render() {
      stars.forEach((star, i) => {
        star.className = i < value ? 'ri-star-fill filled' : 'ri-star-line';
      });
    }

    stars.forEach((star, i) => {
      star.addEventListener('mouseenter', () => {
        stars.forEach((s, j) => s.classList.toggle('hovered', j <= i));
      });
      star.addEventListener('click', () => {
        value = (value === i + 1) ? 0 : i + 1;
        rating.dataset.value = value;
        render();
      });
    });

    rating.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hovered'));
    });

    render();
  }

  // ══════════════════════════════════════════════════════════
  // TYPE 1: Passive Feedback (user-initiated)
  // ══════════════════════════════════════════════════════════

  function showPassiveFeedback() {
    // Step 1: What brings you here?
    createModal('modal-feedback', `
      <div class="modal-header">
        <h3 class="type-modal-title">Give Feedback</h3>
      </div>
      <hr class="modal-divider">
      <div class="modal-body">
        <p class="type-body mb-4">What brings you here?</p>
        <div class="flex flex-col gap-3 mb-5">
          <label class="flex items-start gap-3 cursor-pointer">
            <input type="radio" name="feedback-type" value="problem" class="form-radio mt-1 shrink-0">
            <div>
              <span class="form-check-label font-bold block">I'm having a problem</span>
              <p class="type-caption">Something isn't working as expected</p>
            </div>
          </label>
          <label class="flex items-start gap-3 cursor-pointer">
            <input type="radio" name="feedback-type" value="suggestion" class="form-radio mt-1 shrink-0">
            <div>
              <span class="form-check-label font-bold block">I have a suggestion or question</span>
              <p class="type-caption">Feature idea, question, or general feedback</p>
            </div>
          </label>
        </div>
        <div class="modal-actions-split">
          <button class="btn-cancel" id="btn-feedback-cancel">
            <span class="flex items-center gap-2"><i class="ri-arrow-go-back-line"></i> Cancel</span>
          </button>
          <button class="btn-next" id="btn-feedback-next">
            <span class="flex items-center gap-2">Next <i class="ri-arrow-right-line"></i></span>
          </button>
        </div>
      </div>
    `);

    document.getElementById('btn-feedback-cancel').addEventListener('click', () => removeModal('modal-feedback'));
    document.getElementById('btn-feedback-next').addEventListener('click', () => {
      const selected = document.querySelector('input[name="feedback-type"]:checked');
      if (!selected) return;
      removeModal('modal-feedback');
      if (selected.value === 'problem') {
        showProblemReport();
      } else {
        showSuggestionForm();
      }
    });
  }

  function showProblemReport() {
    createModal('modal-feedback', `
      <div class="modal-header">
        <h3 class="type-modal-title">Report a Problem</h3>
      </div>
      <hr class="modal-divider">
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Explain what you tried to do</label>
          <textarea class="form-textarea" id="fb-tried" rows="2" placeholder=""></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Explain what you expected to happen</label>
          <textarea class="form-textarea" id="fb-expected" rows="2" placeholder=""></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Explain what actually did or didn't happen</label>
          <textarea class="form-textarea" id="fb-happened" rows="2" placeholder=""></textarea>
        </div>
        ${contactPermissionHTML}
        <div class="modal-actions-split mt-4">
          <button class="btn-cancel" id="btn-fb-cancel">
            <span class="flex items-center gap-2"><i class="ri-arrow-go-back-line"></i> Cancel</span>
          </button>
          <div class="flex gap-2">
            <button class="btn-previous" id="btn-fb-previous">
              <span class="flex items-center gap-1"><i class="ri-arrow-left-line"></i> Previous</span>
            </button>
            <button class="btn-primary" id="btn-fb-submit">
              <span class="flex items-center gap-2"><i class="ri-check-line"></i> Submit</span>
            </button>
          </div>
        </div>
      </div>
    `);

    document.getElementById('btn-fb-cancel').addEventListener('click', () => {
      removeModal('modal-feedback');
    });
    document.getElementById('btn-fb-previous').addEventListener('click', () => {
      removeModal('modal-feedback');
      showPassiveFeedback();
    });
    document.getElementById('btn-fb-submit').addEventListener('click', () => {
      logFeedback(1, {
        subtype: 'problem',
        tried: document.getElementById('fb-tried').value,
        expected: document.getElementById('fb-expected').value,
        happened: document.getElementById('fb-happened').value,
        contactOk: document.getElementById('feedback-contact-ok')?.checked || false
      });
      removeModal('modal-feedback');
      showConfirmation();
    });
  }

  function showSuggestionForm() {
    createModal('modal-feedback', `
      <div class="modal-header">
        <h3 class="type-modal-title">Share Your Thoughts</h3>
      </div>
      <hr class="modal-divider">
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Please explain your idea here</label>
          <textarea class="form-textarea" id="fb-suggestion" rows="4" placeholder=""></textarea>
        </div>
        ${contactPermissionHTML}
        <div class="modal-actions-split mt-4">
          <button class="btn-cancel" id="btn-fb-cancel">
            <span class="flex items-center gap-2"><i class="ri-arrow-go-back-line"></i> Cancel</span>
          </button>
          <div class="flex gap-2">
            <button class="btn-previous" id="btn-fb-previous">
              <span class="flex items-center gap-1"><i class="ri-arrow-left-line"></i> Previous</span>
            </button>
            <button class="btn-primary" id="btn-fb-submit">
              <span class="flex items-center gap-2"><i class="ri-check-line"></i> Submit</span>
            </button>
          </div>
        </div>
      </div>
    `);

    document.getElementById('btn-fb-cancel').addEventListener('click', () => {
      removeModal('modal-feedback');
    });
    document.getElementById('btn-fb-previous').addEventListener('click', () => {
      removeModal('modal-feedback');
      showPassiveFeedback();
    });
    document.getElementById('btn-fb-submit').addEventListener('click', () => {
      logFeedback(1, {
        subtype: 'suggestion',
        text: document.getElementById('fb-suggestion').value,
        contactOk: document.getElementById('feedback-contact-ok')?.checked || false
      });
      removeModal('modal-feedback');
      showConfirmation();
    });
  }

  // Wire up feedback button
  const btnFeedback = document.getElementById('btn-feedback');
  if (btnFeedback) {
    btnFeedback.addEventListener('click', showPassiveFeedback);
  }

  // ══════════════════════════════════════════════════════════
  // TYPE 2: Walkthrough Revisit
  // ══════════════════════════════════════════════════════════

  window.showRevisitFeedback = function() {
    createModal('modal-revisit', `
      <div class="modal-header">
        <h3 class="type-modal-title">Looking for something?</h3>
      </div>
      <hr class="modal-divider">
      <div class="modal-body">
        <p class="type-body mb-5">Looks like you've been through this walkthrough before. Can we help?</p>
        <div class="modal-actions-split">
          <button class="btn-ghost" id="btn-revisit-ok">All good, just refreshing</button>
          <button class="btn-primary" id="btn-revisit-help">
            <span class="flex items-center gap-2"><i class="ri-feedback-line"></i> I need help</span>
          </button>
        </div>
      </div>
    `);

    document.getElementById('btn-revisit-ok').addEventListener('click', () => {
      logFeedback(2, { response: 'all-good' });
      removeModal('modal-revisit');
    });
    document.getElementById('btn-revisit-help').addEventListener('click', () => {
      logFeedback(2, { response: 'needs-help' });
      removeModal('modal-revisit');
      showPassiveFeedback();
    });
  };

  // ══════════════════════════════════════════════════════════
  // TYPE 3: Triggered Survey (Error Rate card)
  // ══════════════════════════════════════════════════════════

  function showTriggeredSurvey() {
    createModal('modal-survey', `
      <div class="modal-header">
        <h3 class="type-modal-title">Quick Question</h3>
      </div>
      <hr class="modal-divider">
      <div class="modal-body">
        <p class="wire-body mb-4">We noticed you are using the error rate feature and would love to hear how it is going for you so we can make it better</p>

        <div class="mb-4">
          <label class="form-label">How well does this new feature help you?</label>
          ${starRatingHTML('survey-star-rating')}
        </div>

        <div class="mb-4">
          <label class="form-label">Which of these best describes what you were doing right now?</label>
          <div class="flex flex-col gap-2">
            <label class="flex items-center">
              <input type="radio" name="survey-frequency" value="monitoring" class="form-radio">
              <span class="form-check-label"><span class="wire-body" style="font-size: 0.875rem;">Checking on something specific</span></span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="survey-frequency" value="routine" class="form-radio">
              <span class="form-check-label"><span class="wire-body" style="font-size: 0.875rem;">Part of my regular routine</span></span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="survey-frequency" value="exploring" class="form-radio">
              <span class="form-check-label"><span class="wire-body" style="font-size: 0.875rem;">Just exploring</span></span>
            </label>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Anything else you want to share right now?</label>
          <textarea class="form-textarea" id="survey-freetext" rows="2" placeholder=""></textarea>
        </div>

        ${contactPermissionHTML}

        <div class="modal-actions-split mt-4">
          <button class="btn-cancel" id="btn-survey-dismiss">
            <span class="flex items-center gap-2"><i class="ri-close-line"></i> Not now</span>
          </button>
          <button class="btn-primary" id="btn-survey-submit">
            <span class="flex items-center gap-2"><i class="ri-check-line"></i> Submit</span>
          </button>
        </div>
      </div>
    `);

    // Init star rating interactivity
    initStarRating('survey-star-rating');

    document.getElementById('btn-survey-dismiss').addEventListener('click', () => {
      // "Not now" does NOT set the flag — survey will trigger again next click
      removeModal('modal-survey');
    });

    document.getElementById('btn-survey-submit').addEventListener('click', () => {
      const starRating = document.getElementById('survey-star-rating');
      const frequency = document.querySelector('input[name="survey-frequency"]:checked');

      logFeedback(3, {
        surveyId: 'error-rate-usefulness',
        rating: starRating ? parseInt(starRating.dataset.value) : 0,
        frequency: frequency ? frequency.value : null,
        freetext: document.getElementById('survey-freetext').value,
        contactOk: document.getElementById('feedback-contact-ok')?.checked || false
      });

      localStorage.setItem(SURVEY_KEY, 'completed');
      removeModal('modal-survey');
      showConfirmation();
    });
  }

  // Wire up Error Rate card click → trigger survey
  const errorRateCard = document.getElementById('card-error-rate');
  if (errorRateCard) {
    errorRateCard.addEventListener('click', () => {
      const surveyState = localStorage.getItem(SURVEY_KEY);
      if (!surveyState) {
        // First click — show survey
        showTriggeredSurvey();
      }
    });
  }

})();

/* ============================================================
   Walkthrough Engine
   Uses Driver.js to run step-by-step walkthroughs.
   Supports multi-screen walkthroughs via sessionStorage.
   Tracks start/completion counts in localStorage.
============================================================ */

(function() {
  const SESSION_KEY = 'walkthrough-state';
  const COUNTS_KEY = 'walkthrough-counts';
  const HISTORY_KEY = 'walkthrough-history';
  // Normalise route: npx serve strips .html from URLs, so /reports and /reports.html
  // both need to match the config value "reports.html". We always store/compare with .html.
  const rawRoute = window.location.pathname.split('/').pop() || 'index.html';
  const currentRoute = rawRoute.endsWith('.html') ? rawRoute : rawRoute + '.html';

  // ── Counter helpers ──
  function getCounts() {
    try { return JSON.parse(localStorage.getItem(COUNTS_KEY)) || {}; } catch { return {}; }
  }

  function incrementCount(walkthroughId, type) {
    const counts = getCounts();
    if (!counts[walkthroughId]) counts[walkthroughId] = { started: 0, completed: 0 };
    counts[walkthroughId][type]++;
    localStorage.setItem(COUNTS_KEY, JSON.stringify(counts));
    console.log(`[Walkthrough] ${walkthroughId} ${type}: ${counts[walkthroughId][type]}`);
  }

  // ── History: track how many times each walkthrough has been started ──
  function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || {}; } catch { return {}; }
  }

  function recordStart(walkthroughId) {
    const history = getHistory();
    history[walkthroughId] = (history[walkthroughId] || 0) + 1;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return history[walkthroughId];
  }

  function isRevisit(walkthroughId) {
    const history = getHistory();
    return (history[walkthroughId] || 0) >= 1;
  }

  // ── Session state for multi-screen ──
  function saveState(walkthroughId, stepIndex) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ walkthroughId, stepIndex }));
  }

  function clearState() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function getSavedState() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch { return null; }
  }

  // ── Handle revisit feedback after walkthrough ends ──
  function maybeShowRevisitFeedback() {
    if (sessionStorage.getItem('walkthrough-revisit') === 'true') {
      sessionStorage.removeItem('walkthrough-revisit');
      if (typeof window.showRevisitFeedback === 'function') {
        setTimeout(() => window.showRevisitFeedback(), 300);
      }
    }
  }

  // ── Start a walkthrough ──
  window.startWalkthrough = function(walkthroughId, fromStep) {
    const config = WALKTHROUGHS[walkthroughId];
    if (!config) {
      console.warn('[Walkthrough] Unknown walkthrough:', walkthroughId);
      return;
    }

    const startIndex = fromStep || 0;
    const totalSteps = config.steps.length;

    // Check if this is a revisit (triggers feedback type 2)
    if (startIndex === 0) {
      const revisit = isRevisit(walkthroughId);
      recordStart(walkthroughId);
      incrementCount(walkthroughId, 'started');

      if (revisit && typeof window.showRevisitFeedback === 'function') {
        sessionStorage.setItem('walkthrough-revisit', 'true');
      }
    }

    // Check if the first step is on a different screen
    const step = config.steps[startIndex];
    if (step.screen && step.screen !== currentRoute) {
      saveState(walkthroughId, startIndex);
      window.location.href = step.screen;
      return;
    }

    // Build Driver.js steps for current screen only
    const driverSteps = [];
    const stepMapping = []; // maps local index → global index

    for (let i = startIndex; i < config.steps.length; i++) {
      const s = config.steps[i];
      if (s.screen && s.screen !== currentRoute) break;

      const stepNum = i + 1;

      driverSteps.push({
        element: s.element,
        popover: {
          title: s.popover.title,
          description: `<p style="font-family: 'Redacted Script', cursive; font-size: 1.1rem; color: var(--text-body);">${s.popover.description}</p>
            <p style="color: var(--text-caption); font-size: 0.75rem; margin-top: 0.5rem;">Step ${stepNum} of ${totalSteps}</p>`,
          side: s.popover.side || 'bottom',
          align: s.popover.align || 'center'
        }
      });
      stepMapping.push(i);
    }

    const firstGlobalIndex = stepMapping[0];
    const lastGlobalIndex = stepMapping[stepMapping.length - 1];
    const nextGlobalIndex = lastGlobalIndex + 1;
    const hasMoreStepsOnNextScreen = nextGlobalIndex < totalSteps;
    const hasPriorStepsOnPrevScreen = firstGlobalIndex > 0;
    const isLastScreenBatch = !hasMoreStepsOnNextScreen;

    // Customise button text: if there are more steps on another screen,
    // the "last" local step should still say "Next", not "Done"
    const doneBtnText = isLastScreenBatch ? 'Done' : 'Next →';

    // Flag to prevent onDestroyStarted from clearing state during navigation
    let navigatingToScreen = false;

    const driver = window.driver.js.driver({
      showProgress: false,
      showButtons: ['next', 'previous', 'close'],
      animate: true,
      overlayColor: 'rgba(24, 24, 27, 0.5)',
      steps: driverSteps,
      nextBtnText: 'Next →',
      prevBtnText: '← Previous',
      doneBtnText: doneBtnText,
      onNextClick: () => {
        const activeIndex = driver.getActiveIndex();
        const isOnLastLocalStep = activeIndex === driverSteps.length - 1;

        if (isOnLastLocalStep && hasMoreStepsOnNextScreen) {
          // Cross-screen forward: save state, set flag, then navigate.
          // We skip driver.destroy() — the page navigation will kill it.
          navigatingToScreen = true;
          saveState(walkthroughId, nextGlobalIndex);
          window.location.href = config.steps[nextGlobalIndex].screen;
          return;
        }

        // Normal next step within this screen
        driver.moveNext();
      },
      onPrevClick: () => {
        const activeIndex = driver.getActiveIndex();

        if (activeIndex === 0 && hasPriorStepsOnPrevScreen) {
          // Cross-screen backward: save state, set flag, then navigate.
          navigatingToScreen = true;
          const prevGlobalIndex = firstGlobalIndex - 1;
          const prevScreen = config.steps[prevGlobalIndex].screen;
          saveState(walkthroughId, prevGlobalIndex);
          window.location.href = prevScreen;
          return;
        }

        // Default: move to previous local step
        driver.movePrevious();
      },
      onDestroyStarted: () => {
        // If we're navigating to another screen, don't touch anything —
        // just let the page unload naturally.
        if (navigatingToScreen) {
          driver.destroy();
          return;
        }

        // This handles "Done" (final step) and early dismiss (X / overlay click).
        const activeIndex = driver.getActiveIndex();
        const isOnLastLocalStep = activeIndex === driverSteps.length - 1;

        if (isOnLastLocalStep && isLastScreenBatch) {
          incrementCount(walkthroughId, 'completed');
        }

        clearState();
        driver.destroy();
        maybeShowRevisitFeedback();
      }
    });

    driver.drive();

    // Driver.js auto-disables Previous on the first local step. If there are
    // prior steps on another screen, we need to force-enable it so our
    // onPrevClick handler can intercept and navigate back.
    if (hasPriorStepsOnPrevScreen) {
      setTimeout(() => {
        const prevBtn = document.querySelector('.driver-popover-prev-btn');
        if (prevBtn) {
          prevBtn.disabled = false;
          prevBtn.classList.remove('driver-popover-btn-disabled');
        }
      }, 50);
    }
  };

  // ── Resume walkthrough if we arrived via navigation ──
  // Safety net: track resume attempts to prevent infinite reload loops.
  // If we've tried to resume more than 3 times without success, bail out.
  const RESUME_COUNT_KEY = 'walkthrough-resume-count';
  const savedState = getSavedState();
  if (savedState) {
    const resumeCount = parseInt(sessionStorage.getItem(RESUME_COUNT_KEY) || '0', 10);
    if (resumeCount >= 3) {
      console.warn('[Walkthrough] Too many resume attempts — clearing state to break loop.');
      clearState();
      sessionStorage.removeItem(RESUME_COUNT_KEY);
    } else {
      sessionStorage.setItem(RESUME_COUNT_KEY, String(resumeCount + 1));
      clearState();
      setTimeout(() => {
        sessionStorage.removeItem(RESUME_COUNT_KEY);
        window.startWalkthrough(savedState.walkthroughId, savedState.stepIndex);
      }, 500);
    }
  }

  // ── Listen for walkthrough start buttons in the release notes panel ──
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.walkthrough-start');
    if (btn) {
      const walkthroughId = btn.dataset.walkthrough;
      const releasePanel = document.getElementById('release-panel');
      const releaseBackdrop = document.getElementById('release-backdrop');
      if (releasePanel) releasePanel.classList.remove('panel-open');
      if (releaseBackdrop) releaseBackdrop.classList.add('hidden');

      setTimeout(() => window.startWalkthrough(walkthroughId), 300);
    }
  });

})();

/* ============================================================
   Release Notes — Panel logic
   Shows release notes in a slide-out panel, with notification dot
   for unseen releases and route-awareness.
============================================================ */

(function() {
  const STORAGE_KEY = 'release-notes-seen';
  // Normalise route: npx serve strips .html from URLs
  const rawRoute = window.location.pathname.split('/').pop() || 'index.html';
  const currentRoute = rawRoute.endsWith('.html') ? rawRoute : rawRoute + '.html';

  let releases = [];
  let maxVisible = 5;

  // ── Load release data ──
  async function loadReleases() {
    try {
      const response = await fetch('releases.json');
      const data = await response.json();
      releases = data.releases || [];
      maxVisible = data.maxVisibleReleases || 5;
      checkForUnseenReleases();
    } catch (err) {
      console.warn('[Release Notes] Could not load releases.json:', err);
    }
  }

  // ── Track which releases the user has seen ──
  function getSeenReleases() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function markReleasesSeen() {
    const ids = releases.map(r => r.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    hideDot();
  }

  // ── Notification dot ──
  function showDot() {
    const dot = document.getElementById('release-dot');
    if (dot) {
      dot.classList.remove('hidden');
      dot.classList.add('release-dot-blink');
    }
  }

  function hideDot() {
    const dot = document.getElementById('release-dot');
    if (dot) {
      dot.classList.add('hidden');
      dot.classList.remove('release-dot-blink');
    }
  }

  function checkForUnseenReleases() {
    const seen = getSeenReleases();
    const routeReleases = releases.filter(r => r.affectedRoutes.includes(currentRoute));
    const hasUnseen = routeReleases.some(r => !seen.includes(r.id));
    if (hasUnseen) showDot();
  }

  // ── Build the panel HTML ──
  function buildPanelHTML() {
    const visibleReleases = releases.slice(0, maxVisible);

    const releasesHTML = visibleReleases.map((release, i) => {
      const seen = getSeenReleases();
      const isNew = !seen.includes(release.id);
      const newBadge = isNew ? '<span class="text-xs font-bold px-1.5 py-0.5 rounded" style="background-color: var(--control-accent); color: var(--text-on-dark);">NEW</span>' : '';

      const externalLink = release.externalLink
        ? `<a href="${release.externalLink}" target="_blank" class="text-link text-sm">Full release notes &rarr;</a>`
        : '';

      const walkthroughBtn = release.walkthrough
        ? `<button class="btn-ghost text-sm mt-2 walkthrough-start" data-walkthrough="${release.walkthrough}">
            <span class="flex items-center gap-2"><i class="ri-play-line"></i> Start Walkthrough</span>
          </button>`
        : '';

      const divider = i < visibleReleases.length - 1
        ? '<hr style="border-color: var(--border-light);" class="my-3">'
        : '';

      return `
        <div class="mb-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="type-body-emphasis">${release.title}</span>
            ${newBadge}
          </div>
          <p class="type-caption mb-1">${release.date}</p>
          <p class="type-body text-sm mb-2">${release.blurb}</p>
          ${externalLink}
          ${walkthroughBtn}
        </div>
        ${divider}
      `;
    }).join('');

    return releasesHTML || '<p class="type-caption">No releases to show.</p>';
  }

  // ── Create the release notes panel ──
  function createPanel() {
    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'panel-backdrop hidden';
    backdrop.id = 'release-backdrop';
    document.body.appendChild(backdrop);

    // Panel
    const panel = document.createElement('aside');
    panel.className = 'panel-right';
    panel.id = 'release-panel';
    panel.innerHTML = `
      <div class="panel-right-header">
        <span class="panel-right-title">
          <i class="ri-megaphone-line mr-1"></i> What's New
        </span>
        <button class="panel-right-close" id="release-panel-close"><i class="ri-close-line"></i></button>
      </div>
      <div class="panel-right-body space-y-2" id="release-panel-body">
        ${buildPanelHTML()}
      </div>
    `;
    document.body.appendChild(panel);

    // Event listeners
    backdrop.addEventListener('click', closeReleasePanel);
    document.getElementById('release-panel-close').addEventListener('click', closeReleasePanel);
  }

  function openReleasePanel() {
    const panel = document.getElementById('release-panel');
    const backdrop = document.getElementById('release-backdrop');
    if (!panel) return;

    // Refresh content
    const body = document.getElementById('release-panel-body');
    if (body) body.innerHTML = buildPanelHTML();

    panel.classList.add('panel-open');
    backdrop.classList.remove('hidden');
    markReleasesSeen();
  }

  function closeReleasePanel() {
    const panel = document.getElementById('release-panel');
    const backdrop = document.getElementById('release-backdrop');
    if (!panel) return;

    panel.classList.remove('panel-open');
    backdrop.classList.add('hidden');
  }

  // ── Reset release notes seen flag (called by debug button) ──
  // Also clears walkthrough history so the "Looking for something?" prompt
  // triggers again on the next revisit.
  window.resetReleaseNotesSeen = function() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('walkthrough-history');
    showDot();
    console.log('[Release Notes] Reset seen flag + walkthrough history — dot re-shown');
  };

  // ── Wire up the release notes button ──
  const btnReleaseNotes = document.getElementById('btn-release-notes');
  if (btnReleaseNotes) {
    btnReleaseNotes.addEventListener('click', openReleasePanel);
  }

  // ── Wire up debug reset button ──
  const btnSimulate = document.getElementById('btn-simulate-release');
  if (btnSimulate) {
    btnSimulate.addEventListener('click', () => {
      window.resetReleaseNotesSeen();
    });
  }

  // ── Initialise ──
  loadReleases().then(() => {
    createPanel();
  });

})();

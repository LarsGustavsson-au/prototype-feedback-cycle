/* ============================================================
   Feedback Cycle Prototype — Shared App Interactions
   Sidebar collapse/expand, filter panel toggle, debug controls.
============================================================ */

// ── Sidebar collapse / expand ──
const sidebar = document.getElementById('sidebar');
const collapseIcon = document.getElementById('sidebar-collapse-icon');

function toggleSidebar() {
  sidebar.classList.toggle('sidebar-collapsed');
  const isCollapsed = sidebar.classList.contains('sidebar-collapsed');

  sidebar.querySelectorAll('.sidebar-link-text, .sidebar-brand-text, .sidebar-label-text').forEach(el => {
    el.style.display = isCollapsed ? 'none' : '';
  });

  collapseIcon.className = isCollapsed
    ? 'ri-arrow-right-double-line'
    : 'ri-arrow-left-double-line';

  // Hide debug section labels when collapsed
  const debugLabel = document.querySelector('#debug-controls > span');
  if (debugLabel) {
    debugLabel.style.display = isCollapsed ? 'none' : '';
  }
}

document.getElementById('sidebar-collapse').addEventListener('click', toggleSidebar);

// ── Filter panel (only on pages that have it) ──
const filterPanel = document.getElementById('filter-panel');
const panelBackdrop = document.getElementById('panel-backdrop');

if (filterPanel && panelBackdrop) {
  function openPanel() {
    filterPanel.classList.add('panel-open');
    panelBackdrop.classList.remove('hidden');
  }

  function closePanel() {
    filterPanel.classList.remove('panel-open');
    panelBackdrop.classList.add('hidden');
  }

  function togglePanel() {
    if (filterPanel.classList.contains('panel-open')) {
      closePanel();
    } else {
      openPanel();
    }
  }

  const btnFilter = document.getElementById('btn-filter');
  if (btnFilter) btnFilter.addEventListener('click', togglePanel);

  const panelClose = document.getElementById('panel-close');
  if (panelClose) panelClose.addEventListener('click', closePanel);

  panelBackdrop.addEventListener('click', closePanel);
}

// ── Debug controls ──
// Note: "New Release" button is handled by release-notes.js (resets seen flag)
// "Reset Survey" button is handled here
const btnResetSurvey = document.getElementById('btn-reset-survey');
if (btnResetSurvey) {
  btnResetSurvey.addEventListener('click', () => {
    localStorage.removeItem('survey-errorrate-seen');
    console.log('[Debug] Survey trigger reset — click Error Rate card to see it again');
  });
}

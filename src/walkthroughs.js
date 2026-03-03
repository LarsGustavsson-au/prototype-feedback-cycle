/* ============================================================
   Walkthrough Configurations
   Each walkthrough is an array of steps. Steps that target a
   different screen include a `screen` property — the engine
   will navigate there and resume.
============================================================ */

const WALKTHROUGHS = {
  "error-tracking": {
    title: "Error Rate Tracking",
    steps: [
      {
        screen: "index.html",
        element: "#card-error-rate",
        popover: {
          title: "Error Rate Card",
          description: "This card shows your current error rate at a glance. It updates in real time and highlights when you're below your target threshold.",
          side: "bottom",
          align: "center"
        }
      },
      {
        screen: "index.html",
        element: "#activity-table",
        popover: {
          title: "Activity Log",
          description: "Check the recent activity table for individual events. Status indicators help you spot issues quickly.",
          side: "top",
          align: "center"
        }
      },
      {
        screen: "reports.html",
        element: "#reports-section",
        popover: {
          title: "Detailed Reports",
          description: "For a deeper dive, head to the Reports screen. You'll find trend charts and filterable data views here.",
          side: "bottom",
          align: "center"
        }
      }
    ]
  },

  "reports-overview": {
    title: "Reports Dashboard",
    steps: [
      {
        screen: "index.html",
        element: ".sidebar-item[href='reports.html']",
        popover: {
          title: "Navigate to Reports",
          description: "Click the Reports item in the sidebar to access the full analytics dashboard.",
          side: "right",
          align: "center"
        }
      },
      {
        screen: "reports.html",
        element: "#reports-section",
        popover: {
          title: "Trend Charts",
          description: "This section shows key performance trends over your selected time period. The data updates as you change filters.",
          side: "bottom",
          align: "center"
        }
      }
    ]
  }
};

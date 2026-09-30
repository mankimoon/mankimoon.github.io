const filterButtons = document.querySelectorAll(".filter-button");
const workCards = document.querySelectorAll(".work-card");
const yearTarget = document.querySelector("#current-year");
const videoButtons = document.querySelectorAll(".ohgym-video-button");
const videoDialog = document.querySelector(".video-dialog");
const dialogPlayer = document.querySelector(".video-dialog-player");
const dialogTitle = document.querySelector("#video-dialog-title");
const dialogClose = document.querySelector(".video-dialog-close");
const analyticsConsent = document.querySelector(".analytics-consent");
const analyticsAllow = document.querySelector(".analytics-allow");
const analyticsDecline = document.querySelector(".analytics-decline");
const privacyChoices = document.querySelector(".privacy-choices");
const analyticsConsentKey = "mk-analytics-consent";
const analyticsMeasurementId = "G-VZ29X6TGH9";

const loadAnalytics = () => {
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", analyticsMeasurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementId}`;
  document.head.append(analyticsScript);
};

const setAnalyticsChoice = (choice) => {
  localStorage.setItem(analyticsConsentKey, choice);
  analyticsConsent.hidden = true;
  if (choice === "granted") loadAnalytics();
};

if (analyticsConsent) {
  const savedChoice = localStorage.getItem(analyticsConsentKey);
  if (savedChoice === "granted") {
    loadAnalytics();
  } else if (!savedChoice) {
    analyticsConsent.hidden = false;
  }

  analyticsAllow?.addEventListener("click", () => setAnalyticsChoice("granted"));
  analyticsDecline?.addEventListener("click", () => setAnalyticsChoice("denied"));
  privacyChoices?.addEventListener("click", () => {
    analyticsConsent.hidden = false;
    analyticsAllow?.focus();
  });
}

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    workCards.forEach((card) => {
      const tags = card.dataset.tags || "";
      const shouldShow = selected === "all" || tags.includes(selected);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const closeVideoDialog = () => {
  if (!videoDialog || !dialogPlayer) return;
  dialogPlayer.pause();
  dialogPlayer.removeAttribute("src");
  dialogPlayer.load();
  videoDialog.close();
};

videoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!videoDialog || !dialogPlayer || !dialogTitle) return;
    dialogPlayer.src = button.dataset.video || "";
    dialogTitle.textContent = button.dataset.title || "Research Video";
    videoDialog.showModal();
    dialogPlayer.play().catch(() => {});
  });
});

dialogClose?.addEventListener("click", closeVideoDialog);
videoDialog?.addEventListener("click", (event) => {
  if (event.target === videoDialog) closeVideoDialog();
});
videoDialog?.addEventListener("close", () => {
  dialogPlayer?.pause();
});

const filterButtons = document.querySelectorAll(".filter-button");
const workCards = document.querySelectorAll(".work-card");
const yearTarget = document.querySelector("#current-year");
const videoButtons = document.querySelectorAll(".ohgym-video-button");
const videoDialog = document.querySelector(".video-dialog");
const dialogPlayer = document.querySelector(".video-dialog-player");
const dialogTitle = document.querySelector("#video-dialog-title");
const dialogClose = document.querySelector(".video-dialog-close");

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

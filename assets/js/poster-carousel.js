(() => {
  const carousel = document.querySelector(".poster-carousel");
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll(".poster-slide")];
  // 포스터 내용 수정 행사분류/이름/설명 순
  const items = [
    ["AWARDS · 2025", "한터뮤직어워즈 2025", "HANTEO MUSIC AWARDS 2025"],
    [
      "CONCERT · 2024",
      "나훈아 라스트 콘서트",
      "2024 LAST CONCERT · 고마웠습니다",
    ],
    [
      "AWARDS · 2024",
      "대한민국 대중문화예술상",
      "KOREA POPULAR CULTURE AND ARTS AWARDS",
    ],
    [
      "AWARDS · 2024",
      "서울콘 APAN 스타 어워즈",
      "2024 SEOULCON APAN STAR AWARDS",
    ],
    [
      "AWARDS · 2025",
      "2025 대한민국 대중문화예술상",
      "2025 KOREA POPULAR CULTURE AND ARTS AWARDS",
    ],
    ["CONCERT· 2025", "2025 KBS 가요대축제", "2025 KBS 가요대축제"],
    ["CONCERT· 2026", "2026 싸이 흠뻑쇼", "2026 PSY 흠뻑쇼"],
    ["CONCERT· 2026", "2026 MBC 대학가요제", "2026 MBC 대학가요제"],
  ];
  const category = carousel.querySelector(".poster-category");
  const title = carousel.querySelector(".poster-caption h3");
  const subtitle = carousel.querySelector(".poster-caption p");
  const counter = carousel.querySelector(".poster-counter");
  const pauseButton = carousel.querySelector(".poster-pause");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let paused = reduceMotion.matches;
  let hovering = false;
  let timer;

  function render() {
    slides.forEach((slide, i) => {
      const delta = (i - index + slides.length) % slides.length;
      slide.className =
        "poster-slide " +
        (delta === 0
          ? "is-current"
          : delta === 1
            ? "is-next"
            : delta === slides.length - 1
              ? "is-prev"
              : "is-hidden");
      slide.tabIndex =
        delta === 0 || delta === 1 || delta === slides.length - 1 ? 0 : -1;
    });
    [category.textContent, title.textContent, subtitle.textContent] =
      items[index];

    // 포스터 페이지 자동조절
    counter.textContent =
      String(index + 1).padStart(2, "0") +
      " / " +
      String(slides.length).padStart(2, "0");
    pauseButton.textContent = paused ? "자동재생" : "일시정지";
    pauseButton.setAttribute("aria-pressed", String(paused));
  }
  function schedule() {
    clearInterval(timer);
    if (!paused && !hovering)
      // 포스터 넘어가는 시간 조절 5000=5초, 3000=3초
      timer = setInterval(() => change(index + 1, false), 3000);
  }
  function change(next, restart = true) {
    index = (next + slides.length) % slides.length;
    render();
    if (restart) schedule();
  }
  carousel
    .querySelector("[data-prev]")
    .addEventListener("click", () => change(index - 1));
  carousel
    .querySelector("[data-next]")
    .addEventListener("click", () => change(index + 1));
  slides.forEach((slide, i) =>
    slide.addEventListener("click", () => change(i)),
  );
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    render();
    schedule();
  });
  carousel.addEventListener("mouseenter", () => {
    hovering = true;
    schedule();
  });
  carousel.addEventListener("mouseleave", () => {
    hovering = false;
    schedule();
  });
  carousel.addEventListener("focusin", () => {
    hovering = true;
    schedule();
  });
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      hovering = false;
      schedule();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer);
    else schedule();
  });
  render();
  schedule();
})();

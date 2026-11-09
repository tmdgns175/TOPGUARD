// 모바일 전용 메뉴를 열고 닫는 간단한 코드입니다.
(() => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#site-nav");

  if (!toggle || !menu) return;

  // 메뉴를 닫고, 화면 읽기 도구에 현재 상태를 알려줍니다.
  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "메뉴 열기");
  };

  // 메뉴 버튼을 누르면 링크 목록을 펼치거나 접습니다.
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });

  // 메뉴 안의 항목을 누르면 해당 섹션으로 이동한 뒤 메뉴를 닫습니다.
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  // PC 화면으로 넓어질 때는 접힌 메뉴 상태를 초기화합니다.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeMenu();
  });
})();

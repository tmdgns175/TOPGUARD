(() => {
  const dialog = document.querySelector('#contact-modal');
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#contact-form-status');

  if (!dialog || !form) return;

  const openDialog = () => {
    status.textContent = '';
    dialog.showModal();
    window.setTimeout(() => document.querySelector('#inquiry-company')?.focus(), 50);
  };

  const closeDialog = () => dialog.close();

  document.querySelectorAll('[data-contact-open]').forEach((button) => {
    button.addEventListener('click', openDialog);
  });

  document.querySelectorAll('[data-contact-close]').forEach((button) => {
    button.addEventListener('click', closeDialog);
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const body = [
      '[TOPGUARD 견적 문의]',
      '',
      `회사명: ${data.get('company')}`,
      `연락처: ${data.get('phone')}`,
      `이메일: ${data.get('email')}`,
      '',
      '[문의내용]',
      data.get('message')
    ].join('\n');
    const subject = `[TOPGUARD 견적 문의] ${data.get('company')}`;
    const mailto = `mailto:topguard@hanmail.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = '기본 메일 앱을 여는 중입니다.';
    window.location.href = mailto;
  });
})();

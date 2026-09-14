(() => {
  // Enable after the English copy is approved. Translations remain in the HTML.
  const englishEnabled = false;
  document.querySelectorAll(".language-switch").forEach(nav => { nav.hidden = !englishEnabled; });
  const translated = Array.from(document.querySelectorAll('[data-en]'));
  const labels = Array.from(document.querySelectorAll('[data-label-en]'));
  const buttons = Array.from(document.querySelectorAll('[data-lang]'));
  translated.forEach(element => { element.dataset.zh = element.textContent; });
  labels.forEach(element => { element.dataset.labelZh = element.getAttribute('aria-label'); });
  const isUpdates = document.body.dataset.page === 'updates';
  const descriptions = isUpdates ? {
    zh: '见微知界 Particle World 的公司动态与研究进展。',
    en: 'Company news and research updates from Particle World AI.'
  } : {
    zh: '见微知界以多模态世界模型和 AI Agent 为核心，构建理解真实环境、预测行动后果并自主完成复杂任务的物理智能系统。',
    en: 'Particle World builds physical intelligence systems powered by multimodal world models and AI agents, enabling machines to understand the world, predict outcomes, and act autonomously.'
  };
  function setLanguage(language) {
    const lang = englishEnabled && language === 'en' ? 'en' : 'zh';
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    translated.forEach(element => { element.textContent = element.dataset[lang]; });
    labels.forEach(element => { element.setAttribute('aria-label', element.dataset[lang === 'en' ? 'labelEn' : 'labelZh']); });
    buttons.forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.lang === lang)); });
    const heroTranslation = document.querySelector('.hero-translation');
    if (heroTranslation) heroTranslation.lang = lang === 'en' ? 'zh-CN' : 'en';
    document.title = isUpdates
      ? (lang === 'en' ? 'Updates — Particle World AI' : '动态 — 见微知界 Particle World')
      : lang === 'en' ? 'Particle World — Extending Physical Intelligence. Indefinitely' : '见微知界 Particle World — 让物理智能，无限延伸';
    document.querySelector('meta[name="description"]').content = descriptions[lang];
    try { localStorage.setItem('particleworld-language', lang); } catch { /* Storage may be unavailable in private contexts. */ }
  }
  buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  let preferred = 'zh';
  try { preferred = localStorage.getItem('particleworld-language') || 'zh'; } catch { /* Chinese remains the default. */ }
  setLanguage(preferred);
  document.getElementById('year').textContent = new Date().getFullYear();
})();

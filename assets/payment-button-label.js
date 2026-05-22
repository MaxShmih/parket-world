/**
 * Shopify dynamic checkout button ("Buy it now") — централізований текст, не з locale теми.
 */
(function () {
  const LABEL = 'Оформити заявку';
  const SELECTORS = '.shopify-payment-button__button, .shopify-payment-button__button--unbranded';

  function patchButtons(root) {
    root.querySelectorAll(SELECTORS).forEach((btn) => {
      const text = (btn.textContent || '').trim();
      if (/buy it now/i.test(text)) {
        btn.textContent = LABEL;
      }
    });
  }

  function init() {
    patchButtons(document);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.(SELECTORS)) patchButtons(node.parentElement || document);
          else if (node.querySelectorAll) patchButtons(node);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

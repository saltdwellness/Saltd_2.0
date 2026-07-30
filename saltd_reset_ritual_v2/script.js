const toast = document.createElement('div');
toast.className = 'cart-toast';
document.body.appendChild(toast);

document.querySelectorAll('[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    toast.textContent = `${button.dataset.product} added to your reset ritual ✶`;
    toast.classList.add('show');
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1900);
  });
});

const drawer = document.getElementById('siteDrawer');
const drawerTitle = document.getElementById('drawerTitle');
const drawerText = document.getElementById('drawerText');

function openDrawer(type) {
  drawer.hidden = false;
  if (type === 'account') {
    drawerTitle.textContent = 'Your SALTD ritual account';
    drawerText.textContent = 'Account login can plug into Shopify, WooCommerce, or your custom store later. For now, every CTA keeps people inside the buying journey.';
  } else {
    drawerTitle.textContent = 'Search SALTD';
    drawerText.textContent = 'Search is ready for the live store build. For now, jump straight to flavours.';
  }
}

document.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => openDrawer(btn.dataset.open)));
document.querySelector('.drawer-close').addEventListener('click', () => drawer.hidden = true);
drawer.addEventListener('click', (event) => { if (event.target === drawer) drawer.hidden = true; });

document.getElementById('emailForm').addEventListener('submit', (event) => {
  event.preventDefault();
  toast.textContent = 'You are in the SALTD loop ✶';
  toast.classList.add('show');
  window.clearTimeout(window.__toastTimer);
  window.__toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1900);
  event.target.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(event) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    if (drawer && !drawer.hidden) drawer.hidden = true;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

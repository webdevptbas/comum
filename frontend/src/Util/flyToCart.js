export const flyToCart = (imgSrc, startElement) => {
  const cartIcon = document.getElementById("cart-icon-target");
  if (!startElement || !cartIcon || !imgSrc) return;

  const startRect = startElement.getBoundingClientRect();
  const endRect = cartIcon.getBoundingClientRect();

  const startSize = 60; // ukuran bola gambar saat mulai
  const endSize = 20; // ukuran bola gambar saat sampai di cart

  const flyingImg = document.createElement("img");
  flyingImg.src = imgSrc;
  flyingImg.style.position = "fixed";
  flyingImg.style.left = `${startRect.left + startRect.width / 2 - startSize / 2}px`;
  flyingImg.style.top = `${startRect.top - startSize / 2}px`;
  flyingImg.style.width = `${startSize}px`;
  flyingImg.style.height = `${startSize}px`;
  flyingImg.style.borderRadius = "50%"; // bulat dari awal sampai akhir
  flyingImg.style.border = "2px solid #fff";
  flyingImg.style.boxShadow = "0 2px 10px rgba(0,0,0,0.35)";
  flyingImg.style.objectFit = "cover";
  flyingImg.style.zIndex = "9999";
  flyingImg.style.pointerEvents = "none";
  flyingImg.style.transition = "all 0.7s cubic-bezier(0.55, 0, 1, 0.45)";
  flyingImg.style.opacity = "1";

  document.body.appendChild(flyingImg);

  // trigger animasi di frame berikutnya biar transition-nya jalan
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      flyingImg.style.left = `${endRect.left + endRect.width / 2 - endSize / 2}px`;
      flyingImg.style.top = `${endRect.top + endRect.height / 2 - endSize / 2}px`;
      flyingImg.style.width = `${endSize}px`;
      flyingImg.style.height = `${endSize}px`;
      flyingImg.style.opacity = "0.9"; // tetap kelihatan jelas, cuma dikit lebih transparan
    });
  });

  setTimeout(() => {
    flyingImg.remove();
  }, 750);
};

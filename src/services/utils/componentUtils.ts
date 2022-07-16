export const resetInputFieldState = (event: Event) => {
  const inputField = event.target as HTMLInputElement;
  inputField.classList.remove("warning");
};

export const getProductImageZoomInHeight = () => {
  const viewportWidth = window.innerWidth;
  let productImageZoomInHeight;
  if (viewportWidth <= 600) {
    productImageZoomInHeight = 240;
  } else if (viewportWidth <= 768) {
    productImageZoomInHeight = 300;
  } else if (viewportWidth <= 992) {
    productImageZoomInHeight = 360;
  } else if (viewportWidth <= 1280) {
    productImageZoomInHeight = 420;
  } else {
    productImageZoomInHeight = 480;
  }
  return productImageZoomInHeight;
};

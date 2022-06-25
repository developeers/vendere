export const resetInputFieldState = (event: Event) => {
    const inputField = event.target as HTMLInputElement;
    inputField.classList.remove("warning");
};
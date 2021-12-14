export const USER = JSON.parse(sessionStorage.getItem("user"));

export const REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

export function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}
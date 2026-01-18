export function formatLocalDate(date: any) {
    if (!Array.isArray(date)) return "";

    const [y, m, d] = date;
    return new Date(y, m - 1, d).toLocaleDateString("en-US");
}

export const setBodyClass = (classes: string[]) => {
    document.body.className = "";
    classes.forEach(c => document.body.classList.add(c));
}
export const toggleBodyClass = (className: string) => {
    document.body.classList.toggle(className);
};
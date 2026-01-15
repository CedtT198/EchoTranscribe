export function formatLocalDate(date: any) {
    if (!Array.isArray(date)) return "";

    const [y, m, d] = date;
    return new Date(y, m - 1, d).toLocaleDateString("en-US");
}
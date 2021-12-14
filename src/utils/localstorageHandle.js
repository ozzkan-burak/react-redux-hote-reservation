export const setStorage = (key,where,value) => {
    let existing = localStorage.getItem(key);
    existing = existing ? JSON.parse(existing) : {};
    existing[where] = value;
    localStorage.setItem(key, JSON.stringify(existing));
}
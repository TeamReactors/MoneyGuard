const API_URL = 'https://api.monobank.ua/bank/currency';
const STORAGE_KEY = 'currencyData';

export async function fetchCurrencyData() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('API isteği başarısız');
    const data = await response.json();
    return data.filter(
        (item) =>
            item.currencyCodeB === 980 &&
            (item.currencyCodeA === 840 || item.currencyCodeA === 978)
    );
}

export function saveToLocalStorage(data) {
    const payload = {
        timestamp: new Date().toISOString(),
        data,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function getFromLocalStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
}

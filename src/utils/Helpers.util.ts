export const formatDateWithOffset = (date: Date): string => {
    const pad = (num: number) => String(num).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const timezoneOffset = date.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
    const offsetMinutes = Math.abs(timezoneOffset % 60);
    const sign = timezoneOffset > 0 ? "-" : "+";

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds} ${sign}${pad(offsetHours)}:${pad(offsetMinutes)}`;
};
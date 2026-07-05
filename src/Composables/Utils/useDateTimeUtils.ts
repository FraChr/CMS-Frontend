export function useDateTimeUtils() {
    const convertUtcToDate = (utcDateTime: string) => {
        let date = new Date(utcDateTime);
        return date.toLocaleDateString();
    }

    const convertUtcToDateTime = (utcDateTime: string) => {
        let date = new Date(utcDateTime);
        return date.toLocaleString();
    }

    return {
        convertUtcToDate,
        convertUtcToDateTime,
    }
}
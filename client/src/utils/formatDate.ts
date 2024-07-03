export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function formatDateWithTime(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
}

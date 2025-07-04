export function getFilenameFromHeaders(headers: any): string {
    const contentDisposition = headers["content-disposition"];
    if (!contentDisposition) return "file";
 
    const match = contentDisposition.match(/filename="?(.+?)"?$/);
    return match ? decodeURIComponent(match[1]) : "file";
 }
 
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export interface BackendErrorResponse {
    status: number;
    message: string;
    path: string;
    timestamp: string;
}

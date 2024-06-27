import {
    ConflictErr,
    MissingParamsErr,
    UnauthorizedErr,
} from "../errors/http_errors";

export default async function fetchData(
    input: RequestInfo,
    init?: RequestInit
) {
    const res = await fetch(input, init);

    if (res.ok) {
        return res;
    } else {
        const errorBody = await res.json();
        const errorMsg = errorBody.message;

        if (res.status === 401) {
            throw new UnauthorizedErr(errorMsg);
        } else if (res.status === 409) {
            throw new ConflictErr(errorMsg);
        } else if (res.status === 400) {
            throw new MissingParamsErr(errorMsg);
        } else {
            throw Error(
                `Request failed with status: ${res.status}. Message: ${errorMsg}`
            );
        }
    }
}

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
        throw Error(errorMsg);
    }
}

export default (
    data:
        | "token"
        | "username"
        | "job"
        | "id"
        | "" = "",
    permission = ""
): string | null | boolean => {
    if (sessionStorage.getItem("chakranime")) {
        if (permission !== "") {
            return JSON.parse(atob(sessionStorage.getItem("chakranime") || "{}"))[
                data
            ].includes(permission);
        }
        return (
            JSON.parse(atob(sessionStorage.getItem("chakranime") || "{}"))[data] ||
            null
        );
    }
    return null;
};

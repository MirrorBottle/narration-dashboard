import { AxiosInstance } from "axios";
import axios from "axios";
import user from "./user";

export default (): AxiosInstance =>
    axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/api/`,
        headers: { Authorization: `Bearer ${user("token") || ""}` },
    });

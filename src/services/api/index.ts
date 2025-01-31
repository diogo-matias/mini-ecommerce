import axios from "axios";
import { type AxiosRequestConfig, type AxiosResponse, Axios } from "axios";

export default class Api {
    requestAxios: Axios;

    constructor(baseUrl: string, headers?: object) {
        this.requestAxios = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        });
    }

    get(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<unknown>> {
        return this.requestAxios.get(url, config);
    }
}

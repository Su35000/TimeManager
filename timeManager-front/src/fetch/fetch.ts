import axios from "axios";
import { errorHandler } from "../utils/functions/errorHandler";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// Creates an axios instance for HTTP requests
const instance = axios.create({
    baseURL: "http://localhost:4000/api", // Sets the base URL for requests
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

// Intercepts outgoing requests to add an authentication token if available in local storage
instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Defines the structure for requests with endpoint and data parameters
interface IRequest {
    endpoint: string;
    data?: Body | null;
}

// Creates a generic function to perform HTTP requests based on the method (get, post, put, delete)
const createRequest = (method: "get" | "post" | "put" | "delete") => {
    return async ({ endpoint, data = null }: IRequest) => {
        try {
            const response = await instance({ method, url: endpoint, data });
            // Displays a message if the response contains a "message" property and shows a notification
            if (response.data.message) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            return response.data; 
        } catch (error) {
            errorHandler(error as AxiosError<unknown, any>); // Handles errors
        }
    };
};

// Exports an 'api' object containing methods for different HTTP operations (get, post, put, delete)
export const api = {
    get: createRequest("get"),
    post: createRequest("post"),
    put: createRequest("put"),
    delete: createRequest("delete")
};

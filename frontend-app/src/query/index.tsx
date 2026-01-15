import { AuthFormData } from "@components/signUp/sign-up-schema";
import { MessageSchemaType } from "@pages/user/user-dash-boad/user-dashboard-schema";
import axios from "axios";

export const registerShop = async (data: AuthFormData) => {
    const baseUrl = import.meta.env.VITE_BASE_DB_URL;
    const response = await axios.post(
        `${baseUrl}/auth/register`,
        data,
        { withCredentials: true }
    );
    return response.data;
};
export const logIn = async (data:AuthFormData) => {
    const baseUrl = import.meta.env.VITE_BASE_DB_URL;
    const response = await axios.post(
        `${baseUrl}/auth/logIn`,
         data,
    )
    return response.data;
}

export const getShopDetails = async (token: string) => {
    const baseUrl = import.meta.env.VITE_BASE_DB_URL;
    const response = await axios
        .get(`${baseUrl}/shop/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
    return response.data;
};

export const registerUser = async ({ name, shopId }: { name: string; shopId: string }) => {
    const baseUrl = import.meta.env.VITE_BASE_DB_URL_MOBILE;
    const response = await axios.post(`${baseUrl}/user/register`, {
        name: name,
        receiverId: shopId,
    });
    return response.data;
};

export const fetchUsers = async (shopId: string) => {
    const baseUrl = import.meta.env.VITE_BASE_DB_URL;
    const response = await axios.post(`${baseUrl}/user/lists`, {
        receiverId: shopId,
    });
    return response.data;
}

export const sendMessage = async (data: MessageSchemaType) => {
    const baseUrl = import.meta.env.VITE_BASE_DB_URL_MOBILE;
    const response = await axios.post(`${baseUrl}/messages/send`, data);
    return response.data;
}
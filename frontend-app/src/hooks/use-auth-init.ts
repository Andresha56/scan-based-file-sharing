import { useEffect, useState } from "react";
import api from "@api/axiosClient";
import { authStore } from "@store/auth.store";
import { useNavigate } from "react-router-dom";

export const useAuthInit = () => {
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await api.post("/auth/refresh");
                authStore.getState().setAuth(
                    res.data.accessToken,
                    res.data.user
                );
                navigate("/shop/dashboard")
            } catch (error) {
                authStore.getState().clearAuth();
            } finally {
                setReady(true);
            }
        };

        initAuth();
    }, []);

    return ready;
};


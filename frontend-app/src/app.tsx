import { useAuthInit } from "@hooks/use-auth-init";
import { RoutesData } from "./routes/routes-data";

export const App = () => {
    const authReady = useAuthInit();
    if (!authReady) {
        return <>Loading...</>;
    }

    return <RoutesData />;
}

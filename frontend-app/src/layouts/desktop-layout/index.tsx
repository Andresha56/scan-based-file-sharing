import { useIsMinimumDesktop } from "@hooks/use-media-query"
import { Navigate, Outlet } from "react-router-dom";

const DesktopLayout = () => {
    const isDesktop = useIsMinimumDesktop();
    if (!isDesktop) {
        return <Navigate to="/mobile-blocked" replace />;
    }
    return <Outlet />
};
export default DesktopLayout;
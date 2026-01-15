import { useIsMaximumMobile } from "@hooks/use-media-query"
import { Navigate, Outlet } from "react-router-dom";

const MobileLayout = () => {
    const isMobile = useIsMaximumMobile();
    if (!isMobile) {
        return <Navigate to="/desktop-blocked" replace />
    }
    return <Outlet />
};
export default MobileLayout;
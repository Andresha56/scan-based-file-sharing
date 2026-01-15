import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./guards/shop/PublicOnlyRoutes";
import { lazy } from "react";

const MobileBlockedPage = lazy(() => import("@pages/blockedPages/mobile-blocked"));
const DesktopBlockedPage = lazy(() => import("@pages/blockedPages/desktop-block"));
const UserDashBoard = lazy(() => import("@pages/user/user-dash-boad"));
const DesktopLayout = lazy(() => import("@layouts/desktop-layout"));
const ShopDashboard = lazy(() => import("@pages/shop/dashboard"));
// const PublicOnlyRoute = lazy(() => import("@pages/shop/auth"));
const MobileLayout = lazy(() => import("@layouts/mobile-layout"));
const UserIdentifierForm = lazy(() => import("@pages/user/landing"));
const AuthPage = lazy(() => import("@pages/shop/auth"));


export const RoutesData = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route element={<DesktopLayout />}>
        <Route
          path="/shop/dashboard"
          element={
            <ProtectedRoute>
              <ShopDashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Mobile Layout */}
      <Route element={<MobileLayout />}>
        <Route path="/user/register/shop/:shopId" element={<UserIdentifierForm />} />
        <Route path="/user/dashboard" element={<UserDashBoard />} />
      </Route>

      {/* Blocked pages */}
      <Route path="/mobile-blocked" element={<MobileBlockedPage />} />
      <Route path="/desktop-blocked" element={<DesktopBlockedPage />} />
    </Routes>
  );
};

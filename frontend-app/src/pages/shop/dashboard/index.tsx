import { NavigationPanel } from "@components/navigationPanel";
import { useEffect, useState } from "react";
import { ShopData } from "@archetypes/authentication";
import { useNavigate } from "react-router-dom";
import { getShopDetails } from "@query/index";
import { authStore } from "@store/auth.store";

const ShopDashboard = () => {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState<ShopData | undefined>(undefined);
  const { accessToken } = authStore();
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await getShopDetails(accessToken as string);
        if (response) {
          setShopData(response);
        } else {
          navigate("/");
        }
      }
      catch {
        navigate("/");
      }
    }
    fetchShopData();
  }, [navigate, accessToken]);
  if (!shopData) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-[30%_70%] h-[100vh] bg-[#001E2B]">
      <NavigationPanel shopId={shopData._id} qrCode={shopData.qrCode} />
    </div>
  );
};
export default ShopDashboard;
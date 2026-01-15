import { useMediaQuery } from "react-responsive";

export const useIsMinimumDesktop = () => useMediaQuery({ minWidth: 1024 });
export const useIsMaximumMobile = ()=>useMediaQuery({maxWidth:457})


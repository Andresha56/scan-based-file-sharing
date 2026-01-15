import { FC, useCallback } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@components/Button";

interface DefaultViewProps {
  containerClassName?: string;
  qrCode: string;
}
export const DefaultView: FC<DefaultViewProps> = ({ containerClassName, qrCode }) => {
  const handleQrDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrCode]);
  return (
    <div className={`flex flex-col items-center ${containerClassName}`}>
      <DotLottieReact
        src="https://lottie.host/a871d877-137c-464f-8c14-7d863ae69716/IACicv0TKC.lottie"
        loop
        autoplay
        style={{ width: 650, height: 350 }}
      />
      <div className="flex flex-col items-center mt-[-40px]">
        <h1 className="mb-[10px] text-[#e3f2fd] font-[300]">
          Make sharing effortless for your customers
        </h1>
        <p className="mb-[30px] text-[#e3f2fd] font-[500] font-[18px]">
          Enable users to share files and messages safely — all with a simple
          scan.
        </p>
        <Button variant="success" type="button" onClick={handleQrDownload}>Download QR</Button>
      </div>
    </div>
  );
};

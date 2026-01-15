
export interface IconProps {
  color?: string;
  size?: string | number;
}
export const PaperPlaneIcon = ({
  size = "18",
  color = "black",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill={color}
    >
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
};


export const CameraIcon = ({ color = "#292D32", size = "24" }:IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.76005 22H17.24C20 22 21.1 20.31 21.23 18.25L21.75 9.99C21.89 7.83 20.17 6 18 6C17.39 6 16.83 5.65 16.55 5.11L15.83 3.66C15.37 2.75 14.17 2 13.15 2H10.86C9.83005 2 8.63005 2.75 8.17005 3.66L7.45005 5.11C7.17005 5.65 6.61005 6 6.00005 6C3.83005 6 2.11005 7.83 2.25005 9.99L2.77005 18.25C2.89005 20.31 4.00005 22 6.76005 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 8H13.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18C13.79 18 15.25 16.54 15.25 14.75C15.25 12.96 13.79 11.5 12 11.5C10.21 11.5 8.75 12.96 8.75 14.75C8.75 16.54 10.21 18 12 18Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UploadIcon = ({
  size = 24,
  color = "none",
}:IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
  >
    <path
      d="M7 9h6l3 3v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9z"
      stroke={"currentColor"}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M12 8v6"
      stroke={"currentColor"}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.7 10.7L12 8l2.3 2.7"
      stroke={"currentColor"}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function FileUploadIcon({ size = "14", color = "#363636" }: IconProps) {
  return (
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-labelledby="title-folder-upload"
  >
   <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    <polyline points="9 11 12 8 15 11" />
    <line x1="12" y1="8" x2="12" y2="16" />
  </svg>

  );
}

export const GalleryIcon = ({
  size = "24",
  color = "#000",
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
  >
    <rect x="3.5" y="5.5" width="17" height="13" rx="1" />
    <circle cx="8.5" cy="9" r="1" />
    <path d="M21 18l-5-6-4 5-3-4L3 18" />
  </svg>
);
export function CloseIcon({ size, color }: IconProps) {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 21L21 1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L1 1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
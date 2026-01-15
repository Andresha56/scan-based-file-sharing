interface LabelInfoProps {
    text: string;
}

export const LabelInfo = ({ text }: LabelInfoProps) => {
  return (
    <label className="label-info-wrapper">
      <p className="label-info-text">{text}</p>
    </label>
  );
};

export const ViewAllHeader = ({
  smallHeading,
  bigHeading,
}: {
  smallHeading: string;
  bigHeading: string;
}) => {
  return (
    <div className="">
      <span>{smallHeading}</span>
      <h3 className="text-3xl">{bigHeading}</h3>
    </div>
  );
};

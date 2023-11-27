export const ToolBarButton = ({
    icon,
    label,
  }: {
    icon: React.ReactNode;
    label: string;
  }) => {
    return (
      <button className="text-center w-full flex flex-col justify-center items-center opacity-70 hover:opacity-90">
        {icon}
        <span className="text-xs block mt-1 text-primary-700 font-medium">
          {label}
        </span>
      </button>
    );
  };
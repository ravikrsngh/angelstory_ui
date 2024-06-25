import BackgroundColorSection from "../../components/background-panel/background-color";
import BackgroundImageSection from "../../components/background-panel/background-image";

export default function BackgroundPanel() {
  return (
    <div className="p-5 h-[calc(100vh-80px)]">
      <BackgroundColorSection />
      <BackgroundImageSection />
    </div>
  );
}

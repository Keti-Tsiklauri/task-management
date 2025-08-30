import MainPage from "./components/main-page/MainPage";

import MobileNavigation from "./components/navigation/MobileNavigation";
export default function Home() {
  return (
    <div>
      <div className="md:hidden">
        <MobileNavigation />
      </div>

      <MainPage />
    </div>
  );
}

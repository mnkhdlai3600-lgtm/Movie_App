import { Footer } from "./Footer";
import { Header } from "./Header";
import { Movies } from "./components/Movies";
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="md:max-w-360 w-screen">
        <Movies />
      </div>
    </div>
  );
}

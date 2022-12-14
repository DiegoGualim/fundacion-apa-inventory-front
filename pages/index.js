import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import Login from "../components/Login";

export default function Home() {
  return (
    <>
      <Login label="Primary" />
    </>
  );
}

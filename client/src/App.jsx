import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const hideHeader = ["/admin-login", "/admin-home"];
  const hideFooter = ["/admin-login", "/admin-home", "/register", "/login"];
  
  return (
    <>
      {!hideHeader.includes(location.pathname) && <Header />}
     <div className="bg-gradient-to-b from-gray-50 to-gray-200 mt-1">
      <Outlet/>
      </div>
      {!hideFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;

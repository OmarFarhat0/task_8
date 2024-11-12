import { Outlet, useMatch, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import ProductList from "../../components/productList/ProductList";
import "./home.css";

const Home = () => {
  const isOriginalRoute = useMatch({ path: "/", end: true });

  return (
    <div className="home">
      <Sidebar />
      {isOriginalRoute ? <ProductList /> : <Outlet />}
    </div>
  );
};

export default Home;

import ProductListView from "./views/products/ProductListView.jsx";
import DashboardView from "./views/dashboard/DashboardView.jsx";
import LoginView from "./views/login/LoginView.jsx";
import CategoriesView from "./views/categories/CategoriesView.jsx";
import ProductView from "./views/products/ProductView.jsx";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/categories" element={<CategoriesView />} />
          <Route path="/products" element={<ProductListView />} />
          <Route path="/product" element={<ProductView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

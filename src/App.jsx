import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import { useAuth } from './auth/AuthContext.jsx';

import ProductListView from "./views/products/ProductListView.jsx";
import DashboardView from "./views/dashboard/DashboardView.jsx";
import LoginView from "./views/login/LoginView.jsx";
import CategoriesView from "./views/categories/CategoriesView.jsx";
import ProductView from "./views/products/ProductView.jsx";
import UsersListView from "./views/users/UsersListView.jsx";
import AuditLogView from "./views/auditlog/AuditLogView.jsx";
import ConfigurationView from "./views/configuration/ConfigurationView.jsx";
import ProductEditView from "./views/products/ProductEditView.jsx";
import ProductCreateView from "./views/products/ProductCreateView.jsx";


function App() {
  
  const { user } = useAuth();

  let rootPath = <Route path="/" element={<LoginView />} />;

  if(user) {
    rootPath = <Route path="/" element={<DashboardView />} />
  }

  return (
    <BrowserRouter>
      <Routes>
        
        {rootPath}
        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/categories" element={<CategoriesView />} />
          <Route path="/categories/:categoryId/products" element={<ProductListView />} />
          <Route path="/categories/:categoryId/products/create" element={<ProductCreateView />} />
          <Route path="/categories/:categoryId/products/:productId" element={<ProductView />} />
          <Route path="/categories/:categoryId/products/:productId/edit" element={<ProductEditView />} />
          <Route path="/users" element={<UsersListView />} />
          <Route path="/auditlog" element={<AuditLogView />} />
          <Route path="/users" element={<UsersListView />} />
          <Route path="/configuration" element={<ConfigurationView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

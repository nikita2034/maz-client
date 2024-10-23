import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Импортируйте useLocation
import LoginPage from "./pages/AuthPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import ArchivePage from "./pages/Archive/Archive";
import ReportsPage from "./pages/Reports/Reports";
import EditCar from "./pages/EditCar/EditCar";
import NewCar from "./pages/NewCar/NewCar";
import ManufacturerTransportList from "./pages/Manufacturer/ManufacturerTransportList";
import OrganizationTransportList from "./pages/Organization/OrganizationTransportList";
import EditProfile from "./pages/EditProfilePage/EditProfilePage";
import CarTracking from "./pages/CarTracking/CarTracking";
import { useUser } from "./services/auth";
import { AuthContext } from "./services/auth";
import ProtectedRoute from "./services/auth";
import NotFound from "./pages/NotFoundPage";
import OrganizationDetails from "./pages/Manufacturer/Organization";
import NewOrganization from './pages/NewOrganization/NewOrganization';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  
  const location = useLocation(); // Получаем текущий путь

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setToken(user.token);
    if (user.token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const TransportList = () => {
    const { roleUser } = useUser();
    switch (roleUser) {
      case "SuperAdmin":
      case "Admin":
      case "Operator":
        return <ManufacturerTransportList />;
      case "Head":
      case "Manager":
      case "Mechanic":
        return <OrganizationTransportList />;
      default:
        return <div>Unauthorized Access</div>; 
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, logout }}>
      {token && location.pathname !== '/' && <Header />}
      <div style={{
        display: 'flex',
        // justifyContent: 'space-between',
        width:'100%',
        // height: '100', // Используйте 100vh для заполнения высоты
      }}>
        {token && location.pathname !== '/' && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                setRole={setRole}
                setToken={setRole}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route element={<ProtectedRoute requiredRoles={["SuperAdmin", "Admin", "Operator", "Head","Manager","Mechanic"]} />}>
            <Route path="/dashboard" element={<MainPage />} />
            <Route path="/reports" element={<ReportsPage/>} />
            <Route path="/archive" element={<ArchivePage/>} /> 
            <Route path="/parameters" element={<CarTracking />} />
            <Route path="/transports" element={<TransportList />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
          <Route element={<ProtectedRoute requiredRoles={["SuperAdmin"]} />}>
            <Route path="/edit-car" element={<EditCar />} />
            <Route path="/new-car" element={<NewCar />} />
            <Route path="/new-organization" element={<NewOrganization />} />
            <Route path="/organization" element={<OrganizationDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
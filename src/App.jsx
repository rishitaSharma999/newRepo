import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import MyNavbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Logout from "./components/Auth/Logout";
import Item from "./pages/Item";
import PaymentForm from "./pages/PaymentForm";
import Success from "./pages/Success";
import Fail from "./pages/Fail";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
};

function App() {
  {
    /*This is the top-level component that wraps all the routes. It's used to define the routing configuration for the application. */
  }
  return (
    <div>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<PrivateRoute component={Checkout} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/payment" element={<PrivateRoute component={PaymentForm} />} />
        <Route path="/success" element={<PrivateRoute component={Success} />} />
        <Route path="/fail" element={<PrivateRoute component={Fail} />} />
      </Routes>
      {/* our env file in  front end part has api/v1 cause this signifies that this link if for programmatic access, rather than human interaction. */}
      {/* It helps to distinguish the API endpoint from other types of endpoints, such as web pages or static assets.*/}
      {/*Static assets are files that are served directly by a web server without any modification or processing. They are typically stored on a server and delivered to clients (web browsers) as-is, without any server-side rendering or execution. */}
    </div>
  );
}

export default App;

/*In the App component, the ErrorBoundary component is used to wrap several components, including the MyNavbar component and the Routes component. This means that if any of these components (or their children) throw an error, the ErrorBoundary component will catch the error and display the fallback UI instead of crashing the entire application. */

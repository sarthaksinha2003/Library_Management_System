import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./utils/authContext";
import LandingPage from "./pages/landing/landingPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PageNotImplemented from "./pages/pageEmpty";

import DashboardPage from "@/pages/dashboard";
import CommonHeader from "@/Components/Header";
import Catalog from "./pages/catalog/catalog";
import BookCatalog from "./bookcatalog";
import ReportsPage from "./ReportPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import axios from 'axios';
=======
import ForgotPassword from "./pages/forgot";
>>>>>>> f608e430c01d78c756bc8b71f7a1cac480afd9f5

const BlankLayout = () => {
  const [data ,setData] = useState("");
  async function getData(){
    let res = await axios.get("https://www.dbooks.org/api/recent");
    console.log(res.data,"mydta2");
    
    setData(res.data);
  }
  useEffect(()=>{
    getData()
  },[]);
  return (
    <>
      <CommonHeader />
      <main>
<<<<<<< HEAD
        <div className=""></div>
=======
>>>>>>> f608e430c01d78c756bc8b71f7a1cac480afd9f5
        <Outlet />
        <ToastContainer />
      </main>
    </>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlankLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/forgot",
          element: <ForgotPassword />
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/catalog",
          element: <Catalog />,
        },
        {
          path: "/bookcatalog",
          element: <BookCatalog/>,
        },
        {
          path: "/reports",
          element: <ReportsPage />,
        },
        {
          path: "/contact",
          element: <main>Contact Us</main>,
        },
        {
          path: "/services",
          element: <main>Services</main>,
        },
        {
          path: "/about",
          element: <main>About Us</main>,
        },
        {
          path: "*",
          element: <PageNotImplemented />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;

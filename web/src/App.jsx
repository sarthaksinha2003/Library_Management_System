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
import axios from 'axios';
import ForgotPassword from "./pages/forgot";
import LendingPage from "./pages/lending/LendingPage";
import ReturnPage from "./pages/returnpage/returnPage"; 


// import ForgotPassword from "./pages/forgot";

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
        <div className=""></div>
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
          path: "/lending", 
          element: <LendingPage /> 
        },
        { 
          path: "/returnpage", 
          element: <ReturnPage /> 
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

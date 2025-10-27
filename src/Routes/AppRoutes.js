import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ProductListing, Login, SignUp } from "../pages";
import { onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "../Redux/AuthSlice";
import ProtectedRoute from "../components/ProtectedRoute";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import AddProductPage from "../pages/AddProductPage";

function AppRoutes() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ProductListing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProductPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ProductListing />} />
    </Routes>
  );
}

export default AppRoutes;

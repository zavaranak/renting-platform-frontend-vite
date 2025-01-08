import { useTitle } from "./hook/title-hook";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { Header } from "@components/header/header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "@components/form/login-form";
import { useAuthStore } from "@store/auth-store";
import { Role } from "@lib/contanst";
import SearchRoute from "@components/search_route/searchRoute";

import { useCreateApolloClient } from "@hook/create-apollo-client-hook";

export default function App() {
  useTitle("Homsk - Main page");
  const { isAuthenticated } = useAuthStore((state) => state);

  const client = useCreateApolloClient();

  if (!client) return <div>Loading...</div>;

  return (
    <div>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header />
          <div className="bg-background grid lg:grid-cols-12 md:grid-cols-8 grid-cols-4 gap-3 justify-center text-dark_blue place-items-center">
            <Routes>
              <Route path="/" element={<SearchRoute />} />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
              />
              <Route
                path={`/profile/${Role.tenant}/:userId`}
                element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
              />
              <Route
                path={`/profile/${Role.landlord}/:userId`}
                element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
              />
              <Route
                path={`/search/`}
                element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
              />
              {/* <Route path="/about" element={<About />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
              {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

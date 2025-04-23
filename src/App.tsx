import { useTitle } from "@/hook/title.hook";
import "@/index.css";
import { ApolloProvider } from "@apollo/client";
import { Header } from "@/components/header/header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "@/components/profile/unauthorized/login-form";
import { useAuthStore } from "@/store/auth-store";
import SearchRoute from "@/routes/search/search.route";
import SearchResultRoute from "@/routes/search_result/search-result.route";

import { useCreateApolloClient } from "@/hook/apollo-client.hook";
import PlaceRoute from "./routes/place/place.route";
import { ProfileRoute } from "./routes/profile/profile.route";

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
          <div className="bg-background grid lg:grid-cols-12 md:grid-cols-8 grid-cols-4 gap-3 justify-center text-dark_blue place-items-center z-10 mt-20">
            <Routes>
              <Route path="/" element={<SearchRoute />} />
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
              />
              <Route
                path={`/profile/:role/:userId`}
                element={isAuthenticated ? <ProfileRoute /> : <LoginForm />}
              />
              <Route path={`/search/`} element={<SearchResultRoute />} />
              <Route path="/place/:placeId" element={<PlaceRoute />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

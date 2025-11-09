// App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/ui/Header";
import TestError from "@/pages/TestError";
import Registration from "@/pages/Registration";
import Main from "@/components/ui/Main";
import EditCarModal from "./pages/EditCarModal";
import { UserProvider } from "@/store/UserContext";
import Footer from "./components/Footer";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />

        <Route path="/auth" element={<Registration />} />

        <Route
          path="/cars"
          element={
            <>
              <Header />
              <Main />
            </>
          }
        />

        <Route
          path="/cars/edit/:id"
          element={
            <>
              <Header />
              <EditCarModal />
              <Footer />
            </>
          }
        />

        <Route path="/cars/error-page" element={<TestError />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useState } from "react";
import InboxPage from './inboxPage/InboxPage';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './registerPage/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import InboxOrHomePage from './InboxOrHomePage';
import "./App.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* --- זה הנתיב החשוב --- */}
          {/* הנתיב הראשי '/' יטען את ה-InboxOrHomePage, שיחליט לאן להמשיך */}
          <Route index path="/" element={<InboxOrHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* הנתיב ל-inbox עדיין מוגן, כדי למנוע גישה ישירה דרך ה-URL */}
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <InboxPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

          {/* if a user is signed in- go to inbox. o.w go to the home page  */}
          <Route index path="/" element={<InboxOrHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* only go to the inbox page if a user is signed in */}
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
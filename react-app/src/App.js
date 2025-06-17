import { Routes, Route } from 'react-router-dom';
import InboxPage from './inboxPage/InboxPage';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './registerPage/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import InboxOrHomePage from './InboxOrHomePage';


function App() {
  return (
    // <div className="App">
    //   <Routes>
    //     {/* --- זה הנתיב החשוב --- */}
    //     {/* הנתיב הראשי '/' יטען את ה-InboxOrHomePage, שיחליט לאן להמשיך */}
    //     <Route path="/" element={<InboxOrHomePage />} /> 
        
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterPage />} />
        
    //     {/* הנתיב ל-inbox עדיין מוגן, כדי למנוע גישה ישירה דרך ה-URL */}
    //     <Route 
    //       path="/inbox" 
    //       element={
    //         <ProtectedRoute>
    //           <InboxPage />
    //         </ProtectedRoute>
    //       } 
    //     />
        
    //     <Route path="*" element={<h1>404: Page Not Found</h1>} />
    //   </Routes>
    // </div>
    // <InboxPage />
    <LoginPage />
  );
}

export default App;
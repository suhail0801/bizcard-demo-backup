// App.js
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from "./react_components/login/Login";
import HomePage from './react_components/HomePage';
import Backend from './react_components/Backend';
import Signup from "./react_components/login/Signup";
// import BizCard from './react_components/BizCard';
// import Dummy from './react_components/Dummy';
// import Dumm from './react_components/Dumm';
// import BackupBizCard from './react_components/BackupBizCard';
// import Cards from './react_components/Cards';
// import Template from './react_components/Template';
// import Fetch from './react_components/Fetch';
import './globals.css';
import './App.css';
// import Main from './react_components/Project_Components/Main';
// import Card1 from './react_components/Card_Template/card1/Card1';
// import Card4 from './react_components/Card_Template/card2/Card2';
// import New from './react_components/New';
// import Card2 from './react_components/Card_Template/card1/Card2';
// import Cards2 from './react_components/Template/Cards2';
import Landingpage from './react_components/Landingpage';
import Display from './Display';
import Build from './pages/Build';
import Cards from './pages/Cards';
import DigitalCard from './pages/DigitalCard';
import Header from './pages/Header';
import Footer from './pages/Footer';
import UserSavedCardList from './react_components/UserSavedCardList';
import UserSavedCard from './react_components/UserSavedCard';
import MyContacts from "./pages/MyContacts"; // Import MyContacts component


const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();
  console.log(state, 'state')
  return true ? (
    element
  ) : (
    <Navigate to="/" replace={true} />
  );
};

// const ProtectedRoute = ({ element }) => {
//   const { state } = useAuth();
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     setAuthenticated(state.isAuthenticated);
//   }, [state.isAuthenticated]);

//   return authenticated ? ( 
//     element
//   ) : (
//     <Navigate to="/" replace={true} />
//   );
// };

function App() {
  // const [templateData, setTemplateData] = useState([])
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/build/:id" element={<ProtectedRoute element={<Build />} />} />
          <Route path="/cards" element={<ProtectedRoute element={<Cards />} />} />
          <Route path="/contacts" element={<ProtectedRoute element={<MyContacts />} />} />
          <Route path="/digital-card/" element={<ProtectedRoute element={<DigitalCard />} />} />
          {/* <Route path="/home" element={<ProtectedRoute element={<BizCard />} />} /> */}
          <Route path="/Display" element={<ProtectedRoute element={<Display />} />} />
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/be/:templateId" element={<ProtectedRoute element={<UserSavedCard />} />} />
          <Route path="/mycards" element={<ProtectedRoute element={<UserSavedCardList />} />} />
          <Route path="/mycard/:cardId" element={<ProtectedRoute element={<UserSavedCard />} />} />

        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { PrivateRoute } from './components/privateRoutes.js/privateRoutes';


// pages
import Navbar from './components/navbar/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import Login from './components/login/login';
import SignUp from './components/signup/signUp';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from './helper';
import { loginCheck } from './components/login/loginCheck';

function App() {

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user)
      const uid = user.uid;
      loginCheck(user);
      // ...
    } else {
      // User is signed out
      // ...
      loginCheck(user);
      console.log('user', user)
    }
  });


  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute
              redirectTo="/login"
            // isAllowed={!!user && user.permissions.includes("analize")}
            >
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

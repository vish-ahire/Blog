import { useDispatch } from 'react-redux'
import {Header,Footer} from './components'
import "./App.css";
import authService from "./appwrite/auth";
import { useEffect,useState } from "react";
import { logOut } from "./store/authSlice";
import { Outlet } from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        // userData ? dispatch(logOut({ userData })) : dispatch(logOut());
      })
      // .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  console.log(import.meta.env.VITE_APPWRITE_URL)
  return !loading?(
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header/>
          <main>
            TODO:<Outlet/>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  ):null;
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Home from './screens/HomeScreen';
import SignUpScreen from './screens/SignUp';  
import NoPageFound from './screens/404page';
import UserDetailsPage from './screens/UserDetailsScreen';
function App() {
  return (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUpScreen />} />
          <Route path='/userdetails/:id/:email' element={<UserDetailsPage />} />
          <Route path='*' element={<NoPageFound />} />
        </Routes>
  );
}

export default App;

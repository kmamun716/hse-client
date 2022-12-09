import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import RequireAuth from './components/auth/RequireAuth';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import AboutUs from './pages/AboutUs/AboutUs';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import AllUser from './pages/Dashboard/AllUser';
import CreatePost from './pages/Dashboard/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import MyPosts from './pages/Dashboard/MyPosts';
import NoticeBoard from './pages/Dashboard/NoticeBoard';
import PendingPosts from './pages/Dashboard/PendingPosts';
import PendingUser from './pages/Dashboard/PendingUser';
import Profile from './pages/Dashboard/Profile';
import Training from './pages/Dashboard/Training';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Mission from './pages/Mission/Mission';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}>
          <Route index element={<Profile/>} />
          <Route path='create-post' element={<CreatePost/>} />
          <Route path='my-posts' element={<MyPosts/>} />
          <Route path='training' element={<Training/>} />
          <Route path='notice' element={<NoticeBoard/>} />
          <Route path='allUser' element={<AllUser/>} />
          <Route path="pending-user" element={<PendingUser/>} />
          <Route path="pending-post" element={<PendingPosts/>} />
        </Route>
        <Route path='/blog' element={<Blog/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/who-we-are' element={<AboutUs/>} />
        <Route path='/mission' element={<Mission/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
    </QueryClientProvider>
  );
}

export default App;

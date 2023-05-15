import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import LazyLoading from './components/LazyLoading';
import Protected from './components/Protected';
import AuthProtected from './components/AuthProtected';
import { fetch } from './features/user/userSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import NavFootLayout from './components/NavFootLayout';
import Profile from './pages/Profile';
const Navbar = React.lazy(() => import('./components/Navbar'))
const Login  = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const ErrorPage = React.lazy(() => import('./pages/Error404'));
const FrontPage = React.lazy(() => import('./pages/FrontPage'));
const CreateBlog = React.lazy(() => import('./pages/CreateBlog'));
const CreateQuestion = React.lazy(() => import('./pages/CreateQuestion'));
const Blogs = React.lazy(() => import('./pages/Blogs'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Questions = React.lazy(() => import('./pages/Questions'))
const Question = React.lazy(() => import('./pages/Question'))
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  
  useEffect(() => {
      if (!user.loggedIn) {
          dispatch(fetch());
      }
  }, []);

  return (
    <>
      <Routes>
        <Route path = "/">
          <Route path = '' element = {<NavFootLayout />}>
            <Route path = '' element = {<React.Suspense fallback = {<LazyLoading />}>
              <FrontPage />
            </React.Suspense>} />
            <Route path = 'blogs' element = {<React.Suspense fallback = {<LazyLoading />}>
              <Blogs />
            </React.Suspense>} />
            <Route path = 'blog/:id' element = {<React.Suspense fallback = {<LazyLoading />}>
              <Blog />
            </React.Suspense>} />
            <Route path = 'questions' element = {<React.Suspense fallback = {<LazyLoading />}>
              <Questions />
            </React.Suspense>} />
            <Route path = 'question/:id' element = {<React.Suspense fallback = {<LazyLoading />}>
              <Question />
            </React.Suspense>} />
            <Route path = 'about' element = {<React.Suspense fallback = {<LazyLoading />}>
              <AboutUs />
            </React.Suspense>} />
          </Route>
        </Route>

        <Route path = "/profile" element = {<Protected />} >
          <Route path = "" element = {<NavFootLayout />}>
            <Route path = "" element = {<React.Suspense fallback = {<LazyLoading />}>
              <Profile />
            </React.Suspense>} />
          </Route>
        </Route>

        <Route path = "/" element = {<Protected />} >
          <Route path = "" element = {<NavFootLayout />}>
            <Route path = 'addquestion' element = {<React.Suspense fallback = {<LazyLoading />}>
              <CreateQuestion />
            </React.Suspense>} />
            <Route path = 'createblog' element = {<React.Suspense fallback = {<LazyLoading />}>
              <CreateBlog />
            </React.Suspense>} />
          </Route>
        </Route>
        
        
        <Route path = "/auth" element = {<AuthProtected />} >
          <Route path = "login" element = {<React.Suspense fallback = {<LazyLoading />}>
            <Login />
          </React.Suspense>} />
          <Route path = "signup" element = {<React.Suspense fallback = {<LazyLoading />}>
            <SignUp />
          </React.Suspense>} />
          <Route path = "forgotpassword" element = {<React.Suspense fallback = {<LazyLoading />}>
            <ForgotPassword />
          </React.Suspense>} />
        </Route>
        
        <Route path='*' element={<React.Suspense fallback = {<LazyLoading />}>
          <ErrorPage />
        </React.Suspense>} />
      </Routes>
    </>
  );
}

export default App;

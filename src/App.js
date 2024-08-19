import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Blogs from './pages/Blogs';
import Tutorials from './pages/Tutorials';
import Code from './pages/Code';
import Shorts from './pages/Shorts';
import Contact from './pages/Contact';
import PrivateRoute from './utils/PrivateRoute'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './user/Dashboard';
import BlogPost from "./user/BlogPost";
import TestLanguages from "./user/TestLanguages";
import TestTopics from "./user/TestTopics";
import Test from "./user/Test";
import Profile from "./user/Profile";
import ChangePassword from "./user/ChangePassword";
import Todo from "./user/Todo"
import YourBlogs from "./user/YourBlogs"
import SingleBlog from './pages/SingleBlog';
import TutorialTopics from './pages/TutorialsTopics';
import TopicView from './pages/TopicView';
import Codetopics from './pages/CodeTopics';
import CodesList from './pages/CodesList';
import Codes from './pages/Codes';
import PasswordReset from './user/PasswordReset';
import PasswordResetConfirm from './user/PasswordResetConfirm';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<LandingPage />} path='/' />
            <Route element={<Blogs />} path='/blogs' />
            <Route element={<Tutorials />} path='/tutorials' />
            <Route element={<Code />} path='/code' />
            <Route element={<Shorts />} path='/shorts' />
            <Route element={<Contact />} path='/contact' />
            <Route element={<SignIn />} path='/signin' />
            <Route element={<SignUp />} path='/signup' />
            <Route element={<SingleBlog />} path="blogs/:url/" />
            <Route element={<TutorialTopics />} path="tutorials/:url/" />
            <Route element={<TopicView />} path="tutorials/posts/:url/" />
            <Route element={<Codetopics />} path="/topics/:url/"  />
            <Route element={<CodesList />} path="languages/:url/codes" />
            <Route element={<Codes />} path="languages/codes/:url/" />
            <Route element={<PasswordReset />} path="reset/password/" />
            <Route element={<PasswordResetConfirm />} path="reset/password/confirm/:uid/:token" />
            <Route element={<PrivateRoute />}>
              <Route element={<Dashboard />} path='dashboard' />
              <Route element={<YourBlogs />} path="your_blogs" />
              <Route element={<Todo />} path="todo" />           
              <Route element={<BlogPost />} path="postBlog" />     
              <Route element={<TestLanguages/>} path="tests"/>     
              <Route element={<TestTopics/>} path="testtopics/:id/"/>  
              <Route element={<Test/>} path="test/:id/"/> 
              <Route element={<Profile/>} path="profile"/> 
              <Route element={<ChangePassword/>} path="change-password"/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

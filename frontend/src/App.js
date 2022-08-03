import './App.css';
import { 
  Route,
  Routes,
} from 'react-router-dom';
import { useContext } from 'react';

import { Context } from './Store';
import { TERMINATE_NOTIFICATION } from './actions/actionTypes';
import { terminateNotify } from './actions/notificationActions';
import PrivateRoutes from './components/PrivateRoutes';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotoficationMessage from './components/NotificationMessage/';
import Header from './components/Header';
import Products from './pages/Products';

function App() {
  const { auth, notification } = useContext(Context);
  const [user] = auth;
  const [notify, notifyDispatch] = notification;

  const notifyToJs = notify.toJS();

  if (notifyToJs.active) {
    setTimeout(() => {
      terminateNotify(notifyDispatch, {type: TERMINATE_NOTIFICATION })
    }, 1500);
  }

  return (
    <div className="App">
      <Header />
      {
        notifyToJs.active
          ? <NotoficationMessage type={notifyToJs.type} message={notifyToJs.message} />
          : ''
      }
      <Routes>
        <Route element={ <PrivateRoutes /> }>
          <Route element={ <Products/> } path="/" />
        </Route>
        <Route element={ <Login/> } path="/login" />
        <Route element={ <Register/> } path="/register" />
      </Routes>
    </div>
  );
}

export default App;
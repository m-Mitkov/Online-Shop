import './App.css';
import { 
  Route,
  Routes,
} from 'react-router-dom';
import { useContext } from 'react';

import { Context } from './Store';
import { TERMINATE_NOTIFICATION } from './actions/actionTypes';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotoficationMessage from './components/NotificationMessage/';

function App() {

  const { auth, notification } = useContext(Context);

  const [user] = auth;
  const [notify, notifyDispatch] = notification;

  const notifyToJs = notify.toJS();
 

  if (notifyToJs.active) {
    setTimeout(() => {
      notifyDispatch({type: TERMINATE_NOTIFICATION })
    }, 1500);
  }

  return (
    <div className="App">
      {
        notifyToJs.active
          ? <NotoficationMessage type={notifyToJs.type} message={notifyToJs.message} />
          : ''
      }

        <Routes>
          <Route path="/login" element={ <Login/> } />
          <Route path="/register" element={ <Register/> } />
        </Routes>
    </div>
  );
}

export default App;
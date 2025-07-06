import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <BrowserRouter>
      <Routes />
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
      />
    </BrowserRouter>
  );
}


export default App

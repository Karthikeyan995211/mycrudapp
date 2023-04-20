
import './App.css';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Create from './components/Create';
import Read from './components/Read';

import  {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Update from './components/Update';

function App() {
    
  return (
     <BrowserRouter>
     <div className="App">
        <ToastContainer position='top-center'/>
        
        <Routes>
        <Route path='/' exact element={<Read/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/update' element={<Update/>}/>
        </Routes> 
       
      </div>
      </BrowserRouter>
  );
}

export default App;

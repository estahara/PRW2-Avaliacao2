import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home   from './componentes/Home';
import Read   from './componentes/Read';
import Create from './componentes/Create';
import Update from './componentes/Update';
import Delete from './componentes/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'           element={<Home />}   />
                <Route path='/read/:id'   element={<Read />}   />
                <Route path='/create'     element={<Create />} />
                <Route path='/update'     element={<Update />} />
                <Route path='/delete'     element={<Delete />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

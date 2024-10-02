import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Page1 from './page1';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={< Page1 />} />
      </Routes>

      </Router>

      
    </div>
  );
}

export default App;

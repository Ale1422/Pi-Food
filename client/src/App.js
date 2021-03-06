import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home/Home';
import LandingPage from'./components/LandingPage/LandingPage';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path= '/' element={<LandingPage/>}/>
        <Route path= '/home' element={<Home/>}/>
        <Route path= '/recipe' element={<RecipeCreate/>}/>
        <Route path= '/home/:id' element={<Detail/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;

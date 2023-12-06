import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import MainRoute from './routes/MainRoute';
import { Footer } from './components/Footer';
import Spacer from './components/Spacer';

function App() {
  return (
    <div className="App">
    <Navbar />
    <Spacer />
    <MainRoute />
    <Footer />
    </div>
  );
}

export default App;

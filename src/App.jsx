import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sections from "./components/sections";
import './assets/styles/main.scss';

function App() {
 
  return (
    <>
      <main className="app-main">
        <Header />
        <Sections />
        <Footer />
      </main>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sections from "./components/sections";
import { SplitScreen } from "./components/layout/SplitScreen"; // import your SplitScreen
import './assets/styles/main.scss';

function App() {
 
  return (
    <>
      {/* Header can stay on top if needed */}
      {/* <Header /> */}

      <main className="app-main">
        <SplitScreen leftWeight={4} rightWeight={1}>
          <Sections />
          <Footer />
        </SplitScreen>
      </main>
    </>
  );
}

export default App;

// import React from 'react';
// import Nav from './Nav';
// import Foot from './Foot'
// import './App.css';
// import About from './About';
// export default function App() {
//   return <div>
//       <Nav />
//       <About />
//       <Foot />
//   </div>;
// }

import React, { useEffect, useState } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/Aboutme";
import Resume from "./Components/Resume";
import Contact from "./Components/Contactme";
import Portfolio from "./Components/Portme";

import "./App.css";

const App = () => {
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    fetch("/resumeData.json")
      .then((res) => res.json())
      .then((data) => {
        setResumeData(data);
      });
  }, []);

  return (
    <div className="App">
      <Header data={resumeData.main} />
      <About data={resumeData.main} />
      <Resume data={resumeData.resume} />
      <Portfolio data={resumeData.portfolio} />
      {/* <Testimonials data={resumeData.testimonials} /> */}
      <Contact data={resumeData.main} />
      <Footer data={resumeData.main} />
    </div>
  );
};

export default App;
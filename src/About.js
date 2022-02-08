import React from "react";
import "./About.css";
import devimg from "./developerimg.png";
export default function About() {
  return (
    <div className="about">
      <div className="intro">
        <div>
          {" "}
          <img className="img" src={devimg} />
        </div>
        <h1>Hi, I am Aditya Chaudhary </h1>
        
        {/* <p>
          I live in Faridabad , currently working from home. I am pursing my
          studies in Information Technology from NIT Jalandhar, currently in my
          Final Semester. I have done a few internships covering domains such as
          Nerual Networks deep learning , Backend developemnt and Full stack
          development.
          I like problem solving and competing in  competitions related to it.
          I do CP in c++ language , i have hands on experience with Python django , currently i am learning react , javascript.
          I like to read books ( real life inspiring self help content) and listen to poscasts - few of my favourite podcasters are naval, tim ferris , jack dorsey and i try to never miss my exersice sessions at gym. 
        </p> */}
        <h2>
          I am 147chaudhary everywhere, connect me on linkedin , instagram , twitter.
        </h2>

      </div>
    </div>
  );
}

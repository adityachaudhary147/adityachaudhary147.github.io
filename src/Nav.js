import React from 'react';
import './Nav.css'
export default function Nav() {
  return <div className='nav'>
      <div className='logo'><h1>147chaudhary</h1></div>
      <div className='about'><h3>About me</h3></div>
      <div className='contact'><h3>Contact</h3></div>
      <div className='social'><h3>Profiles</h3></div>
      <div className='resume'><a href='https://drive.google.com/file/d/1t45fdlU_nRWWjbLXNBmxjMHYlsnNCxJ0/view?usp=sharing' target='_blank'><h3>Resume</h3></a></div>
  </div>;
}

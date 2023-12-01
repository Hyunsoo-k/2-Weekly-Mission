import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import './App.css';

export default function Folder() {
  return (
    <>
      <Navbar profileUrl='users/1' className='navbar' />
      <SearchBar />
    </>
  );
}

import React from 'react'
import Card from './components/Card';
import './scss/responsive.scss'

function App() {
  return (
    <div className="app-container">
                <div className='large-screen'>
                   <Card screen={'large'}/>
               </div>
               <div className='small-screen'>
                   <Card screen={'small'}/>
               </div>
           </div>
  );
}

export default App;

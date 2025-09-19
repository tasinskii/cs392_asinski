//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

const Banner = ({title}:{title:string}) => (
  <h1>
    { title }
  </h1>
)

const schedule = {
  title: "CS Courses for 2018-2019"
};

const App = () => {
  
  return ( 
      <Banner title={schedule.title}/>
  )
}

export default App

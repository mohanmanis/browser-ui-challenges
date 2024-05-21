import { useState, useEffect } from 'react'
import getData from "./data";
import Tree from "./components/Tree";
import './App.css'

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };
    fetchData();
  })
  return (<Tree data={data}/>)
}

export default App

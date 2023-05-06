import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Registration from "./pages/registration/Registration";
import DataTables from "./pages/dataTables/DataTables"
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  

  return (
    <Router>
       <ToastContainer position="top-center" />
      <Header/>
      <Routes>
        <Route path="/" element={<Registration/>}/>
        <Route path="/datatables" element={<DataTables/>}/>
      </Routes>
    </Router>
  )
}

export default App

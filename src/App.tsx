import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import './app.css'

function App() {
  return (
    <div>
      <MainLayout />
      <ToastContainer />
    </div>
  );
}

export default App;

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div>
      <MainLayout />
      <ToastContainer />
    </div>
  );
}

export default App;

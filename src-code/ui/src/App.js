import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './page/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
]);
function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

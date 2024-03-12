import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

// pages.
import AllEmployee from './pages/AllEmployee';
import AddEmployee from './pages/AddEmployee';
import EmployeeDetails from './pages/EmployeeDetails';

// layouts.
import RootLayout from './layouts/RootLayout';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route 
        index 
        element={<AllEmployee />}
        />
      <Route path="add-employee" element={<AddEmployee />} />
      <Route path=":id" element={<EmployeeDetails />} />
    </Route>
  )
)
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
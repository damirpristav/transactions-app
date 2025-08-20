import { RouterProvider } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';

import { router } from 'router';

function App() {
  return (
    <main className="main-wrapper">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;

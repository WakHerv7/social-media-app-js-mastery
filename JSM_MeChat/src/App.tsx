import { Routes, Route } from 'react-router-dom';

import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import { Home } from './_root/pages';
import './global.css';

const App = () => {
  return(
    <main>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route to="/sign-in" element={<SignInForm />} />
          <Route to="/sign-up" element={<SignUpForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App;
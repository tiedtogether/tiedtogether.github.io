import './App.css';

// router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// mui and fonts
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

// pages
import Onboarding from './pages/Onboarding/Onboarding';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorPage from './pages/ErrorPage/ErrorPage';

// navbar
import NavBar from './components/NavBar/NavBar';
import { grey, red } from '@mui/material/colors';
import Login from './pages/Login/Login';
import Thanks from './pages/Thanks/Thanks';
import ConnectConfirm from './pages/ConnectConfirm/ConnectConfirm';

// ROOT
// contains router and mui styling default theme
// individual pages are in the pages folder

// this is the default theme
// its easier to use css directly imo
// so often this will be overridden
const primaryTheme = createTheme({
  palette: {
    primary: grey,
    secondary: red
  },
  typography: {
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={primaryTheme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/hello-world-app" element={<Onboarding />} />
            <Route exact path="/hello-world-app/register-student" element={<Register isStudent={true}/>} />
            <Route exact path="/hello-world-app/register-tutor" element={<Register isStudent={false}/>} />
            <Route exact path="/hello-world-app/login" element={<Login />} />
            <Route exact path="/hello-world-app/dashboard" element={<Dashboard />} />
            <Route exact path="/hello-world-app/thanks" element={<Thanks />} />
            <Route exact path="/hello-world-app/connect-confirm" element={<ConnectConfirm />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

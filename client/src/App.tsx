import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { theme } from './theme';
import CursorFollower from './components/CursorFollower';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollManager from './components/ScrollManager';
import SmoothScroll from './components/SmoothScroll';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <SmoothScroll>
          <ScrollManager />
          <CursorFollower />
          <Box sx={{ position: 'relative', overflowX: 'clip' }}>
            <Header />
            <Box component="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-portfolio" element={<PortfolioPage />} />
                <Route path="/my-portfolio/:slug" element={<ProjectDetail />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </SmoothScroll>
      </BrowserRouter>
    </ThemeProvider>
  );
}

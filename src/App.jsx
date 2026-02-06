import { Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Navigation from './components/common/navigation';
import HomePage from './pages/home-page';
import AboutPage from './pages/about-page';
import ProjectsPage from './pages/projects-page';

function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </PortfolioProvider>
  );
}

export default App;

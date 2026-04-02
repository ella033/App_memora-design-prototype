import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TabBar from './components/ui/TabBar';
import IPhoneMockup from './components/ui/IPhoneMockup';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Chapter from './pages/Chapter';
import Review from './pages/Review';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <IPhoneMockup>
        <div className="relative min-h-[852px] bg-bg-warm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:chapterId" element={<Chapter />} />
            <Route path="/review" element={<Review />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <TabBar />
        </div>
      </IPhoneMockup>
    </BrowserRouter>
  );
}

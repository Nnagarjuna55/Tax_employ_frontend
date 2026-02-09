import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ArticleDetail from './pages/ArticleDetail';
import AboutUs from './pages/AboutUs';
import SubmitArticle from './pages/SubmitArticle';
import Login from './pages/Login';

function App() {
  console.log('🚀 App component rendering');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
            <Route path="income-tax/*" element={<CategoryPage title="Income Tax" />} />
            <Route path="gst/*" element={<CategoryPage title="GST" />} />
            <Route path="mca/*" element={<CategoryPage title="MCA" />} />
            <Route path="sebi/*" element={<CategoryPage title="SEBI" />} />
            <Route path="ms-office/*" element={<CategoryPage title="MS Office" />} />
            <Route path="about-us/*" element={<AboutUs />} />
            <Route path="article/:id" element={<ArticleDetail />} />
            <Route path="submit-article" element={<SubmitArticle />} />
            <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

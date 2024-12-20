import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { ProductList } from '@/components/product/product-list';
import { ProductPage } from '@/components/product/product-page';
import { SubmitPage } from '@/components/submit/submit-page';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { AdminLink } from '@/components/admin/admin-link';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SavedProducts } from '@/pages/Savedproducts';
import { SubmissionLandingPage } from '@/pages/SubmissionLandingPage';
import PremiumContentPage from '@/pages/PremiumContentPage';
import Page from '@/app/page';
import { ArticlePage } from '@/components/Article/article-page';
import { ArticleList } from '@/components/Article/article-list';



function HomePage() {
  return (
    <main className="container relative min-h-screen px-4 py-4 md:px-6 md:py-6">
      <Page />
      <div className="absolute bottom-4 right-4">
        <AdminLink />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/article/:id" element={<ArticlePage/>} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/saved" element={<SavedProducts />} />
          <Route path="/submission-success" element={<SubmissionLandingPage />} />
          <Route path="/premium-content" element={<PremiumContentPage />} />
        </Routes>
      </div>
    </TooltipProvider>
  );
}
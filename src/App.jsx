import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { Toaster } from "sonner";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BlogList from "./pages/BlogList.jsx";
import BlogForm from "./pages/BlogForm.jsx";
import TrashBin from "./pages/TrashBin.jsx";
import NotFound from "./pages/NotFound.jsx";

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <>
      <Toaster position="top-right" richColors theme={theme} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/new" element={<BlogForm />} />
            <Route path="blogs/edit/:id" element={<BlogForm />} />
            <Route path="trash" element={<TrashBin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <BlogProvider>
      <AppContent />
    </BlogProvider>
  </ThemeProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

import StoreLayout from "@/components/store/StoreLayout";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import TrackOrderPage from "@/pages/TrackOrderPage";
import WishlistPage from "@/pages/WishlistPage";
import NotFound from "@/pages/NotFound";

// 🟢 Admin (الأساسي فقط)
import AdminLogin from "@/pages/AdminLogin";
import AdminLayout from "@/pages/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>

              {/* 🟢 Store */}
              <Route element={<StoreLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="/track-order" element={<TrackOrderPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
              </Route>

              {/* 🟢 Admin Login */}
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* 🟢 Admin Panel */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
              </Route>

              {/* 🟢 Not Found */}
              <Route path="*" element={<NotFound />} />
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="dashboard" element={<AdminDashboard />} />
</Route>
            </Routes>
          </BrowserRouter>

        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
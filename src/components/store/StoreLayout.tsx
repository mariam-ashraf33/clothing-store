import { Outlet } from 'react-router-dom';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';

const StoreLayout = () => (
  <div className="min-h-screen flex flex-col">
    <StoreHeader />
    <main className="flex-1">
      <Outlet />
    </main>
    <StoreFooter />
  </div>
);

export default StoreLayout;

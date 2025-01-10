import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Creator } from '../components/Creator';
import { OrderForm } from '../components/OrderForm';
import { CategoryList } from '../components/CategoryList';
import { OrdersList } from '../components/OrdersList';
import { AdminPanel } from '../components/AdminPanel';
import { CategoryParts } from '../components/CategoryParts';
import { OrderSummary } from '../components/OrderSummary';

const AppLayout = () => (
    <div>
        <Outlet />
    </div>
);

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Navigate to="/creator" />} />
                    <Route path="creator" element={<Creator />}></Route>                     
                    <Route path="/categories/:categoryName" element={<CategoryParts />} />
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="/order-summary" element={<OrderSummary />} />
                    <Route path="/order-form" element={<OrderForm />} />
                    <Route path="orders" element={<OrdersList />} />
                    <Route path="admin" element={<AdminPanel />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};




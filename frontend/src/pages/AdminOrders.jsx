import { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import OrderTable from '../components/OrderTable';
import { fetchOrders, updateOrderStatus } from '../services/orderService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchOrders({ limit: 50 });
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to load orders', error);
      }
    };
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    await updateOrderStatus(orderId, status);
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-lg font-semibold text-slate-900">Orders</p>
        <p className="text-sm text-slate-500">Monitor COD orders and update their status.</p>
        <div className="mt-6">
          <OrderTable orders={orders} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;


import { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminStatCard from '../components/AdminStatCard';
import OrderTable from '../components/OrderTable';
import { fetchOrderSummary, fetchOrders, updateOrderStatus } from '../services/orderService';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({ todayCount: 0, recentOrders: [] });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [summaryRes, ordersRes] = await Promise.all([fetchOrderSummary(), fetchOrders({ limit: 5 })]);
        setSummary(summaryRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      }
    };
    loadData();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    await updateOrderStatus(orderId, status);
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminStatCard title="Orders today" value={summary.todayCount} caption="New COD orders" />
          <AdminStatCard title="Recent orders" value={summary.recentOrders.length} caption="Showing last 5" />
          <AdminStatCard title="Pending dispatch" value={orders.filter((o) => o.status === 'Processing').length} />
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-slate-900">Recent orders</p>
          <OrderTable orders={orders} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


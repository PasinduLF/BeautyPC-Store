import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import useCart from '../hooks/useCart';
import useForm from '../hooks/useForm';
import { placeOrder } from '../services/orderService';

const CheckoutPage = () => {
  const { items, clearCart, delivery, subtotal } = useCart();
  const navigate = useNavigate();
  const { values, handleChange, setFieldError, errors, setErrors } = useForm({
    customer_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    payment_method: 'COD',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    ['customer_name', 'phone', 'address', 'city'].forEach((field) => {
      if (!values[field]) newErrors[field] = 'Required';
    });
    if (!items.length) newErrors.cart = 'Your cart is empty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        ...values,
        delivery_charge: delivery,
        subtotal,
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };
      const response = await placeOrder(payload);
      clearCart();
      setMessage(`Order placed successfully. Your reference ID is #${response.data.order_id}.`);
      setTimeout(() => navigate('/'), 2500);
    } catch (error) {
      const msg = error.response?.data?.message || 'Unable to place order. Please try again.';
      setFieldError('form', msg);
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return <p>Your cart is empty. Add items before checking out.</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-2xl font-semibold text-slate-900">Checkout</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-600">Full name*</label>
            <input
              name="customer_name"
              value={values.customer_name}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2"
            />
            {errors.customer_name && <p className="text-xs text-rose-500">{errors.customer_name}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Phone*</label>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2"
            />
            {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Email (optional)</label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">City*</label>
            <input
              name="city"
              value={values.city}
              onChange={handleChange}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2"
            />
            {errors.city && <p className="text-xs text-rose-500">{errors.city}</p>}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Address*</label>
          <textarea
            name="address"
            value={values.address}
            onChange={handleChange}
            rows="3"
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2"
          />
          {errors.address && <p className="text-xs text-rose-500">{errors.address}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Payment method</label>
          <select
            name="payment_method"
            value={values.payment_method}
            onChange={handleChange}
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2"
          >
            <option value="COD">Cash on Delivery (default)</option>
            <option value="BANK_TRANSFER">Bank Transfer / QR (contact after order)</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Notes</label>
          <textarea
            name="notes"
            value={values.notes}
            onChange={handleChange}
            rows="3"
            className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2"
          />
        </div>
        {errors.form && <p className="text-sm text-rose-500">{errors.form}</p>}
        {message && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-brand px-6 py-3 text-lg font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
      <OrderSummary />
    </div>
  );
};

export default CheckoutPage;


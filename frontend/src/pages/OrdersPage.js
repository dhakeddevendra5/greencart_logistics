// frontend/src/pages/OrdersPage.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ order_id: '', value_rs: 0, assigned_route_id: '' });

  const load = async () => { const res = await api.get('/orders'); setOrders(res.data); };
  useEffect(() => { load(); }, []);

  const add = async e => {
    e.preventDefault();
    await api.post('/orders', form);
    setForm({ order_id: '', value_rs: 0, assigned_route_id: '' });
    load();
  };

  const remove = async id => { await api.delete(`/orders/${id}`); load(); };

  return (
    <div className="page orders-page">
      <h2>Orders</h2>
      <form onSubmit={add}>
        <input placeholder="Order ID" value={form.order_id} onChange={e => setForm({...form, order_id: e.target.value})} />
        <input type="number" placeholder="Value (₹)" value={form.value_rs} onChange={e => setForm({...form, value_rs: parseInt(e.target.value)})} />
        <input placeholder="Route ID" value={form.assigned_route_id} onChange={e => setForm({...form, assigned_route_id: e.target.value})} />
        <button>Add</button>
      </form>
      <ul>
        {orders.map(o => <li key={o.id}>{o.order_id} - ₹{o.value_rs} - {o.assigned_route_id} <button onClick={() => remove(o.id)}>Delete</button></li>)}
      </ul>
    </div>
  );
};

export default OrdersPage;

import { useState, useEffect } from 'react';
import './ListUsers.css';
import axios from 'axios';

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  // Hàm fetch dữ liệu từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/listusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Hàm xử lý xóa người dùng
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deleteuser/${userId}`);
      const data = await response.json();
      if (data.success) {
        // Xóa người dùng thành công, cập nhật danh sách người dùng
        setUsers(users.filter((user) => user._id !== userId));
        alert('Người dùng đã được xóa');
      } else {
        alert('Xóa người dùng thất bại');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Fetch danh sách người dùng từ API
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='list-user'>
      <h1>Danh sách tài khoản</h1>
      <div className="listuser-format-main">
        <p>Tên tài khoản</p>
        <p>Email</p>
        <p>Sản phẩm đã mua</p>
        <p>Tổng tiền</p>
        <p>Trạng Thái</p>
        <p>Xóa</p>
      </div>
      {/* Render danh sách người dùng */}
      {users.map((user) => (
        <div className="listuser-format-main" key={user._id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>
            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order, index) => (
                <div key={index}>
                  <p>Sản phẩm ID: {order.productId}, Số lượng: {order.quantity}</p>
                </div>
              ))
            ) : (
              <p>Chưa có sản phẩm đã mua</p>
            )}
          </p>
          <p>{/* Render tổng tiền nếu có */}</p>
          <p>{user.status === 'Active' ? 'Đang hoạt động' : 'Đã vô hiệu hóa'}</p>
          <button onClick={() => handleDelete(user._id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

export default ListUsers;

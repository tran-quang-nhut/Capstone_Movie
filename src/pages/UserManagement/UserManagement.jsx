import React, { useEffect, useState } from 'react';
import { nguoiDungServ } from '../../services/nguoiDungServices';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../redux/slices/nguoiDungSlice';
import TableUser from '../../Components/TableUser/TableUser';
import { Drawer } from 'antd';
import FormAddUser from '../../Components/FormAddUser/FormAddUser';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.nguoiDung);

  useEffect(() => {
    // nguoiDungServ
    //   .getAllUser()
    //   .then((res) => {
    //     console.log(res);
    //     // mình bắn dữ liệu lên store
    //   })
    //   .catch((err) => {
        // console.log(err);
    //   });
    dispatch(getAllUser());
  }, []);

  // console.log(users);

  // một hàm vừa gọi dữ liệu và vừa bắn dữ liệu lên redux
  // redux không cho phép gọi bất đồng bộ bên trên reducer
  // redux-thunk là một middleware cho phép xử lí trước khi dispatch tới store
  // redux-saga

  // các data về drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="bg-green-600 text-white py-2 px-5 rounded-lg mb-5"
        onClick={showDrawer}
      >
        Thêm mới
      </button>
      <TableUser />
      <Drawer
        title="Thêm người dùng"
        placement="right"
        onClose={onClose}
        open={open}
        size="large"
      >
        <FormAddUser />
      </Drawer>
    </div>
  );
};

export default UserManagement;

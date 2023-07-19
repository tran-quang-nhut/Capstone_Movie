import React, { useRef } from 'react';
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { nguoiDungServ } from '../../services/nguoiDungServices';
import { getAllUser } from '../../redux/slices/nguoiDungSlice';

// id,họ tên, email,sdt,ma loại ng dùng, action

const TableUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.nguoiDung);
  // console.log(users);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // custom lại cái hiển thị cột
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số ĐT',
      dataIndex: 'soDT',
      key: 'soDT',
    },
    {
      title: 'Loại người dùng',
      key: 'maLoaiNguoiDung',
      dataIndex: 'maLoaiNguoiDung',
      render: (text, record, index) => {
        // text chứa giá trị của thuộc tính đó trong data
        // console.log(text);
        // record chứa các phần tử trong mảng data
        // console.log(record);
        // index là vị trí của phần tử trong mảng data
        // console.log(index);

        // text == "QuanTri" ? "Quản Trị" : "Khách Hàng"
        return (
          <Tag color={text == 'QuanTri' ? 'magenta' : 'blue'}>
            {text == 'QuanTri' ? 'Quản Trị' : 'Khách Hàng'}
          </Tag>
        );
      },
      filterMode: 'menu',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button
            className="py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 duration-500"
            // sẽ sửa lại thêm một popconfirm vào để hỏi ng dùng có muốn xoá hay không và thêm thông báo khi xoá thành công cũng như thất bại
            onClick={() => {
              nguoiDungServ
                .deleteUser(record.taiKhoan)
                .then((res) => {
                  alert('xoá thành công');
                  dispatch(getAllUser());
                })
                .catch((err) => {
                  console.log(err);
                  alert('có vấn đề xảy ra');
                });
            }}
          >
            Xoá
          </button>
          <button className="py-2 px-5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 duration-500">
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  let newUser = users.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  return <Table columns={columns} dataSource={users.length > 0 && newUser} />;
};

export default TableUser;

import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { nguoiDungServ } from '../../services/nguoiDungServices';
import { luuXuongLocal } from '../../utils/localStore';
import { useNavigate } from 'react-router-dom';
const FormLoginAdmin = () => {
  const navigate = useNavigate();
  // const [state, setState] = useState({
  //   taiKhoan: '',
  //   matKhau: '',
  // });
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: (values) => {
      // console.log(values);
      nguoiDungServ
        .dangNhap(values)
        .then((res) => {
          // console.log(res);
          // điều kiện để vào được trang admin, check maLoaiNguoiDung
          if (res.data.content.maLoaiNguoiDung == 'QuanTri') {
            // lưu dữ liệu xuống local và chuyển hướng tới trang của admin
            luuXuongLocal('user', res.data.content);
            navigate('/admin');
          } else {
            // đá đít về trang chủ của chọn phim khi kp QuanTri
            window.location.href = 'http://localhost:3000';
          }
        })
        .catch((err) => {
          console.log(err);
          // trường hợp khi mà tài khoản mật khẩu không đúng trên server
          alert('Tài khoản mật khẩu không đúng');
          // clear hết input trong form đi bằng phương thức formik.resetForm
          formik.resetForm({
            values: {
              taiKhoan: '',
              matKhau: '',
            },
          });
        });
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Không được để trống trường này'),
      matKhau: Yup.string().required('Vui lòng nhập mật khẩu'),
    }),
  });
  // console.log(formik.errors.taiKhoan);
  // console.log(formik.touched.taiKhoan);

  return (
    <div>
      <h2 className="font-bold text-2xl">Login Admin</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tài khoản
          </label>
          <input
            type="text"
            id="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập họ tên"
            // phương thức formik.values.
            value={formik.values.taiKhoan}
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-red-500">{formik.errors.taiKhoan}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label
            htmlFor="matKhau"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mật khẩu
          </label>
          <input
            type="text"
            id="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập mật khẩu"
            value={formik.values.matKhau}
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-red-500">{formik.errors.matKhau}</p>
          ) : (
            <></>
          )}
        </div>
        <button
          type="submit"
          className="py-1 px-3 rounded bg-green-700 text-white"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLoginAdmin;

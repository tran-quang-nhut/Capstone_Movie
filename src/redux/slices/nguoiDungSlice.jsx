import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { layDuLieuLocal } from '../../utils/localStore';
import { nguoiDungServ } from '../../services/nguoiDungServices';

// nơi tạo các createAsyncThunk để xử lí các bất đồng bộ trước khi bắn dữ liệu lên store bằng redux-thunk
// bên trong createAsyncThunk sẽ có 2 tham số, một là type của hàm, thứ hai sẽ là hàm cần xử lí bất đồng bộ
export const getAllUser = createAsyncThunk('nguoiDung/getAllUser', async () => {
  const res = await nguoiDungServ.getAllUser();
  // sẽ return về giá trị muốn store lưu trữ
  return res.data.content;
});

// lần đầu tiên vào trang web store sẽ dc khởi tạo
const initialState = {
  hoTen: layDuLieuLocal('user'),
  users: [],
};

// thư viện immerjs
export const nguoiDungSlice = createSlice({
  name: 'nguoiDung',
  initialState,
  reducers: {
    // ở đây tạo một phương thức giúp xử lí state bên trên store redux
    setDuLieuHoTen: (state, action) => {
      // check xem hoTen có dữ liệu hay không, nếu không có set dữ liệu cho nó
      // console.log(action);
      if (state.hoTen == null) {
        state.hoTen = action.payload;
      }
    },
  },
  // extraReducer giúp tách biệt các logic bất đồng bộ ra khỏi reducer vì khi xử lí bất đồng bộ có nhiều trường hợp xảy ra
  extraReducers: (builder) => {
    // khi xử lí thì bên trong hàm sẽ có 3 phương thức tương ứng với các trường hợp chạy thành công, đang chạy, thất bại
    // pending là đang chạy , reject là thất bại , fulfilled là thành công
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      // bên trong action thuộc tính payload sẽ chứa các giá trị được trả về từ hàm chạy createAsyncThunk
      state.users = action.payload;
      // console.log(action);
    });
    // reject sẽ chạy khi mà bất đồng bộ chạy có lỗi, sẽ vào case này và xử lí
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.users = [
        {
          hoTen: 'Khải',
          maLoaiNguoiDung: 'QuanTri',
        },
      ];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setDuLieuHoTen } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;

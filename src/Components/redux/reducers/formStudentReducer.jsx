import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listStudent: [],
  student: null,
  listStudentSearch: [],
};

const formStudentReducer = createSlice({
  name: "formStudentReducer",
  initialState,
  reducers: {
    addStudent: (state, { payload }) => {
      state.listStudent = [...state.listStudent, payload];
    },
    deleteStudent: (state, { payload }) => {
      const id = payload;
      state.listStudent = state.listStudent.filter(
        (student) => student.id !== id
      );
    },
    setEditStudent: (state, { payload }) => {
      state.student = payload;
    },
    saveStudent: (state, { payload }) => {
      const index = state.listStudent.findIndex((x) => x.id === payload.id);
      state.listStudent[index] = payload;
    },
    searchStudent: (state, { payload }) => {
      const student = state.listStudent.filter(
        (s) =>
          s.id === payload ||
          s.phone === payload ||
          s.email === payload ||
          s.name === payload
      );
      state.listStudentSearch = student;
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  setEditStudent,
  saveStudent,
  searchStudent,
} = formStudentReducer.actions;

export default formStudentReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listStudent: [],
  editStudent: {},
};

const formStudentReducer = createSlice({
  name: "formStudentReducer",
  initialState,
  reducers: {
    addStudent: (state, { type, payload }) => {
      state.listStudent = [...state.listStudent, payload];
    },
    deleteStudent: (state, { type, payload }) => {
      const id = payload;
      state.listStudent = state.listStudent.filter(
        (student) => student.id !== id
      );
    },
    editStudent: (state, { type, payload }) => {
      console.log(payload);
      const index = state.listStudent.findIndex(
        (student) => student.id === payload.id
      );
      state.listStudent[index] = payload;
      // return newState;
    },
  },
});

export const { addStudent, deleteStudent, editStudent } =
  formStudentReducer.actions;

export default formStudentReducer.reducer;

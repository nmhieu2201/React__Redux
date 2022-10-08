import { configureStore } from "@reduxjs/toolkit";
import formStudentReducer from "./reducers/formStudentReducer";

export const store = configureStore({
  reducer: {
    formStudentReducer: formStudentReducer,
  },
});

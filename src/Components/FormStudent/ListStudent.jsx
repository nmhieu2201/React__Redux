import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteStudent,
  editStudent,
} from "../redux/reducers/formStudentReducer";
class ListStudent extends Component {
  renderStudent = () => {
    const { listStudent } = this.props;

    return listStudent.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td>
          <td>
            <button
              className="btn btn-danger mx-2"
              onClick={() => {
                const action = deleteStudent(student.id);
                this.props.dispatch(action);
              }}
            >
              Xoá
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                const action = editStudent(student);
                this.props.dispatch(action);
              }}
            >
              Sửa
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <table className="table container py-4">
        <thead>
          <tr className="bg-dark text-light">
            <th>Mã sinh viên</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{this.renderStudent()}</tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  listStudent: state.formStudentReducer.listStudent,
});

export default connect(mapStateToProps)(ListStudent);

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteStudent,
  setEditStudent,
} from "../redux/reducers/formStudentReducer";
class ListStudent extends Component {
  renderStudent = () => {
    const { listStudent } = this.props;
    return listStudent.map((student, index) => {
      return (
        <tr key={index} className="mt-3">
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td>
          <td>
            <button
              className="btn btn-danger mx-2"
              onClick={() => this.props.dispatch(deleteStudent(student.id))}
            >
              Xoá
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.props.dispatch(setEditStudent(student))}
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

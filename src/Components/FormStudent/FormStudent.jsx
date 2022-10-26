import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addStudent,
  saveStudent,
  searchStudent,
  getStore,
  deleteStudent,
  setEditStudent,
} from "../redux/reducers/formStudentReducer";

const defaultStudent = {
  id: "",
  name: "",
  phone: "",
  email: "",
};

class FormStudent extends Component {
  state = {
    values: defaultStudent,
    errors: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    isSubmit: true,
    isUpdate: true,
    isID: false,
    keySearch: null,
  };
  handleOnInput = (e) => {
    let { id, value } = e.target;
    let newValues = { ...this.state.values };
    newValues[id] = value;
    let newErrors = { ...this.state.errors };
    let messageError = "";
    if (value.trim() === "") {
      messageError = id + " is not empty";
    } else {
      let dataType = e.target.getAttribute("data-type");
      if (dataType === "number") {
        let regexNumber = /^\d+$/;
        if (!regexNumber.test(value)) {
          messageError = id + " must be a number";
        }
      }
      if (dataType === "email") {
        let regexEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(value)) {
          messageError = id + "  invalid format";
        }
      }
      if (dataType === "phone") {
        let regexPhone =
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (!regexPhone.test(value)) {
          messageError = id + " invalid format";
        }
      }
      if (dataType === "name") {
        let regexName =
          /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/;
        if (!regexName.test(value)) {
          messageError = id + " invalid format";
        }
      }
    }
    newErrors[id] = messageError;
    let submit = false;
    for (let key in newValues) {
      if (
        newValues[key].toString().trim() === "" ||
        newErrors[key].toString().trim() !== ""
      ) {
        submit = true;
      }
    }
    this.setState({
      errors: newErrors,
      values: newValues,
      isSubmit: submit,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(addStudent(this.state.values));
    this.setState({
      values: defaultStudent,
    });
  };
  handleUpdate = (e) => {
    e.preventDefault();
    this.props.dispatch(saveStudent(this.state.values));
  };
  handleSearch = (e) => {
    e.preventDefault();
  };
  componentDidMount() {
    if (this.props.editStudent) {
      this.setState({
        values: this.props.editStudent,
        isID: true,
      });
    } else {
      this.setState({ values: defaultStudent });
    }
    if (localStorage.getItem("listStudent")) {
      this.props.dispatch(
        getStore(JSON.parse(localStorage.getItem("listStudent")))
      );
    } else {
      this.props.dispatch(getStore([]));
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.editStudent !== this.props.editStudent) {
      if (this.props.editStudent) {
        this.setState(
          {
            values: this.props.editStudent,
            isUpdate: false,
          }
        );
      } else {
        this.setState({
          values: defaultStudent,
          isUpdate: false,
        });
      }
    }

    localStorage.setItem("listStudent", JSON.stringify(this.props.listStudent));
  }

  handleInputSearch = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ keySearch: value }, () => {
      this.props.dispatch(searchStudent(this.state.keySearch));
    });
  };
  render() {
    const { listStudentSearch } = this.props;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h3 className="text-center py-2">Student</h3>
          <div className="card">
            <div className="card-header bg-dark text-start py-3 text-white">
              <h3>Thông tin sinh viên</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <p>Mã sinh viên</p>
                    <input
                      className="form-control mb-2"
                      type="text"
                      data-type="number"
                      id="id"
                      name="id"
                      value={this.state.values.id}
                      onInput={this.handleOnInput}
                      disabled={this.state.isID}
                    />
                    <p className="text-danger">{this.state.errors.id}</p>
                  </div>
                  <div className="form-group">
                    <p>Số điện thoại </p>
                    <input
                      className="form-control mb-2"
                      type="text"
                      id="phone"
                      data-type="phone"
                      name="phone"
                      value={this.state.values.phone}
                      onInput={this.handleOnInput}
                    />
                    <p className="text-danger">{this.state.errors.phone}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <p>Họ và tên </p>
                    <input
                      className="form-control mb-2"
                      type="text"
                      data-type="name"
                      id="name"
                      name="name"
                      value={this.state.values.name}
                      onInput={this.handleOnInput}
                    />
                    <p className="text-danger">{this.state.errors.name}</p>
                    <p className="text-danger"></p>
                  </div>
                  <div className="form-group">
                    <p>Email </p>
                    <input
                      className="form-control mb-2"
                      type="text"
                      data-type="email"
                      id="email"
                      name="email"
                      value={this.state.values.email}
                      onInput={this.handleOnInput}
                    />
                    <p className="text-danger">{this.state.errors.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-success mx-2 my-2"
            type="submit"
            disabled={this.state.isSubmit}
          >
            Thêm sinh viên
          </button>
          <button
            className="btn btn-primary mx-2 my-2"
            type="button"
            onClick={this.handleUpdate}
            disabled={this.state.isUpdate}
          >
            Cập nhật
          </button>
        </form>
        <div>
          <h3>Tìm kiếm sinh viên</h3>
          <input
            type="text"
            className="form-control"
            id="search"
            name="search"
            onChange={this.handleInputSearch}
          />
          <button
            type="button"
            className="btn btn-success mt-2"
            onClick={this.handleSearch}
          >
            Search
          </button>
          <hr />

          <table className="table container">
            <thead>
              <tr className="bg-dark text-light">
                <th>Mã sinh viên</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {listStudentSearch.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.phone}</td>
                    <td>{student.email}</td>
                    <td>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() =>
                          this.props.dispatch(deleteStudent(student.id))
                        }
                      >
                        Xoá
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          this.props.dispatch(setEditStudent(student))
                        }
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  editStudent: state.formStudentReducer.student,
  listStudentSearch: state.formStudentReducer.listStudentSearch,
  listStudent: state.formStudentReducer.listStudent,
});
export default connect(mapStateToProps)(FormStudent);

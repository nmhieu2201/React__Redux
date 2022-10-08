import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudent, editStudent } from "../redux/reducers/formStudentReducer";
class FormStudent extends Component {
  state = {
    values: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    errors: {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
    isSubmit: true,
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
        let regexName = /^[a-zA-Z ]+$/;
        if (!regexName.test(value)) {
          messageError = id + " invalid format";
        }
      }
    }
    newErrors[id] = messageError;
    let submit = false;
    for (let key in newValues) {
      if (newValues[key].toString().trim() === "") {
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
    const action = addStudent(this.state.values);
    // console.log(action);
    this.props.dispatch(action);
    this.props.dispatch(editStudent);
  };
  handleUpdate = (e) => {
  };
  render() {
    // editStudent = this.props
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
          <button className="btn btn-primary mx-2 my-2" type="button" onClick={this.handleUpdate}>
            Cập nhật
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  editStudent: state.formStudentReducer.editStudent,
});
export default connect(mapStateToProps)(FormStudent);

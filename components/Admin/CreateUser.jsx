import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { createUser } from "../../Routes/api.routes";
import { useRouter } from "next/router";

const CreateUser = () => {
  const [formData, setFormData] = useState({});
  const [types, setTypes] = useState("admin");
  const router = useRouter();

  const type = [
    { name: "Administrador", value: "admin" },
    { name: "Usuario", value: "user" },
  ];

  const onTypesChange = (e) => {
    setTypes(e.value);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      type: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.username) {
        errors.username = "Username is required.";
      }

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const addUser = async () => {
    formik.values.type = types;
    console.log(formik.values);
    if (formik.values.email.trim().length === 0) {
      alert("El email es necesario.");
    } else if (formik.values.password.trim().length === 0) {
      alert("La contraseña de usuario es necesario.");
    } else if (formik.values.username.trim().length === 0) {
      alert("El nombre es necesario.");
    } else {
      const result = await createUser(formik.values);
      let returnUrl = "";
      if (result.success) {
        returnUrl = "/admin/listUser";
      } else {
        returnUrl = "/";
      }
      router.push(returnUrl);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
      }}
    >
      <div className="card">
        <h2>Agregar Usuario</h2>
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-google"></i>
                </span>
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="ejemplo@gmail.com"
                />
              </div>
              {getFormErrorMessage("email")}
            </div>

            <div className="col-12 md:col-4">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder="Nombre de Usuario"
                />
              </div>
              {getFormErrorMessage("username")}
            </div>

            <div className="col-12 md:col-4">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <InputText
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Contraseña"
                />
              </div>
              {getFormErrorMessage("password")}
            </div>
          </div>

          <div className="grid p-fluid">
            <div className="col-12 md:col-4">
              <div className="p-inputgroup"></div>
            </div>

            <div className="col-12 md:col-4">
              <div className="p-inputgroup">
                <Dropdown
                  value={types}
                  options={type}
                  onChange={onTypesChange}
                  optionLabel="name"
                  placeholder="Seleccionar Rol"
                />
              </div>
            </div>

            <div className="col-12 md:col-4">
              <div className="p-inputgroup"></div>
            </div>
          </div>
          <Button
            icon="pi pi-plus"
            label="Agregar"
            className="p-button-success mt-2"
            type="submit"
            onClick={addUser}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateUser;

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import * as api from "../../services";

const userSchema = yup.object({
  nombre: yup.string().required("Nombre es requerido"),
  apellido: yup.string().required("Apellido es requerido"),
  email: yup.string().email().required("Correo electrónico Valido es requerido"),
  password: yup
    .string()
    .required("Contraseña es requerida")
    .min(6, "Contraseña debe tener al menos 6 caracteres")
    .max(20, "Contraseña debe tener máximo 20 caracteres"),
  password2: yup
    .string()
    .required("Contraseña es requerida")
    .oneOf([yup.ref("password"), null], "Contraseñas no coinciden"),
});

//TODO - agregar términos y condiciones

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm({ resolver: yupResolver(userSchema) });

  const mutate = useMutation(api.auth.signUp);

  const navigation = useNavigate();

  const onSubmit = (data) => {
    mutate.mutate({});
    console.log(data);
  };

  return (
    <div className="card shadow-none border-0 ms-auto me-auto login-card">
      <div className="card-body rounded-0 text-left">
        <h2 className="fw-700 display1-size display2-md-size mb-4">Registrarse</h2>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>
              <i className="font-sm ti-user text-grey-500 pe-0"></i> Nombre
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              {...register("nombre", { required: true })}
              isInvalid={!!errors.nombre?.message}
            />
            <Form.Control.Feedback type={errors.nombre ? "invalid" : ""}>
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>
              <i className="font-sm ti-user text-grey-500 pe-0"></i> Apellido
            </Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              placeholder="Apellido"
              {...register("apellido", { required: true })}
              isInvalid={!!errors.apellido?.message}
            />

            <Form.Control.Feedback type={errors.apellido ? "invalid" : ""}>
              {errors.apellido?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label className="align-items-start">
              <i className="font-sm ti-email text-grey-500 pe-0"></i> Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              name="email"
              {...register("email", { required: true, maxLength: 150 })}
              isInvalid={!!errors.email?.message}
            />

            <Form.Control.Feedback type={errors.email ? "invalid" : ""}>
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label className="align-items-start">
              <i className="font-sm ti-lock text-grey-500 pe-0"></i> Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="contraseña"
              name="password"
              {...register("password")}
              isInvalid={!!errors.password?.message}
            />

            <Form.Control.Feedback type={errors.password ? "invalid" : ""}>
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label className="align-items-start">
              <i className="font-sm ti-lock text-grey-500 pe-0"></i> Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="contraseña"
              name="password2"
              {...register("password2")}
              isInvalid={!!errors.password2?.message}
            />

            <Form.Control.Feedback type={errors.password ? "invalid" : ""}>
              {errors.password2?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* <div className="form-check text-left mb-3">
            <input type="checkbox" className="form-check-input mt-2" id="terminos" />
            <label className="form-check-label font-xsss text-grey-500 " htmlFor="terminos">
              Aceptar términos y condiciones
            </label>
          </div> */}
          <div className="form-group mb-1">
            <Button
              type="submit"
              className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
            >
              Registrarme
            </Button>
          </div>
        </Form>

        <div className="col-sm-12 p-0 text-left">
          <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
            Ya tengo cuenta
            <Link to="/auth/login" className="fw-700 ms-1">
              Iniciar Sesión
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

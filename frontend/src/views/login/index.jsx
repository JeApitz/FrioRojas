import { useForm } from "react-hook-form";
import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  // const apiUrl = import.meta.env.VITE_API_URL;

  // console.log('api url', apiUrl)
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const [loginError, setLoginError] = useState("");

  const handleLogin = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // const response = await fetch(`${apiUrl}login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      console.log('response lo9gin', response)
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();
      //console.log("Token:", result.token);
      localStorage.setItem("token", result.token);
      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setLoginError(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card className="shadow-lg">
              <div className="row g-0">
                <div className="col-md-8">
                  <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit(handleLogin)}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          {...register("password", {
                            required: "Password is required",
                          })}
                        />
                        {errors.password && (
                          <p className="text-danger">
                            {errors.password.message}
                          </p>
                        )}
                      </Form.Group>

                      {loginError && (
                        <p className="text-danger">{loginError}</p>
                      )}

                      <div className="d-grid">
                        <Button
                          type="submit"
                          style={{
                            backgroundColor: "#1D1F3D",
                            borderColor: "#1D1F3D",
                          }}
                        >
                          Iniciar sesión
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </div>
                <div className="col-md-4">
                  <img
                    src="./public/logo.png"
                    className="img-fluid rounded-end"
                    alt="Imagen de login"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <nav className="mt-4 text-center">
        <Link to="/register" className="text-decoration-none">
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
}

export default Login;

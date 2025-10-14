import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const RegistrationForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too short")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Registration Data:", values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label>
          Full Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </label>

        <label>
          Email Address
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </label>

        <label>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </label>

        <button type="submit">
          Create Account
        </button>

        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </Form>
    </Formik>
  );
};

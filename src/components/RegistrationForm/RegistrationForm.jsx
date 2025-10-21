import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import dollar1 from "../../assets/img/bg-register-desk@1x.webp";
/*import dollar2 from "../../assets/money2.png";
import dollar3 from "../../assets/money3.png"; */

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Too short")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { username, email, password } = values;
    dispatch(register({ username, email, password }))
    .unwrap()
    .then(() => {
      toast.success("Registration Successful", { duration: 2000 });
    })
      .catch((e) => {
        if(e === "Request failed with status code 409"){
          return toast.error("User with this email already exists.", { duration: 2000 });
        }
      toast.error("Registration Failed. Please try again.", { duration: 2000 });
    });
    resetForm();
  };

  return (
    <div className={css.wrapper}>
      {/* Floating money visuals */}{ 
      <img src={dollar1} alt="" className={css.money} style={{ left: "10%", animationDelay: "0s" }} />
      /*<img src={dollar2} alt="" className={css.money} style={{ left: "50%", animationDelay: "3s" }} />
      <img src={dollar3} alt="" className={css.money} style={{ left: "80%", animationDelay: "6s" }} /> */}

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Full Name
            <Field type="text" name="username" className={css.input} />
            <ErrorMessage name="username" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Email Address
            <Field type="email" name="email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.input} />
            <ErrorMessage name="password" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Confirm Password
            <Field type="password" name="confirmPassword" className={css.input} />
            <ErrorMessage name="confirmPassword" component="div" className={css.error} />
          </label>

          <button type="submit" className={css.button}>
            Create Account
          </button>

          <p className={css.loginRedirect}>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

import css from "./LoginForm.module.css";
import { logIn } from "../../redux/auth/operations";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const initialValues = {
  email: "",
  password: "",
};
const FeedBackSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .min(6, "Please enter 6 more characters")
    .max(12, "Please do not exceed 12 characters.")
    .required("Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Login Successfull", { duration: 2000 });
      })
      .catch(() => {
        toast.error("Please try again something went wrong", {
          duration: 2000,
        });
      });

    actions.resetForm();
  };

  return (
    <div className={css.background}>
      <div className={css.login}>
        <img className={css.guard} src="../../../monerguard.svg" alt="" />
        <h1>Money Guard</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedBackSchema}
        >
          <Form className={css.form}>
            
            <div className={css.inputWrapper}>
              <MdEmail className={css.mail} />
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
              ></Field>
              <ErrorMessage
                className={css.error}
                name="email"
                component="span"
              />
            </div>
            <div className={css.inputWrapper}>
              <RiLockPasswordFill className={css.lock} />
              <Field
                type="password"
                name="password"
                placeholder="Paswword"
              ></Field>
              <ErrorMessage
                className={css.error}
                name="password"
                component="span"
              />
            </div>

           

            <button type="submit">LOG IN</button>
            <NavLink className={css.link} to="/register">
              REGISTER
            </NavLink>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;

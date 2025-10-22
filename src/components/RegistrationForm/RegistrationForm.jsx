import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

/**
 * Password scoring system:
 */
const getPasswordScore = (pw = "") => {
  let score = 0;
  if (!pw) return 0;
  if (pw.length >= 8) score += 1;
  if (pw.length >= 12) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/[0-9]/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  return Math.min(score, 5);
};

const scoreToLabel = (score) => {
  if (score <= 1) return "Too weak";
  if (score === 2) return "Normal";
  if (score >= 3 && score <= 4) return "Strong";
  if (score === 5) return "Very strong";
};

const scoreToColor = (score) => {
  if (score <= 1) return "#ff4d4f";
  if (score === 2) return "#ffb84d";
  if (score >= 3 && score <= 4) return "#9acd32";
  return "#29a745";
};

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string().min(2, "Too short").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { username, email, password } = values;
    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        toast.success("Registration successful!", { duration: 2500 });
        resetForm();
      })
      .catch((error) => {
        // common error patterns
        const message = error?.message || error;

        if (message.includes("409") || message.includes("Conflict")) {
          toast.error("User with this email already exists.", { duration: 2500 });
        } else if (message.includes("400")) {
          toast.error("Invalid input data. Please check your fields.", { duration: 2500 });
        } else if (message.includes("401")) {
          toast.error("Unauthorized action.", { duration: 2500 });
        } else if (message.includes("500")) {
          toast.error("Server error. Please try again later.", { duration: 2500 });
        } else {
          toast.error("Registration failed. Please try again.", { duration: 2500 });
        }
      });
  };

  return (
    <div className={css.wrapper}>
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
        {(formik) => {
          const pw = formik.values.password;
          const score = getPasswordScore(pw);
          const label = scoreToLabel(score);
          const color = scoreToColor(score);
          const widthMap = {
            0: "8%",
            1: "20%",
            2: "45%",
            3: "70%",
            4: "90%",
            5: "100%",
          };
          const barWidth = widthMap[score] || "8%";

          return (
            <Form className={css.form}>
              <h2 className={css.title}>Money Guard</h2>

              <label className={css.label}>
                Name
                <Field type="text" name="username" className={css.input} />
                <ErrorMessage name="username" component="div" className={css.error} />
              </label>

              <label className={css.label}>
                E-mail
                <Field type="email" name="email" className={css.input} />
                <ErrorMessage name="email" component="div" className={css.error} />
              </label>

              <label className={css.label}>
                Password
                <Field type="password" name="password" className={css.input} />
                <ErrorMessage name="password" component="div" className={css.error} />
              </label>

              {/* Password strength bar */}
              <div
                aria-live="polite"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "-6px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "8px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    style={{
                      width: barWidth,
                      height: "100%",
                      background: color,
                      transition: "width 250ms ease, background-color 250ms ease",
                    }}
                  />
                </div>

                <div
                  style={{
                    minWidth: "92px",
                    textAlign: "right",
                    color: "#fff",
                    fontSize: "0.85rem",
                    opacity: 0.9,
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
              </div>

              <label className={css.label}>
                Confirm Password
                <Field type="password" name="confirmPassword" className={css.input} />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={css.error}
                />
              </label>

              <button type="submit" className={css.button}>
                Register
              </button>

              <p className={css.loginRedirect}>
                Already have an account? <a href="/login">Log in</a>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

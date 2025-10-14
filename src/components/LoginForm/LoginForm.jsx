import css from "./LoginForm.module.css"
import { logIn } from "../../redux/auth/operations";
import * as Yup from "yup";
import { Formik, Field, Form,ErrorMessage } from 'formik';
import { useId } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const initialValues = {
    email: "",
    password:""
}
const FeedBackSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email!").required("Required"),
    password:Yup.string().min(6,"Please enter 6 more characters").max(12,"Please do not exceed 12 characters.").required("Required")
})

const LoginForm = () => {
    const dispatch = useDispatch()

    const emailField = useId()
    const passwordField = useId()

    const handleSubmit = (values, actions) => {
        
        dispatch(logIn(values))


        actions.resetForm()
    }


    return (
        <div className={css.login}>
            <h1>Money Guard</h1>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedBackSchema}>
                <Form className={css.form}>
                    
                    <label className={css.email} htmlFor={emailField}><MdEmail className={css.mail} /> E-mail</label>
                    <Field type="email" id={emailField} name="email" placeholder="E-mail"></Field>
                    <ErrorMessage className={css.error} name="email" component="span" />

                    <label className={css.password} htmlFor={passwordField}><RiLockPasswordFill className={css.lock} />Password</label>
                    <Field type="password" id={passwordField} name="password"></Field>
                    <ErrorMessage className={css.error} name="password" component="span" />

                    <button type="submit">LOG IN</button>
                    <NavLink className={css.link} to="/register">REGISTER</NavLink>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginForm

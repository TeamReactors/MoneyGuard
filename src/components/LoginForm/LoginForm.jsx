import css from "./LoginForm.module.css"
import { logIn } from "../../redux/auth/operations";
import * as Yup from "yup";
import { Formik, Field, Form,ErrorMessage } from 'formik';
import { useId } from "react";
import { useDispatch } from "react-redux";

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
        <>
            <h1>Money Guard</h1>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedBackSchema}>
                <Form className={css.form}>
                    <label htmlFor={emailField}></label>
                    <Field type="email" id={emailField} name="email"></Field>
                    <ErrorMessage name="email" component="span" />

                    <label htmlFor={passwordField}></label>
                    <Field type="password" id={passwordField} name="password"></Field>
                    <ErrorMessage name="password" component="span" />

                    <button type="submit">LOG IN</button>
                </Form>
            </Formik>
        </>
    )
}

export default LoginForm

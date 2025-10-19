import LoginForm from "../components/LoginForm/LoginForm"
import bg from "../assets/img/login-desktop.webp";

const LoginPage = () => {
    return (
        <div style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}>
            <LoginForm/>
        </div>
    )
}

export default LoginPage

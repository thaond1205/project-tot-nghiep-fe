import React, { useRef, useState } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Không được bỏ trống!
            </div>
        );
    }
};

function Login(props) {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {

            AuthService.login(username, password).then(
                () => {
                    props.history.push("/admin");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="auth-fluid">
                <div className="auth-fluid-form-box">
                    <div className="align-items-center d-flex h-100">
                        <div className="card-body">
                            <div className="auth-brand text-center text-lg-start">
                                <a href="index.html" className="logo-dark">
                                    <span>
                                        <img
                                            src="assets/images/logo-dark.png"
                                            alt
                                            height={18}
                                        />
                                    </span>
                                </a>
                                <a href="index.html" className="logo-light">
                                    <span>
                                        <img
                                            src="assets/images/logo.png"
                                            alt
                                            height={18}
                                        />
                                    </span>
                                </a>
                            </div>
                            <h4 className="mt-0">Sign In</h4>
                            <p className="text-muted mb-4">
                                Enter your username and password to access
                                account.
                            </p>
                            <Form onSubmit={handleLogin} ref={form}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                    >
                                        Username
                                    </label>
                                    <Input
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required]}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <a
                                        href="pages-recoverpw-2.html"
                                        className="text-muted float-end"
                                    >
                                        <small>Forgot your password?</small>
                                    </a>
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="checkbox-signin"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="checkbox-signin"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div className="d-grid mb-0 text-center">
                                    {/* <button className="btn btn-primary" type="submit">
                    <i className="mdi mdi-login" /> Log In{" "}
                  </button> */}
                                    <button
                                        className="btn btn-primary btn-block"
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <i className="mdi mdi-login" />
                                        Login
                                    </button>
                                </div>
                                {message && (
                                    <div className="form-group">
                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            {message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={checkBtn}
                                />
                                <div className="text-center mt-4">
                                    <p className="text-muted font-16">
                                        Sign in with
                                    </p>
                                    <ul className="social-list list-inline mt-3">
                                        <li className="list-inline-item">
                                            <a
                                                href="javascript: void(0);"
                                                className="social-list-item border-primary text-primary"
                                            >
                                                <i className="mdi mdi-facebook" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a
                                                href="javascript: void(0);"
                                                className="social-list-item border-danger text-danger"
                                            >
                                                <i className="mdi mdi-google" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a
                                                href="javascript: void(0);"
                                                className="social-list-item border-info text-info"
                                            >
                                                <i className="mdi mdi-twitter" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a
                                                href="javascript: void(0);"
                                                className="social-list-item border-secondary text-secondary"
                                            >
                                                <i className="mdi mdi-github" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </Form>
                            <footer className="footer footer-alt">
                                <p className="text-muted">
                                    Don't have an account?{" "}
                                    <a
                                        href="pages-register-2.html"
                                        className="text-muted ms-1"
                                    >
                                        <b>Sign Up</b>
                                    </a>
                                </p>
                            </footer>
                        </div>
                    </div>
                </div>
                <div className="auth-fluid-right text-center">
                    <div className="auth-user-testimonial">
                        <h2 className="mb-3">I love the color!</h2>
                        <p className="lead">
                            <i className="mdi mdi-format-quote-open" /> It's a
                            elegent templete. I love it very much! .{" "}
                            <i className="mdi mdi-format-quote-close" />
                        </p>
                        <p>- Hyper Admin User</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

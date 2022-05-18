import React from "react";

const LoginForm = (props) => {
    const { toggleUser, validation, submit, errors } = props;
    document.title = "Login";
    return (
        <div className="loginPage-form login">
            <h3 style={{ color: '#263238' }}>Login</h3>

            <form onSubmit={submit}>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={validation} />
                    {errors.email.length > 0 && <p className="error-msg">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={validation}
                    />
                    {errors.password.length > 0 && <p className="error-msg">{errors.password}</p>}
                </div>

                <div className=" form-group forgot-pass">
                    <div className="custom-control custom-checkbox mr-sm-2">
                        <input type="checkbox" className="custom-control-input" id="rememberUser" />
                        <label className="custom-control-label" htmlFor="rememberUser">
                            Remember me
						</label>
                    </div>

                </div>

                <button style={{ backgroundColor: '#111430' }} type="submit" className="btn loginPage-primary text-white btn-block">
                    Login
				</button>
            </form>

            <div className="register-login">
                Don’t have an account?{" "}
                <button className="btn btn-logintoggle" onClick={toggleUser}>
                    Create an account
				</button>
            </div>
        </div>
    );
};

export default LoginForm;
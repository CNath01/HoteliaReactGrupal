import React from "react";

const appLogin = () => {
    const signinBtn = document.querySelector('.signinBtn');
    const signupBtn = document.querySelector('.signupBtn');
    const formBx = document.querySelector('.formBx');
    const container = document.querySelector('container');

    signupBtn.onclick=function(){
        formBx.classList.add('active')
        container.classList.add('active')
    }

    signinBtn.onclick=function(){
        formBx.classList.remove('active')
        container.classList.remove('active')
    }

    return (
        <div className="container">
            <div className="blueBg">
                <div className="box signin">
                    <h2>Tienes una cuenta?</h2>
                    <button className="signinBtn">Iniciar sesión</button>
                </div>
                <div className="box signup">
                    <h2>Aun no tienes una cuenta?</h2>
                    <button className="signupBtn">Registrarse</button>
                </div>
            </div>
            <div className="formBx">
                <div className="form signinForm">
                    <form>
                        <h3>Iniciar sesión</h3>
                        <input type="text" placeholder="Username"></input>
                        <input type="password" placeholder="Password"></input>
                        <input type="submit" value="Login"></input>
                        <a href="#" className="forgot">Olvide mi contraseña</a>
                    </form>
                </div>

                <div className="form signupForm">
                    <form>
                        <h3>Registrarse</h3>
                        <input type="text" placeholder="Username"></input>
                        <input type="password" placeholder="Password"></input>
                        <input type="submit" value="Login"></input>
                        <a href="#" className="forgot">Olvide mi contraseña</a>
                    </form>
                </div>

            </div>
        </div>
        
    );
}

export default appLogin;
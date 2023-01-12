import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import eye from "../assets/img/iconHidePassword.png";
import { DataContext } from "../context/DataProvider.js";
// import { types } from "../context/dataReducer";
import styles from './Login.module.css';
import { HeaderHome } from "./HeaderHome";
import { FooterHome } from "./FooterHome";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert';
import { parseJwt } from '../services/jwtService';
export const Login = () => {
    const [err, setErr] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [errors, setErrors] = useState('');
    const [logged, setLogged] = useState(false);
    const [verify, setVerify] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [token, setToken] = useState(false);
    const [user, setUser] = useState({
        email: "",
        pass: ""
    });
    const [state, dispatch] = useContext(DataContext)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setUser(
            {
                ...user,
                [e.target.name]: e.target.value
            })
    }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const validation = () => {
        let isValid = true;
        if (verify) {
            setVerify(false);
            if (!user.email) {
                isValid = false;
                setEmpty(true);
            }
            if (!user.pass) {
                isValid = false;
                setEmpty(true);
            }
        }
        return isValid;
    }
    const urlAuth = "http://localhost:8080/authenticate"
    const submitHandler = (e) => {
        e.preventDefault();
        if (!user.email && !user.pass) {
            Swal.fire({
                icon: 'error',
                text: 'Debes completar todos los campos correctamente para iniciar sesión',
            })
            return;
        }
        fetch(urlAuth, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                email: user.email,
                password: user.pass
            })
        })
            .then((response) => {
                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Credenciales inválidas. Por favor intenta nuevamente.',
                    });
                    return
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("jwt", JSON.stringify({ token: data.jwt }));
                const userLogged = parseJwt(data.jwt);

                console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
                console.log(userLogged);

                localStorage.setItem(
                    "userLogged",

                      JSON.stringify({
                        token: data.jwt,
                        id: userLogged.user_id,
                        rol: userLogged.authorities[0].authority,
                        name: userLogged.name,
                        lastname: userLogged.last_name,
                        email: userLogged.sub,
                      })

                    // {
                    //     token: data.jwt,
                    //     id: userLogged.user_id,
                    //     rol: userLogged.authorities[0].authority,
                    //     name: userLogged.name,
                    //     lastname: userLogged.last_name,
                    //     email: userLogged.sub,
                    // }

                );
                navigate("/")
            })
            .catch(error => console.log(error));
    };





    return (
        <div className={styles.container}>
            <HeaderHome />
            <h1>Iniciar sesión</h1>
            {errors && !empty && !logged ? <span className={styles.warning}>{errors}</span> : null}
            {err && !empty && !logged ? <span className={styles.warning}>Por favor vuelva a intentarlo, sus credenciales son inválidas</span> : null}
            {empty && !logged ? <span className={styles.warning}>Por favor complete todos los campos</span> : null}
            <form onSubmit={(e) => submitHandler(e)}>
                <div className={styles.container2}>
                    <span>
                        <label>Correo electrónico</label>
                        <input
                            onChange={handleChange}
                            value={user.email}
                            type="text"
                            name="email"
                        />
                    </span>
                    <div className={styles.container3}>
                        <label>Contraseña</label>
                        <input
                            onChange={handleChange}
                            value={user.pass}
                            type={passwordType}
                            name="pass"
                        />
                        <img
                            src={eye}
                            alt='Mostrar u ocultar contraseña'
                            onClick={togglePassword}
                        />
                    </div>
                    <span>
                        <button className={styles.buttonSubmit} onClick={() => setVerify(true)}
                            type="submit">Ingresar</button>
                    </span>
                    <span>
                        <p className={styles.otherOptionsA}>¿Aún no tenes cuenta?</p>
                        <p className={styles.otherOptionsR}><Link to="/register" >Registrate</Link></p>
                    </span>
                </div>
                {logged ?
                    <Navigate to="/" /> : null}
            </form>
            <FooterHome />
        </div>
    )
}
        // const submitHandler = async(e) => {
        //     e.preventDefault();
        //     if (validation()){
        //         setEmpty(false);
        //         const requestOptions = {
        //             method: 'POST',
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json',
        //                 Authorization: 'Bearer ',
        //                 },
        //                 mode: 'no-cors',
        //                 body: JSON.stringify({
        //                     email : user.value,
        //                     password : user.value
        //             })
        //         };
        //     try {
        //             const response = await fetch('http://localhost:8080/authenticate', requestOptions)
        //             console.log(response)
        //             if (response.status === 400){
        //                 setErr(true)
        //                 setErrors('')
        //             }
        //             else if (response.status !== 400){
        //                 setErr(false)
        //             }
        //             if(response.status !== 200 && response.status !== 400){
        //                 setErrors("Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde")
        //             }
        //             const data = await response.json();
        //             console.log(data);
        //             setToken(data.token);
        //             localStorage.setItem("token", data.token);
        //             localStorage.setItem("role", data.role);
        //             setEmpty(false);
        //             setErr(false);
        //             setErrors("");
        //             setLogged(true);
        //             dispatch({
        //                     type: types.userCredentials,
        //                     payload : JSON.parse(localStorage.getItem("dataUser"))
        //             })
        //             if(localStorage.getItem('user') && state.isAccessDenied){
        //                 const idProduct = localStorage.getItem('id')
        //                 navigate(`/producto/${idProduct}/reserva`)
        //             }
        //             if(localStorage.getItem('user') && !state.isAccessDenied){
        //                 navigate("/")
        //             } else {
        //             setErr(true);
        //             setLogged(false);
        //         }
        //     } catch (error) {
        //     }
        // }}
// const submitHandler = async(e) => {
    //     e.preventDefault();
    //     if (validation()){
    //         setEmpty(false);
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 Authorization: 'Bearer ',
    //                 },
    //                 mode: 'no-cors',
    //             body: JSON.stringify({
    //                 email : user.email,
    //                 password : user.pass
    //             })
    //         };
    //         const response = await fetch('http://localhost:8080/authenticate', requestOptions)
    //         console.log(response)
    //         if (response.status === 400){
    //             setErr(true)
    //             setErrors('')
    //         }
    //         else if (response.status !== 400){
    //             setErr(false)
    //         }
    //         if(response.status !== 200 && response.status !== 400){
    //             setErrors("Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde")
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //         sessionStorage.setItem("user", data.jwt);
    //         // sessionStorage.setItem("name", data.name);
    //         // sessionStorage.setItem("surname", data.surname);
    //         sessionStorage.setItem("dataUser", JSON.stringify(data))
    //         setEmpty(false);
    //         setErr(false);
    //         setErrors("");
    //         setLogged(true);
    //         dispatch({
    //                 type: types.userCredentials,
    //                 payload : JSON.parse(sessionStorage.getItem("dataUser"))
    //         })
    //         if(sessionStorage.getItem('user') && state.isAccessDenied){
    //             const idProduct = localStorage.getItem('id')
    //             navigate(`/products/${idProduct}/booking`)
    //         }
    //         if(sessionStorage.getItem('user') && !state.isAccessDenied){
    //             navigate("/")
    //         }
    //     } else {
    //         setErr(true);
    //         setLogged(false);
    //     }
    // }
// //version 1611 pruebas 3 login con estilos ok, validación inputs ok y funcionalidad failed
// import { useState } from "react";
// import styles from "./Login.module.css";
// import FormInput from "./FormInput";
// import { HeaderHome } from "./HeaderHome";
// import { FooterHome } from "./FooterHome";
// import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// export const Login = () => {
//   const [logged, setLogged] = useState(false);
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const inputs = [
//     {
//       id: 3,
//       name: "email",
//       type: "email",
//       placeholder: "",
//       errorMessage: "Este campo es obligatorio",
//       label: "Correo electrónico",
//       pattern: '^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$^',
//       required: true,
//     },
//     {
//       id: 4,
//       name: "password",
//       type: "password",
//       placeholder: "",
//       errorMessage:
//         "Recuerda que la contraseña debía tener 8-20 caracteres e incluir al menos una letra, un número y un caracter especial",
//       label: "Contraseña",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       required: true,
//     },
//   ];
//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   const handleChange = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <div>
//       <HeaderHome />
//       <form className={styles.container} onSubmit={handleSubmit}>
//         <h1>Iniciar sesión</h1>
//         {inputs.map((input) => (
//           <FormInput
//             key={input.id}
//             {...input}
//             value={values[input.name]}
//             onChange={handleChange}
//           />
//         ))}
//         <button className={styles.buttonEnter} onClick={handleSubmit}>
//           Ingresar
//         </button>
//         <div className={styles.otherOptions}>
//           <label className={styles.labelStill}>
//             ¿Aún no tenes cuenta?
//           </label>
//           <div>
//             <Link to='/Registro'>
//               <button className={styles.buttonSignUp}>
//                 Regístrate
//               </button>
//             </Link>
//           </div>
//         </div>
//       </form>
//       {logged? <Navigate to='/'/> : null}
//       <FooterHome/>
//     </div>
//   );
// };
// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import iconShowPassword from '../assets/img/iconShowPassword.png';
// import iconHidePassword from '../assets/img/iconHidePassword.png';
// import { HeaderHome } from "./HeaderHome";
// import { FooterHome } from "./FooterHome";
// import styles from './Login.module.css';
// import { userContext } from '../context/UserContext'
// export const Login = () => {
//   // const { user, setUser } = useContext(userContext);
//   // const userName = localStorage.getItem('userName');
//   // const [ showError, setShowError ] = useState(false);
//   const [ email, setEmail ] = useState('');
//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };
//   const [ password, setPassword ] = useState('');
//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };
//   const [ errors, setErrors ] = useState([]);
//   // const navigate = useNavigate();
//   // const query = useQuery();
//   // useEffect(() => {
//   //   if (user) navigate();
//   // }, []);
//   // function navigate() {
//   //   const id = query.get('error');
//   //   if (id) {
//   //     navigate('/');
//   //   }
//   // }
//   // useEffect(() => {
//   //   if 
//   // })
// const handleSubmit = (e) => {
//   e.preventDefault();
// }
// const [ isShowPassword, setIsShowPassword ] = useState (false)
// return (
//   <div className={styles.container}>
//     <HeaderHome />
//     <div className={styles.container}>
//       <h1>Iniciar sesión</h1>
//         <form onSubmit={handleSubmit}>
//             <div className={styles.input} >
//               <label className={styles.label}>
//                 Correo electrónico
//               </label>
//               <input 
//               type='email'
//               name='email'
//               id= 'email'
//               value={email}
//               onChange={handleChangeEmail}
//               />
//           </div>
//           <div className={styles.input} >
//               <label className={styles.label}>
//                 Contraseña
//               </label>
//               <input 
//               type={isShowPassword ? 'text' : 'password'}
//               name='password'
//               id= 'password'
//               value={password}
//               onChange={handleChangePassword}
//               />
//               <div
//               className={styles.iconEye}
//               onClick={() => setIsShowPassword(!isShowPassword)}
//               >
//               {isShowPassword ? (
//                 <img src={iconShowPassword} alt='Mostrar contraseña'/>
//               ) : (
//                 <img src={iconHidePassword} alt='Ocultar Contraseña'/>
//               )}
//               </div>
//           </div>
//         <p className={styles.error}>{errors}</p>
//       <button className={styles.buttonEnter} 
//       type='submit'
//       // onClick={getData}
//       >
//         Ingresar
//       </button>
//       <div className={styles.otherOptions}>
//         <p className={styles.labelStill}>
//           ¿Aún no tenes cuenta?
//         </p>
//         <div>
//           <Link to='/login'>
//             <p className={styles.buttonSignUp}>
//               Regístrate
//             </p>
//           </Link>
//         </div>
//       </div>
//     </form>
//     </div>
//     <FooterHome/>
//   </div>
// );
// };
// //version 1611 pruebas 2
// import { useState } from "react";
// import "./Login.css";
// import FormInput from "./FormInput";
// import { HeaderHome } from "./HeaderHome";
// import { FooterHome } from "./FooterHome";
// import { Link,  } from "react-router-dom";
// export const Login = () => {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const inputs = [
//     {
//       id: 3,
//       name: "email",
//       type: "email",
//       placeholder: "",
//       errorMessage: "Este campo es obligatorio",
//       label: "Correo electrónico",
//       required: true,
//     },
//     {
//       id: 4,
//       name: "password",
//       type: "password",
//       placeholder: "",
//       errorMessage:
//         "Recuerda que la contraseña debía tener 8-20 caracteres e incluir al menos una letra, un número y un caracter especial",
//       label: "Contraseña",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       required: true,
//     },
//   ];
// const onChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     for(let i = 0; i < e.target.elements.length - 1; i++) {
//       if(e.target.elements[i].classList.contains("is-invalid") || e.target.elements[i].value.length === 0) {
//           console.log(e.target.elements[i]);
//           return;
//       }
//     const user = {
//     email: e.target.elements[0].value,
//     password: e.target.elements[1].value,
//     }
//     const localUser = JSON.parse(localStorage.getItem('user'));
//     if(localUser && localUser.email === user.email && localUser.password === user.password) {
//         // useNavigate('/');
//         localStorage.setItem('login?', true);
//     }
//   };
// }
//   return (
//     <div>
//       <HeaderHome />
//       <form className="login-container" onSubmit={handleSubmit}>
//         <h1>Iniciar sesión</h1>
//         {inputs.map((input) => (
//           <FormInput
//             key={input.id}
//             {...input}
//             value={values[input.name]}
//             onChange={onChange}
//           />
//         ))}
//         <button className="button-ingresar" onClick={handleSubmit}>
//           Ingresar
//         </button>
//         <div className="other-options">
//           <label className='label-aun'>
//             ¿Aún no tenes cuenta?
//           </label>
//           <div>
//             <Link to='/Registro'>
//               <button className='button-registrate'>
//                 Regístrate
//               </button>
//             </Link>
//           </div>
//         </div>
//       </form>
//       <FooterHome/>
//     </div>
//   );
// };
// //version 1611 pruebas en login
// import { useState } from "react";
// import "./Login.css";
// import FormInput from "./FormInput";
// import { HeaderHome } from "./HeaderHome";
// import { FooterHome } from "./FooterHome";
// import { Link } from "react-router-dom";
// export const Login = () => {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const [ login, setLogin] = useState('false');
//   const [ email, setEmail] = useState('');
//   const [ password, setPassword] = useState('');
//   const inputs = [
//     {
//       id: 'email',
//       name: "email",
//       type: "email",
//       placeholder: "",
//       errorMessage: "Este campo es obligatorio",
//       label: "Correo electrónico",
//       required: true,
//     },
//     {
//       id: 'password',
//       name: "password",
//       type: "password",
//       placeholder: "",
//       errorMessage:
//         "Recuerda que la contraseña debía tener 8-20 caracteres e incluir al menos una letra, un número y un caracter especial",
//       label: "Contraseña",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       required: true,
//     },
//   ];
//  const handleSubmit = (e) => {
//   e.preventDefault();
//   let email = document.getElementById('3').value;
//   let password = document.getElementById('4').value;
//   if(email === 'ejemplo@mail.com' && password === 'ABC123def!') {
//     setLogin('true');
//   } else {
//     setLogin('false');
//     alert('Error de usuario y/o contraseña');
//     document.getElementById('email').value = '';
//     document.getElementById('password').value = '';
//       }
//   }
//   ;
//   const onChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
//   return (
//     <div>
//       <HeaderHome />
//       <form className="login-container" onSubmit={handleSubmit}>
//         <h1>Iniciar sesión</h1>
//         {inputs.map((input) => (
//           <FormInput
//             key={input.id}
//             {...input}
//             value={values[input.name]}
//             onChange={onChange}
//           />
//         ))}
//         <button className="button-ingresar" onClick={handleSubmit}>
//           Ingresar
//         </button>
//         <div className="other-options">
//           <label className='label-aun'>
//             ¿Aún no tenes cuenta?
//           </label>
//           <div>
//             <Link to='/Registro'>
//               <button className='button-registrate'>
//                 Regístrate
//               </button>
//             </Link>
//           </div>
//         </div>
//       </form>
//       <FooterHome/>
//     </div>
//   );
// };
// //version 1611 que valida pero no guarda usuario este es la ultima que funciona
// import React from "react";
// import { useState } from "react";
// import "./Login.css";
// import FormInput from "./FormInput";
// import { HeaderHome } from "./HeaderHome";
// import { FooterHome } from "./FooterHome";
// import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// // function getFormValues(){
// //   const storedValues = localStorage.getItem('user');
// //   if (!storedValues) return {
// //     email: '',
// //     password: '',
// //   };
// //   return JSON.parse(storedValues)
// // }
// export const Login = () => {
//   const [ values, setValues ] = useState('');
//   const [ logged, setLogged ] = useState(false);
//   const inputs = [
//     {
//       id: 3,
//       name: "email",
//       type: "email",
//       placeholder: "",
//       errorMessage: "Este campo es obligatorio",
//       label: "Correo electrónico",
//       pattern: "[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?",
//       required: true,
//     },
//     {
//       id: 4,
//       name: "password",
//       type: "password",
//       placeholder: "",
//       errorMessage:
//         "Recuerda que la contraseña debía tener 8-20 caracteres e incluir al menos una letra, un número y un caracter especial",
//       label: "Contraseña",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       required: true,
//     },
//   ];
//   // const user = {
//   //   email: {localStorage},
//   //   password: e.target.elements[1].value,
//   // }
//   const localUser = JSON.parse(localStorage.getItem('user'));
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if(localUser && localUser.email.value === values.email.value && localUser.password.value === values.password.value){
//       setTimeout(() => setLogged(true), 2000)
//       console.log('Usuario logueado con éxito al fin');
//     } else {setLogged(false)}
//   };
//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
//   return (
//     <div>
//       <HeaderHome />
//       <form className="login-container" onSubmit={handleSubmit}>
//         <h1>Iniciar sesión</h1>
//         {inputs.map((input) => (
//           <FormInput
//             key={input.id}
//             {...input}
//             value={values[input.name]}
//             onChange={handleChange}
//           />
//         ))}
//         <button className="button-ingresar" onClick={handleSubmit}>
//           Ingresar
//         </button>
//         <div className="other-options">
//           <label className='label-aun'>
//             ¿Aún no tenes cuenta?
//           </label>
//           <div>
//             <Link to='/register'>
//               <button className='button-registrate'>
//                 Regístrate
//               </button>
//             </Link>
//           </div>
//         </div>
//       </form>
//       {logged ? <Navigate to='/' /> : null}
//       <FooterHome/>
//     </div>
//   );
// };
// import React from 'react'
// export const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }
// import React, { useState } from 'react';
// import './Login.css';
// import { Link } from 'react-router-dom';
// import Title from './Title';
// import Label from './Label';
// import Input from './Input';
// import {HeaderHome} from './HeaderHome';
// import {FooterHome} from './FooterHome';
// // let localStorageData = localStorage.getItem('account')
// // let lsd = JSON.parse(localStorageData)
// export const Login = () => {
//     return (
//         <div className='login-container'>
//             <div>
//                 <HeaderHome/>
//             </div>
//             <div className='login-content'>
//                     <div className='sesionIniciada-container' >
//                         <p> Te has logueado correctamente, vamos a redirigirte a la página principal </p>
//                     </div>
//                     <div>
//                         <Title text='Iniciar sesión' />
//                                 <label className='label-alert'>
//                                     Por favor vuelva a intentarlo, sus credenciales son inválidas
//                                 </label>
//                     <Label text='Correo electrónico'/>
//                         <div className='input-email'>
//                             <Input
//                                 attribute={{
//                                 id: 'email',
//                                 name: 'email',
//                                 type: 'email',
//                                 placeholder: '',
//                                 }}
//                             />
//                     if
//                         </div>
//                     <Label text='Contraseña'/>
//                         <div className='input-password'>
//                             <Input
//                                 attribute={{
//                                 id: 'password',
//                                 name: 'password',
//                                 type: 'password',
//                                 placeholder: '' ,
//                                 }}
//                             />
//                         </div>
//                     <label className='label-error'>
//                         Contraseña inválida o incompleta
//                     </label>
//                     <div>
//                             <button  className='button-ingresar'>
//                             Ingresar
//                             </button>
//                     </div>
//                     <div>
//                         <label className='label-aun'>
//                         ¿Aún no tenes cuenta?
//                         </label>
//                     </div>
//                     <div>
//                             <button  className='button-registrate'>
//                                 Regístrate
//                             </button>
//                     </div>
//                     <div>
//                     </div>
//                     </div>
//                 }
//                 </div>
//             <div>
//                 <FooterHome/>
//             </div>
//         </div>
//     )
// };
//el que va pero no guarda en local
// import React, { useState } from 'react';
// import './Login.css';
// import { Link } from 'react-router-dom';
// import Title from './Title';
// import Label from './Label';
// import Input from './Input';
// import {HeaderHome} from './HeaderHome';
// import {FooterHome} from './FooterHome';
// // let localStorageData = localStorage.getItem('account')
// // let lsd = JSON.parse(localStorageData)
// export const Login = () => {
//     const [ email, setEmail ] = useState('');
//     const [ password, setPassword ] = useState('');
//     const [ passwordError, setPasswordError ] = useState(false);
//     const [ isLogin, setIsLogin ] = useState(false);
//     const [ hasError, setHasError ] = useState(false);
// // const [ mostrarPassword, setMostrarPassword ] = useState(false);
//     function handleChange(name, value) {
//         if(name === 'email') {
//             setEmail(value);
//             setHasError(false);
//         } else {
//             if(value.length < 6) {
//                 setPasswordError(true);
//                 setHasError(false);
//             } else {
//                 setPasswordError(false);
//                 setPassword(value);
//                 setHasError(false);
//             }
//         }
//     };
//     function ifMatch(param){
//         if(param.email.lenght > 0 && param.password.length > 0) {
//             if(param.email.name === 'grupo2@camada6.com' && param.password === '123456') {
//                 const { email, password} = param;
//                 let ac = { email, password };
//                 let account = JSON.stringify(ac);
//                 localStorage.setItem('account', account);
//                 setIsLogin(true);
//             } else {
//                 setIsLogin(false);
//                 setHasError(true);
//             }
//         } else {
//             setIsLogin(false);
//             setHasError(true);
//         }
//     }
//     function handleSubmit() {
//         let account = { email, password }
//         if(account) {
//             ifMatch(account);
//         }
//     };
//     return (
//         <div className='login-container'>
//             <div>
//                 <HeaderHome/>
//             </div>
//             <div className='login-content'>
//                 { isLogin ?
//                     <div className='sesionIniciada-container' >
//                         <p> Te has logueado correctamente, vamos a redirigirte a la página principal </p>
//                         <Link to='/'></Link>
//                     </div>
//                     :
//                     <div>
//                         <Title text='Iniciar sesión' />
//                             { hasError &&
//                                 <label className='label-alert'>
//                                     Por favor vuelva a intentarlo, sus credenciales son inválidas
//                                 </label>
//                             }
//                     <Label text='Correo electrónico'/>
//                         <div className='input-email'>
//                             <Input
//                                 attribute={{
//                                 id: 'email',
//                                 name: 'email',
//                                 type: 'email',
//                                 placeholder: '',
//                                 }}
//                                 handleChange={handleChange}
//                             />
//                         </div>
//                     <Label text='Contraseña'/>
//                         <div className='input-password'>
//                             <Input
//                                 attribute={{
//                                 id: 'password',
//                                 name: 'password',
//                                 type: 'password',
//                                 placeholder: '' ,
//                                 }}
//                                 handleChange={handleChange}
//                                 param={passwordError}
//                             />
//                         </div>
//                     { passwordError &&
//                     <label className='label-error'>
//                         Contraseña inválida o incompleta
//                     </label>
//                     }
//                     <div>
//                         {/* <Link to='/' > */}
//                             <button onClick={handleSubmit} className='button-ingresar'>
//                             Ingresar
//                             </button>
//                         {/* </Link> */}
//                     </div>
//                     <div>
//                         <label className='label-aun'>
//                         ¿Aún no tenes cuenta?
//                         </label>
//                     </div>
//                     <div>
//                         {/* <Link to='/Registro' > */}
//                             <button onClick={handleSubmit} className='button-registrate'>
//                                 Regístrate
//                             </button>
//                         {/* </Link> */}
//                     </div>
//                     <div>
//                     </div>
//                     </div>
//                 }
//                 </div>
//             <div>
//                 <FooterHome/>
//             </div>
//         </div>
//     )
// };

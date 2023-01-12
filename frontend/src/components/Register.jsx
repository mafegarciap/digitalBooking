import React, { useState, useContext } from "react";
import { Data } from "../Data/User.js";
import eye from "../assets/img/iconHidePassword.png";
import { Navigate, Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider.js";
import { types } from "../context/dataReducer.js";
import styles from "./Register.module.css";
import { HeaderHome } from "./HeaderHome";
import { FooterHome } from "./FooterHome";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const Register = () => {
	const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    pass: "",
    passRepeat: "",
  });
  // const [state, dispatch] = useContext(DataContext)
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const [verify, setVerify] = useState(false);
  const [created, setCreated] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const validation = () => {
    let errors = {};
    let isValid = true;
    if (verify) {
      setVerify(false);
      if (!user.name) {
        isValid = false;
        errors.name = "Este campo es obligatorio";
      }
      if (!user.surname) {
        isValid = false;
        errors.surname = "Este campo es obligatorio";
      }
      if (!user.email) {
        isValid = false;
        errors.email = "Este campo es obligatorio";
      }
      if (user.email === Data.email) {
        isValid = false;
        errors.email = "Ese email ya existe";
      }
      if (user.email !== "undefined" && !user.email === false) {
        let at = user.email.lastIndexOf("@");
        let dot = user.email.lastIndexOf(".");

        if (
          !(
            at < dot &&
            at > 0 &&
            user.email.indexOf("@@") === -1 &&
            dot > 2 &&
            user.email.length - dot > 2
          )
        ) {
          isValid = false;
          errors.email = "Email inválido (ejemplo@mail.com)";
        }
      }
      if (!user.pass) {
        isValid = false;
        errors.pass = "Este campo es obligatorio";
      }
      if (user.pass.length < 6) {
        isValid = false;
        errors.pass = "La contraseña debe tener más de 6 caracteres";
      }
      if (!user.passRepeat) {
        isValid = false;
        errors.passRepeat = "Este campo es obligatorio";
      }
      if (user.pass !== user.passRepeat) {
        isValid = false;
        errors.passRepeat = "Las contraseñas deben ser iguales";
      }
      setErrors(errors);
      return isValid;
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const urlAuth = "http://localhost:8080/users/save";

  var data = {
    userName: user.name,
    userLastName: user.surname,
    userEmail: user.email,
    userPassword: user.pass,
    role: {
      idRole: 1,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) {
      Swal({
        icon: "error",
        text: "Verificar campos ingresados",
      });
      return;
    }
    fetch(urlAuth, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          Swal({
            icon: "error",
            text: "Credenciales inválidas. Por favor intente nuevamente.",
          });
          return;
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("userRegis", JSON.stringify(data));
        const userRegis = data;

        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(userRegis);

        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <HeaderHome />
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.container2}>
          <div className={styles.nameAndSur}>
            <span>
              <p className={styles.user}>Nombre</p>
              {!errors.name ? (
                <input
                  className={styles.boxesNames}
                  onChange={handleChange}
                  value={user.name}
                  type="text"
                  name="name"
                />
              ) : (
                <span>
                  <input
                    className={styles.boxesWrongNames}
                    onChange={handleChange}
                    value={user.name}
                    type="text"
                    name="name"
                  />
                  <p className={styles.errorP}>{errors.name}</p>
                </span>
              )}
            </span>
            <span>
              <p className={styles.user}>Apellido</p>
              {!errors.surname ? (
                <input
                  className={styles.boxesNames}
                  onChange={handleChange}
                  value={user.surname}
                  type="text"
                  name="surname"
                />
              ) : (
                <span>
                  <input
                    className={styles.boxesWrongNames}
                    onChange={handleChange}
                    value={user.surname}
                    type="text"
                    name="surname"
                  />
                  <p className={styles.errorP}>{errors.surname}</p>
                </span>
              )}
            </span>
          </div>
          <span>
            <p className={styles.user}>Correo electrónico</p>
            {!errors.email ? (
              <input
                className={styles.otherBoxes}
                onChange={handleChange}
                value={user.email}
                type="text"
                name="email"
              />
            ) : (
              <span>
                <input
                  className={styles.otherBoxesWrong}
                  onChange={handleChange}
                  value={user.email}
                  type="text"
                  name="email"
                />
                <p className={styles.errorP}>{errors.email}</p>
              </span>
            )}
          </span>
          <span>
            <p className={styles.user}>Contraseña</p>
            {!errors.pass ? (
              <div className={styles.block}>
                <input
                  className={styles.otherBoxes}
                  onChange={handleChange}
                  value={user.pass}
                  type={passwordType}
                  name="pass"
                />
                <img
                  alt="Mostrar u ocultar contraseña"
                  onClick={togglePassword}
                  src={eye}
                />
              </div>
            ) : (
              <div className={styles.block}>
                <input
                  className={styles.otherBoxesWrong}
                  onChange={handleChange}
                  value={user.pass}
                  type={passwordType}
                  name="pass"
                />

                <img
                  alt="Mostrar u ocultar contraseña"
                  onClick={togglePassword}
                  src={eye}
                />
                <p className={styles.errorP}>{errors.pass}</p>
              </div>
            )}
          </span>
          <span>
            <p className={styles.user}>Confirmar contraseña</p>
            {!errors.passRepeat ? (
              <input
                className={styles.otherBoxes}
                onChange={handleChange}
                value={user.passRepeat}
                type="password"
                name="passRepeat"
              />
            ) : (
              <span>
                <input
                  className={styles.otherBoxesWrong}
                  onChange={handleChange}
                  value={user.passRepeat}
                  type="password"
                  name="passRepeat"
                />
                <p className={styles.errorP}>{errors.passRepeat}</p>
              </span>
            )}
          </span>
          <span>
            <button
              className={styles.buttonSubmit}
              onClick={() => setVerify(true)}
              type="submit"
            >
              Crear cuenta
            </button>
          </span>
          <span>
            <p className={styles.otherOptionsY}>¿Ya tienes una cuenta?</p>
            <p className={styles.otherOptionsI}>
              <Link to="/login">Iniciar sesión</Link>
            </p>
          </span>
        </div>
      </form>
      {created ? <Navigate to="/" /> : null}
      <FooterHome />
    </div>
  );
};

export default Register;


//end deregister con consumo de API failed




// //Backup estilos ok, validaciones inputs ok, funcionalidad del registro no está bien

// import React from "react";
// import { useState } from "react";
// import styles from "./Register.module.css";
// import FormInput from "./FormInput";
// import { HeaderHome } from "./HeaderHome";
// import { FooterHome } from "./FooterHome";
// import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// // import iconHidePassword from '../assets/img/iconHidePassword.png'

// // ^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$


//   function getFormValues(){
//     const storedValues = localStorage.getItem('user');
//     if (!storedValues) return {
//       userName: '',
//       userSurname: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     };
//     return JSON.parse(storedValues)
//   }


// export const Register = () => {

//   const [values, setValues] = useState(getFormValues);
//   const [created, setCreated] = useState(false);

//   const inputs = [
//     {
//       id: 1,
//       name: 'userName',
//       type: 'text',
//       placeholder: '',
//       errorMessage: 'Este campo es obligatorio',
//       label: 'Nombre',
//       pattern: '^[A-Za-z0-9]{3,16}$',
//       required: true,
//     },

//     {
//       id: 2,
//       name: 'userSurname',
//       type: 'text',
//       placeholder: '',
//       errorMessage: 'Este campo es obligatorio',
//       label: 'Apellido',
//       pattern: '^[A-Za-z0-9]{3,16}$',
//       required: true,
//     },

//     {
//       id: 3,
//       name: 'email',
//       type: 'email',
//       placeholder: '',
//       errorMessage: 'Este campo es obligatorio (ejemplo@mail.com)',
//       label: 'Correo electrónico',
//       pattern: "[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?",
//       required: true,
//     },

//     {
//       id: 4,
//       name: 'password',
//       type: 'password',
//       placeholder: '',
//       errorMessage:
//         'La contraseña debe tener 8-20 caracteres e incluir al menos una letra, un número y un caracter especial',
//       label: 'Contraseña',
//       pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
//       required: true,
      
//     },
//     {
//       id: 5,
//       name: 'confirmPassword',
//       type: 'password',
//       placeholder: '',
//       errorMessage: 'Las contraseñas no coinciden',
//       label: 'Confirmar contraseña',
//       pattern: values.password,
//       required: true,
//     },
//   ];

// //   React.useEffect(() => {
// //     let account = { userName, userSurname, mail, password }
// //     if (account) {
// //       let ac = JSON.stringify(account)
// //       localStorage.setItem('account', ac)
// //     })
// // }

//   React.useEffect(() => {
//     localStorage.setItem('user', JSON.stringify(values))
//   }, [values]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if(getFormValues){
//       setTimeout(() => setCreated(true), 1000)
//       console.log('Usuario creado con éxito al fin');
//     } else {setCreated(false)}
//   };

//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value })
//   };

//   return (
//     <div>
//       <HeaderHome />
//       <form className={styles.container} onSubmit={handleSubmit}>
//         <h1>Crear cuenta</h1>
//         {inputs.map((input) => (
//           <FormInput
//             key={input.id}
//             {...input}
//             value={values[input.name]}
//             onChange={handleChange[input.name]}
//           />
//         ))}
//         <button className={styles.buttonCreateAccount} onClick={handleSubmit}>
//           Crear cuenta
//         </button>
//         <div className={styles.otherOptions}>
//           <label className={styles.labelAlready}>
//             ¿Ya tienes una cuenta?
//           </label>
//           <div>
//             <Link to='/login'>
//               <button className={styles.buttonLogin}>
//                 Iniciar sesión
//               </button>
//             </Link>
//           </div>
//         </div>
//       </form>
//       {created ? <Navigate to='/login' /> : null}
//       <FooterHome/>
//     </div>
//   );
// };























































// import React, { useState } from 'react';
// import { Link, useNavigate} from 'react-router-dom';
// import { HeaderHome } from "./HeaderHome";
// import { FooterHome } from "./FooterHome";
// import styles from './Register.module.css';
// import iconShowPassword from '../assets/img/iconShowPassword.png';
// import iconHidePassword from '../assets/img/iconHidePassword.png';


// export const Register = () => {
  
//   const [ userName, setUserName ] = useState('');
//   const handleChangeUserName = (e) => {
//     setUserName(e.target.value);
//   };
  
//   const [ userSurname, setUserSurname ] = useState('');
//   const handleChangeUserSurname = (e) => {
//     setUserSurname(e.target.value);
//   };
  
//   const [ email, setEmail ] = useState('');
//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };
  
//   const [ password, setPassword ] = useState('');
//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };
  
//   const [ confirmPassword, setConfirmPassword ] = useState('');
//   const handleChangeConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//   };
  
//   const [ error, setError ] = useState('');

//   const validCredentials = {
//     email: 'grupodos@mail.com',
//     password: 'GD123456!',
//   }
  
//   const validateUserName = () => {
//     let validUserName = true;
//     if (userName.lenght === 0) {
//       setError('Los campos no pueden estar vacíos');
//       validUserName = false;
//     }
//     return validUserName;
//   };

//   const validateUserSurname = () => {
//     let validUserSurname = true;
//     if (userSurname.lenght === 0) {
//       setError('Los campos no pueden estar vacíos');
//       validUserSurname = false;
//     }
//     return validUserSurname;
//   };

//   //'/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i'
//   const validateEmail = () => {
//     let validEmail = true;
//     let pattern = '';
//     if (!pattern.test(email)) {
//       setError('El correo electrónico es inválido');
//       validEmail = false;
//     }
//     if (email.lenght === 0) {
//       setError('Los campos no pueden estar vacíos');
//       validEmail = false;
//     }
//     return validEmail;
//   };
  
//   const validatePassword = () => {
//     let validPassword = true;
//     if (password.lenght <= 8) {
//       setError ('La contraseña debe tener más de 8 caracteres');
//       validPassword = false;
//     }
//     if (confirmPassword.length === 0) {
//       setError('Los campos no pueden estar vacíos');
//       validPassword = false;
//     }
//     if (confirmPassword.lenght > 0 && password !== confirmPassword) {
//       setError('Las contraseñas deben ser iguales');
//       validPassword = false;
//     }
//     return validPassword;
//   };
  
  
//       const validateCredentials = () => {
//         let credentialsExist = false;
//         if (email === validCredentials.email) {
//           credentialsExist = true;
//           }
//           return credentialsExist;
//         };
          
//           const navigate = useNavigate();
          
//           const sendData = (e) => {
//             if (!validatePassword()) {
//               e.preventDefault();
//             } else if (!validateEmail()) {
//               e.preventDefault();
//             } else if (!validateUserName()) {
//               e.preventDefault();
//             } else if (!validateUserSurname()) {
//               e.preventDefault();
//             } else {    
//               e.preventDefault();
//             } 
//           };
          
//           const [ isShowPassword, setIsShowPassword ] = useState(false);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };



//   return (
//     <div className={styles.register}>
//       <HeaderHome />
//       <div className={styles.container}>
//         <h1>Crear cuenta</h1>
//           <form onSubmit={sendData}>
//             <div className={styles.nameAndSurname}>
//               <div className={styles.input} >
//                 <label className={styles.label}>
//                   Nombre
//                 </label>
//                 <input 
//                   type='text'
//                   name='userName'
//                   id= 'userName'
//                   value={userName}
//                   onChange={handleChangeUserName}
//                 />
//               </div>
//               <div className={styles.input} >
//                 <label className={styles.label}>
//                   Apellido
//                 </label>
//                 <input 
//                   type='text'
//                   name='userSurname'
//                   id= 'userSurname'
//                   value={userSurname}
//                   onChange={handleChangeUserSurname}
//                 />
//               </div>
//             </div>
//             <div className={styles.input} >
//                 <label className={styles.label}>
//                   Correo electrónico
//                 </label>
//                 <input 
//                 type='email'
//                 name='email'
//                 id= 'email'
//                 value={email}
//                 onChange={handleChangeEmail}
//                 />
//             </div>
//             <div className={styles.input} >
//                 <label className={styles.label}>
//                   Contraseña
//                 </label>
//                 <input 
//                 type={isShowPassword ? 'text' : 'password'}
//                 name='password'
//                 id= 'password'
//                 value={password}
//                 onChange={handleChangePassword}
//                 />
//                 <div
//                 className={styles.iconEye}
//                 onClick={() => setIsShowPassword(!isShowPassword)}
//                 >
                
//                 {isShowPassword ? (
//                   <img src={iconShowPassword} alt='Mostrar contraseña'/>
//                 ) : (
//                   <img src={iconHidePassword} alt='Ocultar Contraseña'/>
//                 )}
//                 </div>
//             </div>
//             <div className={styles.input} >
//                 <label className={styles.label}>
//                   Confirmar contraseña
//                 </label>
//                 <input 
//                 type='password'
//                 name='confirmPassword'
//                 id= 'confirmPassword'
//                 value={confirmPassword}
//                 onChange={handleChangeConfirmPassword}
                
//                 />
//             </div>
        
//         <div>{error !== '' ? <p className={styles.error}>{error}</p> : null }
//         </div>


//         <button className={styles.buttonCreateAccount} 
//         type='submit'
//         onClick={handleSubmit}
//         >
//           Crear cuenta
//         </button>
//         <div className={styles.otherOptions}>
//           <p className={styles.labelAlready}>
//             ¿Ya tienes una cuenta?
//           </p>
//           <div>
//             <Link to='/Login'>
//               <p className={styles.buttonLogin}>
//                 Iniciar sesión
//               </p>
//             </Link>
//           </div>
//         </div>
//       </form>
//       </div>
//       <FooterHome/>
//     </div>
//   );
// };

























// //backup Registro que guarda info en local storrage

// import { useState } from "react";
// import styles from "./Register.module.css";
// import FormInput from "./FormInput";
// import { HeaderHome } from "./HeaderHome";
// import { FooterHome } from "./FooterHome";
// import { Link } from "react-router-dom";

// // ^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$

// export const Registro = () => {
//   const [values, setValues] = useState({
//     username: "",
//     email: "",
//     birthday: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const inputs = [
//     {
//       id: 1,
//       name: "userName",
//       type: "text",
//       placeholder: "",
//       errorMessage: "Este campo es obligatorio",
//       label: "Nombre",
//       pattern: "^[A-Za-z0-9]{3,16}$",
//       required: true,
//     },

//     {
//       id: 2,
//       name: "userSurname",
//       type: "text",
//       placeholder: "",
//       errorMessage: "Este campo es obligatorio",
//       label: "Apellido",
//       pattern: "^[A-Za-z0-9]{3,16}$",
//       required: true,
//     },

//     {
//       id: 3,
//       name: "email",
//       type: "email",
//       placeholder: "",
//       errorMessage: "Este campo es obligatorio (ejemplo@mail.com)",
//       label: "Correo electrónico",
//       required: true,
//     },

//     {
//       id: 4,
//       name: "password",
//       type: "password",
//       placeholder: "",
//       errorMessage:
//         "La contraseña debe tener 8-20 caracteres e incluir al menos una letra, un número y un caracter especial",
//       label: "Contraseña",
//       pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
//       required: true,
//     },
//     {
//       id: 5,
//       name: "confirmPassword",
//       type: "password",
//       placeholder: "",
//       errorMessage: "Las contraseñas no coinciden",
//       label: "Confirmar contraseña",
//       pattern: values.password,
//       required: true,
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem('userName', values);
//     localStorage.setItem('userSurname', values);
//     localStorage.setItem('email', values);
//     localStorage.setItem('password', values);
//     localStorage.setItem('confirmPassword', values);
    

//   };

//   const onChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <HeaderHome />
//       <form className={styles.container} onSubmit={handleSubmit}>
//         <h1>Crear cuenta</h1>
//         {inputs.map((input) => (
//           <FormInput
//             key={input.id}
//             {...input}
//             value={values[input.name]}
//             onChange={onChange}
//           />
//         ))}
//         <button className={styles.buttonCreateAccount} onClick={handleSubmit}>
//           Crear cuenta
//         </button>
//         <div className={styles.otherOptions}>
//           <label className={styles.labelAlready}>
//             ¿Ya tienes una cuenta?
//           </label>
//           <div>
//             <Link to='/Login'>
//               <button className={styles.buttonLogin}>
//                 Iniciar sesión
//               </button>
//             </Link>
//           </div>
//         </div>
//       </form>
//       <FooterHome/>
//     </div>
//   );
// };

























// import React, { useState } from 'react';
// import { Link, useNavigate} from 'react-router-dom';
// import { HeaderHome } from "./HeaderHome";
// import { FooterHome } from "./FooterHome";
// import styles from './Register.module.css';
// import iconShowPassword from '../assets/img/iconShowPassword.png';
// import iconHidePassword from '../assets/img/iconHidePassword.png';


// export const Registro = () => {
  
//   const [ sentData, setSentData ] = useState('');
//   const [ savedData, setSavedData ] = useState('');
//   const [ created, setCreated ] = useState(false);

//   const [ error, setError ] = useState('');

//   const [ userName, setUserName ] = useState('');
//   const handleChangeUserName = (e) => {
//     setUserName(e.target.value);
//   };

//   const [ userSurname, setUserSurname ] = useState('');
//   const handleChangeUserSurname = (e) => {
//     setUserSurname(e.target.value);
//   };

//   const [ email, setEmail ] = useState('');
//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const [ password, setPassword ] = useState('');
//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const [ confirmPassword, setConfirmPassword ] = useState('');
//   const handleChangeConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//   };

//   const validateUserName = () => {
//     let validUserName = true;
//     if (userName.lenght === 0) {
//       setError('Los campos no pueden estar vacíos');
//       validUserName = false;
//     }
//     return validUserName;
//   };

//   const validateUserSurname = () => {
//     let validUserSurname = true;
//     if (userSurname.lenght === 0) {
//       setError('Los campos no pueden estar vacíos');
//       validUserSurname = false;
//     }
//     return validUserSurname;
//   };

//   const validateEmail = () => {
//     let validEmail = true;
//     let pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     if (!pattern.test(email)) {
//       setError('El correo electrónico es inválido');
//       validEmail = false;
//     }
//     if (email.lenght === 0) {
//       setError('Los campos no pueden estar vacíos');
//       validEmail = false;
//     }
//     return validEmail;
//   };
  
//   const validatePassword = () => {
//     let validPassword = true;
//     if (password.lenght < 8) {
//       setError ('La contraseña debe tener más de 8 caracteres');
//       validPassword = false;
//     }
//     if (confirmPassword.length === 0) {
//       setError('Los campos no pueden estar vacíos');
//       validPassword = false;
//     }
//     if (confirmPassword.lenght > 0 && password !== confirmPassword) {
//       setError('Las contraseñas deben ser iguales');
//       validPassword = false;
//     }
//     return validPassword;
//   };
  
  
  
  
//   // const validCredentials = {
//     // if(setUser=true) {
//       //   email: (saveData.email),
//       //   password: (saveData.password),
      
//       // }
//       // };
      
//       // const validateCredentials = () => {
//         //   let credentialsExist = false;
//         //   if (email === validCredentials.email) {
//           //     credentialsExist = true;
//           //   }
//           //   return credentialsExist;
          
//           // };
          
//           const navigate = useNavigate();
          
//           const sendData = (e) => {
            
//             if (!validatePassword()) {
//               e.preventDefault();
//             } else if (!validateEmail()) {
//               e.preventDefault();
//             } else if (!validateUserName()) {
//               e.preventDefault();
//             } else if (!validateUserSurname()) {
//               e.preventDefault();
//             } else {    
//               e.preventDefault();
//               setSentData(true);
//             } setSentData(false);
//           };
          
//           const saveData = () => {
//             if(sentData === 'true'){
//           localStorage.setItem('User', [userName, userSurname, email, password, confirmPassword]);
//           setSavedData(true);
//           } setSavedData(false);
//           };


//           const toCreate = () => {
//             if (savedData === 'true') {
//               setCreated(true)              
//             } setCreated(false);
//           };

//           const [ isShowPassword, setIsShowPassword ] = useState(false);
          
          
//           //   function getFormValues(){
//             //     const storedValues = localStorage.getItem('form');
// //     if (!storedValues) return {
// //       userName: '',
// //       userSurname: '',
// //       email: '',
// //       password: '',
// //       confirmPassword: '',
// //     };
// //     return JSON.parse(storedValues)
// //   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };



//   return (
//     <div className={styles.register}>
//       <HeaderHome />
//       <div className={styles.container}>
//         <h1>Crear cuenta</h1>
//           <form onSubmit={sendData}>
//             <div className={styles.nameAndSurname}>
//               <div className={styles.input} >
//                 <label className={styles.label}>
//                   Nombre
//                 </label>
//                 <input 
//                   type='text'
//                   name='userName'
//                   id= 'userName'
//                   value={userName}
//                   onChange={handleChangeUserName}
//                 />
//               </div>
//               <div className={styles.input} >
//                 <label className={styles.label}>
//                   Apellido
//                 </label>
//                 <input 
//                   type='text'
//                   name='userSurname'
//                   id= 'userSurname'
//                   value={userSurname}
//                   onChange={handleChangeUserSurname}
//                 />
//               </div>
//             </div>
//             <div className={styles.input} >
//                 <label className={styles.label}>
//                   Correo electrónico
//                 </label>
//                 <input 
//                 type='email'
//                 name='email'
//                 id= 'email'
//                 value={email}
//                 onChange={handleChangeEmail}
//                 />
//             </div>
//             <div className={styles.input} >
//                 <label className={styles.label}>
//                   Contraseña
//                 </label>
//                 <input 
//                 type={isShowPassword ? 'text' : 'password'}
//                 name='password'
//                 id= 'password'
//                 value={password}
//                 onChange={handleChangePassword}
//                 />
//                 <div
//                 className={styles.iconEye}
//                 onClick={() => setIsShowPassword(!isShowPassword)}
//                 >
                
//                 {isShowPassword ? (
//                   <img src={iconShowPassword} alt='Mostrar contraseña'/>
//                 ) : (
//                   <img src={iconHidePassword} alt='Ocultar Contraseña'/>
//                 )}
//                 </div>
//             </div>
//             <div className={styles.input} >
//                 <label className={styles.label}>
//                   Confirmar contraseña
//                 </label>
//                 <input 
//                 type='password'
//                 name='confirmPassword'
//                 id= 'confirmPassword'
//                 value={confirmPassword}
//                 onChange={handleChangeConfirmPassword}
                
//                 />
//             </div>
        
//         <div>{error !== '' ? <p className={styles.error}>{error}</p> : null }
//         </div>


//         <button className={styles.buttonCreateAccount} 
//         type='submit'
//         onClick={handleSubmit}
//         >
//           Crear cuenta
//         </button>
//         <div className={styles.otherOptions}>
//           <p className={styles.labelAlready}>
//             ¿Ya tienes una cuenta?
//           </p>
//           <div>
//             <Link to='/Login'>
//               <p className={styles.buttonLogin}>
//                 Iniciar sesión
//               </p>
//             </Link>
//           </div>
//         </div>
//       </form>
//       {created ? <navigate to='/Login' /> : null}
//       </div>
//       <FooterHome/>
//     </div>
//   );

// }

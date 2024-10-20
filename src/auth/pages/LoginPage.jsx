import { useEffect } from 'react';
import { useForm, useAuthStore } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const signUpFormFields = {
    signUpName: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpPassword2: '',
}

export const LoginPage = () => {

    const { startLogin, startSignUp, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    const { signUpName, signUpEmail, signUpPassword, signUpPassword2, onInputChange: onSignUpInputChange } = useForm(signUpFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword});
    }

    const signUpSubmit = (event) => {
        event.preventDefault();

        if(signUpPassword !== signUpPassword2) {
            return Swal.fire('Sign up error', 'Passwords do not match', 'error');
        }
        
        startSignUp({ name: signUpName, email: signUpEmail, password: signUpPassword})
    }

    useEffect(() => {
      if(errorMessage !== undefined) {
        Swal.fire('Authentication error', errorMessage, 'error');
      }
    
    }, [errorMessage])
    

    return (
        <div className='container login-container'>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className='form-group mb-2'>
                            <input 
                                type='text'
                                className='form-control'
                                placeholder='Correo'
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input 
                                type='submit'
                                className='btnSubmit w-100'
                                value='Login' 
                            />
                        </div>
                    </form>
                </div>

                <div className='col-md-6 login-form-2'>
                    <h3>Registro</h3>
                    <form onSubmit={signUpSubmit}>
                        <div className='form-group mb-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Nombre'
                                name='signUpName'
                                value={signUpName}
                                onChange={onSignUpInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Correo'
                                name='signUpEmail'
                                value={signUpEmail}
                                onChange={onSignUpInputChange}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña' 
                                name='signUpPassword'
                                value={signUpPassword}
                                onChange={onSignUpInputChange}
                            />
                        </div>

                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Repita la contraseña' 
                                name='signUpPassword2'
                                value={signUpPassword2}
                                onChange={onSignUpInputChange}
                            />
                        </div>

                        <div className='form-group mb-2'>
                            <input 
                                type='submit' 
                                className='btnSubmit w-100' 
                                value='Crear cuenta' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
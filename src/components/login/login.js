import React from 'react'
import { useForm } from "react-hook-form";
import firebaseApp from '../../helper/index';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";




export default function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    let navigate = useNavigate();
    const auth = getAuth();

    const loginForm = (data) => {
        let email = data.email;
        let password = data.password;
        console.log(data)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            }).then(() => {
                navigate('/home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    }

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                navigate('/home')
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }

    return (
        <div className="w-50 position-absolute top-50 start-50 translate-middle">
            <form  id="loginForm" onSubmit={handleSubmit(loginForm)}>
                <div className="mb-3">
                    <label htmlFor='email' className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" {...register("email")} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" {...register("password")} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary mb-4">Login</button>

            </form><button type="submit" className="btn btn-warning" onClick={loginWithGoogle}>Google</button>
        </div>

    )

}

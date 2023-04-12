import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignupPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        if (password1 !== password2) {
            setError('Error: Passwords do not match')
            return
        }
        await createUserWithEmailAndPassword(auth, email, password1)
            .then((userCredential) => {
                // created successfully
                const user = userCredential.user;
                console.log('CREATED ACCOUNT SUCCESSFULLY - your user is: ', user);
                navigate("/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });


    }
    return (
        <div>
            <h1> Signup Page </h1>
            <form>
                <div>
                    <label htmlFor="email-address">
                        Email address
                    </label>
                    <input
                        type="email"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email address"
                    />
                </div>

                <div>
                    <label htmlFor="password1">
                        Password
                    </label>
                    <input
                        type="password"
                        label="Create password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </div>
                <div>
                    <label htmlFor="password2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        label="Confirm password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                        placeholder="Confirm Password"
                    />
                </div>

                {error && <p>{error}</p>}
                <button
                    type="submit"
                    onClick={onSubmit}
                >
                    Sign up
                </button>

            </form>

            <p>
                Already have an account?{' '}
                <NavLink to="/login" >
                    Sign in
                </NavLink>
            </p>
        </div>
    )
}

export default SignupPage;
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import app from '../../Firebase/firebase.config';
import { AuthContext } from '../../../Provider/AuthProvider';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState('');

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // navigate after login
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        toast('Login successful!');

        // navigate after login
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
      });
  };

  return (
    <div className="text-center">
      <div>
        <h2 className="text-3xl my-10 text-center">Please Sign in</h2>
        <form onSubmit={handleLogin} className=" md:w-3/4 lg:w-1/2 mx-auto">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              required
              name="email"
              placeholder="Email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              className="input input-bordered"
            />

            {loginError && <p className="text-red-600 my-5">{loginError}</p>}

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-cyan-500 hover:bg-cyan-700 text-white">
              Sign in
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-cyan-500 hover:bg-cyan-700 text-white mt-7"
            >
              Or sign in with Google
            </button>
          </div>
        </form>

        <p className="text-center mt-4">
          Do not have an account?{' '}
          <Link
            className="text-cyan-500 hover:text-cyan-700 font-bold"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

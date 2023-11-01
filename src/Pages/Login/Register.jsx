import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [regError, setRegError] = useState('');
  const { createUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);

    const name = form.get('name');
    const photo = form.get('photo');
    const email = form.get('email');
    const password = form.get('password');
    console.log(name, photo, email, password);

    // reset error

    setRegError('');

    const pwRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!pwRegex.test(password)) {
      setRegError(
        'Password should contain at least 6 characters, a capital letter and a special character'
      );
      return;
    }
    // create user
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast('Registration successful!');
      })
      .catch((error) => {
        console.error(error);
        setRegError(error.message);
      });
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl my-10 text-center">Please Register</h2>
        <form onSubmit={handleRegister} className=" md:w-3/4 lg:w-1/2 mx-auto">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              required
              name="name"
              placeholder="Name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              required
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered"
            />
          </div>
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
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          {regError && <p className="text-red-600">{regError}</p>}
          <div className="form-control mt-6">
            <button className="btn bg-cyan-500 hover:bg-cyan-700 text-white">
              Register
            </button>
          </div>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link
            className="text-cyan-500 hover:text-cyan-700 font-bold"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

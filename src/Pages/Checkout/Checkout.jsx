import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const Checkout = () => {
  const services = useLoaderData();
  const { _id, title, price, img } = services;
  const { user } = useContext(AuthContext);

  const handleBookService = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      customerName: name,
      date,
      email,
      service: title,
      service_id: _id,
      phone: phone,
      img,
      price,
    };

    console.log(booking);

    // send data to server
    fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: 'Added successfully!',
            text: 'Do you want to continue?',
            icon: 'success',
            confirmButtonText: 'Sure!',
          });
        }
      });
  };
  return (
    <div className="bg-cyan-50 p-24">
      <h2 className="text-3xl font-extrabold text-center mb-7">
        Book Service: {title}
      </h2>
      <form onSubmit={handleBookService}>
        {/* form names row */}
        <div className="md:flex mb-8">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="name"
                defaultValue={user?.name}
                placeholder="Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <label className="input-group">
              <input
                type="date"
                name="date"
                placeholder="Brand Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* form type and price row */}
        <div className="md:flex mb-8">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="email"
                defaultValue={user?.email}
                placeholder="Email"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <input
          type="submit"
          value="Confirm Order"
          className="btn btn-block text-white bg-cyan-500 hover:bg-cyan-700 "
        />
      </form>
    </div>
  );
};

export default Checkout;

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import BookingsRow from './BookingsRow.jsx';

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [url]);

  const handleDelete = (id) => {
    const proceed = confirm('Are you sure you want to delete this booking');
    if (proceed) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert('Deleted successfully');
            const remaining = bookings.filter((booking) => booking._id !== id);
            setBookings(remaining);
          }
        });
    }
  };

  const handleBookingConfirm = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ status: 'confirm' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = bookings.filter((booking) => booking._id !== id);
          const updated = bookings.find((booking) => booking._id === id);
          updated.status = 'confirmed';
          const newBookings = [updated, ...remaining];
          setBookings(newBookings);
        }
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Email</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingsRow
                key={booking._id}
                booking={booking}
                handleDelete={handleDelete}
                handleBookingConfirm={handleBookingConfirm}
              ></BookingsRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;

/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const { _id, price, title, img } = service || {};
  return (
    <div>
      <div className="card w-80 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={img} alt="Service" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>Price: ${price}</p>
          <div className="card-actions">
            <Link to={`/checkout/${_id}`} state={title}>
              <button className="btn btn-primary">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

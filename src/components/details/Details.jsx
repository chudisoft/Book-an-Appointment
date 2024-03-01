import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { getMotorcycles } from '../../redux/motorcycleSlice';
import './Details.css';

const Details = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const motorcycles = useSelector((state) => state.motorcycle.motorcycles);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (motorcycles.length === 0) {
      dispatch(getMotorcycles(currentUser.token));
    }
  }, [currentUser, dispatch, motorcycles]);

  const { pathname } = location;
  const motorcycleId = pathname.split('/details/')[1];

  const motorcycle = motorcycles.find((m) => m.id.toString() === motorcycleId);

  useEffect(() => {}, [motorcycle]);

  const handleReservationClick = () => {};

  return (
    <>
      <div className="side-container details-container">
        <h2>Motorcycle Details</h2>
        <div className="details-div">
          {motorcycle && (
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <td>Motorcycle Name</td>
                  <td>{motorcycle.make}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{motorcycle.description}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{motorcycle.color}</td>
                </tr>
                <tr>
                  <td>License Plate</td>
                  <td>{motorcycle.license_plate}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{motorcycle.price}</td>
                </tr>
              </tbody>
            </table>
          )}
          {motorcycle && (
            <Link
              to="/reserve"
              state={{ motorcycleId: motorcycle.id }}
              className="reservation-button"
            >
              Make Reservation
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;

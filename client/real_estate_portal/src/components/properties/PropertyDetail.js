// PropertyDetail.js

import React from 'react';

const apiHost = process.env.REACT_APP_API_HOST;

const PropertyDetail = ({ object, investors, amenity }) => {
  return (
    <main className="container mt-4">
      <div className="container-fluid">
        <div className="mb-3">
          <a className="text-decoration-none" href="/properties">
            <strong className="text-dark">&larr;</strong> <strong className="text-dark">Back to all properties</strong>
          </a>
        </div>
        <div className="row">
          <div className="col-md-9 mb-3">
            <div id="propertyCarousel" className="carousel carousel-dark slide property-carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#propertyCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#propertyCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#propertyCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <img src={`${apiHost}/${object.property_image}`} className="d-block w-100" alt="..." style={{ height: '500px' }} />
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <img src={`${apiHost}/${object.property_image}`} className="d-block w-100" alt="..." style={{ height: '500px' }} />
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>
                <div className="carousel-item">
                  <img src={`${apiHost}/${object.property_image}`} className="d-block w-100" alt="..." style={{ height: '500px' }} />
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-3 mr-1">
            <img src={`${apiHost}/${object.property_image}`} className="d-block w-100 mb-3" alt="..." style={{ height: '155px' }} />
            <img src={`${apiHost}/${object.property_image}`} className="d-block w-100 mb-3" alt="..." style={{ height: '155px' }} />
            <img src={`${apiHost}/${object.property_image}`} className="d-block w-100" alt="..." style={{ height: '155px' }} />
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <div className="d-flex">
          <h3>{object.name}</h3>
          <p className="badge bg-secondary text-light rounded-0 mx-5">{object.category_name}</p>
        </div>
        <p className="pt-0">
          <span className="mx-0">BED: {object.bed || 0}</span>
          <span className="mx-2">BATH: {object.bath || 0}</span>
          <span className="mx-2">SQ FT: {object.squareFeet || 0}</span>
          <span className="mx-2">YEAR BUILT: {object.buildYear || 'N/A'}</span>
        </p>
        <div className="row mt-5">
          <div className="col-md-6">
            <span className="underline">Investors</span>
            <p>{investors || 0}</p>

            <span className="underline">Property Leverage</span>
            <p>0%</p>
          </div>

          <div className="col-md-6">
            <span className="underline">Purchase Price</span>
            <p>${object.purchasePrice || 0}</p>

            <span className="underline">Monthly Rent</span>
            <p>${object.projectedRent || 0}</p>
          </div>
        </div>
        <div className="container-fluid description mt-5">
          <p style={{ textAlign: 'justify' }}>{object.longDescription}</p>
        </div>
        <div className="container-fluid amenities mt-3">
          {amenity && (
            <>
              <h5>Amenities</h5>
              <ul>
                <li>{amenity || 0}</li>
              </ul>
            </>
          )}
        </div>
        <strong>{object.address1}</strong>
      </div>
    </main>
  );
}

export default PropertyDetail;

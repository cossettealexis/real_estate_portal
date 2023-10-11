import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const PropertyDetail = ({ object, investors, amenity }) => {
  const [index, setIndex] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    // Update the highlighted index when the index changes
    setHighlightedIndex(index);
  }, [index]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {object.image.map((image, idx) => (
                <Carousel.Item key={idx}>
                  <img src={image.picture} className="d-block w-100" alt={`Slide ${idx + 1}`} style={{ height: '500px' }} />
                  <Carousel.Caption>
                    <h3>{`Slide ${idx + 1} label`}</h3>
                    <p>{`Caption for slide ${idx + 1}`}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="col-md-3">
            <div className="d-flex flex-column">
              {object.image.map((image, idx) => (
                <img
                  key={idx}
                  src={image.picture}
                  className={`d-block w-100 mb-3 ${highlightedIndex === idx ? 'border border-primary' : ''}`}
                  alt={`Slide ${idx + 1}`}
                  style={{ height: '155px' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <div className="d-flex">
          <h3 style={{ fontSize: '1.5rem', lineHeight: '2.5rem', fontWeight: '700' }}>{object.name}</h3>
          <p className="badge bg-secondary text-light rounded-0 mx-5">{object.type.category_name}</p>
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
};

export default PropertyDetail;

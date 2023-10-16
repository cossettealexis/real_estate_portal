import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import '../../styles/PropertyDetail.css';


const PropertyDetail = ({ object, investors, amenity }) => {
  const [index, setIndex] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  console.log(object)

  useEffect(() => {
    // Update the highlighted index when the index changes
    setHighlightedIndex(index);
  }, [index]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <main className="container" style={
        {
          padding: '0 5% 0 5%'
        }
      }>
      <div className="row">
        <div className='col-md-12'>
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
        <div className="col-md-8">
          <div className="d-flex">
            <h3 style={{ fontSize: '1.5rem', lineHeight: '2.5rem', fontWeight: '700' }}>{object.name}</h3>
            <p className="badge bg-secondary text-light rounded-0 mx-5">{object.type.category_name}</p>
          </div>
          <p className="pt-0">
            <span className="mx-0"><small>BED: {object.bed || 0}</small></span>
            <span className="mx-2"><small>BATH: {object.bath || 0}</small></span>
            <span className="mx-2"><small>SQ FT: {object.squareFeet || 0}</small></span>
            <span className="mx-2"><small>YEAR BUILT: {object.buildYear || 'N/A'}</small></span>
          </p>
          <div className="row mt-5">
              <div className="col-md-3">
                <span className="underline text-secondary">Investors</span>
                <p>{investors || 0}</p>
              </div>
              <div className='col-md-3'>
                <span className="underline text-secondary">Property Leverage</span>
                <p>0%</p>
              </div>
              <div className='col-md-3'>
                <span className="underline text-secondary">Purchase Price</span>
                <p>${object.purchasePrice || 0}</p>
              </div>
              <div className='col-md-3'>
                <span className="underline text-secondary">Monthly Rent</span>
                <p>${object.projectedRent || 0}</p>
              </div>
              <div>           
            </div>
          </div>
          <div className="description my-5">
            <p style={{ textAlign: 'justify' }}>{object.longDescription}</p>
          </div>
          {/* <div className="container-fluid amenities my-3">
            {object.amenities && object.amenities.length > 0 && (
              <>
                <h5>Amenities</h5>
                <ul>
                  {object.amenities.map(amenity => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
              </>
            )}
          </div> */}
          <strong>Address: {object.address1}</strong>
        </div>
        <div className='col-md-4 mt-1'>
          <Card style={{ width: '24rem',  borderRadius: '0', borderBottom: 'solid 15px gray' }}>
            <ListGroup variant="flush">
              <ListGroup.Item className='p-3'>
                <strong className='text-secondary' style={{}}>
                  <strong style={{ fontSize: '1.5rem', fontWeight: 900 }}>$361,540</strong>
                  <small> INVESTED</small>
                  </strong>
                  <Button className='my-3 p-2' variant="secondary" style={{ width: '100%', height: '100%' }}>
                    <strong>
                      Funding Completed
                    </strong>
                  </Button>
              </ListGroup.Item>
              <ListGroup.Item className='p-3'>
                <div className='row'>
                  <div className='col-sm-6'>
                    <h6>962 INVESTORS</h6>
                  </div>
                  <div className='col-sm-6'>
                    <h6>100% FUNDED</h6>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
        </Card>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetail;

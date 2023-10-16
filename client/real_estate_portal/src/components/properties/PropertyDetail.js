import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { BsBook } from 'react-icons/bs';
import '../../styles/PropertyDetail.css';


const PropertyDetail = ({ object, investors, amenity }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [index, setIndex] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  console.log(object)

  useEffect(() => {
    // Update the highlighted index when the index changes
    setHighlightedIndex(index);
  }, [index]);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

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
        <div className="col-md-8 mt-3">
          <div className="">
            <strong style={{ fontSize: '1.5rem' }}>{object.name}</strong>
            <small className="badge bg-secondary text-light rounded-0 mx-5">{object.type.category_name}</small>
            <br/>
            <span className="mx-0"><small>BED: {object.bed || 0}</small></span>
            <span className="mx-2"><small>BATH: {object.bath || 0}</small></span>
            <span className="mx-2"><small>SQ FT: {object.squareFeet || 0}</small></span>
            <span className="mx-2"><small>YEAR BUILT: {object.buildYear || 'N/A'}</small></span>
          </div>
          <div className="row mt-5">
              <div className="col-md-3">
                <span className="underline text-secondary">Investors</span>
                <br/>
                <strong>{investors || 0}</strong>
              </div>
              <div className='col-md-3'>
                <span className="underline text-secondary">Property Leverage</span>
                <br/>
                <strong>0%</strong>
              </div>
              <div className='col-md-3'>
                <span className="underline text-secondary">Purchase Price</span>
                <br/>
                <strong>${object.purchasePrice || 0}</strong>
              </div>
              <div className='col-md-3'>
                <span className="underline text-secondary">Monthly Rent</span>
                <br/>
                <strong>${object.projectedRent || 0}</strong>
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

          <div style={{ backgroundColor: '#f5f5f5' }} className="tenant-process text-dark p-3 mt-5" onClick={toggleInstructions}>
            <div className="text-dark p-3 align-items-center">
              <BsBook className="mr-2 pr-2"/>
              <strong className='pl-2 ml-2' style={{ fontSize: '1.2rem' }}> Tenant Leasing Process</strong>
              {showInstructions && (
              <p className="instructions my-2 pt-1 text-dark" style={{ fontSize: '1rem'}}>
                  Preparing a home for the rental market is a multi-tiered process that begins as soon as the property is acquired. Our experienced investment team works closely with the local property managers to get it show-ready, determine optimal market rent, take high-quality photos and videos, market the rental through various online and offline channels, screen and thoroughly vet tenant applications, and finalize the lease terms. Below you can find more information regarding the current rental status, the expected timeline, and the rental income.
              </p>
            )}
            </div>
          </div>

          <div className='row py-5'>
              <div className='col-md-6'>
                <span className="underline text-secondary">Rental Status</span>
                <br/>
                <strong>Approved application</strong>
              </div>
              <div className='col-md-6'>
                <span className="underline text-secondary">Anticipated First Dividend Date</span>
                <br/>
                <strong>September 2024</strong>
              </div>
          </div>

          <div>
            <span className='text-secondary'>
              Timeline to Rent
            </span>
            <br/>
            <span>
              The time needed to sign the first tenant lease is variable and can depend on several factors including seasonality and whether the property requires any sort of renovation. Historically the average time to lease has been 45 days and has ranged from a minimum of 7 days to over 90 days.
            </span>
          </div>

          <div style={{ backgroundColor: '#f5f5f5' }} className="text-dark p-4 mt-5">
            <strong className='pl-2 ml-2' style={{ fontSize: '1.2rem' }}>
              Investment Strategy Hypothetical Returns
            </strong>
          </div>
        </div>
        <div className='col-md-4 mt-3'>
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

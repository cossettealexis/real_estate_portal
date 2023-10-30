import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { BsBook, BsInfoCircle } from 'react-icons/bs';
import '../../styles/PropertyDetail.css';


const PropertyDetail = ({ object, investors, amenity }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showPropertyAverages, setShowPropertyAverages] = useState(false);
  const [showMarketInfo, setShowMarketInfo] = useState(false);
  const [showOfferingDetails, setshowOfferingDetails] = useState(false);
  const [images, setImages] = useState([...object.image]);
  
  const [index, setIndex] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    // Update the highlighted index when the index changes
    setHighlightedIndex(index);
  }, [index]);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const togglePropertyAverages = () => {
    setShowPropertyAverages(!showPropertyAverages);
  };

  const toggleMarketInfo = () => {
    setShowMarketInfo(!showMarketInfo);
  };

  const toggleOfferingDetails = () => {
    setshowOfferingDetails(!showOfferingDetails);
  };

  const handleSelect = (selectedIndex, e, direction) => {
    setIndex(selectedIndex);
    const newImages = rotateImages(direction);
    setImages(newImages);
  };

  const rotateImages = (direction) => {
    if (direction === 'next') {
      // Move the first image to the end of the array
      const rotatedImages = [...images];
      const firstImage = rotatedImages.shift();
      rotatedImages.push(firstImage);
      return rotatedImages;
    } else if (direction === 'prev') {
      // Move the last image to the beginning of the array
      const rotatedImages = [...images];
      const lastImage = rotatedImages.pop();
      rotatedImages.unshift(lastImage);
      return rotatedImages;
    }
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
                    <img src={image.picture} className="d-block w-100" alt={`Slide ${idx + 1}`} style={{ height: '680px' }} />
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
                    className='d-block w-100 mb-3'
                    // className={`d-block w-100 mb-3 ${highlightedIndex === idx ? '10px border solid black' : ''}`}
                    alt={`Slide ${idx + 1}`}
                    style={{ border: highlightedIndex === idx ? '2px solid black' : 'none', height: '155px' }}

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
                <strong>{ object.investors || 0}</strong>
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
                <strong>{object.rentalStatus}</strong>
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

          <div className="table-container mt-3">
            <Table className="custom-table">
              <tbody>
                <tr>

                  <td className="column-1 mx-5">
                      <strong className='pl-2 ml-2' style={{ fontSize: '1rem' }}>
                        {object.type.category_name}
                      </strong>
                  </td>

                  <td className='column-2 mx-5'>

                  </td>

                  <td className="column-3 mx-5">
                    <ol>
                      <small>
                        Investing with Arrived can generate returns in 2 ways:
                      </small>
                      <br/><br/>
                      <li>
                        <small>
                          <strong>Annual cash flow </strong>
                          from the rental income on each property. The property intends to pay out excess cash to investors quarterly.
                        </small>
                      </li>
                      <li>
                        <small>
                          <strong>Annual appreciation returns </strong> 
                          from any changes in property value. Any appreciation returns net of disposition costs will be paid out upon the sale of the property.
                        </small>
                      </li>
                    </ol>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3" className="underline">
                    <div col className='underline'></div>
                  </td>
                </tr>

                <tr>
                  <td className="column-1">
                      <strong className='pl-2 ml-2' style={{ fontSize: '0.9rem' }}>
                        Anticipated Annual Cash Flow
                      </strong>
                  </td>

                  <td className='column-2'>

                  </td>

                  <td className='column-3'>

                  </td>
                </tr>

                <tr>
                  <td className='column-1'>
                    
                  </td>

                  <td className='column-25'>
                    <span>
                    <strong>$25,140</strong>
                    </span>
                  </td>

                  <td className='column-3'>
                    <span className="underline text-dark">
                      Annual Rent -
                      <span>
                        <small>7.0% Gross Yield</small>
                      </span>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className='column-1'>
                    -
                  </td>

                  <td className='column-25'>
                    <span>
                      <strong>$25,140</strong>
                    </span>
                  </td>

                  <td className='column-3'>
                    <span className="underline text-dark">
                      Operating, Financing, Legal, Asset Management Fee Expenses
                    </span>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3">
                    <div col style={{ borderBottom: '1px solid #464444' }}></div>
                  </td>
                </tr>

                <tr>
                  <td className='column-1'>
                    
                  </td>

                  <td className='column-25'>
                    <span>
                    <strong>$25,140</strong>
                    </span>
                  </td>

                  <td className='column-3'>
                    <span className="underline text-dark">
                      Cash Flow
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className='column-1'>
                  ÷
                  </td>

                  <td className='column-25'>
                    <span>
                      <strong>$25,140</strong>
                    </span>
                  </td>

                  <td className='column-3'>
                    <span className="underline text-dark">
                      Raise Amount
                    </span>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3">
                    <div col style={{ borderBottom: '3px solid #464444' }}></div>
                  </td>
                </tr>

                <tr>
                  <td className='column-1'>
                  </td>

                  <td className='column-2'>
                    <span>
                      <strong>$25,140</strong>
                    </span>
                  </td>

                  <td className='column-3'>
                    <span className="underline text-dark">
                        <strong>
                          Anticipated Annual Cash Flow
                        </strong>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3" className="underline">
                    <div col className='underline'></div>
                  </td>
                </tr>

                <tr>
                  <td className="column-1 mx-5">
                        <strong className='pl-2 ml-2' style={{ fontSize: '1rem' }}>
                          Annual Appreciation
                        </strong>
                  </td>

                  <td className='column-25'>
                    
                  </td>

                  <td className='column-3'>
                   
                  </td>
                </tr>

                <tr>
                  <td className='column-1'>
                    <small>
                      Based on data from the Zillow Value Home Index (ZHVI) Single Family Homes Time Series, single-family homes have appreciated 4.5% per year on average for the last 20 years.
                    </small>
                  </td>

                  <td className='column-25'>
                    <small>
                    This data is based on a national average for Single-family homes in the 35th to 65th percentile range by home prices according to the Zillow Home Value Index. This is a national average and may not represent actual performance of this property's zipcode. In addition to property appreciation, equity returns also depend on real estate investment costs, hold period, and leverage. For more information, refer to the Offering Circular.
                    </small>
                  </td>

                  <td className='column-3'>
                    <small>
                    Use our returns calculator below to see how hypothetical property performance may impact your investment.
                    </small>
                  </td>
                </tr>

              </tbody>
            </Table>

            <div style={{ backgroundColor: '#f5f5f5' }} className="tenant-process text-dark p-3 mt-5" onClick={togglePropertyAverages}>
              <div className="text-dark p-3 align-items-center">
                <BsBook className="mr-2 pr-2"/>
                <strong className='pl-2 ml-2' style={{ fontSize: '1.2rem' }}> Property Averages</strong>
                {showPropertyAverages && (
                <p className="instructions my-2 pt-1 text-dark" style={{ fontSize: '1rem'}}>
                      The potential financial returns you can earn are often linked to the potential risk and volatility. Adding leverage or debt to properties can amplify the potential return in exchange for higher potential volatility.
                </p>
              )}
              </div>
            </div>

            <div className='p-4 m-4' style={{ backgroundColor: '#e0e9f4' }}>
              <strong className="your-title-style">
                Strategic Refinance Candidate
              </strong>
              <p>
              <BsInfoCircle style={{ marginRight: '5px' }} /> 
                This property may seek to add up to 70% in leverage through a strategic refinancing. Learn More.
              </p>
            </div>

            <div style={{ backgroundColor: '#f5f5f5' }} className="tenant-process text-dark p-3 mt-5" onClick={toggleMarketInfo}>
              <div className="text-dark p-3 align-items-center">
                <BsBook className="mr-2 pr-2"/>
                <strong className='pl-2 ml-2' style={{ fontSize: '1.2rem' }}> The Market</strong>
                {showMarketInfo && (
                <p className="instructions my-2 pt-1 text-dark" style={{ fontSize: '1rem'}}>
                  Real estate values and returns are highly dependent on location. In general, properties in more affordable markets will have higher cash flow (potential dividends), and properties in more expensive markets will have higher appreciation. Arrived strives to give investors options to choose how much they invest in appreciation markets, cash flow markets, or balanced markets.
                  <br/>
                  <br/>
                  The economy of the local city and market will dictate the potential returns of an investment. In general, some markets see high appreciation of home values, some have higher cash flow (dividends), and some have a mix of the two.                
                  </p>
              )}
              </div>
            </div>

            <div style={{ backgroundColor: '#f5f5f5' }} className="tenant-process text-dark p-3 mt-5" onClick={toggleOfferingDetails}>
              <div className="text-dark p-3 align-items-center">
                <BsBook className="mr-2 pr-2"/>
                <strong className='pl-2 ml-2' style={{ fontSize: '1.2rem' }}> Offering Details</strong>
                {showOfferingDetails && (
                <p className="instructions my-2 pt-1 text-dark" style={{ fontSize: '1rem'}}>
                  The Offering Details provide a breakdown of the financials for a specific property offering. The Offering Details show the operating plan for the property, including how the Raise Amount proceeds will be used. For transparency, we also like to share a breakdown of the Arrived fees. And if you're interested in more information, we also link to other resource documents that go into more depth around each offering.                  
                </p>
              )}
              </div>
            </div>

            <div className='mt-5'>
              <Table className="finance-details table-borderless">
                <tbody>
                  <tr className='finance-details'>
                    <td>Property Purchase Price</td>
                    <td>${object.purchasePrice || 0}</td>
                  </tr>
                  <tr className='finance-details'>
                    <td>Property Improvements & Cash Reserves</td>
                    <td>$24,450</td>
                  </tr>
                  <tr className='finance-details'>
                    <td>Closing Costs, Offering Costs & Holding Costs</td>
                    <td>$22,823</td>
                  </tr>
                  <tr className='finance-details'>
                    <td>Arrived Sourcing Fee (One-time)</td>
                    <td>$10,500</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div className='mt-5' style={{ backgroundColor: '#e6f7ff', padding: '10px', textAlign: 'center' }}>
              <span>
                <strong className="your-title-style">Total Property Amount</strong>
              </span>
              <br/>
              <span>$357,773</span>
            </div>

            <div className='mt-5 p-3 text-center' style={{ backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', padding: '10px' }}>
              <div style={{ flex: 1 }}>
                <span><strong className="">Property Loan Amount</strong></span>
                <br/>
                <span>$0</span>
                <div className='row'>
                  <div className='col-sm-6'>
                    <small>Financing: 0%</small>
                  </div>
                  <div className='col-sm-6'>
                    <small>Interest Rate: 0%</small>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, borderLeft: '1px solid #999', paddingLeft: '20px' }}>
                <strong className="">Equity Raised from Investors</strong>
                <p>$357,780</p>
              </div>
            </div>

            <div className='mt-5'>
              <Table className="finance-details table-borderless">
                <tbody>
                  <tr className='finance-details'>
                    <td>IPO Price Per Share</td>
                    <td>$300,000</td>
                  </tr>
                  <tr className='finance-details'>
                    <td>Total Shares</td>
                    <td>$24,450</td>
                  </tr>
                  <tr className='finance-details'>
                    <td>Hold Period</td>
                    <td>{ object.buildYear} years</td>
                  </tr>
                  <tr className='finance-details'>
                    <td>Arrived Asset Management Fee</td>
                    <td>$10,500</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div>

            </div>

          </div>

        </div>
        <div className='col-md-4 mt-3'>
          <Card style={{ width: '24rem',  borderRadius: '0', borderBottom: 'solid 15px gray' }}>
            <ListGroup variant="flush">
              <ListGroup.Item className='p-3'>
                <strong className='text-secondary' style={{}}>
                  <strong style={{ fontSize: '1.5rem', fontWeight: 900 }}>${object.numberOfStocks}</strong>
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
                    <h6>{object.investors} INVESTORS</h6>
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

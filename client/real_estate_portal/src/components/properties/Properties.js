import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyDetail from './PropertyDetail';

function Properties() {
  const apiHost = process.env.REACT_APP_API_HOST;
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('*');
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetchProperties();
    fetchCategories();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${apiHost}/api/properties/`);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      setProperties(response.data.results);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiHost}/api/categories/`);
      if (response.status !== 200) {
        throw Error('Network response was not ok');
      }
      // Extract category names from the response objects
      const categoryNames = response.data.results.map((category) => category.category_name);
      setCategories(categoryNames);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterProperties = (category) => {
    setActiveCategory(category);
  };

  const showPropertyDetail = (property) => {
    setSelectedProperty(property);
  };

  return (
    <section className="" style={{ margin: '5%' }}>
      {selectedProperty ? (
        <PropertyDetail object={selectedProperty} />
      ) : (
        <div>
          <div className="row properties-info">
            <div className="col-md-6 properties-info-content text-left">
              <h1>All Properties</h1>
              <p>
                Over $104M in real estate funded across 282 properties... and counting! Our team selectively purchases the
                top 1% of properties we source, making each hand-picked property an inspired opportunity.
              </p>
            </div>
            <div className="col-md-6"></div>
          </div>
          <main className="mt-2">
            <nav className="navbar navbar-expand-sm">
              <div className="container-fluid">
                <div className="navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="category-filters">
                    <li
                      className={`nav-item properties-nav-item ${activeCategory === '*' ? 'filter-active' : ''}`}
                      onClick={() => filterProperties('*')}
                    >
                      All
                    </li>
                    {categories.map((category, index) => (
                      <li
                        key={index}
                        className={`nav-item properties-nav-item ${activeCategory === category ? 'filter-active' : ''}`}
                        onClick={() => filterProperties(category)}
                        style={{ marginLeft: '20px' }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                  <ul className="navbar-nav nav-flex-icons">
                    <li className="nav-item">
                      <button type="button" className="btn btn-light border border-light-subtle">
                        <i className="fas fa-filter"></i> Filters
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="container-fluid mt-5">
              <div className="row properties-container">
                {properties
                  .filter((property) =>
                    activeCategory === '*' ? true : property.type.category_name === activeCategory
                  )
                  .map((property, index) => (
                    <div className="col-lg-3 col-md-4 mb-4 property-item" key={index}>
                      <a className="card-link text-decoration-none" href="#">
                        <div
                          className="card border-0 bg-light h-100"
                          onClick={() => showPropertyDetail(property)}
                        >
                          <img src={apiHost + property.property_image} className="card-img-top" height="250" alt="" />
                          <div className="card-body">
                            <h5 className="text-decoration-none pointer-events-none">{property.name}</h5>
                            <p>{property.address1}</p>
                            <p>{property.type.category_name}</p>
                            <div className="row mt-3">
                              <div className="col-sm-6">
                                <small>87% Funded | { property.investors } Investors</small>
                              </div>
                              <div className="col-sm-6 d-flex justify-content-end">
                                <button href="#" type="button" className="btn btn-dark btn-sm">
                                  Invest now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </main>
        </div>
      )}
    </section>
  );
}

export default Properties;

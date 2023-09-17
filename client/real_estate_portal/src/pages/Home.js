import React from 'react';

function Home() {
  return (
    <section className="container home">
      <div className="row">
        <div className="col-md-6 home-info">
          <h1>Easily invest in rental homes and vacation rentals</h1>
          <br />
          <p>Maximize your wealth — unlock the benefits of real estate investing with rental income and appreciation.</p>
          <div className="row">
            <div className="col-md-6 mt-3">
              <form className="form-inline">
                <div className="form-group">
                  <input type="email" className="form-control" id="inputEmail" placeholder="Your email" />
                </div>
              </form>
            </div>
            <div className="col-md-6 my-3">
              <button type="submit" className="btn btn-dark">Get started</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {/* Gallery */}
          <div className="row home-gallery">
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Boat on Calm Water"
              />
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Wintry Mountain Landscape"
              />
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Mountains in the Clouds"
              />
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Boat on Calm Water"
              />
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Waves at Sea"
              />
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Yosemite National Park"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

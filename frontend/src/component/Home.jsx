import { useEffect, useState } from 'react'
import IMG1 from '../assets/images/Carousal/carousel1.jpg'
import IMG2 from '../assets/images/Carousal/carousel2.jpg'
import IMG3 from '../assets/images/Carousal/carousel3.jpg'
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
      })
  }, []);


  return (

    <>
      <div className="mt-5">
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-interval="2000" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={IMG1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={IMG2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={IMG3} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  )
}

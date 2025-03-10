import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import carusel1 from '../../public/climatizacion.jpg';
import carusel2 from '../../public/sopletes-SELLO-2-600x450.jpg';
import carusel3 from '../../public/refrigerantes-sello-2-600x450.jpg';

function Header() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect} className="backgroundCarousel items-center h-50 object-contain">
        <Carousel.Item className="justify-content-center align-items-center">
          <Image 
            src={carusel1} 
            className="d-block mx-auto" 
            alt="Evaporador de Aire" 
          />
          <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
            <h3 className="textCarousel">Evaporador de Aire</h3>
            <p className="textCarousel">Ideal para sistemas de refrigeración y climatización.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="justify-content-center align-items-center">
          <Image 
            src={carusel2} 
            className="d-block mx-auto" 
            alt="Termostato Digital" 
          />
          <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
            <h3 className="textCarousel">Termostato Digital</h3>
            <p className="textCarousel">Control preciso de la temperatura para eficiencia energética.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="justify-content-center align-items-center">
          <Image 
            src={carusel3} 
            className="d-block mx-auto" 
            alt="Ventilador de Enfriamiento" 
          />
          <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
            <h3 className="textCarousel">Ventilador de Enfriamiento</h3>
            <p className="textCarousel">Solución efectiva para mejorar la circulación de aire.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <style>
        {`
          .backgroundCarousel {
            background-color: #1d1f3d;
            height: 40vh;
            overflow: hidden;
            position: relative;
            padding: 50px 0;
            margin: 0 -50px;
            opacity: .8
          }
          .textCarousel {
            color: #fff;
          }
        `}
      </style>
    </>
  );
}

export default Header;

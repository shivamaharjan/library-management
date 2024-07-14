import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assests/images/img1.jpg';
import img2 from '../../assests/images/img2.jpg';
import img3 from '../../assests/images/img3.jpg';
import "./Carousels.css";

function Carousels() {
    return (
        <Carousel>
            <Carousel.Item>
                <img src={img1} alt="First Slide" className='w-100' />
                <Carousel.Caption className='caption-box text-black'>      
                    <h3>Albert Einstein</h3>
                    <p>The only thing you absolutely have to know is the location of the library.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={img2} alt="Second Slide" className='w-100' />
                <Carousel.Caption className='caption-box text-black'>
                    <h3>Charles William Eliot</h3>
                    <p>Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={img3} alt="Third Slide" className='w-100' />
                <Carousel.Caption className='caption-box text-black'>
                    <h3>J.K. Rowling</h3>
                    <p>
                    When in doubt, go to the library.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Carousels
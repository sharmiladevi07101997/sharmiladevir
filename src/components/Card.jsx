import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import '../scss/card.scss';
import '../scss/responsive.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ArrowButton = ({ className, style, onClick }) => (
    <div className={className} style={{ ...style, background: "black" }} onClick={onClick} />
);

const Card = ({ screen }) => {
    const [data, setData] = useState({ logo: '', features: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://krds-assignment.github.io/aoc/api-assets/data.json');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <ArrowButton />,
        prevArrow: <ArrowButton />,
    };

    const FeatureCard = ({ item, index }) => (
        <div className='cards-container'>
            <div className="cards">
                <img className="logo" src={item.logo} alt="Logo" />
                <p className="border">{item.title}</p>
                <p className="uppercase">{item.desc}</p>
            </div>
            <div className={`image-container image-container-${index + 1}`}>
                <img className="image" src={item.image} alt="Image" />
            </div>
        </div>
    );

    if (!data.features.length) return <p>Loading...</p>;

    return (
        <div className={`card-container ${screen}-container`}>
            {screen === 'large' ? (
                <>
                    {data.logo && (
                        <div className="main-logo">
                            <img src={data.logo} alt="Main Logo" />
                        </div>
                    )}
                    {data.features.map((item, index) => (
                        <div key={index} className={`flex-box color${index + 1}`}>
                            <FeatureCard item={item} index={index} />
                        </div>
                    ))}
                </>
            ) : (
                <div className="slider-container">
                    <Slider {...settings}>
                        {data.features.map((item, index) => (
                            <div key={index} className="card">
                                <div className={`flex-box color${index + 1}`}>
                                    {index === 0 && data.logo && (
                                        <div className="main-logo">
                                            <img src={data.logo} alt="Main Logo" />
                                        </div>
                                    )}
                                    <FeatureCard item={item} index={index} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default Card;

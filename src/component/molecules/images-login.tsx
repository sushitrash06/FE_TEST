import React, { useState, useEffect } from 'react';

const FullScreenSlideshow: React.FC = () => {
    const images = [
        'https://www.jasamarga.com/static/media/jm-default1.7612af47.jpg',
        'https://api-webkorporat.jasamarga.com/uploads/page/1673356939324/SS%20Tanjung%20Mulia.jpg',
        'https://api-webkorporat.jasamarga.com/uploads/gallery-jaringan-jalan-tol/1638207773740/Jalan%20Tol%20Cipularang.JPG',
        'https://api-webkorporat.jasamarga.com/uploads/gallery-jaringan-jalan-tol/1638207862272/Jalan%20Tol%20Bali%20Mandara.JPG',
        'https://api-webkorporat.jasamarga.com/uploads/gallery-jaringan-jalan-tol/1638207750399/Jagorawi.JPG',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
                setIsTransitioning(false);
            }, 200);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className=" md:w-screen h-screen overflow-hidden relative">
            <img
                src={images[currentImageIndex]}
                alt="Slideshow"
                className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${
                    isTransitioning ? 'opacity-100' : 'opacity-100'
                }`}
            />
            <div
                className={`w-full h-full absolute top-0 left-0 bg-white transition-opacity duration-500 ease-in-out ${
                    isTransitioning ? 'opacity-20' : 'opacity-0'
                }`}
            />
        </div>
    );
};

export default FullScreenSlideshow;

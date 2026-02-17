import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import Modules from '../sections/Modules';
import Services from '../sections/Services';
import About from '../sections/About';
// import Testimonials from '../sections/Testimonials';
import SocialMedia from '../sections/SocialMedia';
import Contact from '../sections/Contact';

export default function Home() {
    const location = useLocation();

    useEffect(() => {
        // Handle hash scrolling when navigating to home with a hash
        if (location.hash) {
            setTimeout(() => {
                const element = document.querySelector(location.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <>
            <Hero />
            <Modules />
            <SocialMedia />
            <Services />
            <About />
            {/*   <Testimonials /> */}
            <Contact />
        </>
    );
}

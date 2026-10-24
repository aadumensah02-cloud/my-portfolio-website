import "../styles/Hero.css";
import Carousel from "./Carousel";
import { profileMedia } from "../data/profile";

const Hero: React.FC = () => {
    return (
        <section id="#home" className="dark">
            <div className="container hero-grid">
                <div className="hero-text">
                    <div className="hero-span">
                    <span>Portfolio</span>
                    </div>
                    
                    <h1 className="hero-name">Ama Adu-Mensah</h1>
                    <p className="hero-description">Building solutions to bridge the gap between innovation and technology </p>
                    <p>
                        I'm a budding React devloper with a growing passion for building clean, responsive
                        user-friendly experiemces. I enjoy tackling layout challenges, wiring up componenets, and
                        experimenting with styling to make designs come alive.
                    </p>
                    <button 
                    className="btn"
                    aria-label="profile-button"
                    role="button">
                        Get to know me
                    </button> 
                </div>

                <Carousel
                    items={profileMedia}
                    label="Photos and video of Ama"
                    className="profile-carousel"
                    interval={5000}
                />
            </div>
        </section>
    )
}

export default Hero;
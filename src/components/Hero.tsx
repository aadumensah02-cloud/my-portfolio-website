import "../styles/Hero.css";

const Hero: React.FC = () => {
    return (
        <section id="#home" className="hero">
            <div className="hero-text">
                <span className="hero-span">Portfolio</span>
                <h1>Ama Adu-Mensah</h1>
                <p>Building systems and solutions to bridge the gap between innovation and technology </p>
                <p>
                    I'm a budding React devloper with a growing passion for building clean, responsive
                    user-friendly experiemces. I enjoy tackling layout challenges, wiring up componenets, and
                    experimenting with styling to make designs come alive. My curiosity drives me to learn 
                    step-by-step, and I thrive when I can see my progress refkected in a working UI.
                </p>
                <button 
                className="hero-button"
                aria-label="profile-button"
                role="button">
                    Get to know me
                </button> 
            </div>

            <div className="hero-img">
              <img src="" alt="" />
            </div>
        </section>
    )
}

export default Hero;
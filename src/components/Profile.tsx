import "../styles/Profile.css";

const details = [
    { label: "Location", value: "Kumasi, Ghana" },
    { label: "Education", value: "B.Sc. Electrical Engineering (in progress)" },
    { label: "Focus areas", value: "Frontend development, React" },
    { label: "Languages", value: "English, Twi" },
    { label: "Availability", value: "Open to internships" },
];

const Profile: React.FC = () => {
    return (
        <section id="#Profile" className="light">
            <div className="container profile-grid">
                <div className="profile-left">
                    <h2 className="profile-h2">Profile</h2>
                    <p>A short introduction to who I am and how I work</p>
                    <p>I'm a computer science student passionate about web development,
                        STEM Outreach, and problem-solving. My focus is on building 
                        responsive dashboards and clean user interfaces with React, CSS, and TypeScript.
                    </p>
                    <p>Outside of formsl roles, I enjoy mentoring peers and young girls in my community. I also like
                        exploring other languages like Python, Java, etc. I also like finding creative ways to make technical
                        concepts clear and accessible.
                    </p>
               </div>

                <dl className="profile-details">
                    {details.map((item) => (
                        <div className="profile-row" key={item.label}>
                            <dt>{item.label}</dt>
                            <dd>{item.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>

    )
}

export default Profile;
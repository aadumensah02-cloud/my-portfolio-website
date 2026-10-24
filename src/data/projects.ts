export type MediaItem =
    | { type: "image"; src: string; alt: string }
    | { type: "video"; src: string; poster: string; label: string };

export interface Project {
    title: string;
    description: string;
    tags: string[];
    media: MediaItem[];
    liveUrl?: string;
    repoUrl?: string;
}

export const projects: Project[] = [
    {
        title: "Uber Landing Page",
        description: "Responsive clone built with React and TypeScript.",
        tags: ["React", "TypeScript", "CSS"],
        media: [
            {
                type: "image",
                src: "/projects/uber/cover.webp",
                alt: "Uber landing page hero section",
            },
            {
                type: "image",
                src: "/projects/uber/modal.webp",
                alt: "Sign in modal on a phone screen",
            },
            {
                type: "video",
                src: "/projects/uber/demo.mp4",
                poster: "/projects/uber/demo-poster.webp",
                label: "Screen recording of the navbar and modals",
            },
        ],
        liveUrl: "https://your-site.netlify.app",
        repoUrl: "https://github.com/your-username/uber-landing-page-react",
    },
];
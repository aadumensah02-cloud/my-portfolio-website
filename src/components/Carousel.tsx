import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "../data/projects";
import MediaItemView from "./MediaItemView";
import "../styles/Carousel.css";

interface CarouselProps {
    items: MediaItem[];
    label: string;
    className?: string;
    autoPlay?: boolean;
    interval?: number; // milliseconds per slide
}

const Carousel: React.FC<CarouselProps> = ({
    items,
    label,
    className = "",
    autoPlay = true,
    interval = 5000,
}) => {
    const count = items.length;

    const [index, setIndex] = useState(0);
    const [userPaused, setUserPaused] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [focused, setFocused] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [inView, setInView] = useState(true);
    const [reducedMotion] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const rootRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number | null>(null);

    // Autoplay is allowed at all?
    const canAutoPlay = autoPlay && count > 1 && !reducedMotion;
    // Autoplay is on (the visitor hasn't pressed pause)?
    const running = canAutoPlay && !userPaused;
    // Is the timer actually ticking right now?
    const ticking = running && !hovering && !focused && !videoPlaying && inView;

    const goTo = (i: number) => setIndex(((i % count) + count) % count);
    const prev = () => goTo(index - 1);
    const next = () => goTo(index + 1);

    // Only run the timer while the carousel is visible on screen
    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
    if (!ticking) return;
    const id = window.setTimeout(() => {
        setIndex((i) => (i + 1) % count);
    }, interval);

       return () => window.clearTimeout(id);
    }, [ticking, index, count, interval]);

    // The 5-second timer. It restarts whenever the slide changes.
    useEffect(() => {
       const track = trackRef.current;
        if (!track) return;

        track.querySelectorAll("video").forEach((v) => v.pause());

        if (!inView || reducedMotion) return;

        const activeVideo = track.children[index]?.querySelector("video");
        activeVideo?.play().catch(() => {
            /* the browser blocked autoplay; the user can press play */
        })
}, [index, inView, reducedMotion]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        // Let arrow keys control the video's own seek and volume bar
        if (e.target instanceof HTMLVideoElement) return;
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) {
            if (dx < 0) next();
            else prev();
        }
        touchStartX.current = null;
    };

    const onVideoEnded = () => {
        setVideoPlaying(false);
        if (running) setIndex((i) => (i + 1) % count);
    };

    return (
        <section
            ref={rootRef}
            className={`carousel ${className}`}
            aria-roledescription="carousel"
            aria-label={label}
            onKeyDown={onKeyDown}
            onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHovering(true);
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setHovering(false);
            }}
            onFocus={(e) => {
                // Only pause for keyboard focus, not after a mouse click
                if (e.target.matches(":focus-visible")) setFocused(true);
            }}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setFocused(false);
                }
            }}
        >
            <div
                className="carousel-stage"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div className="carousel-viewport">
                    <div
                        ref={trackRef}
                        className="carousel-track"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                        aria-live={running ? "off" : "polite"}
                    >
                        {items.map((item, i) => (
                            <div
                                key={item.src}
                                className="carousel-slide"
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${i + 1} of ${count}`}
                                inert={i !== index}
                            >
                                <MediaItemView
                                    item={item}
                                    onVideoPlay={() => setVideoPlaying(true)}
                                    onVideoPause={() => setVideoPlaying(false)}
                                    onVideoEnded={onVideoEnded}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {count > 1 && (
                    <>
                        <button
                            type="button"
                            className="carousel-btn prev"
                            aria-label="Previous slide"
                            onClick={prev}
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className="carousel-btn next"
                            aria-label="Next slide"
                            onClick={next}
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {count > 1 && (
                <div className="carousel-controls">
                    <div className="carousel-dots">
                        {items.map((item, i) => (
                            <button
                                key={item.src}
                                type="button"
                                className={i === index ? "dot active" : "dot"}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === index}
                                onClick={() => setIndex(i)}
                            />
                        ))}
                    </div>

                    {canAutoPlay && (
                        <button
                            type="button"
                            className="carousel-toggle"
                            aria-label={
                                userPaused
                                    ? "Start automatic slide show"
                                    : "Pause automatic slide show"
                            }
                            onClick={() => setUserPaused(!userPaused)}
                        >
                            {userPaused ? "▶" : "❚❚"}
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};

export default Carousel;
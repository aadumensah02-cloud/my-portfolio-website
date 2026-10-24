import type { MediaItem } from "../data/projects";

interface MediaItemViewProps {
    item: MediaItem;
    onVideoPlay?: () => void;
    onVideoPause?: () => void;
    onVideoEnded?: () => void;
}

const MediaItemView: React.FC<MediaItemViewProps> = ({
    item,
    onVideoPlay,
    onVideoPause,
    onVideoEnded,
}) => {
    if (item.type === "image") {
        return (
            <img
                src={item.src}
                alt={item.alt}
                width={800}
                height={500}
                loading="lazy"
                draggable={false}
            />
        );
    }

    return (
        <video
            src={item.src}
            poster={item.poster}
            aria-label={item.label}
            controls
            muted
            playsInline
            preload="none"
            width={800}
            height={500}
            onPlay={onVideoPlay}
            onPause={onVideoPause}
            onEnded={onVideoEnded}
        />
    );
};

export default MediaItemView;
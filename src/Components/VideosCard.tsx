type Video = {
  _id: string;
  videoId: string;
  title: string;
  author_name: string;
  views: number;
  description: string;
  createdAt: string;
};

type Props = {
  videos: Video[];
};

const formatViews = (views: number) => {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M";
  }

  if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K";
  }

  return views;
};

const timeAgo = (date: string) => {
  const now = new Date().getTime();
  const old = new Date(date).getTime();

  const diff = now - old;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 24) return `${hours}h ago`;

  return `${days}d ago`;
};

export default function VideosCard({ videos }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {videos?.map((video) => (
        <div
          key={video._id}
          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
        >
          {/* Video */}
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              allowFullScreen
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <h2 className="font-semibold text-gray-800 line-clamp-2">
              {video.title}
            </h2>

            <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
              <p>{video.author_name}</p>

              <span>{timeAgo(video.createdAt)}</span>
            </div>

            <div className="mt-2 text-xs text-gray-400">
              {formatViews(video.views)} views
            </div>

            <p className="mt-3 text-sm text-gray-500 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
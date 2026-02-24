"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Maximize, X, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"
import { useSite } from "@/context/siteContext"
import axios from "axios"

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration?: number;
  category: string;
  height?: number;
  width?: number;
  date: string;
}

const VideoProgressBar = ({
  videoRef,
  duration,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  duration: number;
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
      }
    };

    video.addEventListener("timeupdate", updateTime);
    return () => video.removeEventListener("timeupdate", updateTime);
  }, [isDragging]);

  const handleProgressClick = (e: React.MouseEvent) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleProgressClick(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-3 text-white text-sm">
      <span>{formatTime(currentTime)}</span>
      <div
        ref={progressRef}
        className="flex-1 h-2 bg-white/30 rounded-full cursor-pointer relative group"
        onClick={handleProgressClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="h-full bg-white rounded-full transition-all duration-150"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            left: `${(currentTime / duration) * 100}%`,
            transform: "translateX(-50%) translateY(-50%)",
          }}
        />
      </div>
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set())
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { videoData, setVideoData } = useSite();
const categories = [
  "All",
  "Corporate",
  "Technology",
  "Culture",
  "Product",
  "Testimonials",
];
  useEffect(() => {
    async function fetchData() {
      if (!videoData) {
        try {
          const res = await axios.get(`${apiBaseUrl}/api/gallery`, {
            params: {
              galleryType: "video",
            },
          });

          setVideoData(res.data.gallery);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [videoData, setVideoData]);

  const filteredVideos =
    activeCategory === "All"
      ? videoData
      : videoData.filter((video) => video.category === activeCategory);

  const toggleLike = (videoId: number) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev)
      if (newSet.has(videoId)) {
        newSet.delete(videoId)
      } else {
        newSet.add(videoId)
      }
      return newSet
    })
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="min-h-screen ">
      <section className="pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-30 px-6 bg-gradient-to-b from-sky-400 via-sky-200 to-sky-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            fill
            alt="referenceImage"
            className="object-cover brightness-75"
            src="/image-banner.png"
            priority
            quality={100}
          />
          {/* Dark overlay with stronger gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold font-poppins mb-8 leading-tight text-white">
                Video <span className="text-gradient">Gallery</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
                Watch our story unfold through engaging videos showcasing our
                innovations, culture, and success stories
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <section className="py-8 3xl:py-12 px-4 3xl:px-12 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-950/80">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <AnimatedSection>
            <div className="flex justify-center space-x-1">
              <div className="flex glass-card rounded-full p-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 mr-1
                          ${
                            activeCategory === category
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 bg-white"
                          }
                          `}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <div className="container mx-auto px-4 3xl:px-12 py-12 sm:py-16 md:py-20 3xl:py-28">
        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {videoData &&
              filteredVideos.map((video, index) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 break-inside-avoid mb-4 cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="lg"
                      className="rounded-full w-12 h-12 bg-white/90 hover:bg-white text-black hover:text-black shadow-lg"
                    >
                      <Play className="h-5 w-5 ml-0.5" />
                    </Button>
                  </div>

                  <Badge className="absolute bottom-3 right-3 bg-black/80 text-white text-xs">
                    {video.duration}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="absolute top-3 left-3 text-xs"
                  >
                    {video.category}
                  </Badge>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      {/* <span className="text-white/70">{video.views} views</span> */}
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(video._id);
                          }}
                          className="text-white hover:text-red-400 p-1 h-5 w-5"
                        >
                          {/* <Heart className={`h-3 w-3 ${likedVideos.has(video.id) ? 'fill-red-400 text-red-400' : ''}`} /> */}
                        </Button>
                        {/* <span className="text-white/70">{video.likes}</span> */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full max-w-6xl mx-4 bg-black rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Video Player */}
                <div
                  className="relative bg-black"
                  style={{
                    aspectRatio:
                      selectedVideo.width && selectedVideo.height
                        ? `${selectedVideo.width}/${selectedVideo.height}`
                        : "16/9",
                  }}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    poster={
                      selectedVideo.thumbnail ||
                      selectedVideo.url.replace(
                        "/upload/",
                        "/upload/w_1280,h_720,c_fill,so_0/"
                      )
                    }
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = isMuted;
                      }
                    }}
                  >
                    <source src={selectedVideo.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    {/* Progress Bar */}
                    {selectedVideo.duration && (
                      <div className="mb-4">
                        <VideoProgressBar
                          videoRef={videoRef}
                          duration={selectedVideo.duration}
                        />
                      </div>
                    )}

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={togglePlay}
                          className="text-white hover:bg-white/20 rounded-full p-3 transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6" />
                          )}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="text-white hover:bg-white/20 rounded-full p-3 transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="h-6 w-6" />
                          ) : (
                            <Volume2 className="h-6 w-6" />
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.requestFullscreen();
                          }
                        }}
                        className="text-white hover:bg-white/20 rounded-full p-3 transition-colors"
                      >
                        <Maximize className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Video Info */}
                <div className="p-6 bg-card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {selectedVideo.title}
                      </h3>
                      {/* <p className="text-muted-foreground">{selectedVideo.description}</p> */}
                    </div>
                    <Badge variant="secondary">{selectedVideo.category}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      {/* <span>{selectedVideo.views} views</span> */}
                      <span>{selectedVideo.duration}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleLike(selectedVideo.id)}
                        className="flex items-center gap-2"
                      >
                        <Heart 
                          className={`h-4 w-4 ${likedVideos.has(selectedVideo.id) ? 'fill-red-400 text-red-400' : ''}`} 
                        />
                        {selectedVideo.likes}
                      </Button> */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
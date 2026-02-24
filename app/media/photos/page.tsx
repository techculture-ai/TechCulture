"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import Image from "next/image";
import { useSite } from "@/context/siteContext";
import axios from "axios";


const categories = ["All", "Technology", "Team", "Office", "Events"];

export default function PhotoGallery() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const {imageData, setImageData} = useSite()

  useEffect(()=>{
    async function fetchData(){
      if(!imageData){
        try{
          const res = await axios.get(`${apiBaseUrl}/api/gallery`, {
            params: {
              galleryType: "image"
            }
          })
          setImageData(res.data.gallery)
          
        }
        catch(error){
          console.log(error)
        }
      }
    }
    fetchData();

  },[imageData,setImageData])

  const [selectedPhoto, setSelectedPhoto] = useState(
    null
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPhotos =
    activeCategory === "All"
      ? imageData
      : imageData.filter((photo) => photo.category === activeCategory);

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="relative overflow-hidden pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-30 px-6">
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
        <div className="relative container mx-auto text-center z-20">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold font-poppins mb-8 leading-tight text-white">
                Photo{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Gallery
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
                Explore our collection of moments, innovations, and achievements
                captured through the lens
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
      <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto px-4 3xl:px-12 py-12 sm:py-16 md:py-20 3xl:py-28">
        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {imageData &&
              filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 break-inside-avoid mb-4 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                  
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-medium text-sm mb-1">
                        {photo.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-xs">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain rounded-lg"
                />

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Photo Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-white font-semibold text-xl mb-1">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-white/80">{selectedPhoto.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

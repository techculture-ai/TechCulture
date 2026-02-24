"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Camera, Video, ArrowRight, Play, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function MediaPage() {
  return (
    <div className="min-h-screen pt-20 sm:pt-22 md:pt-24 pb-12 sm:pb-14 md:pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Media Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our visual journey through stunning photography and engaging videos. 
            Discover our innovations, culture, and success stories captured in beautiful imagery and compelling narratives.
          </p>
        </motion.div>

        {/* Gallery Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Photo Gallery Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="group relative overflow-hidden h-80 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-0 h-full relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-4 gap-2 p-4 h-full">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="bg-primary rounded-lg opacity-20"></div>
                    ))}
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Photo Gallery</h3>
                    <p className="text-muted-foreground mb-6">
                      Browse through our collection of high-quality photographs showcasing our work, team, and achievements.
                    </p>
                  </div>
                  
                  <Link href="/media/photos">
                    <Button className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      View Photos
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Video Gallery Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="group relative overflow-hidden h-80 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/20 dark:to-pink-950/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-0 h-full relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-3 gap-3 p-4 h-full">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="bg-purple-500 rounded-xl opacity-20 flex items-center justify-center">
                        <Play className="h-4 w-4 text-purple-500" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Video className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Video Gallery</h3>
                    <p className="text-muted-foreground mb-6">
                      Watch our engaging videos featuring product demos, company culture, and client success stories.
                    </p>
                  </div>
                  
                  <Link href="/media/videos">
                    <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white group-hover:bg-purple-600 transition-all duration-300">
                      Watch Videos
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Photos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Videos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">Views</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">5</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
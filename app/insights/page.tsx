"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxSection } from "@/components/parallax-section"
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Search,
  Tag,
  TrendingUp,
  Lightbulb,
  Code,
  Database,
  Globe,
  HardDrive,
} from "lucide-react"

export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Technology", "Industry Trends", "Case Studies", "Best Practices", "Innovation"]

  const featuredPost = {
    id: 1,
    title: "The Future of Enterprise Digital Transformation in 2024",
    excerpt:
      "Explore the latest trends and technologies shaping the future of enterprise digital transformation, from AI integration to cloud-native architectures.",
    author: "Rajesh Kumar",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=800&text=Digital+Transformation+2024",
    featured: true,
  }

  const posts = [
    {
      id: 2,
      title: "Implementing AI-Driven Analytics in Manufacturing",
      excerpt:
        "How artificial intelligence is revolutionizing manufacturing processes and enabling predictive maintenance strategies.",
      author: "Priya Sharma",
      date: "December 12, 2024",
      readTime: "6 min read",
      category: "Industry Trends",
      image: "/placeholder.svg?height=300&width=400&text=AI+Manufacturing",
    },
    {
      id: 3,
      title: "GIS Technology in Smart City Development",
      excerpt:
        "Exploring the role of Geographic Information Systems in creating sustainable and efficient smart cities.",
      author: "Sneha Reddy",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Technology",
      image: "/placeholder.svg?height=300&width=400&text=Smart+Cities+GIS",
    },
    {
      id: 4,
      title: "Cloud Migration Best Practices for Enterprises",
      excerpt: "A comprehensive guide to successful cloud migration strategies and avoiding common pitfalls.",
      author: "Amit Patel",
      date: "December 8, 2024",
      readTime: "10 min read",
      category: "Best Practices",
      image: "/placeholder.svg?height=300&width=400&text=Cloud+Migration",
    },
    {
      id: 5,
      title: "Cybersecurity in the Age of Remote Work",
      excerpt:
        "Essential cybersecurity measures and strategies for protecting distributed teams and remote infrastructure.",
      author: "Vikram Singh",
      date: "December 5, 2024",
      readTime: "5 min read",
      category: "Technology",
      image: "/placeholder.svg?height=300&width=400&text=Cybersecurity+Remote",
    },
    {
      id: 6,
      title: "ROI Measurement in Digital Transformation Projects",
      excerpt: "Methods and metrics for measuring the return on investment in digital transformation initiatives.",
      author: "Anita Sharma",
      date: "December 3, 2024",
      readTime: "8 min read",
      category: "Best Practices",
      image: "/placeholder.svg?height=300&width=400&text=ROI+Digital+Transformation",
    },
    {
      id: 7,
      title: "The Rise of Low-Code Development Platforms",
      excerpt: "How low-code platforms are democratizing software development and accelerating digital innovation.",
      author: "Rajesh Kumar",
      date: "November 30, 2024",
      readTime: "6 min read",
      category: "Innovation",
      image: "/placeholder.svg?height=300&width=400&text=Low+Code+Platforms",
    },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technology":
        return <Code className="w-4 h-4" />
      case "Industry Trends":
        return <TrendingUp className="w-4 h-4" />
      case "Best Practices":
        return <Lightbulb className="w-4 h-4" />
      case "Innovation":
        return <Database className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <ParallaxSection speed={0.3} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        </ParallaxSection>

        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold font-poppins mb-8 leading-tight">
                Tech <span className="text-gradient">Insights</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                Stay ahead with the latest trends, insights, and best practices in technology and digital
                transformation.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-16 3xl:py-24 px-6 3xl:px-12">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-8 rounded-3xl mb-12">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 glass-card border-white/20 dark:border-white/10 bg-transparent"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                          selectedCategory === category ? "btn-primary" : "btn-secondary"
                        }`}
                      >
                        {getCategoryIcon(category)}
                        <span className="ml-2">{category}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 3xl:py-24 px-6 3xl:px-12">
        <div className="container mx-auto">
          <AnimatedSection>
            <Card className="glass-card glass-hover overflow-hidden max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto overflow-hidden">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/60"></div>
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-2 glass-card px-3 py-1 rounded-full">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-white text-sm font-medium">Featured</span>
                    </div>
                  </div>
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 text-primary mb-4">
                    {getCategoryIcon(featuredPost.category)}
                    <span className="text-sm font-medium">{featuredPost.category}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-8">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Button className="btn-primary rounded-full w-fit" asChild>
                    <Link href={`/insights/${featuredPost.id}`}>
                      Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-32 3xl:py-40 px-6 3xl:px-12">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold font-poppins text-foreground mb-8">
                Latest <span className="text-gradient">Articles</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover insights, trends, and best practices from our team of technology experts.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 100}>
                <Card className="glass-card glass-hover overflow-hidden group h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 glass-card px-3 py-1 rounded-full">
                        {getCategoryIcon(post.category)}
                        <span className="text-white text-xs font-medium">{post.category}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent rounded-full" asChild>
                      <Link href={`/insights/${post.id}`}>
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">No articles found</h3>
                <p className="text-muted-foreground mb-8">
                  Try adjusting your search terms or browse different categories.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                  className="btn-secondary rounded-full"
                >
                  Clear Filters
                </Button>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-32 3xl:py-40 px-6 3xl:px-12">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <Card className="glass-card glow max-w-4xl mx-auto">
              <CardContent className="p-16">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
                  <HardDrive className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-5xl font-bold font-poppins text-foreground mb-8">
                  Stay <span className="text-gradient">Updated</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
                  Subscribe to our newsletter and get the latest insights, trends, and updates delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    placeholder="Enter your email"
                    className="glass-card border-white/20 dark:border-white/10 bg-transparent rounded-full px-6"
                  />
                  <Button className="btn-primary rounded-full px-8">
                    Subscribe <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

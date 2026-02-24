"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxSection } from "@/components/parallax-section"

import { 
  ArrowRight, 
  Users, 
  Target, 
  Award, 
  Heart, 
  Lightbulb, 
  Shield, 
  Zap, 
  TrendingUp, 
  Map, 
  Satellite, 
  Globe, 
  Database,
  Camera,
  Play,
  Star,
  MessageCircle,
  ChefHat,
  Trophy,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Bot
} from "lucide-react"

export default function AboutPage() {
  const milestones = [
    {
      year: "2020",
      title: "Foundation",
      description: "TechCulture Solutions was established with a vision to transform geospatial intelligence and deliver cutting-edge GIS solutions."
    },
    {
      year: "2021",
      title: "Team Expansion",
      description: "Expanded our team with skilled GIS professionals and established core competencies in remote sensing and spatial analysis."
    },
    {
      year: "2022",
      title: "First Major Projects",
      description: "Successfully delivered major projects for government and private sector clients, establishing our reputation in the geospatial industry."
    },
    {
      year: "2023",
      title: "Technology Innovation",
      description: "Integrated AI and machine learning capabilities into our GIS solutions, pioneering automated spatial analysis."
    },
    {
      year: "2024",
      title: "Market Leadership",
      description: "Became a recognized leader in geospatial solutions with a growing portfolio of successful projects across multiple sectors."
    },
    {
      year: "2025+",
      title: "Future Vision",
      description: "Continuing to innovate with advanced technologies, expanding our reach, and setting new standards in geospatial intelligence."
    }
  ];

  const services = [
    {
      icon: <Map className="w-8 h-8" />,
      title: "GIS Implementation",
      description: "We develop custom GIS tools and apps for mapping, spatial analysis, real-time data collection, and smart infrastructure management.",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "GIS Tool/App Development",
      description: "Custom geospatial applications and tools tailored to your specific business needs and workflows.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Field Surveying & Mapping",
      description: "Comprehensive surveying services using advanced technology for accurate spatial data collection.",
    },
    {
      icon: <Satellite className="w-8 h-8" />,
      title: "Remote Sensing Solutions",
      description: "Satellite imagery analysis and remote sensing technologies for environmental monitoring and assessment.",
    },
  ]

  const stats = [
    { number: "500+", label: "Completed Projects" },
    { number: "50+", label: "Expert Team Members" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "10+", label: "Years of Experience" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-emerald-950/10 dark:to-slate-950">
      {/* Hero Section */}
     

      {/* About Overview Section */}
      <section className="py-8 sm:py-12 md:py-16 3xl:py-24 4xl:py-32 px-4 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10 mt-8 sm:mt-12 md:mt-16 3xl:mt-20">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <AnimatedSection animation="fadeInUp" delay={0} className="text-center mb-12 3xl:mb-16">
            <h2 className="text-4xl md:text-5xl 3xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 3xl:mb-8 leading-tight">
              Transforming Data into <span className="text-emerald-600 dark:text-emerald-400">Intelligence</span>
            </h2>
            <p className="text-lg md:text-xl 3xl:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl 3xl:max-w-4xl mx-auto leading-relaxed">
              TechCulture Solutions Private Limited is a leading provider of cutting-edge solutions in GIS, Remote Sensing, and Geospatial Technologies
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Introduction - Matching homepage card style */}
      <section id="company" className="py-10 3xl:py-16 4xl:py-24 px-6 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 3xl:gap-24 4xl:gap-32 items-center">
            <AnimatedSection animation="fadeInLeft">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl transform rotate-6"></div>
                <Image
                  src="/about2.png"
                  alt="TechCulture Solutions Team"
                  width={600}
                  height={500}
                  className="relative z-10 rounded-2xl shadow-2xl border border-emerald-200/20 dark:border-emerald-800/20"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight">
              <div>
                <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-6">
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Our Story</span>
                </div>
                <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Transforming <span className="text-emerald-600 dark:text-emerald-400">Geospatial Intelligence</span> into Business Value
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  We are a leading geospatial technology company specializing in GIS, Remote Sensing, and Surveying Services. We deliver innovative spatial solutions that help clients transform location-based data into actionable insights.
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Our team delivers precision and intelligence to spatial decision-making across government, infrastructure, utilities, and environmental sectors.
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stat.number}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Modern card layout */}
      <section className="py-12 sm:py-16 md:py-20 3xl:py-28 4xl:py-36 px-4 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-4">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Vision & Mission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl 3xl:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Our <span className="text-emerald-600 dark:text-emerald-400">Vision & Mission</span>
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Driving innovation and excellence in geospatial intelligence to shape a smarter future.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 3xl:gap-12">
            {/* Vision Card */}
            <AnimatedSection animation="fadeInLeft" delay={200}>
              <div className="group relative h-full rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-500">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-900/20 dark:to-emerald-800/10"></div>
                
                {/* Content */}
                <div className="relative z-10 p-8 3xl:p-10 4xl:p-12">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-900/20 flex items-center justify-center shadow-md mb-6">
                    <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    We aim to shape the future of geospatial intelligence and digital transformation through innovation, integrity, and impact.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    At TechCulture Solutions, we envision becoming a pioneering force in the GIS and digital mapping sector by integrating technology, strategy, and people-first values.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                        LONG TERM HOPE
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        To become India's most trusted GIS-based service provider for urban utilities, smart infrastructure, and remote sensing solutions.
                      </p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                        COMPANY GOALS
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Delivering scalable, accurate, and innovative geospatial solutions across India and abroad through cutting-edge technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Mission Card */}
            <AnimatedSection animation="fadeInRight" delay={400}>
              <div className="group relative h-full rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-500">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-900/20 dark:to-emerald-800/10"></div>
                
                {/* Content */}
                <div className="relative z-10 p-8 3xl:p-10 4xl:p-12">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-900/20 flex items-center justify-center shadow-md mb-6">
                    <Heart className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    We are driven by innovation and powered by intelligence. Our mission is to deliver technology-driven solutions that enable smarter governance, efficient infrastructure, and a sustainable future.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">AI-Enabled Geospatial Solutions</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Digitizing Infrastructure for Smarter Cities</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Insight-Driven Governance</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Innovating with Drones & Automation</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Overview - Clean grid layout matching homepage */}
      <section className="py-10 3xl:py-16 4xl:py-24 px-6 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-6">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Our Expertise</span>
              </div>
              <h2 className="text-4xl sm:text-5xl 3xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 3xl:mb-8 leading-tight">
                Comprehensive <span className="text-emerald-600 dark:text-emerald-400">Services</span>
              </h2>
              <p className="text-lg 3xl:text-xl text-gray-600 dark:text-gray-400 max-w-3xl 3xl:max-w-4xl mx-auto leading-relaxed">
                At TechCulture Solutions, we deliver modern geospatial technology, software, and field engineering solutions tailored to your sector.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 3xl:gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="group relative h-full rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-500">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 dark:from-emerald-900/20 dark:to-emerald-800/10"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 3xl:p-8 text-center h-full flex flex-col">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-900/20 flex items-center justify-center shadow-md mx-auto mb-6">
                      <div className="text-emerald-600 dark:text-emerald-400">{service.icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    
                    {/* Hover CTA */}
                    <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  
                  {/* Top border accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* CTA */}
          <AnimatedSection animation="fadeInUp" className="text-center mt-12">
            <Button
              className="px-10 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
              asChild
            >
              <Link href="/services">
                Explore All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Journey Timeline - Modern timeline design */}
      <section className="py-12 sm:py-16 md:py-20 3xl:py-28 4xl:py-36 px-4 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-6">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Our Journey</span>
              </div>
              <h2 className="text-4xl sm:text-5xl 3xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 3xl:mb-8 leading-tight">
                Innovation <span className="text-emerald-600 dark:text-emerald-400">Timeline</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Navigate through our path of innovation and growth in GIS technology.
              </p>
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200 dark:bg-emerald-800"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={index} delay={index * 200} animation="fadeInUp">
                  <div className="relative flex items-start">
                    {/* Timeline marker */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full border-4 border-white dark:border-slate-950 shadow-lg flex items-center justify-center relative z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        {/* Year badge */}
                        <div className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                          {milestone.year}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                          {milestone.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Matching homepage style */}
      <section className="py-16 sm:py-18 md:py-20 3xl:py-28 4xl:py-36 px-4 3xl:px-12 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="relative max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-4xl sm:text-5xl 3xl:text-6xl font-bold text-white mb-6 3xl:mb-8 leading-tight">
              Ready to Transform Your Data into <span className="text-emerald-200">Intelligence?</span>
            </h2>
            <p className="text-lg 3xl:text-xl text-emerald-100 mb-10 3xl:mb-14 max-w-2xl 3xl:max-w-3xl mx-auto leading-relaxed">
              Partner with us to unlock the full potential of your geospatial data and drive innovation in your organization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                className="px-8 py-3 bg-white text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                asChild
              >
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                asChild
              >
                <Link href="/projects">
                  View Our Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
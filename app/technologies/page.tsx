"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Database,
  Map,
  Network,
  Zap,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Globe,
  Server,
  Layers,
  BarChart3,
  Sparkles,
  Cpu,
  Cloud,
  Settings,
  Target,
  TrendingUp,
  Activity,
  MapPin,
  Compass,
  Monitor,
  Smartphone
} from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"

// AnimatedSection component for consistent animations
// const AnimatedSection = ({ children, animation = "fadeInUp", delay = 0, className = "" }) => {
//   return (
//     <div 
//       className={`animate-fade-in-up ${className}`}
//       style={{ animationDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   )
// }

export default function TechnologiesPage() {
  const coreFeatures = [
    {
      title: "Complete data models for different industry applications",
      icon: <Database className="w-5 h-5" />,
      color: "blue"
    },
    {
      title: "Mobility via field apps",
      icon: <Smartphone className="w-5 h-5" />,
      color: "green"
    },
    {
      title: "Unified information and data model",
      icon: <Layers className="w-5 h-5" />,
      color: "purple"
    },
    {
      title: "Geographical maps, schematics, and drawings",
      icon: <Map className="w-5 h-5" />,
      color: "orange"
    },
    {
      title: "Vector and raster support",
      icon: <Settings className="w-5 h-5" />,
      color: "red"
    },
    {
      title: "Embedded workflow",
      icon: <Activity className="w-5 h-5" />,
      color: "cyan"
    },
    {
      title: "Scalable from small to huge data/user volumes",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "indigo"
    },
    {
      title: "Excellent performance",
      icon: <Zap className="w-5 h-5" />,
      color: "yellow"
    }
  ]

  const advancedFeatures = [
    {
      title: "Transformation of geo-coordinates",
      icon: <Compass className="w-5 h-5" />,
      color: "emerald"
    },
    {
      title: "Thematic mapping",
      icon: <MapPin className="w-5 h-5" />,
      color: "rose"
    },
    {
      title: "Asset register",
      icon: <Target className="w-5 h-5" />,
      color: "violet"
    },
    {
      title: "Topology/Tracing",
      icon: <Network className="w-5 h-5" />,
      color: "amber"
    },
    {
      title: "Multi-user support with conflict management",
      icon: <Users className="w-5 h-5" />,
      color: "teal"
    },
    {
      title: "Long transactions including revisions management",
      icon: <Shield className="w-5 h-5" />,
      color: "pink"
    },
    {
      title: "Export/Import and integration interface",
      icon: <ArrowRight className="w-5 h-5" />,
      color: "lime"
    },
    {
      title: "Web-based clients accessibility",
      icon: <Monitor className="w-5 h-5" />,
      color: "sky"
    }
  ]

  const architectureSteps = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Data Collection",
      subtitle: "Geographic & Asset Data",
      description: "Comprehensive data gathering from multiple sources",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "tcSpatial Engine",
      subtitle: "Processing & Analysis",
      description: "Advanced geospatial processing and analysis",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Web Interface",
      subtitle: "User Dashboard & Analytics",
      description: "Intuitive web-based user experience",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const industries = [
    { name: "Electrical Power", icon: <Zap className="w-5 h-5" /> },
    { name: "Gas Distribution", icon: <Activity className="w-5 h-5" /> },
    { name: "Telecommunications", icon: <Network className="w-5 h-5" /> },
    { name: "Heating & Cooling", icon: <Settings className="w-5 h-5" /> },
    { name: "Water & Wastewater", icon: <Database className="w-5 h-5" /> }
  ]

  const benefits = [
    { name: "Continuous Enhancement", icon: <TrendingUp className="w-5 h-5" /> },
    { name: "Standardized Application", icon: <Shield className="w-5 h-5" /> },
    { name: "Non-proprietary Architecture", icon: <Server className="w-5 h-5" /> },
    { name: "Routine Upgrades", icon: <Cloud className="w-5 h-5" /> },
    { name: "Comprehensive Support", icon: <Users className="w-5 h-5" /> }
  ]

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative  overflow-hidden pb-20 pt-30 px-6 ">
          <div className="absolute inset-0">
            <Image fill alt="referenceImage" className="object-cover" src="./technology-banner.jpg" />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          </div>
          
          <div className="relative container mx-auto text-center">
            <AnimatedSection animation="fadeInUp" delay={0}>
              <h1 className="text-6xl md:text-8xl font-bold font-poppins mb-8 leading-tight text-white">
                GIS Technology <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                Comprehensive, web-based GIS solutions with embedded functionality for the full lifecycle of network management
              </p>
              <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
                Leveraging cutting-edge technology to transform how organizations manage their spatial data and infrastructure
              </p>
            </AnimatedSection>
          </div>
        </section> 

        {/* Platform Overview */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="container mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0}>
              <div className="max-w-6xl mx-auto">
                <Card className="p-12 mb-12 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                      <Database className="h-12 w-12 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                        The Base Platform
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                        Enterprise-grade geospatial infrastructure
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
                    The overall Techculture product suite design strategy has been to develop an integrated offering of applications and modules, built on the same platform for geographic data, covering the full lifecycle of network management. The result is a superior, web-based solution with comprehensive, embedded GIS functionality.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg">
                          <Layers className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          tcSpatial Platform
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        The base platform includes a unique, purpose-built GIS engine platform, tcSpatial. The GIS platform and tools manage all aspects of network documentation including geographic and schematic views, single-line diagrams, maps and overviews, topologies, asset data, and others.
                      </p>
                    </div>
                    
                    <div className="space-y-6 p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                          <Server className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Integrated Solution
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        A Techculture solution comprises a built-in asset register that integrates advanced GIS technology with Oracle or PostgreSQL databases for editing, storing, analyzing, and presenting geographical data.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Architecture Flow */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0}>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                    GIS Platform Architecture
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Streamlined data flow from collection to visualization
                  </p>
                </div>
                
                <Card className="p-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl">
                  <div className="grid md:grid-cols-3 gap-12 items-center">
                    {architectureSteps.map((step, index) => (
                      <div key={index} className="relative">
                        <AnimatedSection animation="scaleIn" delay={index * 200}>
                          <div className="text-center group">
                            <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                              <div className="text-white">
                                {step.icon}
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                              {step.title}
                            </h3>
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                              {step.subtitle}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </AnimatedSection>
                        
                        {index < architectureSteps.length - 1 && (
                          <div className="hidden md:block absolute top-10 -right-6 z-10">
                            <ArrowRight className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Utility Requirements */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fadeInUp" delay={0}>
                <Card className="p-12 mb-12 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-2xl">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl">
                      <Zap className="h-12 w-12 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Utility Industry Requirements
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                        Mission-critical infrastructure management
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                      The GIS platform is designed to handle the significant up-time requirements of the utility industry. Using a single, central database and advanced geo-spatial functionality, Techculture's solution allows customers to avoid time-consuming, asynchronous data transfers between systems.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-6 p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                            <Shield className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Enhanced Efficiency
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          This makes the system more efficient and significantly reduces the risk for data errors and network down time.
                        </p>
                      </div>
                      
                      <div className="space-y-6 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                            <Network className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Complex Networks
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          To meet the challenges of building and managing complex networks, the solution uses model rules and automatically generated network schematics.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Network Owners Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fadeInUp" delay={0}>
                <Card className="p-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        GIS for Network Owners
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                        Flexible solutions across industries
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
                    A solution from Techculture provides a much higher level of flexibility compared to competing solutions, which are typically less comprehensive, more rigid, and built on third-party GIS software.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Industry Applications</h3>
                      <div className="space-y-4">
                        {industries.map((industry, index) => (
                          <AnimatedSection key={index} animation="fadeInLeft" delay={index * 100}>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 hover:shadow-md transition-all duration-300">
                              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white">
                                {industry.icon}
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">{industry.name}</span>
                            </div>
                          </AnimatedSection>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key Benefits</h3>
                      <div className="space-y-4">
                        {benefits.map((benefit, index) => (
                          <AnimatedSection key={index} animation="fadeInRight" delay={index * 100}>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 hover:shadow-md transition-all duration-300">
                              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg text-white">
                                {benefit.icon}
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">{benefit.name}</span>
                            </div>
                          </AnimatedSection>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 3xl:py-28 px-4 3xl:px-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
              <AnimatedSection animation="fadeInUp" delay={0} className="text-center mb-16 3xl:mb-20">
                <h2 className="text-4xl md:text-5xl 3xl:text-6xl font-bold mb-6 3xl:mb-8 bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                  tcServices Features
                </h2>
                <p className="text-xl 3xl:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl 3xl:max-w-4xl mx-auto">
                  Comprehensive functionality designed for modern geospatial challenges
                </p>
              </AnimatedSection>
              
              {/* Core Features */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">Core Platform Features</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-5 gap-6 3xl:gap-8">
                  {coreFeatures.map((feature, index) => (
                    <AnimatedSection key={index} animation="fadeInUp" delay={index * 50}>
                      <Card className="p-6 h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {feature.title}
                        </p>
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
              
              {/* Advanced Features */}
              <div>
                <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">Advanced Capabilities</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {advancedFeatures.map((feature, index) => (
                    <AnimatedSection key={index} animation="fadeInUp" delay={index * 50 + 400}>
                      <Card className="p-6 h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {feature.title}
                        </p>
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Network Information System */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-700  relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
            backgroundImage: `url("https://imgs.search.brave.com/lbjzsd5eP2_Of6sM-raUr9gsobGxtVHIJSCLqxIaSjU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE4/NTMzNzUwNC9waG90/by9hdXRvbWF0aW9u/LW9mLWJ1c2luZXNz/LW9yLXJvYm90aWMt/cHJvY2Vzcy1ycGEt/dGVjaG5vbG9neS10/cmFuc2Zlci1vZi1k/YXRhLWJldHdlZW4t/YXBwbGljYXRpb24u/anBnP2I9MSZzPTYx/Mng2MTImdz0wJms9/MjAmYz1XT1o3Q2Uz/R2pZLW5uQTFTdXNn/aVZQY0t3Y0I2VjN1/bkZzT3RCOHVnQVln/PQ")`,
            backgroundAttachment: 'fixed',
            backgroundRepeat : "no-repeat",
            objectFit: "cover",
            backgroundSize: "cover",
            }}
          />
          
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto text-center">
              <AnimatedSection animation="fadeInUp" delay={0}>
                <Card className="p-12 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 shadow-2xl">
                  <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <Map className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                      Network Information System
                    </h2>
                  </div>
                  <p className="text-xl text-white/90 leading-relaxed mb-8">
                    NIS, or Network Information System is supporting the business processes throughout the entire lifecycle of the network. All data (maps, schematics, asset registers, real-time information, etc.) is stored in the same open relational database with an object-based structure.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold bg-white text-indigo-600 hover:bg-gray-100">
                      Learn More About NIS
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                   
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>

      {/* CSS Styles */}

      </>
  )};
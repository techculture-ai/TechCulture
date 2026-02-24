"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import {
  ArrowRight,
  Leaf,
  Building2,
  FileText,
  Mountain,
  Calculator,
  Wifi,
  Map,
  Zap,
  Users,
  TrendingUp,
  Award,
  Globe,
  Database,
  Satellite,
  HardDrive,
  Code,
  Shield,
  Target,
  BarChart3,
} from "lucide-react"

export default function IndustriesPage() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)

  const industries = [
    {
      id: "agriculture",
      title: "Agriculture & Irrigation",
      description: "Revolutionizing agricultural practices through advanced surveying, precision mapping, and smart irrigation solutions.",
      shortDesc: "Smart farming solutions with precision mapping and irrigation systems",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Crop Monitoring & Mapping",
        "Irrigation System Design",
        "Soil Analysis & Mapping",
        "Precision Agriculture",
        "Water Resource Management",
        "Farm Infrastructure Planning"
      ],
      stats: {
        projects: "150+",
        coverage: "25+ States",
        efficiency: "40% Increase"
      }
    },
    {
      id: "government",
      title: "Government Sector",
      description: "Supporting government initiatives with comprehensive surveying, mapping, and technology solutions for public infrastructure and services.",
      shortDesc: "Comprehensive solutions for government infrastructure and services",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Infrastructure Development",
        "Smart City Planning",
        "Public Service Mapping",
        "Emergency Response Systems",
        "Asset Management",
        "Policy Implementation Support"
      ],
      stats: {
        projects: "200+",
        coverage: "28 States",
        efficiency: "35% Improvement"
      }
    },
    {
      id: "land-records",
      title: "Land Records & Information",
      description: "Digitizing and modernizing land records with advanced GIS mapping, property surveys, and comprehensive information management systems.",
      shortDesc: "Digital land records and comprehensive property information systems",
      icon: <FileText className="w-8 h-8" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Property Survey & Mapping",
        "Land Record Digitization",
        "Boundary Demarcation",
        "Title Verification",
        "GIS Database Management",
        "Legal Documentation Support"
      ],
      stats: {
        projects: "300+",
        coverage: "30+ Districts",
        efficiency: "60% Faster"
      }
    },
    {
      id: "mining",
      title: "Mining & Minerals",
      description: "Advanced surveying and mapping solutions for mining operations, mineral exploration, and resource management with precision technology.",
      shortDesc: "Precision surveying and mapping for mining operations",
      icon: <Mountain className="w-8 h-8" />,
      color: "from-gray-600 to-slate-700",
      bgColor: "bg-gray-600/10",
      borderColor: "border-gray-600/20",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Mineral Exploration Mapping",
        "Mine Planning & Design",
        "Resource Assessment",
        "Safety Monitoring",
        "Environmental Impact Studies",
        "Production Optimization"
      ],
      stats: {
        projects: "80+",
        coverage: "15+ Mines",
        efficiency: "45% Enhancement"
      }
    },
    {
      id: "property-tax",
      title: "Property Tax",
      description: "Streamlining property tax assessment and collection through digital mapping, automated valuation, and efficient management systems.",
      shortDesc: "Digital property tax assessment and collection systems",
      icon: <Calculator className="w-8 h-8" />,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Property Assessment",
        "Tax Calculation Systems",
        "Digital Payment Integration",
        "Compliance Monitoring",
        "Revenue Optimization",
        "Audit Support"
      ],
      stats: {
        projects: "120+",
        coverage: "20+ Cities",
        efficiency: "50% Increase"
      }
    },
    {
      id: "telecom",
      title: "Telecom",
      description: "Comprehensive telecommunications infrastructure mapping, network planning, and optimization solutions for modern connectivity.",
      shortDesc: "Telecom infrastructure mapping and network optimization",
      icon: <Wifi className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Network Infrastructure Mapping",
        "Fiber Route Planning",
        "Tower Site Selection",
        "Signal Coverage Analysis",
        "5G Network Planning",
        "Maintenance Support"
      ],
      stats: {
        projects: "180+",
        coverage: "22 States",
        efficiency: "55% Improvement"
      }
    },
    {
      id: "urban-development",
      title: "Urban Development & Planning",
      description: "Comprehensive urban planning solutions with smart city integration, infrastructure development, and sustainable growth strategies.",
      shortDesc: "Smart city planning and sustainable urban development",
      icon: <Map className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Master Planning",
        "Smart City Integration",
        "Transportation Planning",
        "Green Infrastructure",
        "Housing Development",
        "Public Space Design"
      ],
      stats: {
        projects: "90+",
        coverage: "18 Cities",
        efficiency: "40% Enhancement"
      }
    },
    {
      id: "utility-mapping",
      title: "Utility Mapping",
      description: "Advanced utility mapping and management solutions for water, electricity, gas, and telecommunications infrastructure with precision technology.",
      shortDesc: "Precision mapping and management of utility infrastructure",
      icon: <Zap className="w-8 h-8" />,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Underground Utility Detection",
        "Water Network Mapping",
        "Electrical Grid Planning",
        "Gas Pipeline Survey",
        "Maintenance Planning",
        "Emergency Response Mapping"
      ],
      stats: {
        projects: "250+",
        coverage: "25+ Cities",
        efficiency: "65% Improvement"
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      {/* <section className="pb-20 pt-30 overflow-hidden px-6 bg-gradient-to-b from-sky-400 via-sky-200 to-sky-50"> */}
       <section className="relative  overflow-hidden pb-20 pt-30 px-6 ">
    <div className="absolute inset-0">
                <Image fill alt="referenceImage" className="object-cover" src="./industry-banner.jpg" />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
              </div>
                  
        <div className="relative container mx-auto text-center">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold font-poppins mb-8 leading-tight text-white">
                Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Industries</span>
              </h1>
              <p className="text-gray-200 text-xl md:text-2xl mb-12 leading-relaxed">
                Transforming diverse sectors through innovative surveying, mapping, and technology solutions across India.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="pt-16 pb-20 3xl:pt-24 3xl:pb-28 px-6 3xl:px-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-8 3xl:gap-10">
            {industries.map((industry, index) => (
              <AnimatedSection key={industry.id} delay={index * 100}>
                <div 
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer ${activeIndustry === industry.id ? 'ring-2 ring-purple-500/50' : ''}`}
                  onClick={() => setActiveIndustry(activeIndustry === industry.id ? null : industry.id)}
                >
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Industry Icon - Top Left */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${industry.color} shadow-lg`}>
                        <div className="text-white">
                          {industry.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Industry Title - Bottom Left */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{industry.title}</h3>
                      <p className="text-sm text-white/90 mt-1">{industry.shortDesc}</p>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-12 left-0 right-0 p-6 text-white">
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed opacity-90 line-clamp-3">{industry.description}</p>
                          
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="text-center">
                              <div className="text-lg font-bold">{industry.stats.projects}</div>
                              <div className="text-xs opacity-80">Projects</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{industry.stats.coverage}</div>
                              <div className="text-xs opacity-80">Coverage</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{industry.stats.efficiency}</div>
                              <div className="text-xs opacity-80">Efficiency</div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 text-sm">Key Services</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {industry.services.slice(0, 3).map((service, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                                  {service}
                                </Badge>
                              ))}
                              {industry.services.length > 3 && (
                                <Badge variant="secondary" className="text-xs bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                                  +{industry.services.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Industry Section */}
      {activeIndustry && (
        <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto">
            {(() => {
              const industry = industries.find(ind => ind.id === activeIndustry)
              if (!industry) return null
              
              return (
                <AnimatedSection>
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${industry.color} shadow-lg mb-6`}>
                        <div className="text-white">
                          {industry.icon}
                        </div>
                      </div>
                      <h2 className="text-4xl font-bold font-poppins text-foreground mb-4">
                        {industry.title}
                      </h2>
                      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {industry.description}
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-6">Our Services</h3>
                        <div className="space-y-4">
                          {industry.services.map((service, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${industry.color} flex items-center justify-center`}>
                                <div className="text-white text-sm font-bold">{index + 1}</div>
                              </div>
                              <span className="text-foreground font-medium">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(industry.stats).map(([key, value]) => (
                            <Card key={key} className="glass-card text-center">
                              <CardContent className="p-6">
                                <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
                                <div className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        <Card className="glass-card">
                          <CardContent className="p-6">
                            <h4 className="font-semibold text-foreground mb-4">Why Choose Us?</h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Target className="w-5 h-5 text-primary" />
                                <span className="text-sm">Precision technology and advanced mapping solutions</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Users className="w-5 h-5 text-primary" />
                                <span className="text-sm">Experienced team with industry expertise</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <span className="text-sm">Proven track record of successful projects</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Shield className="w-5 h-5 text-primary" />
                                <span className="text-sm">Compliance with industry standards and regulations</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })()}
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold font-poppins text-foreground mb-8">
                Industry <span className="text-gradient">Impact</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "8+", label: "Industries Served", icon: <Globe className="w-8 h-8" /> },
              { number: "1000+", label: "Projects Completed", icon: <Award className="w-8 h-8" /> },
              { number: "28+", label: "States Covered", icon: <Map className="w-8 h-8" /> },
              { number: "95%", label: "Client Satisfaction", icon: <Users className="w-8 h-8" /> },
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="glass-card glass-hover text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <div className="text-primary">{stat.icon}</div>
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
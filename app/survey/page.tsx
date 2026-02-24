"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import {
  ArrowRight,
  MapPin,
  Satellite,
//   Drone,
  Plane,
  Compass,
  Target,
  Users,
  TrendingUp,
  Award,
  Globe,
  Database,
  HardDrive,
  Code,
  Shield,
  BarChart3,
  Zap,
  Camera,
  Layers,
  Navigation,
  Gauge,
  Smartphone,
  Wifi,
  FileText,
} from "lucide-react"

export default function SurveyPage() {
  const [activeSurvey, setActiveSurvey] = useState<string | null>(null)

  const surveyTypes = [
    {
      id: "field-survey",
      title: "Field Survey",
      description: "Comprehensive on-ground surveying solutions using advanced equipment and traditional surveying techniques for accurate data collection and mapping.",
      shortDesc: "Traditional and advanced on-ground surveying techniques",
      icon: <MapPin className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Topographical Survey",
        "Boundary Survey",
        "Construction Survey",
        "Land Development Survey",
        "Route Survey",
        "Property Survey"
      ],
      equipment: [
        "Total Station",
        "Theodolite",
        "Level Instruments",
        "Measuring Tapes",
        "GPS Handheld Units",
        "Survey Tripods"
      ],
      stats: {
        accuracy: "±5mm",
        coverage: "Any Terrain",
        speed: "High Precision"
      }
    },
    {
      id: "ground-survey",
      title: "Ground Survey ETS/DGPS",
      description: "High-precision ground surveying using Electronic Total Station (ETS) and Differential Global Positioning System (DGPS) for centimeter-level accuracy in mapping and measurements.",
      shortDesc: "High-precision ETS and DGPS surveying solutions",
      icon: <Satellite className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Precision Mapping",
        "Control Point Establishment",
        "As-Built Surveys",
        "Engineering Surveys",
        "Cadastral Surveys",
        "Infrastructure Mapping"
      ],
      equipment: [
        "Electronic Total Station",
        "DGPS Receivers",
        "RTK Systems",
        "Data Collectors",
        "Survey Software",
        "Calibration Equipment"
      ],
      stats: {
        accuracy: "±2cm",
        coverage: "Real-time",
        speed: "Ultra Precise"
      }
    },
    {
      id: "drone-survey",
      title: "Drone Survey",
      description: "Advanced aerial surveying using cutting-edge drone technology for rapid data collection, 3D modeling, and comprehensive area mapping with high-resolution imagery.",
      shortDesc: "Advanced drone technology for aerial surveying and mapping",
      icon: <Plane  className="w-8 h-8" />,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "Aerial Photography",
        "3D Terrain Modeling",
        "Volume Calculations",
        "Progress Monitoring",
        "Site Inspection",
        "Thermal Imaging"
      ],
      equipment: [
        "Multi-rotor Drones",
        "Fixed-wing UAVs",
        "High-resolution Cameras",
        "LiDAR Sensors",
        "Thermal Cameras",
        "Flight Planning Software"
      ],
      stats: {
        accuracy: "±5cm",
        coverage: "Large Areas",
        speed: "Rapid Survey"
      }
    },
    {
      id: "aerial-lidar",
      title: "Aerial & LIDAR Data Acquisition",
      description: "State-of-the-art aerial surveying and Light Detection and Ranging (LIDAR) technology for precise elevation data, 3D point clouds, and comprehensive terrain analysis.",
      shortDesc: "Advanced aerial and LIDAR technology for precise data acquisition",
      icon: <Plane className="w-8 h-8" />,
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      services: [
        "LIDAR Data Collection",
        "Point Cloud Processing",
        "Digital Elevation Models",
        "Contour Generation",
        "Floodplain Mapping",
        "Forest Canopy Analysis"
      ],
      equipment: [
        "Aerial LIDAR Systems",
        "Helicopter Platforms",
        "Fixed-wing Aircraft",
        "IMU/GPS Systems",
        "Data Processing Software",
        "Quality Control Tools"
      ],
      stats: {
        accuracy: "±10cm",
        coverage: "Extensive Areas",
        speed: "High Efficiency"
      }
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-30 px-6 bg-gradient-to-b from-sky-400 via-sky-200 to-sky-50 overflow-hidden relative">
        <div className="absolute inset-0">
          <Image fill alt="referenceImage" className="object-cover" src="https://images.pexels.com/photos/734428/pexels-photo-734428.jpeg" />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold font-poppins mb-8 leading-tight text-white">
                Survey <span className="text-gradient">Services</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 leading-relaxed text-gray-200">
                Advanced surveying solutions using cutting-edge technology for precise data collection, mapping, and analysis across diverse terrains and applications.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Survey Types Grid */}
      <section className="pt-12 sm:pt-14 md:pt-16 pb-12 sm:pb-16 md:pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {surveyTypes.map((survey, index) => (
              <AnimatedSection key={survey.id} delay={index * 100}>
                <div 
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer ${activeSurvey === survey.id ? 'ring-2 ring-purple-500/50' : ''}`}
                  onClick={() => setActiveSurvey(activeSurvey === survey.id ? null : survey.id)}
                >
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={survey.image}
                      alt={survey.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Survey Icon - Top Left */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${survey.color} shadow-lg`}>
                        <div className="text-white">
                          {survey.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Survey Title - Bottom Left */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{survey.title}</h3>
                      <p className="text-sm text-white/90 mt-1">{survey.shortDesc}</p>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-12 left-0 right-0 p-6 text-white">
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed opacity-90 line-clamp-3">{survey.description}</p>
                          
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="text-center">
                              <div className="text-lg font-bold">{survey.stats.accuracy}</div>
                              <div className="text-xs opacity-80">Accuracy</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{survey.stats.coverage}</div>
                              <div className="text-xs opacity-80">Coverage</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{survey.stats.speed}</div>
                              <div className="text-xs opacity-80">Speed</div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 text-sm">Key Services</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {survey.services.slice(0, 3).map((service, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                                  {service}
                                </Badge>
                              ))}
                              {survey.services.length > 3 && (
                                <Badge variant="secondary" className="text-xs bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                                  +{survey.services.length - 3} more
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

      {/* Detailed Survey Section */}
      {activeSurvey && (
        <section className="py-16 3xl:py-24 px-6 3xl:px-12 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto">
            {(() => {
              const survey = surveyTypes.find(s => s.id === activeSurvey)
              if (!survey) return null
              
              return (
                <AnimatedSection>
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${survey.color} shadow-lg mb-6`}>
                        <div className="text-white">
                          {survey.icon}
                        </div>
                      </div>
                      <h2 className="text-4xl font-bold font-poppins text-foreground mb-4">
                        {survey.title}
                      </h2>
                      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {survey.description}
                      </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-6">Our Services</h3>
                          <div className="space-y-4">
                            {survey.services.map((service, index) => (
                              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${survey.color} flex items-center justify-center`}>
                                  <div className="text-white text-sm font-bold">{index + 1}</div>
                                </div>
                                <span className="text-foreground font-medium">{service}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-6">Equipment & Technology</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {survey.equipment.map((equipment, index) => (
                              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/30 backdrop-blur-sm border border-white/20">
                                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${survey.color} flex items-center justify-center`}>
                                  <div className="text-white text-xs font-bold">{index + 1}</div>
                                </div>
                                <span className="text-foreground text-sm font-medium">{equipment}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(survey.stats).map(([key, value]) => (
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
                            <h4 className="font-semibold text-foreground mb-4">Key Advantages</h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Target className="w-5 h-5 text-primary" />
                                <span className="text-sm">High precision and accuracy in data collection</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Zap className="w-5 h-5 text-primary" />
                                <span className="text-sm">Advanced technology and modern equipment</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <span className="text-sm">Efficient and time-saving survey methods</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Shield className="w-5 h-5 text-primary" />
                                <span className="text-sm">Quality assurance and data validation</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="glass-card">
                          <CardContent className="p-6">
                            <h4 className="font-semibold text-foreground mb-4">Applications</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span>Infrastructure Development</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span>Urban Planning</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span>Construction Projects</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span>Environmental Studies</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span>Mining Operations</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span>Agriculture Mapping</span>
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

      {/* Technology Section */}
      <section className="py-16 3xl:py-24 px-6 3xl:px-12">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold font-poppins text-foreground mb-8">
                Advanced <span className="text-gradient">Technology</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Cutting-edge surveying equipment and software for precise data collection and analysis
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Total Stations", description: "High-precision angle and distance measurement", icon: <Target className="w-8 h-8" /> },
              { title: "DGPS Systems", description: "Real-time centimeter-level positioning", icon: <Satellite className="w-8 h-8" /> },
              { title: "Drone Technology", description: "Aerial surveying and 3D modeling", icon: <Plane  className="w-8 h-8" /> },
              { title: "LiDAR Systems", description: "Advanced laser scanning and point clouds", icon: <Layers className="w-8 h-8" /> },
            ].map((tech, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="glass-card glass-hover text-center h-full">
                  <CardContent className="p-8 h-fll flex flex-col">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <div className="text-primary">{tech.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{tech.title}</h3>
                    <p className="text-muted-foreground flex-grow">{tech.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 3xl:py-24 px-6 3xl:px-12 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold font-poppins text-foreground mb-8">
                Survey <span className="text-gradient">Excellence</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "4+", label: "Survey Types", icon: <Compass className="w-8 h-8" /> },
              { number: "500+", label: "Projects Completed", icon: <Award className="w-8 h-8" /> },
              { number: "±2cm", label: "Accuracy Level", icon: <Target className="w-8 h-8" /> },
              { number: "98%", label: "Client Satisfaction", icon: <Users className="w-8 h-8" /> },
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
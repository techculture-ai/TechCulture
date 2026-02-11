"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxSection } from "@/components/parallax-section"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Award,
} from "lucide-react"
import { useSite } from "@/context/siteContext"
import axios from "axios"

interface Project {
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  status?: string;
  location?: string;
  technologies?: string[];
  icon?: React.ReactNode;
}

export default function ProjectsPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activeTab, setActiveTab] = useState("completed")
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
  const [ongoingProjects, setOngoingProjects] = useState<Project[]>([]);
  const {
      projectData,
      setProjectData,
      
    } = useSite();

  useEffect(() => {
    const fetchData = async () => {
      if (!projectData) {
        try {
          const res = await axios.get(`${apiBaseUrl}/api/projects`);
          setProjectData(res.data.projects);
          console.log("Project data", res.data.projects);
        } catch (error) {
          console.log(error);
        }
      }

      if (projectData && Array.isArray(projectData)) {
        const tempCompleted = projectData.filter(
          (project) => project?.status === "completed"
        )
        const tempOngoing = projectData.filter(
          (project) => project?.status === "ongoing"
        )
        setCompletedProjects(tempCompleted);
        setOngoingProjects(tempOngoing)
      }
    };

    fetchData();
  }, [projectData, setProjectData]);
  
  const getStatusColor = (status: string) => {
    return status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  }

  const getStatusIcon = (status: string) => {
    return status === "completed" ? (<CheckCircle className="w-4 h-4" />) : (<Clock className="w-4 h-4" />)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-emerald-950/10 dark:to-slate-950">
      {/* Hero Section */}
     

      {/* Projects Overview Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10 mt-8 sm:mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0} className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Featured <span className="text-emerald-600 dark:text-emerald-400">Projects</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore our diverse portfolio of successful geospatial projects that have transformed infrastructure, planning, and decision-making across India
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tab Navigation - Moved Inside Grid Section */}
      <section className="hidden">
        <div className="max-w-5xl mx-auto hidden">
          <AnimatedSection>
            <div className="flex justify-center">
              <div className="flex glass-card rounded-full p-1.5 gap-1">
                <Button
                  onClick={() => setActiveTab("completed")}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeTab === "completed"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800 bg-white/50 dark:bg-slate-800/50"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed Projects ({completedProjects.length})
                </Button>
                <Button
                  onClick={() => setActiveTab("ongoing")}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeTab === "ongoing"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800 bg-white/50 dark:bg-slate-800/50"
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Ongoing Projects ({ongoingProjects.length})
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-6 sm:py-8 md:py-10 px-6 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-8 sm:mb-10 md:mb-12 flex justify-center">
            <AnimatedSection>
              <div className="flex glass-card rounded-full p-1.5 gap-1">
                <Button
                  onClick={() => setActiveTab("completed")}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeTab === "completed"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800 bg-white/50 dark:bg-slate-800/50"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed Projects ({completedProjects.length})
                </Button>
                <Button
                  onClick={() => setActiveTab("ongoing")}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeTab === "ongoing"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800 bg-white/50 dark:bg-slate-800/50"
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Ongoing Projects ({ongoingProjects.length})
                </Button>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeTab === "completed"
              ? completedProjects
              : ongoingProjects
            ).map((project, index) => (
              <AnimatedSection key={project._id || index} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-emerald-200/40 dark:border-emerald-800/40 hover:border-emerald-400 dark:hover:border-emerald-600 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={project.image || "/contact-banner.png"}
                      alt={project.title || "Project Image"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Category Badge - Top Left */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                        <span className="text-white text-sm font-medium">
                          {project.category || "Project"}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge - Top Right */}
                    <div className="absolute top-4 right-4 z-10">
                      <Badge
                        className={`${getStatusColor(
                          project.status || "ongoing"
                        )} bg-white/20 backdrop-blur-sm border border-white/20`}
                      >
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(project.status || "ongoing")}
                          <span className="capitalize">{project.status || "ongoing"}</span>
                        </div>
                      </Badge>
                    </div>

                    {/* Project Title - Bottom Left */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">
                        {project.title || "Project Title"}
                      </h3>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-6 left-0 right-0 p-6 text-white">
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed opacity-90 line-clamp-3">
                            {project.description || "Project description not available"}
                          </p>

                          {project.location && (
                            <div className="flex items-center space-x-2 text-sm opacity-80">
                              <MapPin className="w-4 h-4" />
                              <span>{project.location}</span>
                            </div>
                          )}

                          {project.technologies && project.technologies.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {project.technologies.map((tech, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-xs bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
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

      {/* Stats Section */}
      <section className="py-6 sm:py-8 md:py-10 px-6 bg-gradient-to-r from-gray-50 via-emerald-50/30 to-gray-50 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold font-poppins text-gray-900 dark:text-white mb-8">
                Project <span className="text-emerald-600 dark:text-emerald-400">Impact</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: `${completedProjects.length}+`,
                label: "Projects Completed",
                icon: <CheckCircle className="w-8 h-8" />,
              },
              {
                number: `${ongoingProjects.length}+`,
                label: "Active Projects",
                icon: <Clock className="w-8 h-8" />,
              },
              {
                number: "15+",
                label: "States Covered",
                icon: <MapPin className="w-8 h-8" />,
              },
              {
                number: "98%",
                label: "Client Satisfaction",
                icon: <Award className="w-8 h-8" />,
              },
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="border border-emerald-200/40 dark:border-emerald-800/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                      <div className="text-emerald-600 dark:text-emerald-400">{stat.icon}</div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-repeat opacity-50"
          style={{
            backgroundImage: `url("/home-banner-last.png")`,
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fadeInUp" delay={0}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your <span className="text-emerald-100">Project?</span>
            </h2>
            <p className="text-xl text-emerald-50 mb-12 max-w-2xl mx-auto">
              Let's discuss how our geospatial solutions can streamline your
              operations, enhance data accuracy, and support informed
              decision-making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                className="px-8 py-3 bg-white text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                asChild
              >
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                asChild
              >
                <Link href="/services">
                  View Services
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

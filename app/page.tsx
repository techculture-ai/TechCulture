"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/animated-section";
import { ParallaxSection } from "@/components/parallax-section";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  Globe,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Award,
  Target,
  Clock,
  Layers,
  Building2,
  Network,
  MapPin,
  Cpu,
  Smartphone,
  BarChart3,
  Lightbulb,
  Rocket,
  Sparkles,
  X,
  Building,
  Satellite,
} from "lucide-react";
import { TestimonialsColumn } from "@/components/testimonials-columns-1";
import { Marquee } from "@/components/marquee";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import { useSite } from "@/context/siteContext";
import axios from "axios";
import toast from "react-hot-toast";

interface Service {
  _id?: string;
  title?: string;
  description?: string;
  features?: string[];
  image?: string;
  category?: string;
}

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showEnquiryPopup, setShowEnquiryPopup] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [slicedServiceData, setSlicedServiceData] = useState<Service[]>([]);
  const [slicedProjectData, setSlicedProjectData] = useState([]);
  const [enquiryForm, setEnquiryFrom] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const {
    projectData,
    setProjectData,
    serviceData,
    setServiceData,
    testimonialData,
    setTestimonialData,
    settingsData,
    setSettingsData,
  } = useSite();

  useEffect(() => {
    async function fetchData() {
      if (!settingsData) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/site-settings`
          );
          if (res.status === 200) {
            setSettingsData(res.data.data);
            console.log("im data in the page ", res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [settingsData, setSettingsData]);

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

      if (projectData) {
        const slicedData = projectData.slice(0, 4);
        console.log("project sliced data", slicedData);
        setSlicedProjectData(slicedData);
      }
    };

    fetchData();
  }, [projectData, setProjectData]);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceData) {
        try {
          const res = await axios.get(`${apiBaseUrl}/api/services`);
          setServiceData(res.data.services);
        } catch (error) {
          console.log(error);
        }
      }
      // Ensure serviceData sliced and can render only 4
      if (serviceData) {
        const slicedData = serviceData.slice(0, 4);
        console.log("Service sliced data", slicedData);
        setSlicedServiceData(slicedData);
      }
    };

    fetchServiceData();
  }, [serviceData, setServiceData]);

  useEffect(() => {
    const fetchTestimonialData = async () => {
      if (!testimonialData) {
        try {
          const res = await axios.get(`${apiBaseUrl}/api/testimonials`);
          setTestimonialData(res.data.testimonials);
          console.log("Testimonial data", res.data.testimonials);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchTestimonialData();
  }, [testimonialData, setTestimonialData]);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setShowCookieConsent(false);
    }

    // Show enquiry popup after 45 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenEnquiryPopup");
      if (!hasSeenPopup) {
        setShowEnquiryPopup(true);
        sessionStorage.setItem("hasSeenEnquiryPopup", "true");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const servicesIcon = [
    {
      icon: <Globe className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Network className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const firstColumn =
    !testimonialData || testimonialData.length === 0
      ? []
      : testimonialData.slice(0, 3);
  const secondColumn =
    !testimonialData || testimonialData.length === 0
      ? []
      : testimonialData.slice(3, 6);
  const thirdColumn =
    !testimonialData || testimonialData.length === 0
      ? []
      : testimonialData.slice(0, 3);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEnquiryFrom({
      ...enquiryForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!enquiryForm.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!enquiryForm.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!enquiryForm.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!enquiryForm.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enquiryForm.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const loadingToast = toast.loading("Submitting your enquiry...");

    try {
      const res = await axios.post(`${apiBaseUrl}/api/enquiries`, enquiryForm);

      if (res.status === 201) {
        toast.dismiss(loadingToast);
        toast.success(
          "Enquiry submitted successfully! We'll get back to you soon."
        );
        setEnquiryFrom({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setShowEnquiryPopup(false);
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to submit enquiry. Please try again.");
      }
    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("Error submitting enquiry form:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        toast.error("Invalid form data. Please check your information.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(
          "Failed to submit enquiry. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <video
            className="-z-50 w-full h-full object-cover"
            src="/earthv2.mp4"
            autoPlay
            loop
            muted
          ></video>
          {/* Enhanced overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/35"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp" delay={0}>
            <h1 className="mb-8 sm:mb-10 leading-[0.9] tracking-tight">
              <span
                className="block font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  textShadow:
                    "3px 3px 12px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 1), 0px 0px 20px rgba(0, 0, 0, 0.5)",
                  letterSpacing: "-0.04em",
                }}
              >
                TRANSFORMING
              </span>
              <span
                className="block font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  textShadow:
                    "3px 3px 12px rgba(0, 0, 0, 0.9), 1px 1px 3px rgba(0, 0, 0, 1), 0px 0px 20px rgba(0, 0, 0, 0.5)",
                  letterSpacing: "-0.03em",
                }}
              >
                INFRASTRUCTURE
              </span>
              <span className="block bg-gradient-to-b from-white  to-gray-800 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                THROUGH TECHNOLOGY
              </span>
            </h1>

            {/* Accent line */}
            <div
              className="mx-auto mb-6 sm:mb-8 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              style={{
                width: "150px",
              }}
            ></div>

            {/* Subtitle */}
            <div
              className="text-xs sm:text-sm md:text-base text-white/70 font-mono tracking-[0.2em] uppercase font-bold"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              PRECISION • INNOVATION • TRANSFORMATION
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* about us section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 imageBgLeft">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">
            {/* Image Section */}
            <AnimatedSection animation="fadeInLeft">
              <div className="relative flex ">
                <Image
                  src="/about2.png"
                  alt="TechCulture Solutions Team"
                  width={500} // Increased from 350
                  height={350}
                  className="rounded-lg w-full h-auto max-w-md sm:max-w-lg object-cover shadow-2xl border border-white/20 backdrop-blur-sm"
                />
              </div>
            </AnimatedSection>

            {/* Text Section */}
            <AnimatedSection animation="fadeInRight">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                  We believe in the transformative power of{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    geospatial intelligence
                  </span>
                </h2>

                <p className="text-base sm:text-lg lg:text-gray-600 text-gray-800 mb-6 sm:mb-8 leading-relaxed">
                  We are a leading geospatial technology company specializing in
                  GIS, Remote Sensing, and Surveying Services. We deliver
                  innovative spatial solutions that help clients transform
                  location-based data into actionable insights.
                </p>

                <p className="text-base sm:text-lg lg:text-gray-600 text-gray-800 mb-6 sm:mb-8 leading-relaxed">
                  Established with the vision to bring precision and
                  intelligence to spatial decision-making, we have successfully
                  delivered projects across government, infrastructure,
                  utilities, and environmental sectors. Our team is driven by
                  domain expertise, innovation, and a commitment to quality.
                </p>

                <Button
                  variant="default"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-full"
                  asChild
                >
                  <Link href="/about">
                    Learn More About Us <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Revolutionary Services Section - Redesigned */}
      <section className="py-32 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden earthBg2">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="text-center mb-24">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-full border border-white/10">
                <div className="relative">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-white font-semibold tracking-wide uppercase text-sm">
                  Revolutionary Services
                </span>
              </div>

              {/* Massive Title */}
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.85]" >
                <span className="block mb-4">NEXT-GEN</span>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  GEOSPATIAL
                </span>
                <span className="text-4xl md:text-5xl lg:text-6xl font-medium text-white block mt-4">
                  SOLUTIONS
                </span>
              </h2>

              <p
                className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-12 max-w-5xl mx-auto font-light"
                style={{
                  textShadow: "2px 2px 4px #000, 0 0 5px #000",
                }}
              >
                Transforming industries with cutting-edge spatial intelligence,
                advanced analytics, and revolutionary mapping technologies that
                redefine what's possible.
              </p>

              
            </div>
          </AnimatedSection>

          {/* Large Service Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {serviceData &&
              slicedServiceData.map((service, index) => (
                <AnimatedSection
                  key={index}
                  delay={index * 200}
                  animation="fadeInUp"
                >
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-500/20 h-[400px] md:h-[500px]">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                      style={{
                        backgroundImage: `url(${
                          service.image || "/contact-banner.png"
                        })`,
                      }}
                    ></div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent md:from-black/60 md:via-black/40"></div>

                    {/* Floating Icon */}
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r ${servicesIcon[index].color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}
                      >
                        <span className="text-white text-lg md:text-xl">
                          {servicesIcon[index].icon}
                        </span>
                      </div>
                    </div>

                    {/* Service Number */}
                    <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
                      <div className="text-4xl md:text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full p-6 md:p-8 flex flex-col justify-end z-10">
                      {/* Mobile spacing to avoid icon overlap */}
                      <div className="mb-20 md:mb-0"></div>
                      <div className="space-y-4 md:space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-500 leading-tight">
                          {service.title}
                        </h3>

                        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Enhanced Features */}
                        <div className="space-y-2 md:space-y-3">
                          {service.features?.slice(0, 3).map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-500"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 md:mr-4 flex-shrink-0"></div>
                              <span className="text-xs md:text-sm font-medium">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Action Button */}
                        <div className="pt-3 md:pt-4">
                          <Button
                            variant="outline"
                            className="bg-white/10 border-white/20 backdrop-blur-xl text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 rounded-xl px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold"
                            asChild
                          >
                            <Link href="/services">
                              Discover More
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-700"></div>
                  </div>
                </AnimatedSection>
              ))}
          </div>

          {/* Enhanced CTA */}
          <AnimatedSection animation="fadeInUp" className="text-center">
            <div className="relative inline-block">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

              <Button
                variant="default"
                className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white px-12 py-6 text-xl font-bold rounded-3xl shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 border-2 border-white/20"
                asChild
              >
                <Link href="/services" className="group">
                  <span className="relative z-10 flex items-center">
                    Explore All Services
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Link>
              </Button>
            </div>

            <p className="text-gray-400 mt-6 text-lg">
              Ready to transform your business? Let's build the future together.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Modern Success Stories Section - Redesigned */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/30 imageBgRight">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-800 dark:text-green-300 tracking-wide uppercase">
                  Success Stories
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 leading-[0.9]">
                <span className="block mb-2">
                  Real{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Projects
                  </span>
                </span>
                
              </h2>

              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  From smart cities to precision agriculture, explore our
                  portfolio of groundbreaking projects that showcase the power
                  of geospatial technology in action.
                </p>

              </div>
            </div>
          </AnimatedSection>

          {/* Uniform Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projectData &&
              slicedProjectData.map((project: any, index: number) => (
                <AnimatedSection key={project._id} delay={index * 150}>
                  <div className="group h-full">
                    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col">
                      {/* Image Container with Consistent Height */}
                      <div className="relative overflow-hidden h-64 flex-shrink-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                        {/* Floating Category Tag */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/90 text-gray-900 dark:text-white backdrop-blur-sm">
                            {project.category || "Geospatial"}
                          </span>
                        </div>

                        {/* Project Number Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {(index + 1).toString().padStart(2, "0")}
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                          {project.description}
                        </p>

                        {/* Tags */}
                        {project.technologies && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies
                              .slice(0, 3)
                              .map((tech: string, techIndex: number) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        )}

                        {/* Status Bar - Always at bottom */}
                        <div className="flex items-center justify-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50 mt-auto">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Completed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
          </div>

          <AnimatedSection animation="fadeInUp" className="mt-16 text-center">
            <Button
              variant="default"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              asChild
            >
              <Link href="/projects">
                View All Projects <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <WorkExperienceSection />

      {/* Modern Testimonials Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge
                variant="secondary"
                className="mb-4 px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              >
                Client Testimonials
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                What Our{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Clients Say
                </span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="flex justify-center gap-6 w-full">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={19}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
          </div>
        </div>
      </section>
      {/* Technology Partners Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 ">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <Badge
                variant="secondary"
                className="mb-4 px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              >
                Technology Partners
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Leading{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Technology Providers
                </span>
              </h2>
              <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We collaborate with the world’s top technology companies to
                deliver robust, scalable, and innovative solutions for our
                clients.
              </p>
            </div>
          </AnimatedSection>

          {/* <LogoCarousel columnCount={5} logos={partners} /> */}
          {settingsData && (
            <Marquee>
              {settingsData.clients.map((Logo: string, index: number) => (
                <div
                  key={index}
                  className="relative min-h-[80px] w-[180px] mx-8 flex items-center justify-start"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={Logo}
                      alt={Logo}
                      width={120}
                      height={60}
                      className="w-auto h-16 object-contain "
                    />
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                  </div>
                </div>
              ))}
            </Marquee>
          )}
        </div>
      </section>

      {/* Modern Contact Form Section */}

      <section className="py-12 px-4 relative overflow-hidden min-h-screen imageBgLeft">
        {/* Enhanced background with gradients */}
        <div className="absolute inset-0 bg-gradient-to-br  "></div>

        <div className="max-w-7xl mx-auto relative z-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center  h-full">
            {/* Left side with enhanced content */}
            <AnimatedSection animation="fadeInLeft" className="h-full">
              <div className="relative h-full">

                <div className="relative z-10 mb-8">
                  {/* Tech-inspired subtitle */}
                  <div
                    className="text-sm font-mono tracking-[0.2em] uppercase text-blue-600/80 dark:text-blue-400/80 mb-4"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    GET IN TOUCH
                  </div>

                  <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Let's Start Your{" "}
                    <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Digital Transformation
                    </span>
                  </h2>

                  <p
                    className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Ready to revolutionize your business operations? Our team of
                    geospatial experts is here to transform your vision into
                    reality with cutting-edge technology solutions.
                  </p>

                  {/* Feature highlights */}
                </div>

                {/* Enhanced image max-w-7xl */}
                <div className="relative mt-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl filter blur-xl transform rotate-1"></div>
                  <Image
                    src="/contact-banner.png"
                    alt="Digital Transformation Visualization"
                    width={600}
                    height={400}
                    className="relative rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Right side with enhanced glass form */}
            <AnimatedSection animation="fadeInRight" className="h-full">
              <div className="relative h-full">
                {/* Glass morphism max-w-7xl */}
                <div className="relative p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden h-full">
                  {/* Glass background */}
                  <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-2xl"></div>

                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>

                  {/* Inner glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>

                  {/* Form content */}
                  <div className="relative z-10 mt-5">
                    <div className="text-center mb-8">
                      <h3
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        Start Your Journey
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Fill out the form below and we'll get back to you within
                        24 hours
                      </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={enquiryForm.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 rounded-xl border border-white/30 dark:border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">
                            Email Address
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={enquiryForm.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-4 rounded-xl border border-white/30 dark:border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                            placeholder="your.email@company.com"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={enquiryForm.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 rounded-xl border border-white/30 dark:border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                          placeholder="+91 1234567890"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">
                          Project Details
                        </label>
                        <textarea
                          rows={5}
                          id="message"
                          name="message"
                          value={enquiryForm.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 rounded-xl border border-white/30 dark:border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none"
                          placeholder="Tell us about your project requirements, timeline, and goals..."
                        ></textarea>
                      </div>

                      {/* Enhanced submit button */}
                      <button
                        type="submit"
                        className="w-full relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group"
                        style={{
                          background:
                            "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>Send Message</span>
                          <svg
                            className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>

                      {/* Trust indicators */}
                      <div className="text-center pt-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
                          <svg
                            className="w-4 h-4 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Your information is secure and encrypted</span>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fadeInUp" delay={0}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Infrastructure
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Let's discuss how our geospatial solutions can streamline your
              operations, enhance data accuracy, and support informed
              decision-making.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 glass-nav dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We use cookies to enhance your experience. By continuing to
                visit this site you agree to our use of cookies.{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCookieConsent(false);
                  localStorage.setItem("cookieConsent", "false");
                }}
              >
                Decline
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                onClick={() => {
                  setShowCookieConsent(false);
                  localStorage.setItem("cookieConsent", "true");
                }}
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Enquiry Form */}
      {showEnquiryPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowEnquiryPopup(false)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <X />
            </button>

            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Get a Free Consultation
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Leave your details and we'll get back to you shortly!
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    value={enquiryForm.name}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    id="email"
                    name="email"
                    onChange={handleInputChange}
                    value={enquiryForm.email}
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    id="phone"
                    name="phone"
                    onChange={handleInputChange}
                    value={enquiryForm.phone}
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    onChange={handleInputChange}
                    value={enquiryForm.message}
                    placeholder="How can we help you?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 outline-none"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

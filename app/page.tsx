"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/animated-section";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Layers,
  Building2,
  Network,
  X,
} from "lucide-react";
import { TestimonialsColumn } from "@/components/testimonials-columns-1";
import { Marquee } from "@/components/marquee";
import { TypewriterServices } from "@/components/typewriter-services";
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
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showEnquiryPopup, setShowEnquiryPopup] = useState(false);
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [slicedServiceData, setSlicedServiceData] = useState<Service[]>([]);
  const [slicedProjectData, setSlicedProjectData] = useState([]);
  const [enquiryForm, setEnquiryForm] = useState({
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
        const slicedData = projectData.slice(0, 9);
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
    setEnquiryForm({
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
        setEnquiryForm({
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
      {/* Clean & Minimal Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 mt-16">
          <AnimatedSection animation="fadeInUp" delay={0}>
            {/* Minimal badge */}
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20">
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Geospatial Innovation</span>
            </div>

            {/* Clean heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
              Advanced Geospatial Solutions
            </h1>

            {/* Animated Services Typewriter */}
            <div className="h-20 sm:h-24 flex items-center justify-center mb-10">
              <TypewriterServices services={[
                "GIS Platform Development",
                "3D Geospatial Modelling",
                "Urban Planning & Development",
                "Network Asset Management for Utilities",
                "Customized GIS App Development",
                "Data Conversion & Geoprocessing"
              ]} />
            </div>

            {/* Clean subheading */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Enterprise-grade spatial technology powering smarter decisions for governments and global organizations.
            </p>

            {/* Clean CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                asChild
              >
                <Link href="#services">Explore Services</Link>
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                asChild
              >
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Subtle gradient overlay - minimal */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 dark:to-slate-950/20 pointer-events-none"></div>
      </section>

      {/* Clean & Minimal About Section */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-blue-50/40 dark:from-slate-950 dark:to-blue-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Section - Minimal */}
            <AnimatedSection animation="fadeInLeft" delay={0}>
              <div className="relative">
                <Image
                  src="/about2.png"
                  alt="TechCulture Solutions"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-lg -z-10"></div>
              </div>
            </AnimatedSection>

            {/* Text Section - Clean */}
            <AnimatedSection animation="fadeInRight" delay={100}>
              <div className="space-y-8">
                {/* Section label */}
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700">
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">About Us</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  Why Choose
                  <span className="block text-emerald-600 dark:text-emerald-400">TechCulture Solutions?</span>
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  With over 15 years of expertise in geospatial technology, we deliver enterprise-grade solutions that transform data into actionable intelligence for governments and global organizations.
                </p>

                {/* Simple bullet points */}
                <div className="space-y-4">
                  {[
                    { title: "500+ Successful Projects", desc: "Across 50+ countries worldwide" },
                    { title: "50+ Expert Professionals", desc: "PhD-level specialists with deep domain expertise" },
                    { title: "ISO 9001:2015 Certified", desc: "Guaranteed quality and compliance standards" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-1" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Single CTA */}
                <div className="pt-6">
                  <Button
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                    asChild
                  >
                    <Link href="/about">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Clean Services Section */}
      <section id="services" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-emerald-50/40 to-gray-50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          {/* Section Header */}
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-8 relative z-10">
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-6">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Our Services</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Comprehensive Geospatial <span className="text-emerald-600 dark:text-emerald-400">Services</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Enterprise solutions designed to meet your organization's spatial data and intelligence needs.
              </p>
            </div>
          </AnimatedSection>

          {/* Services Slider */}
          <div className="relative mb-12">
            {/* Slider Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${(currentServiceSlide * 100) / 3}%)`,
                }}
              >
                {serviceData &&
                  slicedServiceData.map((service, index) => {
                    const backgroundImages = [
                      "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22><defs><linearGradient id=%22g1%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22><stop offset=%220%25%22 style=%22stop-color:rgba(16,185,129,0.1);stop-opacity:1%22 /><stop offset=%22100%25%22 style=%22stop-color:rgba(16,185,129,0.05);stop-opacity:1%22 /></linearGradient></defs><rect width=%22400%22 height=%22400%22 fill=%22url(%23g1)%22/><circle cx=%22100%22 cy=%2250%22 r=%2260%22 fill=%22rgba(16,185,129,0.08)%22/><circle cx=%22350%22 cy=%22350%22 r=%2280%22 fill=%22rgba(16,185,129,0.06)%22/></svg>')",
                      "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22><defs><linearGradient id=%22g2%22 x1=%22100%25%22 y1=%220%25%22 x2=%220%25%22 y2=%22100%25%22><stop offset=%220%25%22 style=%22stop-color:rgba(16,185,129,0.1);stop-opacity:1%22 /><stop offset=%22100%25%22 style=%22stop-color:rgba(16,185,129,0.05);stop-opacity:1%22 /></linearGradient></defs><rect width=%22400%22 height=%22400%22 fill=%22url(%23g2)%22/><path d=%22M50,200 Q100,100 200,150 T350,200%22 stroke=%22rgba(16,185,129,0.1)%22 stroke-width=%224%22 fill=%22none%22/></svg>')",
                      "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22><defs><linearGradient id=%22g3%22 x1=%2250%25%22 y1=%2250%25%22 r=%2260%25%22><stop offset=%220%25%22 style=%22stop-color:rgba(16,185,129,0.08);stop-opacity:1%22 /><stop offset=%22100%25%22 style=%22stop-color:rgba(16,185,129,0.02);stop-opacity:1%22 /></linearGradient></defs><rect width=%22400%22 height=%22400%22 fill=%22url(%23g3)%22/><polygon points=%22200,50 350,200 200,350 50,200%22 fill=%22none%22 stroke=%22rgba(16,185,129,0.1)%22 stroke-width=%223%22/></svg>')",
                      "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22><defs><linearGradient id=%22g4%22 x1=%220%25%22 y1=%22100%25%22 x2=%22100%25%22 y2=%220%25%22><stop offset=%220%25%22 style=%22stop-color:rgba(16,185,129,0.1);stop-opacity:1%22 /><stop offset=%22100%25%22 style=%22stop-color:rgba(16,185,129,0.05);stop-opacity:1%22 /></linearGradient></defs><rect width=%22400%22 height=%22400%22 fill=%22url(%23g4)%22/><circle cx=%22200%22 cy=%22200%22 r=%22100%22 fill=%22none%22 stroke=%22rgba(16,185,129,0.1)%22 stroke-width=%222%22/><circle cx=%22200%22 cy=%22200%22 r=%2250%22 fill=%22none%22 stroke=%22rgba(16,185,129,0.08)%22 stroke-width=%222%22/></svg>')",
                    ];

                    return (
                      <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-4">
                        <div 
                          className="group relative h-full rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-500"
                        >
                          {/* Background Pattern */}
                          <div 
                            className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                            style={{
                              backgroundImage: backgroundImages[index],
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/90 to-white/80 dark:from-slate-800/90 dark:via-slate-800/95 dark:to-slate-800/90"></div>

                          {/* Content */}
                          <div className="relative z-10 p-8 h-full flex flex-col min-h-[450px]">
                            {/* Icon and number */}
                            <div className="flex items-start justify-between mb-6">
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-900/20 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                {servicesIcon[index]?.icon && (
                                  <div className="text-emerald-600 dark:text-emerald-300 text-2xl">
                                    {servicesIcon[index].icon}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                              {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed text-sm flex-grow">
                              {service.description}
                            </p>

                            {/* Features */}
                            {service.features && service.features.length > 0 && (
                              <ul className="space-y-2 mb-6">
                                {service.features.slice(0, 3).map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Hover CTA */}
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <span>Learn More</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>

                          {/* Top border accent */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentServiceSlide((prev) => (prev - 1 + slicedServiceData.length) % slicedServiceData.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:translate-x-0 z-20 p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setCurrentServiceSlide((prev) => (prev + 1) % slicedServiceData.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-0 z-20 p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {slicedServiceData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentServiceSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentServiceSlide
                      ? "bg-emerald-600 w-8"
                      : "bg-gray-300 dark:bg-gray-600 w-3 hover:bg-emerald-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <AnimatedSection animation="fadeInUp" className="text-center relative z-10">
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

      {/* Clean Projects Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-6">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">✨ Success Stories</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Featured <span className="text-emerald-600 dark:text-emerald-400">Projects</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Transforming data into actionable intelligence across diverse industries
              </p>
            </div>
          </AnimatedSection>

          {/* Projects Slider */}
          <div className="relative mb-16">
            {/* Slider Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${slicedProjectData.length > 0 ? (currentProjectSlide * 100) / 3 : 0}%)`,
                }}
              >
                {slicedProjectData && slicedProjectData.length > 0 &&
                  slicedProjectData.map((project: any, index: number) => (
                    <div key={project._id} className="w-full md:w-1/3 flex-shrink-0 px-3">
                      <div className="group relative h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800/80 backdrop-blur border border-gray-200/60 dark:border-slate-700/60 hover:border-blue-400/80 dark:hover:border-blue-600/80 shadow-lg hover:shadow-2xl transition-all duration-500">
                        {/* Image Container with enhanced overlay */}
                        <div className="relative h-72 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-125 transition-transform duration-700"
                          />
                          
                          {/* Advanced gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Category badge - Enhanced */}
                          <div className="absolute top-4 right-4 z-20">
                            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                              {project.category || "Project"}
                            </span>
                          </div>

                          {/* Status indicator - Enhanced */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-md text-white text-xs font-semibold shadow-lg z-20">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span>Completed</span>
                          </div>
                        </div>

                        {/* Content - Redesigned */}
                        <div className="p-8 space-y-4">
                          {/* Title */}
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 text-sm">
                            {project.description}
                          </p>

                          {/* Tech tags - Redesigned */}
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                                <span key={idx} className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Divider */}
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4"></div>

                          {/* View button - Enhanced */}
                          <div className="flex items-center justify-between gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-2">
                            <span className="group-hover:translate-x-1 transition-transform duration-300">View Case Study</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>

                        {/* Top border accent - Enhanced */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Navigation Arrows - Redesigned */}
            {slicedProjectData.length > 0 && (
              <>
                <button
                  onClick={() => setCurrentProjectSlide((prev) => (prev - 1 + slicedProjectData.length) % slicedProjectData.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:translate-x-0 z-20 p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setCurrentProjectSlide((prev) => (prev + 1) % slicedProjectData.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-0 z-20 p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all shadow-lg hover:shadow-xl"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots Indicator - Redesigned */}
                <div className="flex justify-center gap-3 mt-12">
                  {slicedProjectData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProjectSlide(index)}
                      className={`h-3 rounded-full transition-all ${
                        index === currentProjectSlide
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 w-8 shadow-md"
                          : "bg-gray-300 dark:bg-gray-600 w-3 hover:bg-blue-400 dark:hover:bg-blue-500"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* View all CTA */}
          <AnimatedSection animation="fadeInUp" className="text-center">
            <Button
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3"
              asChild
            >
              <Link href="/projects">
                View All Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <WorkExperienceSection />

      {/* Modern Testimonials Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white to-indigo-50/20 dark:from-slate-950 dark:to-indigo-950/20">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/5 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/5 dark:bg-blue-900/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-6">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">⭐ Client Testimonials</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                What Our <span className="text-emerald-600 dark:text-emerald-400">Clients Say</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Discover how organizations worldwide leverage TechCulture Solutions to transform their geospatial data into strategic competitive advantages
              </p>
            </div>
          </AnimatedSection>

          {/* Testimonials Grid */}
          <div className="flex justify-center gap-6 w-full mb-16">
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

          {/* Stats Section */}
           

          {/* Bottom CTA */}
          <AnimatedSection animation="fadeInUp" className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Ready to join leading organizations transforming their operations?
            </p>
            <Button
              className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              asChild
            >
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
      {/* Technology Partners Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-6">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">🤝 Strategic Partnerships</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Trusted by Leading <span className="text-emerald-600 dark:text-emerald-400">Technology Providers</span>
              </h2>
              <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We collaborate with the world’s top technology companies to
                deliver robust, scalable, and innovative solutions for our
                clients.
              </p>
            </div>
          </AnimatedSection>

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

      {/* Clean Contact Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <AnimatedSection animation="fadeInLeft">
              <div className="space-y-8">
                <div>
                  <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-6">
                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">💬 Contact Us</span>
                  </div>
                  <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    Let's Work <span className="text-emerald-600 dark:text-emerald-400">Together</span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Ready to transform your organization with cutting-edge geospatial solutions? Our team is ready to discuss your requirements and create a tailored approach for your unique challenges.
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-4">
                  {[
                    { icon: Globe, label: "Global Reach", value: "Operating in 50+ countries" },
                    { icon: Clock, label: "Quick Response", value: "24-hour turnaround time" },
                    { icon: Shield, label: "Secure & Compliant", value: "ISO 9001:2015 certified" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                          <item.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right side - Form */}
            <AnimatedSection animation="fadeInRight">
              <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={enquiryForm.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={enquiryForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={enquiryForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={enquiryForm.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Clean CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fadeInUp">
            <div className="inline-block px-4 py-2 rounded-full bg-emerald-50/20 dark:bg-emerald-900/30 border border-emerald-300/50 dark:border-emerald-700/50 mb-6">
              <span className="text-sm font-bold text-emerald-100 dark:text-emerald-300">🚀 Get Started</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to <span className="text-emerald-200">Get Started?</span>
            </h2>
            <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto">
              Join 500+ organizations that trust TechCulture Solutions for their geospatial needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="px-8 py-3 bg-white text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                asChild
              >
                <Link href="/contact">
                  Schedule a Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                asChild
              >
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
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

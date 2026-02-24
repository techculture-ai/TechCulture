"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/animated-section";
import { GlowingCard } from "@/components/GlowingCard";
import {
  Map,
  Globe,
  Building2,
  Network,
  Code,
  Database,
  Layers,
  Compass,
  Smartphone,
  Zap,
  Target,
  Users,
  ArrowRight,
  CheckCircle,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/context/siteContext";
import axios from "axios";

const ServicePage = () => {
  const [coreServices, setCoreServices] = React.useState<Service[]>([])
  const [mainServices, setMainServices] = React.useState<Service[]>([])
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const {
    serviceData,
    setServiceData,
  } = useSite();

  interface Service {
    _id?: string;
    title?: string;
    description?: string;
    features?: string[];
    image?: string;
    category? : string;
  }

  

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

      //filter according to the category if core added in the core otherwise main 
      if(serviceData){
        const tempCore = serviceData.filter(
          (service: Service) => service.category === "core"
        );
        const tempMain = serviceData.filter(
          (service: Service) => service.category === "main"
        );

        setCoreServices(tempCore);
        setMainServices(tempMain);
      }
    };

    fetchServiceData();
  }, [serviceData, setServiceData]);



  const coreServicesIcon = [
    {
      icon: <Globe className="w-12 h-12" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Layers className="w-12 h-12" />,
      color: "from-purple-500 to-pink-500",
      delay: 200,
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      color: "from-green-500 to-emerald-500",
      delay: 400,
    },
    {
      icon: <Network className="w-12 h-12" />,
      color: "from-orange-500 to-red-500",
      delay: 600,
    },
    {
      icon: <Code className="w-12 h-12" />,
      color: "from-red-500 to-yellow-500",
      delay: 800,
    },
    {
      icon: <Database className="w-12 h-12" />,
      color: "from-blue-500 to-indigo-500",
      delay: 1000,
    },
  ];

  const mainServicesIcon = [
    {
      icon: <Map className="w-8 h-8" />,
    },
    {
      icon: <Smartphone className="w-8 h-8" />, 
    },
    {
      icon: <Compass className="w-8 h-8" />,
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Projects Completed",
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Expert Team Members",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-emerald-950/10 dark:to-slate-950">
        {/* Hero Section */}
     

        {/* Services Overview Section */}
        <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10 mt-8 sm:mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0} className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Our Core <span className="text-emerald-600 dark:text-emerald-400">Services</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Comprehensive geospatial solutions designed to transform your business operations
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="py-6 sm:py-8 md:py-10 px-6 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
          <div className="max-w-7xl mx-auto">
            {coreServices && coreServices.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreServices.map((service, index) => {
                  const iconData = coreServicesIcon[index] || coreServicesIcon[0]; // Fallback to first icon
                  return (
                  <AnimatedSection
                    key={service._id || index}
                    animation="fadeInUp"
                    delay={iconData?.delay || 0}
                  >
                    <Card className="group relative overflow-hidden border border-emerald-200/30 dark:border-emerald-800/50 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 h-full rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-emerald-400 dark:hover:border-emerald-600">
                      {/* Background Image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-40 z-10" />
                      {/* Top border accent - emerald */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent z-30"></div>
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${
                            service.image || "/contact-banner.png"
                          })`,
                          filter: "brightness(0.9) contrast(1.1)",
                        }}
                      />

                      {/* Icon at the top */}
                      {/* <div className="absolute top-4 left-4 z-20 flex items-center justify-center gap-2 ">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                        {service.title}
                      </h3>
                  </div> */}

                      {/* Content that slides up */}
                      {/* <div className="absolute inset-0 flex flex-col justify-end transform translate-y-[90%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"> */}
                      {/* Glass background */}
                      <div className="absolute inset-0 backdrop-blur-xl bg-white/5 dark:bg-black/20 transform xl:translate-y-[90%] xl:group-hover:translate-y-0 xl:ransition-transform duration-500 z-10" />

                      {/* Content */}
                      <CardContent className="relative h-full p-6 flex flex-col z-10">
                        <div className="flex items-start">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-r ${iconData?.color || 'from-emerald-500 to-emerald-600'} text-white group-hover:scale-110 transition-transform duration-300`}
                          >
                            {iconData?.icon || <Globe className="w-12 h-12" />}
                          </div>
                          <h3 className="flex-1 text-xl font-bold text-white ml-4 group-hover:text-emerald-300 transition-colors">
                            {service.title || 'Service Title'}
                          </h3>
                        </div>
                        {/* <h3 className="text-2xl font-bold text-white">
                        {service.title}
                      </h3> */}
                        <div className="mt-auto xl:transform xl:translate-y-[100%] xl:group-hover:translate-y-0 xl:transition-transform duration-500 delay-100 pt-4">
                          <p className="text-gray-100 leading-relaxed transform xl:opacity-0 xl:group-hover:opacity-100 xl:transition-opacity duration-500 delay-100">
                            {service.description || 'Service description not available'}
                          </p>
                          <div className="space-y-2 transform xl:opacity-0 xl:group-hover:opacity-100 xl:transition-opacity duration-500 delay-200">
                            {service.features && service.features.length > 0 ? service.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center text-sm text-gray-200"
                              >
                                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                {feature}
                              </div>
                            )) : null}
                          </div>
                        </div>
                      </CardContent>
                      {/* </div> */}
                    </Card>
                  </AnimatedSection>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-6 sm:py-8 md:py-10 px-6 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection
              animation="fadeInUp"
              delay={0}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Why Choose <span className="text-emerald-600 dark:text-emerald-400">TechCulture?</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Proven track record of delivering exceptional results
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedSection
                  key={index}
                  animation="scaleIn"
                  delay={index * 100}
                >
                  <Card className="text-center p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-emerald-200/40 dark:border-emerald-800/50 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-2xl">
                    <CardContent className="p-0">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* main Services Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection
              animation="fadeInUp"
              delay={0}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Service <span className="text-emerald-600 dark:text-emerald-400">Portfolio</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                At TechCulture Solutions Private Limited, we deliver modern
                geospatial technology, software, and field engineering solutions
                tailored to your sector.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mainServices && mainServices.length > 0 ? mainServices.map((service, index) => {
                const iconData = mainServicesIcon[index] || mainServicesIcon[0]; // Fallback to first icon
                return (
                <AnimatedSection
                  key={service._id || index}
                  animation="fadeInUp"
                  delay={index * 200}
                >
                  <Card className="group relative overflow-hidden border border-emerald-200/30 dark:border-emerald-800/50 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 h-full rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-emerald-400 dark:hover:border-emerald-600">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent z-20"></div>
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-40 z-10" />
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${
                          service.image || "/contact-banner.png"
                        })`,
                        filter: "brightness(0.9) contrast(1.1)",
                      }}
                    />

                    {/* Icon at the top */}

                    {/* Content that slides up */}
                    {/* <div className="absolute inset-0 backdrop-blur-xl bg-white/5 dark:bg-black/20 transform translate-y-[90%] group-hover:translate-y-0 transition-transform duration-500 z-10"> */}
                    {/* Glass background */}
                    <div className="absolute inset-0 backdrop-blur-xl bg-white/5 dark:bg-black/20 transform translate-y-[90%] group-hover:translate-y-0 transition-transform duration-500 z-10" />

                    {/* Content */}
                    <CardContent className="relative h-full p-6 flex flex-col z-10">
                      <div className="flex items-start">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {iconData?.icon || <Map className="w-8 h-8" />}
                        </div>
                        <h3 className="flex-1 text-lg font-bold text-white ml-4 group-hover:text-emerald-200 transition-colors">
                          {service.title || 'Service Title'}
                        </h3>
                      </div>

                      <div className="mt-auto transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 delay-100 pt-4">
                        {/* <h3 className="text-2xl font-bold text-white">
                        {service.title}
                      </h3> */}
                        <p className="text-gray-100 leading-relaxed transform opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {service.description || 'Service description not available'}
                        </p>
                        <div className="space-y-2 transform opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          {service.features && service.features.length > 0 ? service.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center text-sm text-gray-200"
                            >
                              <CheckCircle className="w-4 h-4 mr-3 text-green-400 flex-shrink-0" />
                              {feature}
                            </div>
                          )) : null}
                        </div>
                      </div>
                    </CardContent>
                    {/* </div> */}
                  </Card>
                </AnimatedSection>
                );
              }) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">No services available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-18 md:py-20 px-4 relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600">
          {/* <div
            className="absolute inset-0 bg-fixed bg-center bg-repeat "
            style={{
              backgroundImage: `url("/earth3.jpg")`,
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
              objectFit: "cover",
              backgroundSize: "cover",
            }}
          ></div> */}

          <div className="relative max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fadeInUp" delay={0}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
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
                    Get Started Today
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                  asChild
                >
                  <Link href="/projects">
                    View Our Work
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicePage;

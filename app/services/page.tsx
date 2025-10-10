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
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden pb-20 pt-30 px-6 bg-gradient-to-b from-sky-400 via-sky-200 to-sky-50">
          <div className="absolute inset-0">
            <Image
              fill
              alt="referenceImage"
              className="object-cover"
              src="./services-banner.png"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            <AnimatedSection animation="fadeInUp" delay={0}>
              <h1 className="text-6xl md:text-8xl font-bold font-poppins mb-8 leading-tight text-white">
                What <span className="text-gradient">We Do</span>
              </h1>
              <p className="text-xl md:text-2xl  dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-300">
                Turning Geospatial Data into Intelligent Solutions
              </p>
              <p className="text-lg text-gray-200 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
                TechCulture offers a full suite of GIS-powered services,
                combining hardware, software, and enterprise-level applications
                in one integrated platform.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="py-20 px-4 bg-white dark:bg-gray-900 imageBgRight">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection
              animation="fadeInUp"
              delay={0}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6  dark:from-white dark:to-blue-200 bg-clip-text ">
                Our Core <span className="text-gradient">Services</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive geospatial solutions designed to transform your
                business operations
              </p>
            </AnimatedSection>

            {coreServices && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreServices.map((service, index) => (
                  <AnimatedSection
                    key={index}
                    animation="fadeInUp"
                    delay={coreServicesIcon[index].delay}
                  >
                    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                      {/* Background Image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-50 z-10" />
                      {/* upper border color */}
                      <div
                        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${coreServicesIcon[index].color} z-30`}
                      ></div>
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
                            className={`p-3 rounded-xl bg-gradient-to-r ${coreServicesIcon[index].color} text-white group-hover:scale-110 transition-transform duration-300`}
                          >
                            {coreServicesIcon[index].icon}
                          </div>
                          <h3 className="flex-1 text-xl font-bold text-white ml-4 group-hover:text-blue-300 transition-colors">
                            {service.title}
                          </h3>
                        </div>
                        {/* <h3 className="text-2xl font-bold text-white">
                        {service.title}
                      </h3> */}
                        <div className="mt-auto xl:transform xl:translate-y-[100%] xl:group-hover:translate-y-0 xl:transition-transform duration-500 delay-100 pt-4">
                          <p className="text-gray-100 leading-relaxed transform xl:opacity-0 xl:group-hover:opacity-100 xl:transition-opacity duration-500 delay-100">
                            {service.description}
                          </p>
                          <div className="space-y-2 transform xl:opacity-0 xl:group-hover:opacity-100 xl:transition-opacity duration-500 delay-200">
                            {service.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center text-sm text-gray-200"
                              >
                                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      {/* </div> */}
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection
              animation="fadeInUp"
              delay={0}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Why Choose <span className="text-gradient">TechCulture?</span>
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
                  <Card className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
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
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection
              animation="fadeInUp"
              delay={0}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r  dark:from-white dark:to-blue-200 bg-clip-text">
                Our Service <span className="text-gradient">Portfolio</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                At TechCulture Solutions Private Limited, we deliver modern
                geospatial technology, software, and field engineering solutions
                tailored to your sector.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mainServices.map((service, index) => (
                <AnimatedSection
                  key={index}
                  animation="fadeInUp"
                  delay={index * 200}
                >
                  <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                    <div
                      className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r bg-purple-500 z-20`}
                    ></div>
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50 z-10" />
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
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                          {mainServicesIcon[index].icon}
                        </div>
                        <h3 className="flex-1 text-lg font-bold text-white ml-4 group-hover:text-blue-300 transition-colors">
                          {service.title}
                        </h3>
                      </div>

                      <div className="mt-auto transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 delay-100 pt-4">
                        {/* <h3 className="text-2xl font-bold text-white">
                        {service.title}
                      </h3> */}
                        <p className="text-gray-100 leading-relaxed transform opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {service.description}
                        </p>
                        <div className="space-y-2 transform opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          {service.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center text-sm text-gray-200"
                            >
                              <CheckCircle className="w-4 h-4 mr-3 text-green-400 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    {/* </div> */}
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4  relative overflow-hidden earthBgLow">
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
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how our geospatial solutions can streamline your
                operations, enhance data accuracy, and support informed
                decision-making.
              </p>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicePage;

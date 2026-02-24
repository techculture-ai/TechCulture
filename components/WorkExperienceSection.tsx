"use client";

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/animated-section";
import { MapPin } from "lucide-react";

const geoUrl =
  "https://raw.githubusercontent.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json";

const stateData = [
  { id: "UT", name: "Uttarakhand", coordinates: [79.0193, 30.0668] },
  { id: "RJ", name: "Rajasthan", coordinates: [74.2179, 27.0238] },
  { id: "PB", name: "Punjab", coordinates: [75.3412, 31.1471] },
  { id: "UP", name: "Uttar Pradesh", coordinates: [80.9462, 26.8467] },
  { id: "MP", name: "Madhya Pradesh", coordinates: [78.6569, 22.9734] },
  { id: "MH", name: "Maharashtra", coordinates: [75.7139, 19.7515] },
  { id: "TN", name: "Tamil Nadu", coordinates: [78.6569, 11.1271] },
  { id: "BR", name: "Bihar", coordinates: [85.3131, 25.0961] },
  { id: "AS", name: "Assam", coordinates: [92.9376, 26.2006] },
  { id: "MN", name: "Manipur", coordinates: [93.9063, 24.6637] },
  { id: "DL", name: "Delhi", coordinates: [77.1025, 28.7041] },
];

const projectionConfig = {
  scale: 1000,
  center: [82.9629, 23.5937],
};

const WorkExperienceSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full filter blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-block px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 mb-6">
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">📍 OUR PRESENCE</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Pan-India <span className="text-emerald-600 dark:text-emerald-400">Services</span>
            </h2>

            {/* Enhanced Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We've successfully delivered <span className="font-semibold text-emerald-600 dark:text-emerald-400">500+ projects</span> and cutting-edge solutions across <span className="font-semibold text-emerald-600 dark:text-emerald-400">multiple states</span>, building a strong network of satisfied clients throughout the country.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Interactive Map */}
          <AnimatedSection animation="fadeInLeft">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl filter blur-3xl transform rotate-1"></div>
              <div className="relative p-8 rounded-3xl bg-white/40 dark:bg-slate-800/40 shadow-2xl border border-emerald-200/30 dark:border-emerald-800/30 backdrop-blur-md hover:shadow-3xl transition-all duration-500">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={projectionConfig}
                  width={600}
                  height={600}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const isHighlighted = stateData.find(
                          (state) => state.id === geo.id
                        );
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isHighlighted ? "#0d9488" : "#e0f2fe"}
                            stroke="#ffffff"
                            strokeWidth={0.75}
                            style={{
                              default: {
                                outline: "none",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              },
                              hover: {
                                fill: isHighlighted ? "#0f766e" : "#bae6fd",
                                outline: "none",
                                cursor: "pointer",
                                filter: "drop-shadow(0 4px 12px rgba(16, 185, 129, 0.2))",
                              },
                              pressed: { outline: "none" },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                  {stateData.map(({ name, coordinates }) => (
                    <Annotation
                      key={name}
                      subject={coordinates}
                      dx={0}
                      dy={0}
                      connectorProps={{}}
                    >
                      <text
                        x={4}
                        y={4}
                        fontSize={10}
                        textAnchor="middle"
                        fill="white"
                        stroke="#000000"
                        strokeWidth="2"
                        paintOrder="stroke"
                        className="font-medium"
                      >
                        {name}
                      </text>
                    </Annotation>
                  ))}
                </ComposableMap>
              </div>
            </div>
          </AnimatedSection>

          {/* Right side: State list with enhanced styling */}
          <AnimatedSection animation="fadeInRight">
            <div className="space-y-8"> 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stateData.map((state) => (
                  <div
                    key={state.id}
                    className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/60 to-emerald-50/40 dark:from-gray-800/60 dark:to-teal-900/20 hover:from-white hover:to-emerald-100/60 dark:hover:from-gray-700/80 dark:hover:to-teal-900/40 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-200/50 dark:border-teal-800/30 hover:border-emerald-400/70 dark:hover:border-emerald-600/50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300"></div>
                    <div className="relative flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100/80 to-teal-100/80 dark:from-emerald-900/40 dark:to-teal-900/40 group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300 shadow-md group-hover:shadow-lg">
                        <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-300 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors text-lg">
                          {state.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-emerald-600/70 dark:group-hover:text-emerald-400/70 transition-colors">
                          Active Projects
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;

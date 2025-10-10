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
    <section className="py-24 px-4  relative overflow-hidden earthBg">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 "
            >
              Our Presence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Serving Clients{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Across India
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We've successfully delivered projects and solutions across
              multiple states, building a strong network of satisfied clients
              throughout the country.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Interactive Map */}
          <AnimatedSection animation="fadeInLeft">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl filter blur-xl transform rotate-1"></div>
              <div className="relative p-6 rounded-3xl bg-white/20 shadow-2xl border border-white/20 backdrop-blur-sm">
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
                            fill={isHighlighted ? "#4f46e5" : "#e2e8f0"}
                            stroke="#ffffff"
                            strokeWidth={0.5}
                            style={{
                              default: {
                                outline: "none",
                                transition: "all 0.3s",
                              },
                              hover: {
                                fill: isHighlighted ? "#3730a3" : "#cbd5e1",
                                outline: "none",
                                cursor: "pointer",
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
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8">
                Our Project Locations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stateData.map((state) => (
                  <div
                    key={state.id}
                    className="group relative p-4 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-indigo-500 dark:hover:border-indigo-500"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 group-hover:bg-indigo-500 transition-colors">
                        <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-indigo-500 transition-colors">
                          {state.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          Active Projects
                        </p>
                      </div>
                    </div>
                    {/* Accent line */}
                    {/* <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div> */}
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

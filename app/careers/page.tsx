"use client"

import React, { useEffect, useState } from "react";
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Briefcase, 
  Heart, 
  Zap, 
  Award,
  Code,
  TrendingUp,
  Globe,
  Database,
  Play,
  Quote,
  Star,
  Building,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { useSite } from "@/context/siteContext";
import axios from "axios";

export default function CareersPage() {
  const { careerData, setCareerData } = useSite();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      if (!careerData) {
        try {
          const res = await axios.get(`${apiUrl}/api/job-posts`);
          if (res.data) {
            setCareerData(res.data.jobPosts);
          }
        } catch (err) {
          console.error("Error fetching career data:", err);
        }
      }
    }

    fetchData();
  }, [careerData, setCareerData]);

  // Add this after fetching careerData
  const departments = [
    "All",
    ...new Set(careerData?.map((job) => job.department) || []),
  ];
  const locations = [
    "All",
    ...new Set(careerData?.map((job) => job.location) || []),
  ];

  const filteredJobs = careerData?.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDepartment =
      selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesLocation =
      selectedLocation === "All" ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesDepartment && matchesLocation;
  }) || [];

  const getDepartmentIcon = (department) => {
    const icons = {
      Engineering: <Code className="w-5 h-5 text-indigo-600" />,
      Product: <Briefcase className="w-5 h-5 text-indigo-600" />,
      Design: <Globe className="w-5 h-5 text-indigo-600" />,
      Sales: <TrendingUp className="w-5 h-5 text-indigo-600" />,
      Marketing: <Globe className="w-5 h-5 text-indigo-600" />,
      Operations: <Database className="w-5 h-5 text-indigo-600" />,
      Data: <Database className="w-5 h-5 text-indigo-600" />,
    };
    return (
      icons[department] || <Briefcase className="w-5 h-5 text-indigo-600" />
    );
  };

  const getLevelColor = (experience) => {
    const colors = {
      "Entry Level": "bg-green-100 text-green-800",
      "1-2 years": "bg-blue-100 text-blue-800",
      "2-4 years": "bg-purple-100 text-purple-800",
      "4+ years": "bg-orange-100 text-orange-800",
      Senior: "bg-red-100 text-red-800",
    };
    return colors[experience] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen">
      {/* Clean & Minimal Hero Section */}
      

      {/* Why Work With Us Section */}
       

      {/* Open Positions Section */}
      <section id="jobs" className="py-8 sm:py-12 md:py-20 lg:py-28 3xl:py-36 px-4 sm:px-6 lg:px-8 3xl:px-12 bg-white dark:bg-slate-900">
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[1700px] mx-auto">
          {/* Section Header */}
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 mb-4">
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Open Positions</span>
              </div>
              <h2 className="text-4xl sm:text-5xl 3xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 3xl:mb-8">
                Start Your Journey
              </h2>
              <p className="text-lg 3xl:text-xl text-gray-600 dark:text-gray-400 max-w-2xl 3xl:max-w-3xl mx-auto">
                Find the role that's right for you and help shape the future of geospatial technology.
              </p>
            </div>
          </AnimatedSection>

          {/* Search and Filters */}
          <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search roles, skills, or teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {careerData &&
              filteredJobs.length > 0 &&
              filteredJobs.map((job, index) => (
                <AnimatedSection key={job.jobId} delay={index * 100} animation="fadeInUp">
                  <div
                    className={`p-6 rounded-lg border transition-all duration-200 ${
                      job.featured
                        ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 hover:shadow-lg"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            {getDepartmentIcon(job.department)}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                              <span className="flex items-center gap-1">
                                <Building className="w-4 h-4" /> {job.department}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {job.type}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                                  job.experienceRequired
                                )}`}
                              >
                                {job.experienceRequired}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <p>
                            Salary: ${job.salaryRange.min.toLocaleString()} - $
                            {job.salaryRange.max.toLocaleString()}
                          </p>
                          <p>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                          <p>
                            Posted {job.posted} • {job.applicants} applicants
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:w-40">
                        <Link
                          href={`/careers/${job.jobId}`}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors duration-200"
                        >
                          Apply Now
                        </Link>
                        <Link
                          href={`/careers/${job.jobId}/details`}
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold text-center"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No matching roles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters or check back later for new
                  opportunities.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDepartment("All");
                    setSelectedLocation("All");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}

      <section className="py-16 sm:py-20 md:py-24 3xl:py-32 4xl:py-40 px-4 3xl:px-12 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
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
        <div className="max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto text-center">
          <AnimatedSection animation="fadeInUp" delay={0}>
            <h2 className="text-4xl md:text-5xl 3xl:text-6xl font-bold text-white mb-6 3xl:mb-8">
              Ready to Join
              <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Our Team?
              </span>
            </h2>
            <p className="text-xl 3xl:text-2xl text-gray-300 mb-12 3xl:mb-16 max-w-2xl 3xl:max-w-3xl mx-auto">
              Don't see a role that fits? We're always looking for talented individuals. Send us your resume and let's explore possibilities together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="px-8 py-3 bg-white text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                asChild
              >
                <Link href="#jobs">
                  Explore Roles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                asChild
              >
                <Link href="/contact">
                  Get in Touch
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
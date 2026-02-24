"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import {
  Users,
  MapPin,
  Mail,
  Phone,
  Award,
  Target,
  Building2,
  Compass,
  Globe,
  Network,
  Zap,
  Shield,
  Code,
  Database,
  Settings,
  UserCheck,
  Briefcase,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useSite } from "@/context/siteContext";
import axios from "axios";

interface Employee {
  name: string;
  designation: string;
  department: string;
  description?: string;
  profilePicture?: string;
}

interface EmployeesByDepartment {
  [key: string]: Employee[];
}

interface Category {
  id: string;
  label: string;
  icon: React.ReactElement;
}

export default function TeamPage() {
  const { teamData, setTeamData } = useSite();
  // Initialize all state at the top
  const [employees, setEmployees] = useState<EmployeesByDepartment>({});
  const [categories, setCategories] = useState<Array<{id: string, label: string, icon: React.ReactElement}>>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  // First useEffect to fetch data if not available
  useEffect(() => {
    async function fetchData() {
      if (!teamData) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/employees`
          );
          console.log("team data", res.data.employees);
          setTeamData(res.data.employees);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, []); // Only run once on mount

  // Second useEffect to process data when teamData changes
  useEffect(() => {
    if (teamData) {
      // Get unique departments and ensure they are strings
      const departments = [...new Set(teamData.map((member: Employee) => member.department))] as string[];
      
      // Create categories array with icons
      const newCategories = departments.map((dept: string) => ({
        id: dept.toLowerCase(),
        label: dept,
        icon: getDepartmentIcon(dept)
      }));
      
      setCategories(newCategories);
      
      // Set active category if not set
      if (!activeCategory && departments.length > 0) {
        setActiveCategory(departments[0].toLowerCase());
      }

      // Group employees by department
      const groupedEmployees = departments.reduce<EmployeesByDepartment>((acc, dept: string) => {
        const deptKey = dept.toLowerCase();
        acc[deptKey] = teamData.filter(
          (member: Employee) => member.department.toLowerCase() === deptKey
        );
        return acc;
      }, {});

      setEmployees(groupedEmployees);
    }
  }, [teamData, activeCategory]); // Depend on teamData and activeCategory

  // Function to get icon based on department name
  const getDepartmentIcon = (department: string) => {
    switch (department.toLowerCase()) {
      case 'management':
        return <Building2 className="w-5 h-5" />;
      case 'team':
        return <Users className="w-5 h-5" />;
      case 'field':
        return <Compass className="w-5 h-5" />;
      case 'development':
        return <Code className="w-5 h-5" />;
      case 'design':
        return <Eye className="w-5 h-5" />;
      case 'marketing':
        return <Target className="w-5 h-5" />;
      case 'sales':
        return <Briefcase className="w-5 h-5" />;
      case 'hr':
        return <UserCheck className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

 
  const currentTeam = employees[activeCategory] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-emerald-950/10 dark:to-slate-950">
      {/* Hero Section */}
     

      {/* Team Overview Section */}
      <section className="py-8 sm:py-12 md:py-16 3xl:py-24 4xl:py-32 px-4 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10 mt-8 sm:mt-12 md:mt-16 3xl:mt-20">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
            <AnimatedSection animation="fadeInUp" delay={0} className="text-center mb-8 sm:mb-10 md:mb-12 3xl:mb-16">
            <h2 className="text-4xl md:text-5xl 3xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 3xl:mb-8 leading-tight">
              Team Behind <span className="text-emerald-600 dark:text-emerald-400">Success</span>
            </h2>
            <p className="text-lg md:text-xl 3xl:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl 3xl:max-w-4xl mx-auto leading-relaxed">
              Meet the passionate professionals who bring innovation, expertise, and dedication to every project we undertake
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Categories Navigation */}
      <section className="py-6 sm:py-8 md:py-10 3xl:py-14 px-6 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          {/* Tab Navigation */}
          <div className="mb-8 sm:mb-10 md:mb-12 flex justify-center">
            <AnimatedSection>
              <div className="flex glass-card rounded-full p-1.5 gap-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-full transition-all duration-300 whitespace-nowrap ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-800 bg-white/50 dark:bg-slate-800/50"
                    }`}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </Button>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-12 sm:py-16 md:py-20 3xl:py-28 4xl:py-36 px-4 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {categories.find((cat) => cat.id === activeCategory)?.label}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The best person in every position
            </p>
          </div>

          <div className="grid gap-8 3xl:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
          
            {currentTeam.map((member: Employee, index: number) => {
              const gradients = [
                'from-emerald-600 to-teal-600',
                'from-emerald-600 to-green-600',
                'from-teal-600 to-emerald-600',
                'from-emerald-500 to-teal-500',
                'from-teal-600 to-emerald-500'
              ];
              const gradient = gradients[index % gradients.length];
              
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-900"
                >
                  {/* Gradient border at top */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`}
                  ></div>

                  <CardContent className="p-8 text-center">
                    {/* Avatar */}
                    <div className="relative mx-auto mb-6 w-24 h-24">
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient} p-1`}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900">
                          <Image
                            src={member.profilePicture || `https://i.pravatar.cc/400?u=${member.name}`}
                            alt={member.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      {/* Icon overlay */}
                      <div
                        className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center`}
                      >
                        <span className="text-white text-xs">
                          {getDepartmentIcon(member.department)}
                        </span>
                      </div>
                    </div>

                    {/* Name and Position */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={`mb-4 bg-gradient-to-r ${gradient} text-white`}
                    >
                      {member.designation}
                    </Badge>

                    {/* Bio */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 transition-opacity duration-300">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-18 md:py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Want to Join Our{" "}
            <span className="bg-gradient-to-r from-emerald-100 to-teal-100 bg-clip-text text-transparent">
              Amazing Team
            </span>
            ?
          </h2>
          <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion
            for innovation and excellence. Explore career opportunities with us.
          </p>
          <Link
            href={"/careers"}
            className="bg-white hover:bg-gray-100 text-emerald-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  );
}


"use client"
import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook, Instagram } from "lucide-react"
import { useEffect } from "react";
import axios from "axios";
import { useSite } from "@/context/siteContext";

export function Footer() {
const { settingsData, setSettingsData } = useSite();
  useEffect(() => {
    async function fetchData() {
      if (!settingsData) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/site-settings`
          );
          if (res.status === 200) {
            setSettingsData(res.data.data);
            console.log("im data ", res.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [settingsData, setSettingsData]);
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-gray-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-3xl -z-10"></div>

      <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto px-6 3xl:px-10 4xl:px-16 pt-20 3xl:pt-28 pb-12 3xl:pb-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 3xl:gap-16 4xl:gap-20 mb-12 3xl:mb-16">
          {/* Brand Section */}
          <div>
            <div className="text-3xl 3xl:text-4xl font-bold mb-6 3xl:mb-8">
              TechCulture <span className="text-emerald-400">Solutions</span>
            </div>
            <p className="text-gray-400 mb-6 3xl:mb-8 leading-relaxed 3xl:text-lg">
              Innovating the future, one solution at a time. Your trusted
              partner in digital transformation.
            </p>
            <div className="flex space-x-4">
              {settingsData?.linkedin && (
                <Link
                  href={settingsData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              )}
              {settingsData?.twitter && (
                <Link
                  href={settingsData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              )}
              {settingsData?.facebook && (
                <Link
                  href={settingsData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
              )}
              {settingsData?.instagram && (
                <Link
                  href={settingsData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg 3xl:text-xl font-semibold text-white mb-6 3xl:mb-8 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Core Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="text-lg 3xl:text-xl font-semibold text-white mb-6 3xl:mb-8 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h4 className="text-lg 3xl:text-xl font-semibold text-white mb-6 3xl:mb-8 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              Contact Info
            </h4>
            {settingsData && (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <a href={`tel:${settingsData.contactNo}`} className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 font-medium">
                    {settingsData.contactNo}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${settingsData.email}`} className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 font-medium break-all">
                    {settingsData.email}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-400 text-sm">
                    {settingsData.officeAddress && (
                      <div className="mb-3">
                        <div className="font-medium text-white mb-1">Office</div>
                        <div>{settingsData.officeAddress}</div>
                      </div>
                    )}
                    {settingsData.registeredAddress && (
                      <div>
                        <div className="font-medium text-white mb-1">Registered</div>
                        <div>{settingsData.registeredAddress}</div>
                      </div>
                    )}
                     <div>
                        <div className="font-medium text-white mb-1 ">For HR contact</div>
                        <div className="flex items-center">
                        <Phone className="w-4 h-2 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>98718 67076</div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2025 TechCulture Solutions Pvt. Ltd. All rights reserved.
          </p>
          
          {/* Center - Developed By */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Developed by{" "}
              <a href="https://techculture.ai" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                Techculture.ai
              </a>
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

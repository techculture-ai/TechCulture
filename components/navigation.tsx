"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useSite } from "@/context/siteContext";
import axios from "axios";

interface SubNavItem {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
  dropdown?: SubNavItem[];
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [expandedWidth, setExpandedWidth] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
  const { settingsData, setSettingsData } = useSite();
  
  const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      async function fetchData() {
        if (!settingsData){
           try {
             const res = await axios.get(
               `${process.env.NEXT_PUBLIC_API_URL}/api/site-settings`
             );
             if (res.status === 200) {
               setSettingsData(res.data.data);
               console.log("im data ",res.data);
             }
           } catch (error) {
             console.log(error);
           }
        }
      }
      fetchData();
    }, [settingsData, setSettingsData]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
    }
    setActiveDropdown(label)
  }

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
    setDropdownTimeout(timeout)
  }

  const pathname = usePathname()

  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    // { href: "/technologies", label: "Technologies" },
    // { href: "/industries", label: "Industries" },
    // { href: "/survey", label: "Survey" },
    { href: "/services", label: "Our Services" },
    { href: "/projects", label: "Projects" },
    // { href: "/insights", label: "Insights" },
    { href: "/team", label: "Our Team" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/careers", label: "Careers" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  useEffect(() => {
    if (navRef.current) {
      setExpandedWidth(navRef.current.scrollWidth + 100   )
    }
  }, [collapsed, pathname])

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-500 ${
        scrolled
          ? "top-0 shadow-md bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800"
          : "top-0 bg-white/95 dark:bg-slate-950/95"
      }`}
    >
      <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 3xl:px-20 4xl:px-28 py-4 3xl:py-5">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 z-50">
          <div className="relative h-12 3xl:h-14 4xl:h-16 w-auto">
            <Image
              src="http://res.cloudinary.com/dakf05m4x/image/upload/v1755172004/siteSetting/logo-e17294ba-9b7a-438d-9e5e-0154a1ca704d.png"
              alt="TechCulture Solutions Logo"
              height={25}
              width={80}
              className="object-contain 3xl:scale-110 4xl:scale-125 origin-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 3xl:space-x-10 4xl:space-x-12">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`flex items-center gap-1.5 text-sm 3xl:text-base 4xl:text-lg font-medium transition-colors duration-300 ${
                    item.dropdown.some((subItem) => pathname === subItem.href)
                      ? "text-gray-900 dark:text-white border-b-2 border-emerald-600"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === item.label && (
                  <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-[9999]">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`block px-4 py-3 text-sm font-medium transition-colors ${
                          pathname === subItem.href
                            ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                            : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm 3xl:text-base 4xl:text-lg font-medium transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-gray-900 dark:text-white border-b-2 border-emerald-600"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {/* Get In Touch Button - Desktop */}
          <Link href="/contact" className="hidden lg:block">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 3xl:px-8 3xl:py-3 3xl:text-base rounded-lg transition-colors">
              Get In Touch
            </Button>
          </Link>
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden h-9 w-9"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Slide from Left */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-950 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Header */}
          <div className="flex items-center justify-end p-6 border-b border-gray-200 dark:border-gray-800">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation Items */}
          <div className="px-6 py-4 overflow-y-auto h-[calc(100vh-180px)]">
            <nav className="space-y-2">
              {navItems.map((item, index) => 
                item.dropdown ? (
                  <div key={item.label} className="space-y-2">
                    <div
                      className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all duration-200 group"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{item.label}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-all duration-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-4 space-y-1 pb-2">
                        {item.dropdown?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              pathname === subItem.href
                                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-l-3 border-emerald-600"
                                : "text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:translate-x-1"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 group ${
                      pathname === item.href
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-l-4 border-emerald-600"
                        : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:translate-x-2"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="transition-transform duration-200">{item.label}</span>
                  </Link>
                )
              )}
            </nav>
          </div>
          
          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                Get In Touch
              </Button>
            </Link>
            <div className="mt-4 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
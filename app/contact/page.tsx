"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxSection } from "@/components/parallax-section"
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Linkedin,
  Twitter,
  Github,
  MessageSquare,
  Calendar,
  Users,
} from "lucide-react"
import { useSite } from "@/context/siteContext"
import axios from "axios"
import toast from "react-hot-toast"

export default function ContactPage() {
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
          }
        } catch (error) {
          console.log(error);
        }
      }

      if(settingsData){
        
      }

    }
    fetchData();
  }, [settingsData, setSettingsData]);

  let contactInfo: any[] = [];
  if(settingsData){ contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: [settingsData.contactNo],
      description: "Mon-Fri 9AM-6PM IST",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: [settingsData.email],
      description: "We'll respond within 24 hours",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Head Office",
      details: [settingsData.registeredAddress],
      description: "Visit us during business hours",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Corporate Office",
      details: [settingsData.officeAddress],
      description: "Visit us during business hours",
    },
  ];}

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Detailed validation with specific error messages
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    
    if (!formData.company.trim()) {
      toast.error("Please enter your company name");
      return;
    }
    
    if (!formData.service) {
      toast.error("Please select a service");
      return;
    }
    
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    setIsSubmitting(true)
    const loadingToast = toast.loading("Submitting your message...");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
        formData
      );

      if (response.status === 201) {
        toast.dismiss(loadingToast);
        toast.success("Message sent successfully! We'll get back to you within 24 hours.");
        setIsSubmitted(true); 
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to send message. Please try again.");
        console.error("Error submitting form", response.data);
      }

    } catch (error: any) {
      toast.dismiss(loadingToast);
      console.error("Error submitting contact form:", error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        toast.error("Invalid form data. Please check your information.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to send message. Please check your connection and try again.");
      }
    }

    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

 

 

  const services = [
    "Hardware Solutions",
    "Software Development",
    "Enterprise Solutions",
    "GIS Solutions",
    "Consulting Services",
    "Other",
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 sm:py-28 md:py-32 px-4 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection animation="fadeInUp">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">Thank You!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
            <Button
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  service: "",
                  message: "",
                })
              }}
            >
              Send Another Message
            </Button>
          </AnimatedSection>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white dark:from-slate-950 dark:via-emerald-950/10 dark:to-slate-950">
      {/* Hero Section */}
     

      {/* Contact Overview Section */}
      <section className="py-8 sm:py-12 md:py-16 3xl:py-24 4xl:py-32 px-4 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10 mt-8 sm:mt-12 md:mt-16 3xl:mt-20">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <AnimatedSection animation="fadeInUp" delay={0} className="text-center mb-12 3xl:mb-16">
            <h2 className="text-4xl md:text-5xl 3xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 3xl:mb-8 leading-tight">
              Get In Touch <span className="text-emerald-600 dark:text-emerald-400">With Us</span>
            </h2>
            <p className="text-lg md:text-xl 3xl:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl 3xl:max-w-4xl mx-auto leading-relaxed">
              Ready to transform your business? Let's discuss your project and explore how we can help you achieve your goals
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="contact-form" className="py-10 3xl:py-16 px-6 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 3xl:gap-24">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 mb-4">
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Contact Form</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  Send us a Message
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Fill out the form and we'll get back to you within 24 hours to discuss your requirements.
                </p>
              </div>

              <AnimatedSection animation="fadeInLeft" delay={0}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-900 dark:text-white font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-900 dark:text-white font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-900 dark:text-white font-medium mb-2">
                        Phone
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-900 dark:text-white font-medium mb-2">
                        Company
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 dark:text-white font-medium mb-2">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option
                          key={service}
                          value={service}
                        >
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-900 dark:text-white font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 w-5 h-5 inline" />
                      </>
                    )}
                  </Button>
                </form>
              </AnimatedSection>
            </div>

            {/* Contact Information */}
            <div>
              <AnimatedSection animation="fadeInRight" delay={100}>
                <div id="contact-info" className="space-y-10">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 mb-4">
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Contact Information</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    Get in Touch
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    We're here to help you succeed. Reach out to us through any of the following channels.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <AnimatedSection key={index} delay={index * 100} animation="fadeInUp">
                      <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                          <div className="text-emerald-600 dark:text-emerald-400">{info.icon}</div>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail: string, idx: number) => (
                          <p
                            key={idx}
                            className="text-gray-600 dark:text-gray-400 text-sm"
                          >
                            {detail}
                          </p>
                        ))}
                        <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-2">
                          {info.description}
                        </p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 md:py-20 3xl:py-28 px-4 3xl:px-12 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-950 dark:to-emerald-950/10">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1800px] mx-auto">
          <AnimatedSection animation="fadeInUp">
            <div className="mb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 mb-4">
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Registered Office</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Head Office
              </h2>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-96 3xl:h-[500px]">
              {settingsData ? (
                <div
                  className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                  dangerouslySetInnerHTML={{
                    __html: settingsData.registeredIframe,
                  }}
                />
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.056200150182!2d77.2225690760672!3d28.628077684281838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd33b95c2ef1%3A0xfe68a915348015f8!2sRohit%20House%2C%202%2C%20Tolstoy%20Rd%2C%20Barakhamba%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1754302489577!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </AnimatedSection>
        </div>
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[1700px] mx-auto">
          <AnimatedSection animation="fadeInUp">
            <div className="mb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 mb-4">
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Corporate Office</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Corporate Office
              </h2>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-96 3xl:h-[500px]">
              {settingsData ? (
                <div
                  className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                  dangerouslySetInnerHTML={{
                    __html: settingsData.officeIframe,
                  }}
                />
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.336032841482!2d77.35435776491295!3d28.627244195359893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce54f9814a4c1%3A0x729f42021b824a36!2sCorenthum%20Building%2C%2034%2F2%2C%20Block%20A%2C%20Industrial%20Area%2C%20Sector%2062%2C%20Noida%2C%20Uttar%20Pradesh%20201309!5e0!3m2!1sen!2sin!4v1756187696071!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}      {/* Final CTA Section */}
      <section className="py-16 sm:py-18 md:py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
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
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection animation="fadeInUp" delay={0}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get
              <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Started?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Don't hesitate to reach out. Our team is ready to assist you with any questions or project inquiries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="px-8 py-3 bg-white text-emerald-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
                asChild
              >
                <a href="#contact-form">Send Message</a>
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 border border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
                asChild
              >
                <a href="#contact-info">View Contact Info</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

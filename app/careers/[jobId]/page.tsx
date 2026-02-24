"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { ArrowRight, Upload, User, Mail, Phone, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedSection } from "@/components/animated-section";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  portfolioUrl: string;
  additionalInfo: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  resume?: string;
}

export default function ApplyPage() {
  // dynamic jobId 
  const {jobId} = useParams()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    portfolioUrl: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Add keyframes for animations
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = e.target.files;
      const file = files?.[0];
      
      if (file) {
        // File size validation (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          const errorMsg = "File size too large. Please upload a file smaller than 5MB.";
          toast.error(errorMsg);
          setErrors((prev) => ({ ...prev, resume: errorMsg }));
          // Clear the file input
          e.target.value = '';
          return;
        }
        
        // File type validation
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
        
        if (!allowedTypes.includes(file.type)) {
          const errorMsg = "Please upload a PDF, DOC, or DOCX file";
          toast.error(errorMsg);
          setErrors((prev) => ({ ...prev, resume: errorMsg }));
          // Clear the file input
          e.target.value = '';
          return;
        }
        
        // File is valid
        toast.success(`Resume "${file.name}" selected successfully!`);
        setFormData((prev) => ({ ...prev, [name]: file }));
        if (name === 'resume' && errors.resume) {
          setErrors((prev) => ({ ...prev, resume: undefined }));
        }
      } else {
        setFormData((prev) => ({ ...prev, [name]: null }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Clear errors for specific fields
      if (name === 'firstName' && errors.firstName) {
        setErrors((prev) => ({ ...prev, firstName: undefined }));
      } else if (name === 'lastName' && errors.lastName) {
        setErrors((prev) => ({ ...prev, lastName: undefined }));
      } else if (name === 'email' && errors.email) {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.resume) newErrors.resume = "Resume is required";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Show first validation error as toast
      const firstError = Object.values(validationErrors)[0];
      if (firstError) {
        toast.error(firstError);
      }
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your application...");
    
    const name = `${formData.firstName} ${formData.lastName}`;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("jobId", jobId as string);
      formDataToSend.append("name", name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("coverLetter", formData.coverLetter);
      formDataToSend.append("portfolioUrl", formData.portfolioUrl);
      formDataToSend.append("additionalInfo", formData.additionalInfo);

      if (formData.resume) {
        formDataToSend.append("file", formData.resume);
      }

      const res = await axios.post(
        `${apiUrl}/api/job-applications`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        toast.dismiss(loadingToast);
        toast.success("Application submitted successfully! We'll review your submission and get back to you soon.");
        
        // Clear form data
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          resume: null,
          coverLetter: "",
          portfolioUrl: "",
          additionalInfo: "",
        });
        
        // Clear file input
        if (fileInputRef.current) fileInputRef.current.value = "";
        
        // Clear errors
        setErrors({});
        
        // Show success page
        setSubmitted(true);
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (err: any) {
      toast.dismiss(loadingToast);
      console.error("Error submitting job application:", err);
      
      // Show appropriate error message via toast only (no form state changes to prevent blinking)
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 400) {
        toast.error("Invalid application data. Please check your information.");
      } else if (err.response?.status === 413) {
        toast.error("File size too large. Please upload a smaller file.");
      } else if (err.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (err.code === 'ECONNREFUSED' || err.code === 'NETWORK_ERROR') {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    }

    setIsSubmitting(false);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    
    if (!file) {
      toast.error("No file provided");
      return;
    }
    
    // File size validation (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      const errorMsg = "File size too large. Please upload a file smaller than 5MB.";
      toast.error(errorMsg);
      setErrors((prev) => ({ ...prev, resume: errorMsg }));
      return;
    }
    
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (file && allowedTypes.includes(file.type)) {
      setFormData((prev) => ({ ...prev, resume: file }));
      if (errors.resume) setErrors((prev) => ({ ...prev, resume: undefined }));
      toast.success(`Resume "${file.name}" uploaded successfully!`);
    } else {
      const errorMsg = "Please upload a PDF, DOC, or DOCX file";
      toast.error(errorMsg);
      setErrors((prev) => ({ 
        ...prev, 
        resume: errorMsg 
      }));
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden  ">
      {/* <div className="absolute inset-0 bg-[url('/apply2.png')] bg-cover bg-center"></div> */}
      <section className="relative pb-20 pt-30 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            fill
            alt="referenceImage"
            className="object-cover"
            src="/apply-banner2.jpg"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Apply to Join
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Our Team
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-12 max-w-4xl mx-auto">
            We’re thrilled you’re interested in joining us! Fill out the form
            below to share your details and start your journey.
          </p>
        </div>
      </section>
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div> */}
      <div className="relative max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl mx-auto py-20 3xl:py-28">
        <AnimatedSection animation="fadeInUp" delay={200}>
          <div className="glass-card p-8 rounded-3xl shadow-lg border border-white/20 bg-white/20 backdrop-blur-md">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Application Submitted!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for applying. Our team will review your submission
                  and reach out soon.
                </p>
                <Link href="/careers">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold">
                    Back to Careers <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {/* Loading Overlay */}
                {isSubmitting && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        Submitting your application...
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`pl-10 glass-card border-white/20 bg-transparent ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your first name"
                        aria-required="true"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1 animate-pulse">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`pl-10 glass-card border-white/20 bg-transparent ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your last name"
                        aria-required="true"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1 animate-pulse">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-10 glass-card border-white/20 bg-transparent ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your email"
                      aria-required="true"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 animate-pulse">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 glass-card border-white/20 bg-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Resume/CV <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.resume ? "border-red-500" : "border-gray-300"
                    } hover:border-indigo-500 transition-colors`}
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <Upload className="mx-auto w-8 h-8 text-gray-800 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {formData.resume
                        ? formData.resume.name
                        : "Drag and drop your resume or click to upload"}
                    </p>
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleInputChange}
                      className="hidden"
                      ref={fileInputRef}
                      aria-required="true"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="glass-card border-white/20 bg-transparent text-gray-900 hover:bg-indigo-100"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload File
                    </Button>
                  </div>
                  {errors.resume && (
                    <p className="text-red-500 text-sm mt-1 animate-pulse">
                      {errors.resume}
                    </p>
                  )}
                  <p className="text-sm text-gray-800 mt-1">
                    Accepted formats: PDF, DOC, DOCX (max 5MB)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Cover Letter (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-gray-800 w-5 h-5" />
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      className="pl-10 glass-card border-white/20 bg-transparent"
                      placeholder="Tell us why you’re a great fit"
                      rows={5}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="portfolioUrl"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Portfolio/LinkedIn (Optional)
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                    <Input
                      id="portfolioUrl"
                      name="portfolioUrl"
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      className="pl-10 glass-card border-white/20 bg-transparent"
                      placeholder="Enter your portfolio or LinkedIn URL"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="additionalInfo"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Additional Information
                  </label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="glass-card border-white/20 bg-transparent"
                    placeholder="Anything else you’d like us to know?"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Link href="/careers">
                    <Button
                      type="button"
                      variant="outline"
                      className="glass-card border-white/20 bg-transparent text-gray-900 hover:bg-indigo-100 rounded-full"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full relative min-w-[180px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="opacity-0">Submit Application</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        Submit Application{" "}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
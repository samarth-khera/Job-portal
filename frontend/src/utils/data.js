import {
    Search,
    FileText,
    MessageSquare,
    Award,
    BarChart3,
    Shield,
    Clock,
    Briefcase,
    Building2,
    LayoutDashboard,
    Plus,
    Users,
  } from "lucide-react";
  
  // ==================== JOB SEEKER FEATURES ====================
  export const jobSeekerFeatures = [
    {
      icon: Search,
      title: "Smart Job Matching",
      description:
        "AI-powered algorithm matches you with relevant opportunities based on your skills and preferences.",
    },
    {
      icon: FileText,
      title: "Resume Builder",
      description:
        "Create professional resumes with our intuitive builder and templates designed by experts.",
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description:
        "Chat directly with recruiters and hiring managers to speed up your application process.",
    },
    {
      icon: Award,
      title: "Skill Assessment",
      description:
        "Showcase your abilities with verified skill tests and earn badges that employers trust.",
    },
  ];
  
  // ==================== EMPLOYER FEATURES ====================
  export const employerFeatures = [
    {
      icon: Users,
      title: "Talent Pool Access",
      description:
        "Access our vast database of pre-screened candidates and find the perfect fit for your team.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Track your hiring performance with detailed analytics and insights on candidate engagement.",
    },
    {
      icon: Shield,
      title: "Verified Candidates",
      description:
        "All candidates undergo background verification to ensure you’re hiring trustworthy professionals.",
    },
    {
      icon: Clock,
      title: "Quick Hiring",
      description:
        "Reduce your time-to-hire with streamlined job posting and application tracking.",
    },
  ];
  
  // ==================== JOB CATEGORIES ====================
  export const CATEGORIES = [
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "IT & Software", label: "IT & Software" },
    { value: "Customer Service", label: "Customer Service" },
    { value: "Operations", label: "Operations" },
    { value: "Product", label: "Product" },
    { value: "Finance", label: "Finance" },
    { value: "HR", label: "Human Resources" },
    { value: "Other", label: "Other" },
  ];
  
  // ==================== JOB TYPES ====================
  export const JOB_TYPES = [
    { value: "Remote", label: "Remote" },
    { value: "Full-Time", label: "Full-Time" },
    { value: "Part-Time", label: "Part-Time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
  ];
  
  // ==================== SALARY RANGES ====================
  export const SALARY_RANGES = [
    "Less than $1000",
    "$1000 - $15,000",
    "More than $15,000",
  ];
  
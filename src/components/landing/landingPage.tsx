import Category from "@/components/landing/Category";
import Footer from "@/components/landing/Footer";
import GetinTounch from "@/components/landing/GetinTounch";
import HeroSection from "@/components/landing/HeroSection";
import ProvideBanner from "@/components/landing/ProvideBanner";
import TopNavbar from "@/components/landing/TopNavbar";
import { AnimatedTestimonials } from "@/components/landing/ui/animated-testimonials";
import Why from "@/components/landing/Why";
type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
const testimonials: Testimonial[] = [
  {
    quote:
      "Joining pick-up games has never been easier. I just check the site and find a match near me!",
    name: "Jordan Ellis",
    designation: "Amateur Footballer",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "I’ve organized three local tournaments using this platform. The tools for managing brackets and teams are incredible.",
    name: "Nina Alvarez",
    designation: "Community Sports Organizer",
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "As a coach, the site helps me discover new talent and connect with passionate players in my area.",
    name: "Coach Daniel Moore",
    designation: "High School Soccer Coach",
    src: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "I used to struggle filling time slots for my indoor court, but now it’s fully booked every weekend!",
    name: "Priya Mehta",
    designation: "Sports Venue Owner",
    src: "https://images.unsplash.com/photo-1496203695688-3b8985780d6a?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "From booking venues to tracking tournament progress — it’s the all-in-one platform every sports enthusiast needs.",
    name: "Liam Carter",
    designation: "Basketball Player & Tournament Host",
    src: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const LandingPage = () => {
  return (
    <>
      <TopNavbar />
      <HeroSection />
      <Why />
      <ProvideBanner />
      <Category />
      <GetinTounch />
      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      <Footer />
    </>
  );
};

export default LandingPage;

// // app/page.jsx
// import HeroSection from '../components/HeroSection';
// import FeaturesSection from '../components/FeaturesSection';
// import StatsSection from '../components/StatsSection';
// import CTASection from '../components/CTASection';
// import Navigation from "@/components/Navbar/Navbar";
// export default function HomePage() {
//   return (
//     <main>
//       <Navigation />
//       {/* <HeroSection />
//       <FeaturesSection />
//       <StatsSection />
//       <CTASection /> */}
//     </main>
//   );

import Navigation from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturesSection from "@/components/Feature/Feature";
import TestimonialsSection from "@/components/Testimonals/Testimonals";
import FAQSection from "@/components/Faq/Faq";
export default function Home() {
  return (
    <div>
      <HeroSection/>
      <FeaturesSection/>
      <TestimonialsSection/>
      <FAQSection/>
    </div>
  )
}
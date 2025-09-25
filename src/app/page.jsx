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

import Navigation from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturesSection from "@/components/Feature/Feature";
import TestimonialsSection from "@/components/Testimonals/Testimonals";
import FAQSection from "@/components/Faq/Faq";
export default function Home() {
  return (
    <div>
      <Navigation/>
      <HeroSection/>
      <FeaturesSection/>
      <TestimonialsSection/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}
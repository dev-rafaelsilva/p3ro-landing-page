import SplashScreen from "@/components/SplashScreen";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import HeroWebGL from "@/components/HeroWebGL";
import Marquee from "@/components/Marquee";
import GalleryEditorial from "@/components/GalleryEditorial";
import Products from "@/components/Products";
import PolaroidGallery from "@/components/PolaroidGallery";
import Process from "@/components/Process";
import Manifesto from "@/components/Manifesto";
import Area from "@/components/Area";
import Stats from "@/components/Stats";
import BeforeAfter from "@/components/BeforeAfter";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import InstagramGrid from "@/components/InstagramGrid";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ChatWidget from "@/components/ChatWidget";
import BackToTop from "@/components/BackToTop";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main id="conteudo">
        <HeroWebGL />
        <Marquee />
        <GalleryEditorial />
        <Products />
        <PolaroidGallery />
        <Process />
        <Manifesto />
        <Area />
        <Stats />
        <BeforeAfter />
        <Services />
        <Pricing />
        <Testimonials />
        <About />
        <InstagramGrid />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ChatWidget />
      <BackToTop />
      <MobileBar />
    </>
  );
}

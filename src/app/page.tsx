import SplashScreen from "@/components/SplashScreen";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import HeroWebGL from "@/components/HeroWebGL";
import Stats from "@/components/Stats";
import Trust from "@/components/Trust";
import Marquee from "@/components/Marquee";
import Products from "@/components/Products";
import Manifesto from "@/components/Manifesto";
import GalleryEditorial from "@/components/GalleryEditorial";
import BeforeAfter from "@/components/BeforeAfter";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import PolaroidGallery from "@/components/PolaroidGallery";
import Testimonials from "@/components/Testimonials";
import InstagramGrid from "@/components/InstagramGrid";
import Faq from "@/components/Faq";
import Area from "@/components/Area";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main id="conteudo">
        <HeroWebGL />
        <Stats />
        <Trust />
        <Marquee />
        <Products />
        <Manifesto />
        <GalleryEditorial />
        <BeforeAfter />
        <Services />
        <Process />
        <Pricing />
        <About />
        <PolaroidGallery />
        <Testimonials />
        <InstagramGrid />
        <Faq />
        <Area />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

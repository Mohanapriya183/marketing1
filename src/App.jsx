// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Dashboard from "./components/dashboard";
// import Services from "./components/services";
// import Portfolio from "./components/portofolio";
// import Clients from "./components/client";
// import About from "./components/about";
// import Second from "./components/second";
// import TestimonialPage from "./components/Testimonials";
// import ContactPage from "./components/contact";

// import BlogPage from "./components/blog";

// export default function App() {
//   return (
//     <>
//       <Router>
         
//         <Routes>
//           <Route path="/" element={<Dashboard/>} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/portfolio" element={<Portfolio />} />
//           <Route path="/clients" element={<Clients />} />
//           <Route path="/about-us" element={<About />} />
//           <Route path="/contact" element={<ContactPage />} />
//           {/* <Route path="*" element={<BlogPage />} /> */}
//           <BlogPage/>
          
          
//         </Routes>
//         <Second /> {/* Render Second component on all pages */}
//         <TestimonialPage />
//         {/* <Footer />  */}
        
//       </Router>
//     </>
//   );
// }








import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./components/dashboard";
import Services from "./components/services";
import Portfolio from "./components/portofolio";
import Clients from "./components/client";
import About from "./components/about";
// import Second from "./components/second";
// import BlogPage from "./components/blog";
// import TestimonialPage from "./components/Testimonials";
import ContactPage from "./components/contact";
import Smm from "./components/smm";
import Seo from "./components/seo";
import Cm from "./components/content";
import Im from "./components/influencer";
import Email from "./components/email";
import PaidAd from "./components/paidadd";
import Branding from "./components/branding";
import Analytics from "./components/SEOAnalytics";
// import Footer from "./components/footer";

// import BlogPage from "./components/footer";

export default function App() {
  return (
    <>
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/smm" element={<Smm/>}/>
        <Route path="/seo" element={<Seo/>}/>
        <Route path="/content" element={<Cm/>}/>
        <Route path="/influencer" element={<Im/>}/>
        <Route path="/email" element={<Email/>}/>
        <Route path="/paidad" element={<PaidAd/>}/>
        <Route path="/branding" element={<Branding/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        
        
      
        
        
      </Routes>
      {/* <Second/>
      <TestimonialPage/> */}
  
      </div>
      </Router>
    
    {/* <Services/>
    <Portfolio/>
    <Clients/>
    <About/> */}
    {/* <ContactForm/> */}
    {/* <TestimonialPage/>
    <BlogPage/> */}
    {/* <Footer/> */}
    </>
  );
}
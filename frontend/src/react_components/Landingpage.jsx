import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Onfra logo and illustration URLs (replace with local assets if available)
const ONFRA_LOGO = "https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png";
const HERO_ILLUSTRATION = "https://onfra.io/wp-content/uploads/2024/09/onfra-hero-illustration.png"; // Replace with actual illustration if available
const FEATURE_ICONS = [
  "https://onfra.io/wp-content/uploads/2024/09/feature1.svg",
  "https://onfra.io/wp-content/uploads/2024/09/feature2.svg",
  "https://onfra.io/wp-content/uploads/2024/09/feature3.svg",
  "https://onfra.io/wp-content/uploads/2024/09/feature4.svg",
];

const features = [
  { icon: FEATURE_ICONS[0], title: "Instant Sharing", desc: "Share your card with a tap or QR code." },
  { icon: FEATURE_ICONS[1], title: "Custom Branding", desc: "Personalize with your logo, colors, and info." },
  { icon: FEATURE_ICONS[2], title: "Contactless & Secure", desc: "No app needed. Data stays private." },
  { icon: FEATURE_ICONS[3], title: "Analytics", desc: "Track views and engagement in real time." },
];

const steps = [
  { title: "1. Create", desc: "Sign up and design your digital card in minutes." },
  { title: "2. Share", desc: "Send via QR, link, or NFC. No app required." },
  { title: "3. Connect", desc: "Contacts save your info instantly to their phone." },
];

const benefits = [
  "Stand out with a modern, eco-friendly card.",
  "Update your details anytime—no reprints needed.",
  "Impress clients and grow your network effortlessly.",
];

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="relative bg-gradient-to-b from-white via-[#f8fafc] to-gray-50 text-[#212121] font-sans flex flex-col min-h-screen overflow-x-hidden">
      {/* Decorative SVG grid pattern background */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-5 pointer-events-none z-0" aria-hidden="true"></div>
      {/* Large watermark BizCard logo behind content (hero only) */}
      <section className="relative flex flex-col justify-center items-center text-center bg-transparent overflow-hidden min-h-[calc(100vh-80px)] pb-0 z-10">
        <div className="absolute inset-0 flex justify-center items-center opacity-15 pointer-events-none z-0 select-none">
          <img src={ONFRA_LOGO} alt="BizCard logo watermark" className="w-[32rem] max-w-full filter brightness-110" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Minimal text-based intro, no image */}
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Welcome</p>
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
            Digital Identity. Simplified.
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            The Smarter Way to Share Your <span className="text-[#28c76f]">Business Card</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl mx-auto">
            Create, personalize, and share your digital business card—anytime, anywhere. Powered by BizCard’s secure, eco-friendly platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-0">
            <a href="/build/0" className="rounded-full bg-[#28c76f] px-7 py-3 text-base font-semibold text-white shadow-md hover:bg-[#21b05c] transition">
              Get Started Free
            </a>
            <a href="#features" className="rounded-full border border-[#28c76f] px-7 py-3 text-base font-semibold text-[#28c76f] hover:bg-[#e6f9ef] transition">
              See Features
            </a>
          </div>
        </div>
      </section>
      {/* Divider */}
      <div className="h-px bg-gray-200 my-8 mx-auto w-3/4 z-10" />
      {/* Feature Grid */}
      <section id="features" className="w-full bg-[#f8fafc] py-12 px-4 md:px-0 z-10">
        <p className="text-xs text-gray-400 text-center mb-4">Explore what makes BizCard powerful</p>
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 shadow-md transition hover:shadow-lg hover:border-[#28c76f] group"
            >
              <h3 className="font-bold text-lg mb-2 group-hover:text-[#28c76f] transition-colors">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Divider */}
      <div className="h-px bg-gray-200 my-8 mx-auto w-3/4 z-10" />
      {/* How it Works */}
      <section className="w-full py-14 px-4 md:px-0 bg-white z-10">
        <p className="text-xs text-gray-400 text-center mb-4">How BizCard Works</p>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#212121]">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center px-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e6f9ef] text-[#28c76f] font-bold text-xl mb-3 shadow-sm">{i+1}</div>
                <h4 className="font-semibold text-lg mb-1">{s.title}</h4>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Divider */}
      <div className="h-px bg-gray-200 my-8 mx-auto w-3/4 z-10" />
      {/* Benefits */}
      <section className="w-full bg-[#f8fafc] py-12 px-4 md:px-0 z-10">
        <p className="text-xs text-gray-400 text-center mb-4">Benefits</p>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#212121]">Why Choose BizCard Digital Cards?</h2>
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center justify-center gap-3 text-lg text-gray-700">
                <span className="inline-block w-6 h-6 bg-[#28c76f] rounded-full text-white flex items-center justify-center font-bold mr-2 shadow">✓</span>
                {b.replace(/Onfra|onfra/gi, 'BizCard')}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Divider */}
      <div className="h-px bg-gray-200 my-8 mx-auto w-3/4 z-10" />
      {/* Final CTA */}
      <section className="w-full pb-16 md:pb-24 bg-white z-10">
        <p className="text-xs text-gray-400 text-center mb-4">Get Started</p>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mt-12 md:mt-20 mb-4 text-2xl md:text-3xl font-bold text-[#212121]">Ready to Go Digital?</h2>
          <p className="text-lg text-gray-700 mb-8">Sign up now and create your free BizCard digital business card in minutes.</p>
          <a href="/build/0" className="rounded-full bg-[#28c76f] px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#21b05c] transition mt-6 mb-8 block w-fit mx-auto">
            Get Started Free
          </a>
        </div>
      </section>
      {/* New Onfra-style informational panel above the footer */}
      <section className="w-full bg-[#f5f7fb] py-10 px-4 border-t border-gray-200 pb-40 mb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo, About, Contact */}
          <div>
            <div className="flex items-center mb-4">
              <img src={ONFRA_LOGO} alt="Onfra Logo" className="w-24 h-auto" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              #1 SaaS platform for data-driven workplace management empowers you to manage visitor check-ins, flexipass usage, delivery tracking, employee management, desk allocation, and meeting room utilisation.
            </p>
            <a href="#contact" className="text-[#28c76f] font-medium hover:underline mb-2 inline-block">Contact Us</a>
            <div className="text-sm text-gray-600 mb-2">
              <div>Email: <a href="mailto:support@onfra.io" className="hover:underline">support@onfra.io</a></div>
              <div>India: <a href="tel:+919884899868" className="hover:underline">+91 98848 99868</a></div>
            </div>
            <div className="flex gap-2 mt-4">
              <span className="w-8 h-8 rounded-full bg-[#28c76f] inline-flex items-center justify-center text-white text-xl">≡</span>
              <span className="w-8 h-8 rounded-full bg-[#28c76f] inline-flex items-center justify-center text-white text-xl">≡</span>
              <span className="w-8 h-8 rounded-full bg-[#28c76f] inline-flex items-center justify-center text-white text-xl">≡</span>
            </div>
          </div>
          {/* Column 2: Products */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Products</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Visitors</li>
              <li>Flexipass</li>
              <li>Employees</li>
              <li>Queue</li>
              <li>Deliveries</li>
              <li>Material Pass</li>
              <li>Rooms</li>
              <li>Desks</li>
              <li>Vehicle Pass</li>
              <li>Signage</li>
              <li>Bizcard</li>
            </ul>
          </div>
          {/* Column 3: Resources */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Resources</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Blog</li>
              <li>Case Studies</li>
              <li>Support</li>
              <li>Community</li>
              <li>Roadmap</li>
              <li>Product releases</li>
              <li>Compare</li>
              <li>Survey Form</li>
              <li>Supported Printers</li>
              <li>Become a Partner</li>
              <li>Quick Links</li>
              <li>Partner Program Terms and Conditions</li>
            </ul>
          </div>
          {/* Column 4: Solution */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Solution</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Hybrid Office Management</li>
              <li>Co Working Management</li>
              <li>Facility Management</li>
              <li>Tech Park Management</li>
              <li>Centralize workplace management</li>
              <li>Employee, tenant and visitor experience</li>
              <li>Safety, security and compliance</li>
              <li>Workplace utilization and insights</li>
              <li>Workplaces and buildings</li>
              <li>Sustainable Workplace</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

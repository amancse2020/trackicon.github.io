import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Zap, Sparkles, Globe, Tag, HelpCircle, Mail, LayoutDashboard,
  UserCheck, BrainCircuit, Target, Rocket, ShieldCheck, Bot,
  MessageCircle, BellRing, Database, Cpu, GraduationCap, ShoppingBag,
  Smartphone, TrendingUp, Check, ArrowRight, Send, Phone, Twitter,
  Instagram, Linkedin, Facebook, Flame, Clock, Users, ChevronDown,
  Menu, X, CheckCircle, AlertCircle,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: TrackIconHome,
})

const LOGO_URL =
  'https://z-cdn-media.chatglm.cn/files/32d583c3-32e6-4079-8d55-71b756d07e83.jpeg?auth_key=1877641765-32a8a13aaa0342d0baaf747036cd2c7b-0-672ba68dc212461f3502ad83ff0506b3'

// ─── Chat logic ──────────────────────────────────────────────────────────────

const chatResponses: Record<string, string> = {
  website:
    '🟢 **Business Growth Website** — ₹9,999 to ₹14,999\n\n✅ Custom 5-7 page website\n✅ AI Chatbot (24/7)\n✅ WhatsApp Integration\n✅ Smart Lead Capture\n✅ Basic SEO\n\nWant to get started? Fill our contact form or WhatsApp us!',
  ecommerce:
    '🟣 **E-Commerce Launch** — ₹14,999 to ₹21,999\n\n✅ Complete online store\n✅ 20-50 product listings\n✅ Payment gateway (UPI/Cards)\n✅ AI Assistant + WhatsApp AI\n✅ Order management\n\nInterested? Let\'s talk!',
  app: '📱 **Android App** — Two packages:\n\n🟢 Starter: ₹19,999 – ₹39,999\n🟡 Growth: ₹49,000 – ₹89,000\n\nBoth include AI chat, lead capture, push notifications. Growth adds login, payments, admin panel, and advanced AI.\n\nWhich one interests you?',
  jee: '🎓 **JEE SureSeat Counselling**\n\n✅ College & branch prediction\n✅ JoSAA & CSAB form filling\n✅ Smart choice-filling strategy\n✅ Seat optimization every round\n✅ 1:1 Student + Parent session\n\n🔥 Early bird discount for first 50 students!',
  pricing:
    '💰 Here\'s our pricing overview:\n\n🔵 Website: ₹9,999 – ₹14,999\n🟣 E-Commerce: ₹14,999 – ₹21,999\n🟢 Starter App: ₹19,999 – ₹39,999\n🟡 Growth App: ₹49,000 – ₹89,000\n🎓 JEE Counselling: Special pricing\n\n⚠️ Limited offer: 20% OFF for first 10 clients!',
  ai: '🤖 Our AI automation includes:\n\n• 24/7 AI Sales Chatbot (Craft.AI)\n• Smart Lead Capture (auto-saves to Google Sheet)\n• AI WhatsApp Automation\n• Instant Notifications (Email + WhatsApp)\n• Automated Data Management\n• Behavior-Based Automation (Growth App)\n\nAll included in every package — no extra cost!',
  support:
    '💬 **Support Options:**\n\n📞 WhatsApp: +91 97954 45292\n📧 Email: trackiconofficial@gmail.com\n\nWe provide personal 1-on-1 support — no tickets, no waiting. Direct help from real humans!\n\nOr fill the contact form and we\'ll reach out within 1 hour.',
  offer:
    '🔥 **Current Offers:**\n\n✅ FREE Consultation\n✅ 20% OFF for first 10 clients\n✅ Combo discounts available\n\n⏰ These are limited-time offers. Contact us now to claim!',
  hello:
    '👋 Hi! I\'m **Craft.AI** — TrackIcon\'s smart assistant.\n\nI can help you with:\n• 💼 Website Development\n• 🛒 E-Commerce Setup\n• 📱 Android App Development\n• 🎓 JEE Counselling\n• 💰 Pricing Details\n• 🤖 AI Features\n\nWhat are you looking for?',
  thanks:
    'You\'re welcome! 😊\n\nIf you need anything else, feel free to ask. You can also:\n\n📞 WhatsApp us directly\n📧 Fill the contact form\n\nI\'m Craft.AI — always here to help!',
}

function getBotResponse(msg: string) {
  const lower = msg.toLowerCase().replace(/[^a-z0-9\s]/g, '')
  if (lower.includes('website') || lower.includes('web') || lower.includes('site')) return chatResponses.website
  if (lower.includes('ecommerce') || lower.includes('ecom') || lower.includes('store') || lower.includes('shop')) return chatResponses.ecommerce
  if (lower.includes('app') || lower.includes('android') || lower.includes('mobile')) return chatResponses.app
  if (lower.includes('jee') || lower.includes('counselling') || lower.includes('josaa') || lower.includes('csab')) return chatResponses.jee
  if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('how much') || lower.includes('fee')) return chatResponses.pricing
  if (lower.includes('ai') || lower.includes('automation') || lower.includes('chatbot') || lower.includes('bot') || lower.includes('craft')) return chatResponses.ai
  if (lower.includes('support') || lower.includes('help') || lower.includes('contact') || lower.includes('reach')) return chatResponses.support
  if (lower.includes('offer') || lower.includes('discount') || lower.includes('deal')) return chatResponses.offer
  if (lower.includes('hello') || lower === 'hi' || lower.includes('hey')) return chatResponses.hello
  if (lower.includes('thanks') || lower.includes('thank you')) return chatResponses.thanks
  return "Thanks for your message! 😊\n\nI'm **Craft.AI** — I can help you with:\n• 💼 Website Development\n• 🛒 E-Commerce Setup\n• 📱 Android Apps\n• 🎓 JEE Counselling\n• 💰 Pricing\n• 🤖 AI Features\n\nOr type **\"offer\"** for current discounts!\n\nFor detailed queries, please WhatsApp us at +91 97954 45292."
}

const followUpMap: Record<string, string[]> = {
  'Website Development': ['💰 Pricing', '🛒 E-Commerce', '🤖 AI Features'],
  'E-Commerce Setup': ['💰 Pricing', '📱 Android App', '🔥 Current Offers'],
  'Android App': ['💰 Pricing', '🤖 AI Features', '🔥 Current Offers'],
  'JEE Counselling': ['🔥 Current Offers', '📞 Contact Us'],
  'Pricing': ['🔥 Current Offers', '📞 Contact Us'],
  'AI Features': ['💼 Website', '💰 Pricing'],
  'Current Offers': ['📞 Contact Us', '💼 Website'],
  'Support / Contact': ['💼 Website', '💰 Pricing'],
}
const defaultQuickReplies = ['💼 Website', '🛒 E-Commerce', '📱 Android App', '🎓 JEE Counselling', '💰 Pricing', '🔥 Offers']

function getTopicFromMsg(lower: string): string | null {
  if (lower.includes('website') || lower.includes('web') || lower.includes('site')) return 'Website Development'
  if (lower.includes('ecom') || lower.includes('store') || lower.includes('shop')) return 'E-Commerce Setup'
  if (lower.includes('app') || lower.includes('android')) return 'Android App'
  if (lower.includes('jee') || lower.includes('counselling')) return 'JEE Counselling'
  if (lower.includes('price') || lower.includes('cost')) return 'Pricing'
  if (lower.includes('ai') || lower.includes('bot') || lower.includes('automation') || lower.includes('craft')) return 'AI Features'
  if (lower.includes('offer') || lower.includes('discount')) return 'Current Offers'
  if (lower.includes('support') || lower.includes('contact')) return 'Support / Contact'
  return null
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Tag_({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
      style={{ background: 'rgba(255,0,110,0.1)', color: '#FF006E', border: '1px solid rgba(255,0,110,0.3)' }}>
      {children}
    </span>
  )
}

function SectionTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="mb-6">
      <Tag_>
        {icon}
        <span>{label}</span>
      </Tag_>
    </div>
  )
}

function NavBar({ onMenuOpen }: { onMenuOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks = ['Home', 'About Us', 'Services', 'Pricing', 'Contact']
  const anchors = ['#home', '#about', '#services', '#pricing', '#contact']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-6 px-4">
      <div className="max-w-[1600px] mx-auto">
        <div
          className="backdrop-blur-md rounded-full shadow-2xl shadow-black/50 flex items-center justify-between pt-3 pb-3 pl-5 pr-3 transition-all duration-300"
          style={{
            background: 'rgba(21,23,27,0.8)',
            border: `1px solid ${scrolled ? 'rgba(255,0,110,0.2)' : '#23252B'}`,
          }}
        >
          <a href="#home" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="TrackIcon" className="w-8 h-8 rounded-full object-contain" />
            <span className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F5F5F5' }}>TrackIcon</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a key={link} href={anchors[i]}
                className="text-sm font-medium transition-colors duration-150 hover:text-white"
                style={{ color: '#A1A1A6' }}>{link}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#contact"
              className="hidden sm:inline-flex text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]"
              style={{ background: '#FF006E' }}>
              Get Started
            </a>
            <button onClick={onMenuOpen}
              className="md:hidden w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
              style={{ borderColor: '#23252B', color: '#A1A1A6' }}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]
  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-300"
      style={{
        background: 'rgba(14,15,17,0.95)',
        backdropFilter: 'blur(24px)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      <button onClick={onClose}
        className="absolute top-10 right-8 w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
        style={{ borderColor: '#23252B', color: '#A1A1A6' }}>
        <X size={18} />
      </button>
      <img src={LOGO_URL} alt="TrackIcon" className="w-16 h-16 rounded-full object-contain mb-2" />
      {links.map(l => (
        <a key={l.label} href={l.href} onClick={onClose}
          className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F5F5F5' }}>
          {l.label}
        </a>
      ))}
      <a href="#contact" onClick={onClose}
        className="text-white text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-full mt-4 transition-all hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]"
        style={{ background: '#FF006E' }}>
        Get Started
      </a>
    </div>
  )
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pulse-glow"
        style={{ background: 'rgba(255,0,110,0.05)' }} />
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 text-center pt-24">
        <div className="mb-10">
          <img src={LOGO_URL} alt="TrackIcon"
            className="mx-auto rounded-full object-contain"
            style={{ width: 'clamp(100px, 10vw, 150px)', height: 'clamp(100px, 10vw, 150px)' }} />
        </div>
        <div className="mb-8">
          <Tag_>
            <Zap size={12} />
            <span>Done-For-You Digital Solutions</span>
          </Tag_>
        </div>
        <h1 className="font-bold leading-[0.9] tracking-tight mb-6"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.5rem, 8vw, 6rem)', color: '#F5F5F5' }}>
          <span className="block">We Don't Sell</span>
          <span className="block" style={{ color: '#FF006E' }}>Tools —</span>
          <span className="block">We Deliver</span>
          <span className="block">Results</span>
        </h1>
        <p className="text-base md:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#A1A1A6' }}>
          Websites, Apps &amp; AI Automation built to generate leads, convert customers, and grow your business — all done-for-you with personal 1-on-1 support.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#pricing"
            className="text-white text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-full flex items-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]"
            style={{ background: '#FF006E' }}>
            View Packages <ArrowRight size={16} />
          </a>
          <a href="#contact"
            className="text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-full flex items-center gap-2 transition-all hover:bg-[#FF006E] hover:text-white"
            style={{ border: '1px solid #23252B', color: '#F5F5F5' }}>
            Free Consultation
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '50+', label: 'Projects Delivered', accent: false },
            { value: '24/7', label: 'AI Support', accent: false },
            { value: '1:1', label: 'Personal Help', accent: false },
            { value: '100%', label: 'Result Focused', accent: true },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-bold text-2xl md:text-3xl" style={{ fontFamily: 'Space Grotesk, sans-serif', color: s.accent ? '#FF006E' : '#F5F5F5' }}>{s.value}</div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: '#A1A1A6' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 hero-gradient" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest" style={{ color: '#52525B' }}>Scroll</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #52525B, transparent)' }} />
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['Website Design', 'App Development', 'AI Automation', 'E-Commerce', 'Lead Generation', 'WhatsApp Bots', 'SEO Optimization', 'JEE Counselling', 'Chatbot Integration', 'Payment Gateway']
  const row = items.flatMap(item => [
    <span key={item}>{item}</span>,
    <span key={`${item}-dot`} style={{ color: '#FF006E' }}>◆</span>,
  ])
  return (
    <div className="border-y overflow-hidden py-4" style={{ borderColor: '#23252B' }}>
      <div className="marquee-track whitespace-nowrap">
        <span className="inline-flex items-center gap-8 px-4 text-sm uppercase tracking-widest font-medium" style={{ color: '#52525B' }}>
          {row}
        </span>
        <span className="inline-flex items-center gap-8 px-4 text-sm uppercase tracking-widest font-medium" style={{ color: '#52525B' }}>
          {row}
        </span>
      </div>
    </div>
  )
}

function WhyDifferent() {
  const cards = [
    { icon: <LayoutDashboard size={24} />, title: 'Done-For-You Setup', desc: 'Complete website, app & AI setup — no code needed from your end.' },
    { icon: <UserCheck size={24} />, title: 'Personal 1-on-1 Support', desc: 'No tickets, no bots for support. Direct help from real humans.' },
    { icon: <BrainCircuit size={24} />, title: 'AI Integration', desc: 'Automate with AI chatbots, smart lead capture, WhatsApp automation.' },
    { icon: <Target size={24} />, title: 'Leads & Conversions', desc: 'Every system optimized for real growth — not just looking pretty.' },
    { icon: <Rocket size={24} />, title: 'Plan + Build + Optimize', desc: 'We plan strategically, build meticulously, and optimize continuously.' },
    { icon: <ShieldCheck size={24} />, title: 'Our Promise', desc: '"We don\'t just build websites or apps, we build lead-generating systems."' },
  ]
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-[1550px] mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <SectionTag icon={<Sparkles size={12} />} label="Why We Are Different" />
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Strategy + Execution<br /><span style={{ color: '#FF006E' }}>+ AI Integration</span>
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: '#A1A1A6' }}>
            We don't just build websites or apps — we build lead-generating systems for your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(c => (
            <div key={c.title}
              className="group border rounded-2xl p-8 transition-all duration-500 hover:bg-white/[0.03]"
              style={{ borderColor: '#23252B' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-[rgba(255,0,110,0.2)]"
                style={{ background: 'rgba(255,0,110,0.1)', color: '#FF006E' }}>
                {c.icon}
              </div>
              <h3 className="font-bold text-xl mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{c.title}</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: '#A1A1A6' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    {
      seed: 'trackicon-website', tag: 'Website', title: 'Business Growth\nWebsite',
      desc: 'Custom-designed, mobile-friendly websites with AI chatbot, smart lead capture, WhatsApp integration.',
      pills: ['5-7 Pages', 'AI Chatbot', 'WhatsApp', 'SEO'],
    },
    {
      seed: 'trackicon-ecommerce', tag: 'E-Commerce', title: 'Online Store\nLaunch',
      desc: 'Complete e-commerce with product listings, payment gateways, order management, AI support.',
      pills: ['20-50 Products', 'Payments', 'Orders', 'AI Assistant'],
    },
    {
      seed: 'trackicon-app', tag: 'Android App', title: 'Custom Android\nApplications',
      desc: 'Play Store-ready Android apps with AI chat, lead capture, push notifications, payments.',
      pills: ['Play Store', 'Push', 'AI Chat', 'Payments'],
    },
    {
      seed: 'trackicon-jee', tag: 'Education', title: 'JEE SureSeat\nCounselling',
      desc: 'Personalized college prediction, JoSAA/CSAB form filling, smart strategy, 1:1 sessions.',
      pills: ['JoSAA/CSAB', '1:1 Session', 'All India'],
    },
  ]
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="max-w-[1550px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionTag icon={<Globe size={12} />} label="Our Services" />
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Everything You Need<br /><span style={{ color: '#FF006E' }}>Under One Roof</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(s => (
            <div key={s.tag}
              className="group border rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/[0.03]"
              style={{ borderColor: '#23252B' }}>
              <div className="aspect-[16/9] overflow-hidden relative">
                <img src={`https://picsum.photos/seed/${s.seed}/800/450.jpg`} alt={s.tag}
                  className="w-full h-full object-cover opacity-60 transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0E0F11, rgba(14,15,17,0.5), transparent)' }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <Tag_><span>{s.tag}</span></Tag_>
                  <h3 className="font-bold text-2xl md:text-3xl mt-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {s.title.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-light leading-relaxed mb-4" style={{ color: '#A1A1A6' }}>{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.pills.map(p => (
                    <span key={p} className="text-[10px] uppercase tracking-widest rounded-full px-3 py-1 border"
                      style={{ color: '#52525B', borderColor: '#23252B' }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AIShowcase() {
  const features = [
    { icon: <Bot size={14} />, title: 'AI Sales Chatbot (24/7)', desc: 'Answers queries, qualifies leads, captures data automatically.' },
    { icon: <MessageCircle size={14} />, title: 'AI WhatsApp Automation', desc: 'Automated replies, follow-ups, and notifications.' },
    { icon: <BellRing size={14} />, title: 'Instant Notifications', desc: 'Real-time alerts on WhatsApp & Email for every lead.' },
    { icon: <Database size={14} />, title: 'Automated Data Management', desc: 'All leads automatically organized — no manual entry.' },
  ]
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,0,110,0.02), transparent)' }} />
      <div className="max-w-[1550px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl border overflow-hidden relative"
              style={{ borderColor: '#23252B', boxShadow: '0 0 60px rgba(255,0,110,0.15)' }}>
              <img src="https://picsum.photos/seed/trackicon-ai/700/700.jpg" alt="AI"
                className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0E0F11, rgba(14,15,17,0.6), transparent)' }} />
              {[
                { top: '2rem', left: '2rem', delay: '0s', color: '#22c55e', bg: 'rgba(34,197,94,0.2)', icon: <Bot size={20} style={{ color: '#22c55e' }} />, label: 'AI Chatbot', sub: '24/7 Active' },
                { bottom: '6rem', right: '2rem', delay: '1s', color: '#FF006E', bg: 'rgba(255,0,110,0.2)', icon: <MessageCircle size={20} style={{ color: '#FF006E' }} />, label: 'WhatsApp AI', sub: 'Auto Reply' },
                { bottom: '2rem', left: '2rem', delay: '2s', color: '#3b82f6', bg: 'rgba(59,130,246,0.2)', icon: <Database size={20} style={{ color: '#3b82f6' }} />, label: 'Smart Leads', sub: 'Auto Captured' },
              ].map((badge, i) => (
                <div key={i} className="float absolute rounded-xl p-4 backdrop-blur border flex items-center gap-3"
                  style={{ top: badge.top, left: badge.left, bottom: badge.bottom, right: badge.right, animationDelay: badge.delay, background: 'rgba(21,23,27,0.9)', borderColor: '#23252B' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: badge.bg }}>{badge.icon}</div>
                  <div>
                    <div className="text-xs font-bold">{badge.label}</div>
                    <div className="text-[10px]" style={{ color: '#52525B' }}>{badge.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTag icon={<Cpu size={12} />} label="AI-Powered" />
            <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              AI Automation<br /><span style={{ color: '#FF006E' }}>Built Into Everything</span>
            </h2>
            <p className="text-base md:text-lg font-light leading-relaxed mb-10" style={{ color: '#A1A1A6' }}>
              Every package includes AI features that work around the clock.
            </p>
            <div className="space-y-4">
              {features.map(f => (
                <div key={f.title} className="flex items-start gap-4 border rounded-xl p-4" style={{ borderColor: '#23252B' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(255,0,110,0.1)', color: '#FF006E' }}>
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{f.title}</div>
                    <div className="text-xs font-light leading-relaxed" style={{ color: '#A1A1A6' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    {
      popular: true,
      iconBg: 'rgba(59,130,246,0.1)', iconColor: '#3b82f6', Icon: Globe,
      title: 'Business Growth', sub: 'Website with AI',
      from: '₹9,999', price: '₹14,999',
      accent: '#FF006E',
      features: ['Custom Website (5-7 Pages)', 'Mobile-Friendly & Fast', 'WhatsApp & Contact Form', 'Basic SEO'],
      aiLabel: '🤖 AI Included', aiColor: '#FF006E',
      aiFeature: '24/7 Chatbot + Lead Capture + WhatsApp AI',
      cta: 'Get Started', ctaStyle: 'primary',
    },
    {
      popular: false,
      iconBg: 'rgba(168,85,247,0.1)', iconColor: '#a855f7', Icon: ShoppingBag,
      title: 'E-Commerce', sub: 'Online store',
      from: '₹14,999', price: '₹21,999',
      accent: '#a855f7',
      features: ['Shop Design + 20-50 Products', 'Payment Gateway (UPI/Cards)', 'Order Management + WhatsApp'],
      aiLabel: '🤖 Advanced AI', aiColor: '#a855f7',
      aiFeature: 'AI Assistant + WhatsApp AI + Smart Leads',
      cta: 'Get Started', ctaStyle: 'outline',
    },
    {
      popular: false,
      iconBg: 'rgba(34,197,94,0.1)', iconColor: '#22c55e', Icon: Smartphone,
      title: 'Starter App', sub: 'Android basics',
      from: '₹19,999', price: '₹39,999',
      accent: '#22c55e',
      features: ['Play Store Ready App', 'WhatsApp & Call Buttons'],
      aiLabel: '🤖 AI Automation', aiColor: '#22c55e',
      aiFeature: 'In-App AI Chat + Lead Capture + Notifications',
      cta: 'Get Started', ctaStyle: 'outline',
    },
    {
      popular: false,
      iconBg: 'rgba(234,179,8,0.1)', iconColor: '#eab308', Icon: TrendingUp,
      title: 'Growth App', sub: 'Advanced app',
      from: '₹49,000', price: '₹89,000',
      accent: '#eab308',
      features: ['Login/Signup + Payments + Push + Admin'],
      aiLabel: '🤖 Advanced AI', aiColor: '#eab308',
      aiFeature: 'AI Engine + Lead Qual + Auto Follow-Up + Alerts',
      cta: 'Get Started', ctaStyle: 'outline',
    },
  ]
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="max-w-[1550px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionTag icon={<Tag size={12} />} label="Pricing" />
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Transparent Pricing,<br /><span style={{ color: '#FF006E' }}>Real Value</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map(plan => (
            <div key={plan.title}
              className="relative border rounded-2xl p-8 flex flex-col transition-all duration-500 hover:bg-white/[0.03]"
              style={{ borderColor: '#23252B', boxShadow: plan.popular ? '0 0 30px rgba(255,0,110,0.1)' : undefined }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #FF006E, #FF4D8F)' }}>
                  Most Popular ⭐
                </div>
              )}
              <div className="mb-6 mt-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: plan.iconBg }}>
                  <plan.Icon size={20} style={{ color: plan.iconColor }} />
                </div>
                <h3 className="font-bold text-xl mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{plan.title}</h3>
                <p className="text-xs font-light" style={{ color: '#A1A1A6' }}>{plan.sub}</p>
              </div>
              <div className="mb-6">
                <span className="text-sm" style={{ color: '#52525B' }}>{plan.from} — </span>
                <span className="font-bold text-3xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{plan.price}</span>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <div key={f} className="text-xs flex items-start gap-2" style={{ color: '#A1A1A6' }}>
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: plan.accent }} />
                    {f}
                  </div>
                ))}
                <div className="border-t pt-3 mt-3" style={{ borderColor: '#23252B' }}>
                  <div className="text-[10px] uppercase tracking-widest font-medium mb-2" style={{ color: plan.aiColor }}>{plan.aiLabel}</div>
                </div>
                <div className="text-xs flex items-start gap-2" style={{ color: '#A1A1A6' }}>
                  <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: plan.accent }} />
                  {plan.aiFeature}
                </div>
              </div>
              {plan.ctaStyle === 'primary' ? (
                <a href="#contact"
                  className="text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full text-center block transition-all hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]"
                  style={{ background: '#FF006E' }}>
                  Get Started
                </a>
              ) : (
                <a href="#contact"
                  className="text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full text-center block border transition-all hover:bg-[#FF006E] hover:text-white hover:border-[#FF006E]"
                  style={{ borderColor: '#23252B', color: '#F5F5F5' }}>
                  Get Started
                </a>
              )}
            </div>
          ))}
        </div>
        {/* JEE Counselling card */}
        <div className="mt-12 border rounded-2xl overflow-hidden" style={{ borderColor: '#23252B' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,0,110,0.1)' }}>
                  <GraduationCap size={24} style={{ color: '#FF006E' }} />
                </div>
                <div>
                  <h3 className="font-bold text-2xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>JEE SureSeat Counselling</h3>
                  <p className="text-xs" style={{ color: '#A1A1A6' }}>All India Government Colleges</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {['College & Branch Prediction', 'JoSAA & CSAB Form Filling', 'Smart Choice Filling Strategy', 'Seat Optimization Every Round', 'State Counselling Guidance', '1:1 Student + Parent Session'].map(f => (
                  <div key={f} className="text-xs flex items-start gap-2" style={{ color: '#A1A1A6' }}>
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#FF006E' }} />{f}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
                  style={{ background: 'rgba(255,0,110,0.1)', color: '#FF006E' }}>
                  <Clock size={12} /> Early Bird Discount
                </div>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
                  style={{ background: 'rgba(234,179,8,0.1)', color: '#eab308' }}>
                  <Users size={12} /> First 50 Students Special
                </div>
              </div>
            </div>
            <div className="border-t lg:border-t-0 lg:border-l p-8 md:p-12 flex flex-col items-center justify-center gap-4"
              style={{ background: '#15171B', borderColor: '#23252B' }}>
              <a href="#contact"
                className="text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full flex items-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]"
                style={{ background: '#FF006E' }}>
                Enquire Now <ArrowRight size={14} />
              </a>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: '#52525B' }}>Free Consultation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OfferSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,0,110,0.05), rgba(255,0,110,0.1), rgba(255,0,110,0.05))' }} />
      <div className="max-w-[1550px] mx-auto px-6 relative z-10">
        <div className="border rounded-2xl p-8 md:p-12 text-center" style={{ borderColor: 'rgba(255,0,110,0.3)', boxShadow: '0 0 30px rgba(255,0,110,0.1)' }}>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: 'rgba(255,0,110,0.1)', color: '#FF006E' }}>
            <Flame size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">Limited-Time Offer</span>
          </div>
          <h2 className="font-bold text-3xl md:text-4xl tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Don't Miss Out — <span style={{ color: '#FF006E' }}>Save Big Today</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            {[
              { val: 'FREE', label: 'Consultation' },
              { val: '20% OFF', label: 'First 10 Clients' },
              { val: 'COMBO', label: 'Discounts Available' },
            ].map(o => (
              <div key={o.val} className="border rounded-xl p-4" style={{ background: 'rgba(14,15,17,0.5)', borderColor: '#23252B' }}>
                <div className="font-bold text-2xl mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FF006E' }}>{o.val}</div>
                <div className="text-xs" style={{ color: '#A1A1A6' }}>{o.label}</div>
              </div>
            ))}
          </div>
          <a href="#contact"
            className="text-white text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-full inline-flex items-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]"
            style={{ background: '#FF006E' }}>
            Claim Your Offer <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const faqs = [
    { q: 'Do I need any technical knowledge?', a: 'Not at all! Everything is done-for-you.' },
    { q: 'What does "AI Automation" actually do?', a: '24/7 chatbots, smart lead capture, WhatsApp automation, instant notifications.' },
    { q: 'How long does it take?', a: 'Typically 7–14 days depending on package and complexity.' },
    { q: 'Is pricing one-time or recurring?', a: 'One-time project fees. Hosting/domain is separate (~₹1,000–₹3,000/year).' },
    { q: 'What is JEE SureSeat Counselling?', a: 'Complete counselling support — prediction, form filling, strategy, seat optimization, 1:1 sessions.' },
  ]
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionTag icon={<HelpCircle size={12} />} label="FAQ" />
          <h2 className="font-bold text-3xl md:text-4xl tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-xl overflow-hidden" style={{ borderColor: '#23252B' }}>
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{faq.q}</span>
                <ChevronDown size={18} style={{ color: '#52525B', transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }} />
              </button>
              <div style={{ maxHeight: openIdx === i ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <p className="px-5 pb-5 text-sm font-light leading-relaxed" style={{ color: '#A1A1A6' }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection({ showToast }: { showToast: (msg: string, isError?: boolean) => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const form = e.currentTarget
      const data = new FormData(form)
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      setSubmitted(true)
      showToast('✅ Message sent! Check email & WhatsApp.')
      form.reset()
      setTimeout(() => setSubmitted(false), 3000)
    } catch {
      showToast('❌ Failed to send. Please WhatsApp us directly.', true)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#0E0F11',
    border: '1px solid #23252B',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: '#F5F5F5',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  const socials = [
    { href: 'https://x.com/TrackIconOne', icon: <Twitter size={18} /> },
    { href: 'https://www.instagram.com/trackiconofficial/', icon: <Instagram size={18} /> },
    { href: 'https://www.linkedin.com/company/112149144/', icon: <Linkedin size={18} /> },
    { href: 'https://www.facebook.com/people/TrackIcon/61587768465776/', icon: <Facebook size={18} /> },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,0,110,0.02), transparent)' }} />
      <div className="max-w-[1550px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <SectionTag icon={<Mail size={12} />} label="Contact Us" />
            <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Let's Build Something<br /><span style={{ color: '#FF006E' }}>Amazing Together</span>
            </h2>
            <p className="text-base md:text-lg font-light leading-relaxed mb-10" style={{ color: '#A1A1A6' }}>
              Ready to transform your business? Get in touch for a free consultation.
            </p>
            <div className="space-y-6 mb-10">
              <a href="mailto:trackiconofficial@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all group-hover:border-[#FF006E] group-hover:bg-[rgba(255,0,110,0.1)]"
                  style={{ borderColor: '#23252B' }}>
                  <Mail size={20} style={{ color: '#A1A1A6' }} className="group-hover:text-[#FF006E] transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#52525B' }}>Email</div>
                  <div className="text-sm font-medium group-hover:text-[#FF006E] transition-colors">trackiconofficial@gmail.com</div>
                </div>
              </a>
              <a href="https://wa.me/919795445292" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all group-hover:border-[#FF006E] group-hover:bg-[rgba(255,0,110,0.1)]"
                  style={{ borderColor: '#23252B' }}>
                  <Phone size={20} style={{ color: '#A1A1A6' }} className="group-hover:text-[#FF006E] transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#52525B' }}>Phone / WhatsApp</div>
                  <div className="text-sm font-medium group-hover:text-[#FF006E] transition-colors">+91 97954 45292</div>
                </div>
              </a>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest mb-4" style={{ color: '#52525B' }}>Follow Us</div>
              <div className="flex items-center gap-3">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:border-[#FF006E] hover:text-[#FF006E] hover:bg-[rgba(255,0,110,0.1)]"
                    style={{ borderColor: '#23252B', color: '#A1A1A6' }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border rounded-2xl p-8 md:p-10" style={{ borderColor: '#23252B', background: 'rgba(21,23,27,0.5)' }}>
            <h3 className="font-bold text-xl mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Get Your Free Consultation</h3>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              name="contact"
              method="POST"
              data-netlify="true"
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="subject" value="New consultation request from %{formName} on %{siteName}" />
              <div>
                <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: '#52525B' }}>Your Name *</label>
                <input type="text" name="name" required placeholder="Enter your name"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#FF006E')}
                  onBlur={e => (e.target.style.borderColor = '#23252B')} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: '#52525B' }}>Phone Number *</label>
                <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#FF006E')}
                  onBlur={e => (e.target.style.borderColor = '#23252B')} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: '#52525B' }}>Email</label>
                <input type="email" name="email" placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#FF006E')}
                  onBlur={e => (e.target.style.borderColor = '#23252B')} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: '#52525B' }}>Interested In *</label>
                <select name="service" required
                  style={{ ...inputStyle, color: '#A1A1A6', cursor: 'pointer', appearance: 'none' }}
                  onFocus={e => (e.target.style.borderColor = '#FF006E')}
                  onBlur={e => (e.target.style.borderColor = '#23252B')}>
                  <option value="" disabled>Select a service</option>
                  <option value="Business Growth Website">Business Growth Website</option>
                  <option value="E-Commerce Launch">E-Commerce Launch</option>
                  <option value="Starter Android App">Starter Android App</option>
                  <option value="Growth Android App">Growth Android App</option>
                  <option value="JEE SureSeat Counselling">JEE SureSeat Counselling</option>
                  <option value="Combo / Custom">Combo / Custom Package</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: '#52525B' }}>Message</label>
                <textarea name="message" rows={3} placeholder="Tell us about your project..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => (e.target.style.borderColor = '#FF006E')}
                  onBlur={e => (e.target.style.borderColor = '#23252B')} />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full text-white text-sm font-bold uppercase tracking-widest px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(255,0,110,0.4)] disabled:opacity-70"
                style={{ background: '#FF006E' }}>
                {submitting ? (
                  <>
                    <span>Sending...</span>
                    <span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
                  </>
                ) : submitted ? (
                  <>
                    <span>Sent!</span>
                    <CheckCircle size={16} />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const socials = [
    { href: 'https://x.com/TrackIconOne', icon: <Twitter size={18} /> },
    { href: 'https://www.instagram.com/trackiconofficial/', icon: <Instagram size={18} /> },
    { href: 'https://www.linkedin.com/company/112149144/', icon: <Linkedin size={18} /> },
    { href: 'https://www.facebook.com/people/TrackIcon/61587768465776/', icon: <Facebook size={18} /> },
  ]
  return (
    <footer className="border-t py-12" style={{ borderColor: '#23252B' }}>
      <div className="max-w-[1550px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={LOGO_URL} alt="TrackIcon" className="w-8 h-8 rounded-full object-contain" />
              <span className="font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>TrackIcon</span>
            </div>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: '#A1A1A6' }}>We don't sell tools — we deliver results.</p>
            <p className="text-xs italic" style={{ color: '#52525B' }}>"We build lead-generating systems for your business."</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest mb-4" style={{ color: '#52525B' }}>Quick Links</div>
            <div className="space-y-3">
              {[['Home', '#home'], ['About Us', '#about'], ['Services', '#services'], ['Pricing', '#pricing'], ['Contact', '#contact']].map(([label, href]) => (
                <a key={label} href={href} className="block text-sm transition-colors hover:text-[#FF006E]" style={{ color: '#A1A1A6' }}>{label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest mb-4" style={{ color: '#52525B' }}>Get In Touch</div>
            <div className="space-y-3">
              <a href="mailto:trackiconofficial@gmail.com" className="flex items-center gap-2 text-sm transition-colors hover:text-[#FF006E]" style={{ color: '#A1A1A6' }}>
                <Mail size={16} /> trackiconofficial@gmail.com
              </a>
              <a href="https://wa.me/919795445292" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm transition-colors hover:text-[#FF006E]" style={{ color: '#A1A1A6' }}>
                <Phone size={16} /> +91 97954 45292
              </a>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="transition-colors hover:text-[#FF006E]" style={{ color: '#52525B' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: '#23252B' }}>
          <p className="text-xs" style={{ color: '#52525B' }}>© 2025 TrackIcon. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#52525B' }}>Done-for-you · AI-Powered · Results-Focused</p>
        </div>
      </div>
    </footer>
  )
}

interface ChatMessage {
  text: string
  isBot: boolean
}

function CraftAIChatbot() {
  const [open, setOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [quickReplies, setQuickReplies] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function addBotResponse(text: string, qr?: string[]) {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { text, isBot: true }])
      setQuickReplies(qr ?? defaultQuickReplies)
    }, 600 + Math.random() * 800)
  }

  function handleToggle() {
    setOpen(prev => {
      if (!prev && !initialized) {
        setInitialized(true)
        setTimeout(() => {
          setMessages([{ text: "👋 Hi! I'm **Craft.AI** — TrackIcon's smart assistant.\n\nHow can I help you today?", isBot: true }])
          setQuickReplies(defaultQuickReplies)
        }, 400)
      }
      return !prev
    })
  }

  function sendMessage(msg: string) {
    if (!msg.trim()) return
    setMessages(prev => [...prev, { text: msg, isBot: false }])
    setQuickReplies([])
    const lower = msg.toLowerCase()
    const topic = getTopicFromMsg(lower)
    const qr = topic ? (followUpMap[topic] ?? defaultQuickReplies) : defaultQuickReplies
    addBotResponse(getBotResponse(msg), qr)
  }

  function formatText(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#F5F5F5">$1</strong>')
      .replace(/\n/g, '<br />')
  }

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      {/* Chat window */}
      <div
        style={{
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '520px',
          maxHeight: 'calc(100vh - 120px)',
          background: '#15171B',
          border: '1px solid #23252B',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
        }}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between flex-shrink-0"
          style={{ background: 'linear-gradient(to right, #FF006E, #e91e8c)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <Sparkles size={18} color="white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Craft.AI</div>
              <div className="text-[10px] flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online · by TrackIcon
              </div>
            </div>
          </div>
          <button onClick={handleToggle} style={{ color: 'rgba(255,255,255,0.8)' }} className="hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        {/* Messages */}
        <div className="chat-messages flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#23252B transparent' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex msg-anim ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              <div
                style={{
                  maxWidth: '85%',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.isBot ? '1rem 1rem 1rem 0.25rem' : '1rem 1rem 0.25rem 1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  background: msg.isBot ? '#0E0F11' : '#FF006E',
                  border: msg.isBot ? '1px solid #23252B' : 'none',
                  color: msg.isBot ? '#A1A1A6' : 'white',
                }}
                dangerouslySetInnerHTML={{ __html: msg.isBot ? formatText(msg.text) : msg.text }}
              />
            </div>
          ))}
          {typing && (
            <div className="flex justify-start msg-anim">
              <div className="px-4 py-3 rounded-2xl rounded-bl-md border flex items-center gap-1.5"
                style={{ background: '#0E0F11', borderColor: '#23252B' }}>
                <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#52525B' }} />
                <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#52525B' }} />
                <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#52525B' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Quick replies */}
        {quickReplies.length > 0 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2 flex-shrink-0">
            {quickReplies.map(qr => (
              <button key={qr}
                className="text-[11px] border rounded-full px-3 py-1.5 transition-colors hover:border-[#FF006E] hover:text-[#FF006E] whitespace-nowrap"
                style={{ borderColor: '#23252B', color: '#A1A1A6' }}
                onClick={() => { sendMessage(qr); setQuickReplies([]) }}>
                {qr}
              </button>
            ))}
          </div>
        )}
        {/* Input */}
        <div className="border-t px-4 py-3 flex items-center gap-2 flex-shrink-0" style={{ borderColor: '#23252B' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { sendMessage(input); setInput('') } }}
            placeholder="Ask Craft.AI anything..."
            className="flex-1 rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none"
            style={{ background: '#0E0F11', border: '1px solid #23252B', color: '#F5F5F5' }}
            onFocus={e => (e.target.style.borderColor = '#FF006E')}
            onBlur={e => (e.target.style.borderColor = '#23252B')}
          />
          <button
            onClick={() => { sendMessage(input); setInput('') }}
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors hover:bg-[#E60063]"
            style={{ background: '#FF006E' }}>
            <Send size={16} color="white" />
          </button>
        </div>
      </div>
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{
          background: '#FF006E',
          boxShadow: '0 8px 24px rgba(255,0,110,0.3)',
          animation: open ? 'none' : 'chatPulse 2s ease-in-out infinite',
        }}>
        {open ? <X size={22} color="white" /> : <Sparkles size={22} color="white" />}
      </button>
    </div>
  )
}

function Toast({ msg, visible, isError }: { msg: string; visible: boolean; isError: boolean }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] border rounded-lg px-6 py-4 flex items-center gap-3 shadow-2xl max-w-sm transition-all duration-400"
      style={{
        background: '#15171B',
        borderColor: '#23252B',
        transform: visible ? 'translateY(0)' : 'translateY(100px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      {isError
        ? <AlertCircle size={20} style={{ color: '#ef4444' }} />
        : <CheckCircle size={20} style={{ color: '#22c55e' }} />
      }
      <span className="text-sm" style={{ color: '#F5F5F5' }}>{msg}</span>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

function TrackIconHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState({ visible: false, msg: '', isError: false })

  const showToast = useCallback((msg: string, isError = false) => {
    setToast({ visible: true, msg, isError })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 5000)
  }, [])

  return (
    <>
      <NavBar onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <HeroSection />
      <Marquee />
      <WhyDifferent />
      <Services />
      <AIShowcase />
      <PricingSection />
      <OfferSection />
      <FAQSection />
      <ContactSection showToast={showToast} />
      <Footer />

      {/* WhatsApp float button */}
      <a href="https://wa.me/919795445292?text=Hi%20TrackIcon%2C%20I%27m%20interested%20in%20your%20services."
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 left-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-lg group hover:scale-110 transition-transform"
        style={{ background: '#22c55e', boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}>
        <MessageCircle size={24} color="white" />
        <span className="absolute left-full ml-3 border rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ background: '#15171B', borderColor: '#23252B' }}>
          WhatsApp Us
        </span>
      </a>

      <CraftAIChatbot />
      <Toast msg={toast.msg} visible={toast.visible} isError={toast.isError} />
    </>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, Mail, Instagram, Linkedin, Twitter, ChevronLeft, ChevronRight } from 'lucide-react'
import BookingConfigurator from '@/components/BookingConfigurator'
import SpecialistSelector from '@/components/SpecialistSelector'
import StudioDashboard from '@/components/StudioDashboard'
import { ThemeToggle } from '@/components/ThemeToggle'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  // Scroll handler for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0c1017] text-gray-900 dark:text-[#eef0f2]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Film grain overlay - dark mode only */}
      <div className="dark:fixed dark:inset-0 pointer-events-none z-[9999] dark:opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`
      }} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 border-b ${
        isScrolled ? 'bg-[rgba(12,16,23,0.95)] dark:bg-[rgba(12,16,23,0.95)] bg-white/95 backdrop-blur-xl border-[#222830] dark:border-[#222830] border-gray-200' : 'border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="font-heading font-extrabold text-base tracking-[0.15em] uppercase text-gray-900 dark:text-white" style={{ fontFamily: 'Archivo, sans-serif' }}>
            TIDES <span className="text-teal-600 dark:text-teal-400">&</span> TIDY
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 tracking-wide">Services</a>
            <a href="#specialists" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 tracking-wide">Specialists</a>
            <a href="#transformations" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 tracking-wide">Transformations</a>
            <a href="#contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 tracking-wide">Contact</a>
            <ThemeToggle />
            <a href="#book" className="px-5 py-2 rounded-md text-xs uppercase tracking-wider font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,199,0.3)] hover:-translate-y-0.5 bg-teal-600 dark:bg-[#00e5c7] text-white dark:text-[#0c1017]" style={{
              boxShadow: '0 0 20px rgba(0, 229, 199, 0.15), 0 0 60px rgba(0, 229, 199, 0.05)'
            }}>
              Book Now
            </a>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(true)} className="text-gray-900 dark:text-white p-2" aria-label="Menu">
              <Menu className="w-5.5 h-5.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 right-0 w-72 bg-gray-100/98 dark:bg-[#131820]/98 backdrop-blur-xl z-[1100] border-l border-gray-200 dark:border-slate-700/50 flex flex-col p-8 pt-20 transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-5 right-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <X className="w-5.5 h-5.5" />
        </button>
        <a href="#services" onClick={() => scrollToSection('services')} className="text-lg font-bold text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 py-3 border-b border-gray-200 dark:border-slate-700/40 transition-colors" style={{ fontFamily: 'Archivo, sans-serif' }}>Services</a>
        <a href="#specialists" onClick={() => scrollToSection('specialists')} className="text-lg font-bold text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 py-3 border-b border-gray-200 dark:border-slate-700/40 transition-colors" style={{ fontFamily: 'Archivo, sans-serif' }}>Specialists</a>
        <a href="#transformations" onClick={() => scrollToSection('transformations')} className="text-lg font-bold text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 py-3 border-b border-gray-200 dark:border-slate-700/40 transition-colors" style={{ fontFamily: 'Archivo, sans-serif' }}>Transformations</a>
        <a href="#contact" onClick={() => scrollToSection('contact')} className="text-lg font-bold text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 py-3 border-b border-gray-200 dark:border-slate-700/40 transition-colors" style={{ fontFamily: 'Archivo, sans-serif' }}>Contact</a>
        <a href="#book" onClick={() => scrollToSection('book')} className="mt-8 py-3 rounded-md text-center text-sm uppercase tracking-wider font-bold transition-all duration-300 bg-teal-600 dark:bg-[#00e5c7] text-white dark:text-[#0c1017]">
          Book Now
        </a>
      </div>
      <div className={`fixed inset-0 bg-black/60 z-[1050] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/pristinesurface/1920/1080" alt="" className="hero-bg w-full h-full object-cover grayscale contrast-[1.15]" style={{ animation: 'kenBurns 20s ease-in-out infinite' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1017]/80 via-[#0c1017]/50 to-[#0c1017] dark:from-[#0c1017]/80 dark:via-[#0c1017]/50 dark:to-[#0c1017] from-gray-900/70 via-gray-900/40 to-gray-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1017]/60 via-transparent to-[#0c1017]/60 dark:from-[#0c1017]/60 dark:via-transparent dark:to-[#0c1017]/60 from-gray-900/50 via-transparent to-gray-900/50"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className={`reveal transition-all duration-900 ease-out ${visibleElements.has('hero-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} id="hero-1">
            <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-teal-600 dark:text-teal-400 border border-teal-600/20 dark:border-teal-400/20 bg-teal-600/5 dark:bg-teal-400/5 px-4 py-1.5 rounded-full" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Professional Cleaning Services
            </span>
          </div>
          <h1 className={`font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight text-white dark:text-white mb-6 reveal transition-all duration-900 ease-out delay-100 ${visibleElements.has('hero-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} id="hero-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Expert Cleaning.<br />
            <span className="text-gray-200 dark:text-gray-400">Spotless Results Every Time.</span>
          </h1>
          <p className={`text-gray-200 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light reveal transition-all duration-900 ease-out delay-200 ${visibleElements.has('hero-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} id="hero-3">
            Professional cleaning for homes and businesses. Our trained specialists deliver thorough, reliable service that transforms your space into a pristine environment you'll love coming home to.
          </p>
          <div className={`reveal transition-all duration-900 ease-out delay-300 ${visibleElements.has('hero-4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} id="hero-4">
            <a href="#book" className="inline-block px-8 py-3.5 rounded-md text-sm uppercase tracking-wider font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,199,0.3)] hover:-translate-y-0.5 bg-teal-600 dark:bg-[#00e5c7] text-white dark:text-[#0c1017]" style={{
              boxShadow: '0 0 20px rgba(0, 229, 199, 0.15), 0 0 60px rgba(0, 229, 199, 0.05)'
            }}>
              Book Your Cleaning
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-400 dark:from-gray-500 to-transparent"></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center reveal">
            <div className="w-16 h-1 bg-gradient-to-r from-[#00e5c7] to-transparent mx-auto mb-5"></div>
            <p className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wider" style={{ fontFamily: 'Archivo, sans-serif' }}>Our Services</p>
            <h2 className="font-extrabold text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: 'Archivo, sans-serif' }}>Cleaning Packages for Every Need</h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">Whether you need regular maintenance, a deep clean, or help with a move, we have the perfect solution for your home.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: 'Standard Cleaning',
                image: 'https://picsum.photos/seed/foldedlinen/800/600',
                description: 'Regular maintenance cleaning to keep your home fresh and tidy. Perfect for busy households who need consistent, reliable service.',
                tags: ['Dusting', 'Vacuuming', 'Surface Care', 'Weekly']
              },
              {
                id: 2,
                title: 'Deep Cleaning',
                image: 'https://picsum.photos/seed/chromefaucet/800/600',
                description: 'Comprehensive cleaning that reaches every corner. Grout scrubbed, vents cleared, appliances detailed — a truly spotless home.',
                tags: ['Grout Work', 'Appliance Detail', 'Sanitization', 'Monthly']
              },
              {
                id: 3,
                title: 'Move-In/Move-Out Cleaning',
                image: 'https://picsum.photos/seed/closeddoor88/800/600',
                description: 'Thorough cleaning for moving day. Every corner cleaned, every surface sanitized. Perfect for getting your security deposit back.',
                tags: ['Full Detail', 'Documentation', 'Interior Windows', 'On Demand']
              }
            ].map((service, index) => (
              <div key={service.id} className="rounded-xl overflow-hidden bg-[#171d27] border border-[#222830] transition-all duration-400 hover:border-[rgba(0,229,199,0.25)] hover:shadow-[0_0_40px_rgba(0,229,199,0.05)] reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="service-img w-full h-full object-cover grayscale contrast-[1.15] transition-transform duration-700 ease-out hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171d27] via-transparent to-transparent"></div>
                  <span className="absolute bottom-4 left-5 text-[10px] font-bold tracking-[0.2em] uppercase text-teal-400" style={{ fontFamily: 'Archivo, sans-serif' }}>0{service.id}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl tracking-tight text-white mb-2" style={{ fontFamily: 'Archivo, sans-serif' }}>{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 font-light">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="bg-[rgba(0,229,199,0.06)] border border-[rgba(0,229,199,0.12)] text-teal-400 text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialists Section - Using new component */}
      <SpecialistSelector />

      {/* Transformations Section */}
      <section id="transformations" className="relative py-24 md:py-32 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center reveal">
            <div className="w-16 h-1 bg-gradient-to-r from-[#00e5c7] to-transparent mx-auto mb-5"></div>
            <p className="text-sm font-semibold text-teal-400 mb-3 uppercase tracking-wider" style={{ fontFamily: 'Archivo, sans-serif' }}>Before & After</p>
            <h2 className="font-extrabold text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: 'Archivo, sans-serif' }}>See the Difference We Make</h2>
            <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">Drag the slider to compare before and after. Real results from real homes like yours.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <BeforeAfterSlider
              beforeImage="https://picsum.photos/seed/messykitchen99/900/560"
              afterImage="https://picsum.photos/seed/cleankitchen99/900/560"
              clientName="Sarah M."
              serviceTier="Deep Clean Service"
              quote="I didn't realize how much the state of my kitchen was weighing on me until Tides & Tidy restored it. I got back 10 hours a week — and my sanity."
              delay="0.1s"
              sliderId="ba-slider-1"
            />
            <BeforeAfterSlider
              beforeImage="https://picsum.photos/seed/dirtybathroom77/900/560"
              afterImage="https://picsum.photos/seed/cleanbathroom77/900/560"
              clientName="James & Priya K."
              serviceTier="Move-In Service"
              quote="We moved into our new home and it didn't feel like ours until the team finished. Every surface gleamed. It was like walking into a brand new home."
              delay="0.2s"
              sliderId="ba-slider-2"
            />
          </div>
        </div>
      </section>

      {/* Studio Dashboard */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mb-16 relative z-10">
        <StudioDashboard />
      </div>

      {/* Booking Configurator - Using new component */}
      <BookingConfigurator />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-700/30 pt-12 pb-8 mt-auto bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="font-extrabold text-sm tracking-[0.15em] uppercase text-[#093457] dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                TIDES <span className="text-[#00cccc]">&</span> TIDY
              </span>
              <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Precision cleaning. Absolute peace of mind.</p>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-500">
              <a href="tel:+18005551234" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                (800) 555-1234
              </a>
              <a href="mailto:hello@tidesandtidy.com" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                hello@tidesandtidy.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 transition-colors" aria-label="Instagram">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 transition-colors" aria-label="Twitter">
                <Twitter className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700/20 text-center">
            <p className="text-gray-700 dark:text-gray-500 text-[11px] tracking-wide">&copy; 2025 Tides & Tidy. All rights reserved.</p>
          </div>
          
          {/* Atlantic East Coast Vibe - Tides Tech Attribution */}
          <div className="mt-6 relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#093457]/5 via-[#00cccc]/10 to-[#093457]/5 dark:from-[#093457]/10 dark:via-[#00cccc]/5 dark:to-[#093457]/10"></div>
            
            <div className="relative flex items-center justify-center gap-3 py-4">
              {/* Wave animation - left side */}
              <div className="flex items-center gap-0.5" style={{ animation: 'wave 1.5s ease-in-out infinite' }}>
                <span className="w-1 h-3 bg-[#00cccc]/30 rounded-full" style={{ animationDelay: '0s' }}></span>
                <span className="w-1 h-4 bg-[#00cccc]/50 rounded-full" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1 h-3 bg-[#00cccc]/40 rounded-full" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1 h-5 bg-[#00cccc]/60 rounded-full" style={{ animationDelay: '0.3s' }}></span>
                <span className="w-1 h-3 bg-[#00cccc]/30 rounded-full" style={{ animationDelay: '0.4s' }}></span>
              </div>
              
              <span className="text-[#093457]/80 dark:text-[#eef0f2]/60 text-xs font-medium tracking-wide flex items-center gap-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Made By <span className="font-semibold text-[#00cccc]">Tides Tech</span> With <span className="animate-pulse">❤️</span> <span className="inline-block" style={{ animation: 'wave 2s ease-in-out infinite' }}>👋</span>
              </span>
              
              {/* Wave animation - right side */}
              <div className="flex items-center gap-0.5" style={{ animation: 'wave 1.5s ease-in-out infinite reverse' }}>
                <span className="w-1 h-4 bg-[#093457]/20 rounded-full" style={{ animationDelay: '0s' }}></span>
                <span className="w-1 h-3 bg-[#093457]/30 rounded-full" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1 h-5 bg-[#093457]/40 rounded-full" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1 h-3 bg-[#093457]/25 rounded-full" style={{ animationDelay: '0.3s' }}></span>
                <span className="w-1 h-4 bg-[#093457]/20 rounded-full" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.08) translate(-1%, -0.5%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .hero-bg { animation: kenBurns 20s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #093457; }
        ::-webkit-scrollbar-thumb { background: #00cccc; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #00b3b3; }
      `}</style>
    </div>
  )
}

// Before/After Slider Component
function BeforeAfterSlider({ beforeImage, afterImage, clientName, serviceTier, quote, delay, sliderId }: {
  beforeImage: string
  afterImage: string
  clientName: string
  serviceTier: string
  quote: string
  delay: string
  sliderId: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const pos = ((clientX - rect.left) / rect.width) * 100
      setSliderPosition(Math.max(4, Math.min(96, pos)))
    }
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging) handleMove(e.clientX) }
  const handleTouchStart = () => setIsDragging(true)
  const handleTouchEnd = () => setIsDragging(false)
  const handleTouchMove = (e: React.TouchEvent) => { if (isDragging) handleMove(e.touches[0].clientX) }

  return (
    <div className="reveal" style={{ transitionDelay: delay }}>
      <div
        ref={containerRef}
        id={sliderId}
        className="relative rounded-xl overflow-hidden aspect-[16/10] cursor-col-resize select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.2] brightness-[0.95]" />
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.1] brightness-[0.7]"
          style={{ clipPath: `inset(0 ${(100 - sliderPosition)}% 0 0)` }}
        />
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0.5 h-full mx-auto bg-[#00e5c7] shadow-[0_0_8px_rgba(0,229,199,0.5)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-[rgba(0,229,199,0.9)] backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,229,199,0.3)]">
            <ChevronLeft className="w-4 h-4 text-[#0c1017]" />
            <ChevronRight className="w-4 h-4 text-[#0c1017]" />
          </div>
        </div>
        <span className="absolute top-4 left-4 z-20 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded text-gray-300" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Before
        </span>
        <span className="absolute top-4 right-4 z-20 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded text-teal-400" style={{ fontFamily: 'Archivo, sans-serif' }}>
          After
        </span>
        <div
          className="absolute inset-0 z-20"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      </div>
      <div className="mt-5 pl-1">
        <p className="text-gray-300 text-sm leading-relaxed italic font-light">
          "{quote}"
        </p>
        <p className="text-gray-500 text-xs mt-2 font-medium tracking-wide">— {clientName}, {serviceTier}</p>
      </div>
    </div>
  )
}

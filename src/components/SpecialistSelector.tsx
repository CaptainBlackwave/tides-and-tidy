'use client'

import { useState, useEffect } from 'react'
import { X, Star, Calendar, Award } from 'lucide-react'

interface Review {
  id: number
  client: string
  rating: number
  date: string
  text: string
}

interface Specialist {
  id: number
  name: string
  role: string
  experience: string
  certifications: string[]
  philosophy: string
  image: string
  nextAvailable: string
  reviews: Review[]
}

const specialists: Specialist[] = [
  {
    id: 1,
    name: 'Alexia Parnell',
    role: 'Senior Cleaning Specialist',
    experience: '8 Years',
    certifications: ['OSHA HazCom', 'ISSA CIMS', 'Marble Care'],
    philosophy: 'Every home deserves to be clean and welcoming. I take pride in ensuring every surface is spotless and every room feels fresh for my clients.',
    image: 'https://picsum.photos/seed/specialistalexia/600/750',
    nextAvailable: 'Tomorrow, 9:00 AM',
    reviews: [
      { id: 1, client: 'Sarah M.', rating: 5, date: '2 weeks ago', text: 'Alexia transformed my chaotic kitchen into a sanctuary. Her attention to detail is unmatched.' },
      { id: 2, client: 'Michael R.', rating: 5, date: '1 month ago', text: 'She treats every surface with such care. My home has never felt this organized.' },
      { id: 3, client: 'Jennifer K.', rating: 5, date: '1 month ago', text: 'Alexia is thorough, efficient, and always leaves my home sparkling clean.' }
    ]
  },
  {
    id: 2,
    name: 'Jenna Spencer',
    role: 'Deep Cleaning Specialist',
    experience: '6 Years',
    certifications: ['Chemical Safety', 'IAQA Certified', 'HVAC Detail'],
    philosophy: 'Deep cleaning is about more than what you can see. I clean the hidden areas that most services miss — the vents, behind appliances, the grout lines. That\'s the difference.',
    image: 'https://picsum.photos/seed/specialistjenna/600/750',
    nextAvailable: 'Tomorrow, 2:00 PM',
    reviews: [
      { id: 1, client: 'David L.', rating: 5, date: '3 days ago', text: 'Jenna\'s deep cleaning revealed a home I didn\'t know I had. The air quality difference is noticeable.' },
      { id: 2, client: 'Emily T.', rating: 5, date: '2 weeks ago', text: 'She found dust in places I didn\'t know existed. Thorough is an understatement.' },
      { id: 3, client: 'Robert W.', rating: 5, date: '3 weeks ago', text: 'The HVAC detail made such a difference. My allergies have improved significantly.' }
    ]
  }
]

export default function SpecialistSelector() {
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Handle body scroll when drawer is open/closed
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  const openDrawer = (specialist: Specialist) => {
    setSelectedSpecialist(specialist)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setTimeout(() => setSelectedSpecialist(null), 300)
  }

  return (
    <>
      <section id="specialists" className="relative py-24 md:py-32 border-t border-[#CFD2D4]/30 bg-[#F8F9FA] dark:bg-[#093457]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="w-16 h-1 bg-gradient-to-r from-[#00cccc] to-transparent mx-auto mb-5"></div>
            <p className="text-sm font-semibold text-[#00cccc] mb-3 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Meet Our Team
            </p>
            <h2 className="font-extrabold text-3xl md:text-4xl text-[#093457] dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Dedicated Cleaning Specialists
            </h2>
            <p className="text-[#093457]/70 dark:text-[#CFD2D4] text-base max-w-2xl mx-auto leading-relaxed">
              Every member of our team is carefully vetted, background-checked, and professionally trained.
              <span className="text-[#00cccc] font-medium"> Click any specialist to learn more about their experience and read client reviews.</span>
            </p>
          </div>

          {/* Specialist Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {specialists.map((specialist, index) => (
              <div
                key={specialist.id}
                onClick={() => openDrawer(specialist)}
                className="rounded-xl overflow-hidden bg-[#FFFFFF] dark:bg-[#0A1630] border border-[#CFD2D4] dark:border-[#CFD2D4]/30 cursor-pointer transition-all duration-400 hover:border-[rgba(0,204,204,0.5)] hover:shadow-[0_0_40px_rgba(0,204,204,0.1)] hover:-translate-y-1 group"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(9,52,87,0.6)_100%)] pointer-events-none dark:opacity-100"></div>
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full h-full object-cover grayscale contrast-[1.15] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#00cccc] text-[#093457] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-[#093457] dark:text-white group-hover:text-[#00cccc] transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {specialist.name}
                    </h3>
                    <span className="text-xs text-[#093457]/50 dark:text-[#CFD2D4] font-medium bg-[#E9ECEF] dark:bg-[#093457] px-2 py-1 rounded">
                      {specialist.experience} Experience
                    </span>
                  </div>
                  <p className="text-[#00cccc] text-xs font-semibold uppercase tracking-wider mb-4">
                    {specialist.role}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {specialist.certifications.slice(0, 2).map((cert) => (
                      <span
                        key={cert}
                        className="text-xs text-[#093457]/70 dark:text-[#CFD2D4] bg-[#E9ECEF] dark:bg-[#093457]/50 px-2 py-1 rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#093457]/70 dark:text-[#CFD2D4] text-sm leading-relaxed">
                    "{specialist.philosophy.slice(0, 90)}..."
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100] transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#FFFFFF] dark:bg-[#093457] z-[1200] border-l border-[#CFD2D4] dark:border-[#CFD2D4]/30 shadow-2xl transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedSpecialist && (
          <div className="h-full flex flex-col overflow-hidden">
            {/* Header Image */}
            <div className="relative h-64 flex-shrink-0">
              <img
                src={selectedSpecialist.image}
                alt={selectedSpecialist.name}
                className="w-full h-full object-cover grayscale contrast-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#093457] dark:from-[#093457] to-transparent"></div>
              <button
                onClick={closeDrawer}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <h2 className="font-heading font-800 text-2xl text-[#093457] dark:text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedSpecialist.name}
              </h2>
              <p className="text-[#00cccc] text-sm font-medium tracking-wider uppercase mb-2">
                {selectedSpecialist.role}
              </p>
              <p className="text-[#093457]/50 dark:text-[#CFD2D4] text-sm mb-6">{selectedSpecialist.experience}</p>

              {/* Next Available */}
              <div className="bg-gradient-to-r from-[#00cccc]/10 to-transparent border border-[#00cccc]/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#00cccc]/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#00cccc]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#093457]/70 dark:text-[#CFD2D4] font-medium">
                      Next Available Appointment
                    </p>
                    <p className="text-lg text-[#093457] dark:text-white font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {selectedSpecialist.nextAvailable}
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h3 className="text-sm text-[#093457]/70 dark:text-[#CFD2D4] font-medium mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#00cccc]" />
                  Certifications & Training
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecialist.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="bg-[rgba(0,204,204,0.06)] border border-[rgba(0,204,204,0.12)] text-[#00cccc] text-xs px-3 py-1.5 rounded font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="mb-6 pl-4 border-l-2 border-[#00cccc]">
                <h3 className="text-sm text-[#093457]/70 dark:text-[#CFD2D4] font-medium mb-2">My Approach</h3>
                <p className="text-[#093457] dark:text-white text-sm leading-relaxed">
                  "{selectedSpecialist.philosophy}"
                </p>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="text-sm text-[#093457]/70 dark:text-[#CFD2D4] font-medium mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-[#00cccc] text-[#00cccc]" />
                  Client Reviews ({selectedSpecialist.reviews.length})
                </h3>
                <div className="space-y-4">
                  {selectedSpecialist.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-[#F8F9FA] dark:bg-[#0A1630]/50 border border-[#CFD2D4] dark:border-[#CFD2D4]/30 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-[#093457] dark:text-white text-sm font-medium">{review.client}</p>
                          <p className="text-[#093457]/50 dark:text-[#CFD2D4] text-xs">{review.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'fill-[#00cccc] text-[#00cccc]'
                                  : 'text-[#CFD2D4]/30'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#093457]/70 dark:text-[#CFD2D4] text-sm leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex-shrink-0 p-6 border-t border-[#CFD2D4] dark:border-[#CFD2D4]/30 bg-[#F8F9FA] dark:bg-[#0A1630]/50">
              <button
                onClick={() => {
                  closeDrawer()
                  setTimeout(() => {
                    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
                  }, 300)
                }}
                className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,204,204,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2 bg-[#00cccc] text-[#093457]"
                style={{
                  boxShadow: '0 0 20px rgba(0, 204, 204, 0.15), 0 0 60px rgba(0, 204, 204, 0.05)'
                }}
              >
                Book with {selectedSpecialist.name}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F8F9FA;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #093457;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CFD2D4;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00cccc;
        }
      `}</style>
    </>
  )
}

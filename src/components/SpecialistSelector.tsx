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
    name: 'Ana Voss',
    role: 'Lead Tidy Specialist',
    experience: '8 Years',
    certifications: ['OSHA HazCom', 'ISSA CIMS', 'Marble Care'],
    philosophy: 'Cleanliness is not the absence of mess — it\'s the presence of intention. I treat every room like a gallery installation.',
    image: 'https://picsum.photos/seed/specialistana/600/750',
    nextAvailable: 'Tomorrow, 9:00 AM',
    reviews: [
      { id: 1, client: 'Sarah M.', rating: 5, date: '2 weeks ago', text: 'Ana transformed my chaotic kitchen into a sanctuary. Her attention to detail is unmatched.' },
      { id: 2, client: 'Michael R.', rating: 5, date: '1 month ago', text: 'She treats every surface with such care. My home has never felt this organized.' },
      { id: 3, client: 'Jennifer K.', rating: 5, date: '1 month ago', text: 'The philosophical approach to cleaning is real. Ana brings intention to every corner.' }
    ]
  },
  {
    id: 2,
    name: 'Marc Chen',
    role: 'Deep Tide Specialist',
    experience: '6 Years',
    certifications: ['Chemical Safety', 'IAQA Certified', 'HVAC Detail'],
    philosophy: 'People don\'t see the air they breathe. I do. A truly clean space is one where you feel lighter without knowing why.',
    image: 'https://picsum.photos/seed/specialistmarc/600/750',
    nextAvailable: 'Tomorrow, 2:00 PM',
    reviews: [
      { id: 1, client: 'David L.', rating: 5, date: '3 days ago', text: 'Marc\'s deep cleaning revealed a home I didn\'t know I had. The air quality difference is noticeable.' },
      { id: 2, client: 'Emily T.', rating: 5, date: '2 weeks ago', text: 'He found dust in places I didn\'t know existed. Thorough is an understatement.' },
      { id: 3, client: 'Robert W.', rating: 5, date: '3 weeks ago', text: 'The HVAC detail made such a difference. My allergies have improved significantly.' }
    ]
  },
  {
    id: 3,
    name: 'Elena Durand',
    role: 'Transition Specialist',
    experience: '11 Years',
    certifications: ['Move Compliance', 'Hardwood Certified', 'Lead-Safe EPA'],
    philosophy: 'A transition is a threshold. The space you leave behind — or step into — should feel like a deep exhale. That\'s what I deliver.',
    image: 'https://picsum.photos/seed/specialistelena/600/750',
    nextAvailable: 'Friday, 10:00 AM',
    reviews: [
      { id: 1, client: 'James & Priya K.', rating: 5, date: '1 week ago', text: 'Elena made our move-in day magical. Everything was pristine and ready for our new chapter.' },
      { id: 2, client: 'Carlos M.', rating: 5, date: '2 weeks ago', text: 'Move-out service that got us our full security deposit back. Worth every penny.' },
      { id: 3, client: 'Amanda S.', rating: 5, date: '1 month ago', text: 'She handled our hardwood floors with such expertise. The home felt brand new.' }
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
      <section id="specialists" className="relative py-24 md:py-32 border-t border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#c4a868] to-transparent mb-5"></div>
            <p className="text-[11px] font-heading font-600 tracking-[0.25em] uppercase text-[#c4a868] mb-3">
              The Curators
            </p>
            <h2 className="font-heading font-800 text-3xl md:text-4xl tracking-tight text-white mb-4">
              Certified Technicians of Calm
            </h2>
            <p className="text-gray-400 text-base max-w-xl leading-relaxed font-light">
              Not labor. Not staff. Specialists — each vetted, certified, and personally committed to the craft of immaculate spaces.
              <span className="text-teal-400 font-medium"> Click any specialist to view their availability and reviews.</span>
            </p>
          </div>

          {/* Specialist Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {specialists.map((specialist, index) => (
              <div
                key={specialist.id}
                onClick={() => openDrawer(specialist)}
                className="rounded-xl overflow-hidden bg-[#171d27] border border-[#222830] cursor-pointer transition-all duration-400 hover:border-[rgba(0,229,199,0.25)] hover:shadow-[0_0_40px_rgba(0,229,199,0.05)] hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(12,16,23,0.6)_100%)] pointer-events-none"></div>
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-full h-full object-cover grayscale contrast-[1.15] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-teal-400 text-slate-950 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-heading font-700 text-lg tracking-tight text-white group-hover:text-teal-400 transition-colors">
                      {specialist.name}
                    </h3>
                    <span className="text-[11px] text-gray-500 font-medium">{specialist.experience}</span>
                  </div>
                  <p className="text-[#c4a868] text-xs font-medium tracking-wider uppercase mb-4">
                    {specialist.role}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {specialist.certifications.slice(0, 3).map((cert) => (
                      <span
                        key={cert}
                        className="bg-[rgba(196,168,104,0.08)] border border-[rgba(196,168,104,0.15)] text-[#c4a868] text-[11px] px-2 py-0.5 rounded"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed italic">
                    {specialist.philosophy.slice(0, 80)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[1100] transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#131820] z-[1200] border-l border-slate-700/50 shadow-2xl transition-transform duration-300 ease-out ${
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#131820] to-transparent"></div>
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
              <h2 className="font-heading font-800 text-2xl text-white mb-1">
                {selectedSpecialist.name}
              </h2>
              <p className="text-[#c4a868] text-sm font-medium tracking-wider uppercase mb-2">
                {selectedSpecialist.role}
              </p>
              <p className="text-gray-500 text-sm mb-6">{selectedSpecialist.experience}</p>

              {/* Next Available */}
              <div className="bg-slate-900/50 border border-teal-400/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-400/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">
                      Next Available Slot
                    </p>
                    <p className="text-white font-mono text-sm">{selectedSpecialist.nextAvailable}</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecialist.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="bg-[rgba(0,229,199,0.06)] border border-[rgba(0,229,199,0.12)] text-teal-400 text-xs px-3 py-1.5 rounded font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Philosophy */}
              <div className="mb-6 pl-4 border-l-2 border-[#c4a868]">
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  "{selectedSpecialist.philosophy}"
                </p>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                  <Star className="w-3 h-3 fill-[#c4a868] text-[#c4a868]" />
                  Client Reviews ({selectedSpecialist.reviews.length})
                </h3>
                <div className="space-y-4">
                  {selectedSpecialist.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-slate-900/30 border border-slate-800 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white text-sm font-medium">{review.client}</p>
                          <p className="text-gray-500 text-xs">{review.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'fill-[#c4a868] text-[#c4a868]'
                                  : 'text-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex-shrink-0 p-6 border-t border-slate-800 bg-slate-900/50">
              <button
                onClick={() => {
                  closeDrawer()
                  setTimeout(() => {
                    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
                  }, 300)
                }}
                className="w-full py-4 rounded uppercase text-xs tracking-widest font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,199,0.3)] hover:-translate-y-0.5"
                style={{
                  background: '#00e5c7',
                  color: '#0c1017',
                  boxShadow: '0 0 20px rgba(0, 229, 199, 0.15), 0 0 60px rgba(0, 229, 199, 0.05)'
                }}
              >
                Book {selectedSpecialist.name}
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
          background: #131820;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #252d3a;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2e3748;
        }
      `}</style>
    </>
  )
}

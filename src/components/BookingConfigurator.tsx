'use client'

import { useState, useEffect } from 'react'

interface ServiceTier {
  id: 'reset' | 'deep' | 'transition'
  name: string
  basePrice: number
  pricePerSqft: number
  description: string
  duration: number
}

const serviceTiers: ServiceTier[] = [
  {
    id: 'reset',
    name: 'The Reset',
    basePrice: 149,
    pricePerSqft: 0.20,
    description: 'Essential maintenance for the perpetually busy',
    duration: 2.5
  },
  {
    id: 'deep',
    name: 'The Deep Tide',
    basePrice: 249,
    pricePerSqft: 0.35,
    description: 'Intensive detailing for health and hygiene',
    duration: 3.5
  },
  {
    id: 'transition',
    name: 'The Transition',
    basePrice: 349,
    pricePerSqft: 0.45,
    description: 'Move-in or move-out perfection',
    duration: 5
  }
]

export default function BookingConfigurator() {
  const [selectedTier, setSelectedTier] = useState<'reset' | 'deep' | 'transition'>('deep')
  const [sqFootage, setSqFootage] = useState(1500)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const tier = serviceTiers.find(t => t.id === selectedTier)
    if (tier) {
      const price = Math.round(tier.basePrice + (sqFootage * tier.pricePerSqft))
      setEstimatedPrice(price)
    }
  }, [selectedTier, sqFootage])

  const handleBooking = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          sqFootage,
          estimatedPrice
        })
      })
      
      if (response.ok) {
        alert('Booking request received! We will contact you within 2 hours.')
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentTier = serviceTiers.find(t => t.id === selectedTier)!

  return (
    <section id="book" className="relative py-28 md:py-36 border-t border-slate-700/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,199,0.06)_0%,transparent_70%)]"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Side - Configuration */}
            <div className="flex-1">
              <p className="text-[11px] font-heading font-600 tracking-[0.25em] uppercase text-teal-400 mb-6">
                Booking Configurator
              </p>
              <h2 className="font-heading font-800 text-3xl text-white mb-8">
                Estimate Your Transformation
              </h2>
              
              <div className="space-y-8">
                {/* Service Tier Selection */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-4">
                    Select Tier
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {serviceTiers.map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`
                          border py-3 rounded text-xs font-bold uppercase transition-all duration-300
                          ${selectedTier === tier.id
                            ? 'border-teal-400 bg-teal-400/10 text-teal-400 shadow-[0_0_20px_rgba(0,229,199,0.15)]'
                            : 'border-slate-700 hover:border-gray-500 text-gray-400 hover:text-gray-300'
                          }
                        `}
                      >
                        {tier.id === 'reset' ? 'The Reset' : tier.id === 'deep' ? 'Deep Tide' : 'Transition'}
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs mt-3 leading-relaxed">
                    {currentTier.description}
                  </p>
                </div>

                {/* Square Footage Slider */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-4">
                    Approximate Sq. Footage
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={sqFootage}
                    onChange={(e) => setSqFootage(Number(e.target.value))}
                    className="w-full accent-teal-400 bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer"
                    style={{
                      WebkitAppearance: 'none',
                      background: `linear-gradient(to right, #00e5c7 0%, #00e5c7 ${((sqFootage - 500) / 4500) * 100}%, #1c2330 ${((sqFootage - 500) / 4500) * 100}%, #1c2330 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-[10px] text-gray-600 font-mono">500 SQFT</span>
                    <span className="text-xs text-teal-400 font-mono font-bold">{sqFootage} SQFT</span>
                    <span className="text-[10px] text-gray-600 font-mono">5000 SQFT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Price Summary */}
            <div className="w-full md:w-72 bg-slate-950/50 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                  Estimated Investment
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-heading font-800 text-white">
                    ${estimatedPrice}
                  </span>
                  <span className="text-sm text-gray-600 font-normal">.00</span>
                </div>
                <p className="text-[10px] text-teal-400 mt-2 font-mono uppercase tracking-tighter flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
                  Specialist Available Tomorrow
                </p>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-[11px] border-b border-slate-800 pb-2">
                  <span className="text-gray-500 text-xs">Est. Duration</span>
                  <span className="text-white font-mono">{currentTier.duration} HRS</span>
                </div>
                <div className="flex justify-between text-[11px] border-b border-slate-800 pb-2">
                  <span className="text-gray-500 text-xs">Service Tier</span>
                  <span className="text-white font-mono uppercase">{currentTier.id}</span>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded uppercase text-xs tracking-widest mt-4 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,229,199,0.3)] hover:-translate-y-0.5"
                  style={{
                    background: '#00e5c7',
                    color: '#0c1017',
                    boxShadow: '0 0 20px rgba(0, 229, 199, 0.15), 0 0 60px rgba(0, 229, 199, 0.05)'
                  }}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Selection'}
                </button>
                <p className="text-gray-600 text-[10px] text-center tracking-wide">
                  No commitment required · Response within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

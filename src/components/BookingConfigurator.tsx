'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, CheckCircle, Sparkles } from 'lucide-react'

interface ServiceTier {
  id: 'reset' | 'deep' | 'transition'
  name: string
  basePrice: number
  pricePerSqft: number
  description: string
  duration: number
  features: string[]
}

const serviceTiers: ServiceTier[] = [
  {
    id: 'reset',
    name: 'Standard Cleaning',
    basePrice: 149,
    pricePerSqft: 0.20,
    description: 'Perfect for weekly maintenance and keeping your space fresh',
    duration: 2.5,
    features: ['Dusting & Surfaces', 'Vacuuming & Mopping', 'Bathroom Cleaning', 'Kitchen Wipe-down']
  },
  {
    id: 'deep',
    name: 'Deep Cleaning',
    basePrice: 249,
    pricePerSqft: 0.35,
    description: 'Comprehensive deep clean for a truly spotless home',
    duration: 3.5,
    features: ['All Standard Services', 'Inside Appliances', 'Grout & Tile Scrubbing', 'Baseboards & Vents']
  },
  {
    id: 'transition',
    name: 'Move-In/Move-Out Cleaning',
    basePrice: 349,
    pricePerSqft: 0.45,
    description: 'Complete cleaning for moving day with full documentation',
    duration: 5,
    features: ['All Deep Cleaning Services', 'Interior Windows', 'Cabinet Cleaning', 'Move Documentation']
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
        alert('Thank you! We\'ve received your request and will contact you within 2 hours to confirm your appointment.')
      } else {
        alert('Something went wrong. Please try again or give us a call.')
      }
    } catch (error) {
      alert('Something went wrong. Please try again or give us a call.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentTier = serviceTiers.find(t => t.id === selectedTier)!

  return (
    <section id="book" className="relative py-28 md:py-36 border-t border-slate-700/30">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/10 to-transparent"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Sparkles className="w-12 h-12 text-teal-400 mx-auto mb-4" />
          <h2 className="font-extrabold text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Get Your Free Quote
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Tell us about your space and we'll provide an instant estimate. No commitment required.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left Side - Service Selection */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Choose Your Service
              </h3>

              <div className="space-y-4 mb-8">
                {serviceTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`
                      w-full text-left p-5 rounded-xl border-2 transition-all duration-300
                      ${selectedTier === tier.id
                        ? 'border-teal-400 bg-teal-400/5 shadow-lg'
                        : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-lg text-white" style={{ fontFamily: 'Archivo, sans-serif' }}>
                        {tier.name}
                      </h4>
                      {selectedTier === tier.id && (
                        <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{tier.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tier.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="text-xs text-gray-500 bg-slate-800 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* Square Footage */}
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-4">
                  How large is your space?
                </label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={sqFootage}
                  onChange={(e) => setSqFootage(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-700 h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                    background: `linear-gradient(to right, #00e5c7 0%, #00e5c7 ${((sqFootage - 500) / 4500) * 100}%, #374151 ${((sqFootage - 500) / 4500) * 100}%, #374151 100%)`
                  }}
                />
                <div className="flex justify-between mt-3">
                  <span className="text-sm text-gray-500">500 sq ft</span>
                  <span className="text-lg font-bold text-teal-400">{sqFootage.toLocaleString()} sq ft</span>
                  <span className="text-sm text-gray-500">5,000 sq ft</span>
                </div>
              </div>
            </div>

            {/* Right Side - Quote Summary */}
            <div className="w-full lg:w-80 flex flex-col">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-600/50 rounded-xl p-6 flex-1">
                <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
                  Your Quote
                </h3>

                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Estimated Total</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-white" style={{ fontFamily: 'Archivo, sans-serif' }}>
                      ${estimatedPrice}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 bg-teal-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Estimated Time</p>
                      <p className="text-white font-medium">{currentTier.duration} hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 bg-teal-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Next Available</p>
                      <p className="text-white font-medium">Tomorrow or sooner</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-4 mb-4">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="text-gray-300">{currentTier.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="text-gray-300">{sqFootage.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wide mt-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,229,199,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                style={{
                  background: '#00e5c7',
                  color: '#0c1017',
                  boxShadow: '0 0 20px rgba(0, 229, 199, 0.15), 0 0 60px rgba(0, 229, 199, 0.05)'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Book Your Cleaning
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-gray-500 text-xs text-center mt-3">
                No commitment · Free quote · Satisfaction guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

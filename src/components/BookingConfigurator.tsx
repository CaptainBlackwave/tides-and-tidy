'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, CheckCircle, Sparkles } from 'lucide-react'

interface ServiceTier {
  id: 'standard' | 'deep' | 'movein'
  name: string
  description: string
  minHours: number
  maxHours: number
  features: string[]
}

const serviceTiers: ServiceTier[] = [
  {
    id: 'standard',
    name: 'Standard Cleaning',
    description: 'Perfect for weekly maintenance and keeping your space fresh',
    minHours: 2,
    maxHours: 8,
    features: ['Dusting & Surfaces', 'Vacuuming & Mopping', 'Bathroom Cleaning', 'Kitchen Wipe-down']
  },
  {
    id: 'deep',
    name: 'Deep Cleaning',
    description: 'Comprehensive deep clean for a truly spotless home',
    minHours: 3,
    maxHours: 10,
    features: ['All Standard Services', 'Inside Appliances', 'Grout & Tile Scrubbing', 'Baseboards & Vents']
  },
  {
    id: 'movein',
    name: 'Move-In/Move-Out Cleaning',
    description: 'Complete cleaning for moving day with full documentation',
    minHours: 4,
    maxHours: 12,
    features: ['All Deep Cleaning Services', 'Interior Windows', 'Cabinet Cleaning', 'Move Documentation']
  }
]

// Pricing constants
const BASE_HOURS = 2
const BASE_PRICE = 50
const ADDITIONAL_HOUR_PRICE = 25

export default function BookingConfigurator() {
  const [selectedTier, setSelectedTier] = useState<'standard' | 'deep' | 'movein'>('standard')
  const [hours, setHours] = useState(3)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Calculate price: Base $50 for 2 hours + $25 for each additional hour
    const additionalHours = Math.max(0, hours - BASE_HOURS)
    const price = BASE_PRICE + (additionalHours * ADDITIONAL_HOUR_PRICE)
    setEstimatedPrice(price)
  }, [hours])

  // Reset hours when tier changes to be within the new tier's range
  useEffect(() => {
    const tier = serviceTiers.find(t => t.id === selectedTier)
    if (tier) {
      if (hours < tier.minHours) {
        setHours(tier.minHours)
      } else if (hours > tier.maxHours) {
        setHours(tier.maxHours)
      }
    }
  }, [selectedTier])

  const handleBooking = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          hours,
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
  const additionalHours = Math.max(0, hours - BASE_HOURS)

  return (
    <section id="book" className="relative py-28 md:py-36 border-t border-gray-200 dark:border-slate-700/30 bg-gray-50 dark:bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/10 dark:via-teal-950/10 to-transparent"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Sparkles className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
          <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Archivo, sans-serif' }}>
            Get Your Free Quote
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-xl mx-auto">
            Choose your service and select how many hours you need. We provide instant estimates with no commitment required.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-100 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-md border border-gray-200 dark:border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left Side - Service Selection */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
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
                        ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-400/5 shadow-lg'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 bg-gray-50 dark:bg-slate-900/50'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white" style={{ fontFamily: 'Archivo, sans-serif' }}>
                        {tier.name}
                      </h4>
                      {selectedTier === tier.id && (
                        <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{tier.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tier.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="text-xs text-gray-500 dark:text-gray-500 bg-gray-200 dark:bg-slate-800 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* Hours Slider */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-4">
                  How many hours do you need?
                </label>
                <input
                  type="range"
                  min={currentTier.minHours}
                  max={currentTier.maxHours}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full accent-teal-600 dark:accent-teal-400 bg-gray-200 dark:bg-slate-700 h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                    background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${((hours - currentTier.minHours) / (currentTier.maxHours - currentTier.minHours)) * 100}%, #d1d5db ${((hours - currentTier.minHours) / (currentTier.maxHours - currentTier.minHours)) * 100}%, #d1d5db 100%)`
                  }}
                />
                <div className="flex justify-between mt-3">
                  <span className="text-sm text-gray-500 dark:text-gray-500">{currentTier.minHours} hours</span>
                  <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{hours} hours</span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">{currentTier.maxHours} hours</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Minimum {currentTier.minHours} hours required for {currentTier.name}
                </p>
              </div>
            </div>

            {/* Right Side - Quote Summary */}
            <div className="w-full lg:w-80 flex flex-col">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800/80 dark:to-slate-900/80 border border-gray-300 dark:border-slate-600/50 rounded-xl p-6 flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6" style={{ fontFamily: 'Archivo, sans-serif' }}>
                  Your Quote
                </h3>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated Total</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white" style={{ fontFamily: 'Archivo, sans-serif' }}>
                      ${estimatedPrice}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Base ({BASE_HOURS} hours)</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">${BASE_PRICE}</span>
                  </div>
                  {additionalHours > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Additional ({additionalHours} hr{additionalHours > 1 ? 's' : ''})</span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">${additionalHours * ADDITIONAL_HOUR_PRICE}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 dark:border-slate-600 pt-3 flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Total</span>
                    <span className="text-gray-900 dark:text-white font-bold">${estimatedPrice}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Booked Hours</p>
                      <p className="text-gray-900 dark:text-white font-medium">{hours} hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Next Available</p>
                      <p className="text-gray-900 dark:text-white font-medium">Tomorrow or sooner</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-300 dark:border-slate-700 pt-4 mb-4">
                  <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="text-gray-700 dark:text-gray-300">{currentTier.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hours:</span>
                      <span className="text-gray-700 dark:text-gray-300">{hours} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span className="text-gray-700 dark:text-gray-300">$${ADDITIONAL_HOUR_PRICE}/hr after {BASE_HOURS}hr base</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wide mt-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(13,148,136,0.3)] dark:hover:shadow-[0_0_30px_rgba(0,229,199,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2 bg-teal-600 dark:bg-[#00e5c7] text-white dark:text-[#0c1017]"
                style={{
                  boxShadow: '0 0 20px rgba(13, 148, 136, 0.15), 0 0 60px rgba(13, 148, 136, 0.05)'
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

              <p className="text-gray-500 dark:text-gray-500 text-xs text-center mt-3">
                No commitment · Free quote · Satisfaction guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

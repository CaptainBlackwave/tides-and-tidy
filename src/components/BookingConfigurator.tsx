'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, CheckCircle, Sparkles, Video, MapPin, Camera, User } from 'lucide-react'

interface ServiceTier {
  id: 'standard' | 'deep' | 'movein' | 'overnight'
  name: string
  description: string
  minHours: number
  maxHours: number
  hourlyRate: number
  features: string[]
}

const serviceTiers: ServiceTier[] = [
  {
    id: 'standard',
    name: 'Standard Cleaning',
    description: 'Perfect for weekly maintenance and keeping your space fresh',
    minHours: 2,
    maxHours: 8,
    hourlyRate: 25,
    features: ['Dusting & Surfaces', 'Vacuuming & Mopping', 'Bathroom Cleaning', 'Kitchen Wipe-down']
  },
  {
    id: 'deep',
    name: 'Deep Cleaning',
    description: 'Comprehensive deep clean for a truly spotless home',
    minHours: 3,
    maxHours: 10,
    hourlyRate: 30,
    features: ['All Standard Services', 'Inside Appliances', 'Grout & Tile Scrubbing', 'Baseboards & Vents']
  },
  {
    id: 'movein',
    name: 'Move-In/Move-Out Cleaning',
    description: 'Complete cleaning for moving day with full documentation',
    minHours: 4,
    maxHours: 12,
    hourlyRate: 35,
    features: ['All Deep Cleaning Services', 'Interior Windows', 'Cabinet Cleaning', 'Move Documentation']
  },
  {
    id: 'overnight',
    name: 'Overnight/Backshift Cleaning',
    description: 'Focused cleaning for backshift workers while you sleep',
    minHours: 2,
    maxHours: 6,
    hourlyRate: 60,
    features: ['Quiet Service', 'Flexible Hours', 'Deep Clean Available', 'Backshift Specialized']
  }
]

type ConsultationType = 'phone' | 'inperson' | 'photos'

const consultationOptions: { value: ConsultationType; label: string; icon: typeof Video; description: string }[] = [
  {
    value: 'phone',
    label: 'Phone/Video Call',
    icon: Video,
    description: 'Discuss your needs over a call with optional video tour of your property'
  },
  {
    value: 'inperson',
    label: 'In-Person Meeting',
    icon: MapPin,
    description: 'Schedule a visit to your property for a detailed assessment'
  },
  {
    value: 'photos',
    label: 'Quote via Photos',
    icon: Camera,
    description: 'Send photos of your space and receive a detailed quote'
  }
]

export default function BookingConfigurator() {
  const [selectedTier, setSelectedTier] = useState<'standard' | 'deep' | 'movein' | 'overnight'>('standard')
  const [hours, setHours] = useState(2)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [consultationType, setConsultationType] = useState<ConsultationType>('phone')
  const [showBookingForm, setShowBookingForm] = useState(false)

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  })

  useEffect(() => {
    // Calculate price: Hours × Hourly Rate
    const tier = serviceTiers.find(t => t.id === selectedTier)!
    const price = hours * tier.hourlyRate
    setEstimatedPrice(price)
  }, [hours, selectedTier])

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

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('service', selectedTier)
      formDataToSend.append('rooms', hours.toString())
      formDataToSend.append('bedrooms', '0')
      formDataToSend.append('bathrooms', '0')
      formDataToSend.append('consultationType', consultationType)
      formDataToSend.append('notes', formData.notes)

      const response = await fetch('/api/booking.php', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        alert('Thank you! We\'ve received your booking request and will contact you within 2 hours to confirm your appointment.')
        setFormData({ name: '', email: '', phone: '', address: '', notes: '' })
        setShowBookingForm(false)
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
    <section id="book" className="relative py-28 md:py-36 border-t border-gray-200 dark:border-[#CFD2D4]/30 bg-gray-50 dark:bg-[#093457]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#093457]/5 dark:via-[#00cccc]/10 to-transparent"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <Sparkles className="w-12 h-12 text-[#00cccc] mx-auto mb-4" />
          <h2 className="font-extrabold text-3xl md:text-4xl text-[#093457] dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Get Your Free Quote
          </h2>
          <p className="text-gray-600 dark:text-[#CFD2D4] text-base max-w-xl mx-auto">
            Choose your service and select how many hours you need. We provide instant estimates with no commitment required.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-100 dark:from-[#0a1420] dark:to-[#093457]/90 backdrop-blur-md border border-gray-200 dark:border-[#CFD2D4]/50 rounded-2xl p-8 md:p-12 shadow-2xl">
          
          {!showBookingForm ? (
            <div className="flex flex-col lg:flex-row gap-12">

              {/* Left Side - Service Selection */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#093457] dark:text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
                          ? 'border-[#00cccc] dark:border-[#00cccc] bg-[#00cccc]/5 dark:bg-[#00cccc]/10 shadow-lg'
                          : 'border-gray-200 dark:border-[#CFD2D4]/30 hover:border-[#00cccc]/50 dark:hover:border-[#00cccc]/50 bg-gray-50 dark:bg-[#0a1420]/50'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-lg text-[#093457] dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {tier.name}
                        </h4>
                        {selectedTier === tier.id && (
                          <CheckCircle className="w-5 h-5 text-[#00cccc] flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-[#CFD2D4] text-sm mb-3">{tier.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-[#00cccc]">${tier.hourlyRate}/hr</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{tier.minHours}-{tier.maxHours} hours</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tier.features.slice(0, 2).map((feature) => (
                          <span
                            key={feature}
                            className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-[#093457] px-2 py-1 rounded"
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
                    className="w-full accent-[#00cccc] bg-gray-200 dark:bg-[#093457] h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      WebkitAppearance: 'none',
                      background: `linear-gradient(to right, #00cccc 0%, #00cccc ${((hours - currentTier.minHours) / (currentTier.maxHours - currentTier.minHours)) * 100}%, #d1d5db ${((hours - currentTier.minHours) / (currentTier.maxHours - currentTier.minHours)) * 100}%, #d1d5db 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{currentTier.minHours} hours</span>
                    <span className="text-lg font-bold text-[#00cccc]">{hours} hours</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{currentTier.maxHours} hours</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Minimum {currentTier.minHours} hours required for {currentTier.name}
                  </p>
                </div>

                {/* Consultation Type Selector */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-[#093457] dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    How would you like to receive your quote?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {consultationOptions.map((option) => {
                      const Icon = option.icon
                      return (
                        <button
                          key={option.value}
                          onClick={() => setConsultationType(option.value)}
                          className={`
                            p-4 rounded-xl border-2 transition-all duration-300 text-left
                            ${consultationType === option.value
                              ? 'border-[#00cccc] dark:border-[#00cccc] bg-[#00cccc]/5 dark:bg-[#00cccc]/10'
                              : 'border-gray-200 dark:border-[#CFD2D4]/30 hover:border-[#00cccc]/50 dark:hover:border-[#00cccc]/50 bg-gray-50 dark:bg-[#0a1420]/50'
                            }
                          `}
                        >
                          <Icon className={`w-5 h-5 mb-2 ${consultationType === option.value ? 'text-[#00cccc]' : 'text-gray-400'}`} />
                          <p className="text-sm font-semibold text-[#093457] dark:text-white mb-1">{option.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{option.description}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right Side - Quote Summary */}
              <div className="w-full lg:w-80 flex flex-col">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0a1420]/80 dark:to-[#093457]/80 border border-gray-300 dark:border-[#CFD2D4]/50 rounded-xl p-6 flex-1">
                  <h3 className="text-lg font-bold text-[#093457] dark:text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Your Quote
                  </h3>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600 dark:text-[#CFD2D4] mb-2">Estimated Total</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold text-[#093457] dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        ${estimatedPrice}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-[#CFD2D4]">Service:</span>
                      <span className="text-[#093457] dark:text-white font-medium">{currentTier.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-[#CFD2D4]">Hours:</span>
                      <span className="text-[#093457] dark:text-white font-medium">{hours} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-[#CFD2D4]">Rate:</span>
                      <span className="text-[#093457] dark:text-white font-medium">${currentTier.hourlyRate}/hr</span>
                    </div>
                    <div className="border-t border-gray-300 dark:border-[#CFD2D4] pt-3 flex justify-between">
                      <span className="text-[#093457] dark:text-white font-semibold">Total</span>
                      <span className="text-[#093457] dark:text-white font-bold">${estimatedPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-[#00cccc]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-[#00cccc]" />
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-[#CFD2D4] text-xs">Booked Hours</p>
                        <p className="text-[#093457] dark:text-white font-medium">{hours} hours</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-[#00cccc]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-[#00cccc]" />
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-[#CFD2D4] text-xs">Next Available</p>
                        <p className="text-[#093457] dark:text-white font-medium">Tomorrow or sooner</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wide mt-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,204,204,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2 bg-[#00cccc] dark:bg-[#00cccc] text-[#093457] dark:text-[#093457]"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 204, 204, 0.15), 0 0 60px rgba(0, 204, 204, 0.05)'
                  }}
                >
                  Continue to Book
                  <CheckCircle className="w-4 h-4" />
                </button>

                <p className="text-gray-500 dark:text-gray-400 text-xs text-center mt-3">
                  No commitment · Free quote · Satisfaction guaranteed
                </p>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <div>
              <button
                onClick={() => setShowBookingForm(false)}
                className="mb-6 text-sm text-[#00cccc] hover:text-[#009999] transition-colors flex items-center gap-2"
              >
                ← Back to quote
              </button>

              <h3 className="text-xl font-bold text-[#093457] dark:text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Complete Your Booking
              </h3>

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#CFD2D4]/30 bg-white dark:bg-[#0a1420] text-[#093457] dark:text-white focus:ring-2 focus:ring-[#00cccc] focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#CFD2D4]/30 bg-white dark:bg-[#0a1420] text-[#093457] dark:text-white focus:ring-2 focus:ring-[#00cccc] focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#CFD2D4]/30 bg-white dark:bg-[#0a1420] text-[#093457] dark:text-white focus:ring-2 focus:ring-[#00cccc] focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#CFD2D4]/30 bg-white dark:bg-[#0a1420] text-[#093457] dark:text-white focus:ring-2 focus:ring-[#00cccc] focus:border-transparent transition-all"
                      placeholder="123 Main St, Halifax"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#CFD2D4]/30 bg-white dark:bg-[#0a1420] text-[#093457] dark:text-white focus:ring-2 focus:ring-[#00cccc] focus:border-transparent transition-all resize-none"
                    placeholder="Any specific requirements or areas of focus..."
                  />
                </div>

                <div className="bg-gray-50 dark:bg-[#0a1420]/50 rounded-lg p-4 border border-gray-200 dark:border-[#CFD2D4]/30">
                  <p className="text-sm font-semibold text-[#093457] dark:text-white mb-2">Booking Summary</p>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-[#CFD2D4]">
                    <p>• Service: {currentTier.name}</p>
                    <p>• Hours: {hours} hours</p>
                    <p>• Consultation: {consultationOptions.find(c => c.value === consultationType)?.label}</p>
                    <p>• Estimated Total: <span className="font-bold text-[#00cccc]">${estimatedPrice}</span></p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,204,204,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2 bg-[#00cccc] dark:bg-[#00cccc] text-[#093457] dark:text-[#093457]"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 204, 204, 0.15), 0 0 60px rgba(0, 204, 204, 0.05)'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Booking Request
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

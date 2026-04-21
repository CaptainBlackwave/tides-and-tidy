'use client'

import { useState } from 'react'
import { Send, Phone, Mail, MapPin } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('subject', 'Website Contact Form')
      formDataToSend.append('message', formData.message)

      const response = await fetch('/api/contact.php', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-[#CFD2D4] bg-[#F8F9FA] dark:bg-[#0A1F33]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Contact Info */}
          <div>
            <div className="mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-[#00cccc] to-transparent mb-5"></div>
              <p className="text-sm font-semibold text-[#00cccc] mb-3 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact Us</p>
              <h2 className="font-extrabold text-3xl md:text-4xl text-[#093457] dark:text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Get In Touch
              </h2>
              <p className="text-[#093457]/70 dark:text-[#CFD2D4] text-base leading-relaxed">
                Have questions about our services? Ready to schedule your first cleaning? We're here to help. Reach out and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00cccc]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#00cccc]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#093457] dark:text-white mb-1">Phone</h3>
                  <a href="tel:+18005551234" className="text-[#093457] dark:text-[#CFD2D4] hover:text-[#00cccc] transition-colors">
                    (800) 555-1234
                  </a>
                  <p className="text-sm text-[#093457]/50 dark:text-[#CFD2D4] mt-1">Mon-Fri 8am-6pm, Sat 9am-4pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00cccc]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#00cccc]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#093457] dark:text-white mb-1">Email</h3>
                  <a href="mailto:hello@tidesandtidy.com" className="text-[#093457] dark:text-[#CFD2D4] hover:text-[#00cccc] transition-colors">
                    hello@tidesandtidy.com
                  </a>
                  <p className="text-sm text-[#093457]/50 dark:text-[#CFD2D4] mt-1">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#00cccc]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#00cccc]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#093457] dark:text-white mb-1">Service Area</h3>
                  <p className="text-[#093457]/70 dark:text-[#CFD2D4]">
                    Greater Metro Area & Surrounding Communities
                  </p>
                  <p className="text-sm text-[#093457]/50 dark:text-[#CFD2D4] mt-1">Residential & Commercial</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-[#FFFFFF] dark:bg-[#0A1630] rounded-2xl p-8 md:p-10 shadow-xl border border-[#CFD2D4] dark:border-[#CFD2D4]/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#093457] dark:text-[#CFD2D4] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#CFD2D4] dark:border-[#CFD2D4]/30 bg-[#FFFFFF] dark:bg-[#0A1630] text-[#093457] dark:text-white focus:ring-2 focus:ring-[#00cccc] focus:border-transparent transition-all outline-none"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#093457] dark:text-[#CFD2D4] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#CFD2D4] dark:border-[#CFD2D4]/30 bg-[#FFFFFF] dark:bg-[#0A1630] text-[#093457] dark:text-white focus:ring-2 focus:ring-[#00cccc] focus:border-transparent transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#093457] dark:text-[#CFD2D4] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[#CFD2D4] dark:border-[#CFD2D4]/30 bg-[#FFFFFF] dark:bg-[#0A1630] text-[#093457] dark:text-white focus:ring-2 focus:ring-[#00cccc] focus:border-transparent transition-all outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#093457] dark:text-[#CFD2D4] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[#CFD2D4] dark:border-[#CFD2D4]/30 bg-[#FFFFFF] dark:bg-[#0A1630] text-[#093457] dark:text-white focus:ring-2 focus:ring-[#00cccc] focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Tell us about your cleaning needs..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-400 text-sm font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-400 text-sm font-medium">
                    Something went wrong. Please try again or call us directly.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,204,204,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2 bg-[#00cccc] text-[#093457]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
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

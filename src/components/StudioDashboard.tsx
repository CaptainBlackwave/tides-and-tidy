'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Shield, Users, Heart } from 'lucide-react'

interface Stat {
  id: string
  label: string
  value: number
  unit: string
  icon: React.ReactNode
  color: string
  description: string
}

export default function StudioDashboard() {
  const [stats, setStats] = useState<Stat[]>([
    {
      id: 'clients',
      label: 'Happy Clients',
      value: 2847,
      unit: 'SERVED',
      icon: <Users className="w-5 h-5" />,
      color: 'text-teal-400',
      description: 'Families and businesses who trust us'
    },
    {
      id: 'spaces',
      label: 'Spaces Restored',
      value: 12453,
      unit: 'THIS YEAR',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'text-[#c4a868]',
      description: 'Homes returned to pristine condition'
    },
    {
      id: 'satisfaction',
      label: 'Client Satisfaction',
      value: 99,
      unit: '%',
      icon: <Heart className="w-5 h-5" />,
      color: 'text-pink-400',
      description: 'Based on verified reviews'
    },
    {
      id: 'insured',
      label: 'Fully Insured',
      value: 100,
      unit: '%',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-blue-400',
      description: 'Complete peace of mind protection'
    }
  ])

  const [lastUpdate, setLastUpdate] = useState('')

  useEffect(() => {
    // Update timestamp
    const updateTime = () => {
      const now = new Date()
      setLastUpdate(now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
    }
    updateTime()

    return () => {}
  }, [])

  return (
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Trusted by Our Community
        </h3>
        <p className="text-gray-400 text-sm">Our commitment to excellence, measured by results</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="text-center group"
          >
            <div className={`${stat.color} mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Archivo, sans-serif' }}>
                {stat.value.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.unit}</span>
            </div>
            <p className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
              {stat.label}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Eco-Friendly Products</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            <span>Certified Specialists</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#c4a868] rounded-full"></span>
            <span>Satisfaction Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Background Checked</span>
          </div>
        </div>
      </div>
    </div>
  )
}

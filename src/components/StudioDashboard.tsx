'use client'

import { useState, useEffect } from 'react'
import { Activity, Droplet, Sparkles, Zap } from 'lucide-react'

interface Stat {
  id: string
  label: string
  value: number
  unit: string
  icon: React.ReactNode
  trend: 'up' | 'down' | 'stable'
  color: string
}

export default function StudioDashboard() {
  const [stats, setStats] = useState<Stat[]>([
    {
      id: 'specialists',
      label: 'Specialists Active Today',
      value: 12,
      unit: 'ACTIVE',
      icon: <Activity className="w-4 h-4" />,
      trend: 'up',
      color: 'text-teal-400'
    },
    {
      id: 'ecopure',
      label: 'Gallons of Eco-Pure Used',
      value: 42,
      unit: 'GALLONS',
      icon: <Droplet className="w-4 h-4" />,
      trend: 'stable',
      color: 'text-[#c4a868]'
    },
    {
      id: 'spaces',
      label: 'Spaces Restored This Week',
      value: 89,
      unit: 'SPACES',
      icon: <Sparkles className="w-4 h-4" />,
      trend: 'up',
      color: 'text-purple-400'
    },
    {
      id: 'efficiency',
      label: 'Current Efficiency Rating',
      value: 98,
      unit: '%',
      icon: <Zap className="w-4 h-4" />,
      trend: 'stable',
      color: 'text-green-400'
    }
  ])

  const [lastUpdate, setLastUpdate] = useState('')

  useEffect(() => {
    // Update timestamp
    const updateTime = () => {
      const now = new Date()
      setLastUpdate(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)

    // Simulate real-time updates
    const statsInterval = setInterval(() => {
      setStats(prevStats =>
        prevStats.map(stat => {
          const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0
          const newValue = Math.max(0, stat.value + change)
          return {
            ...stat,
            value: newValue,
            trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
          }
        })
      )
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(statsInterval)
    }
  }, [])

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
            Studio Live Feed
          </h3>
          <p className="text-gray-600 text-[10px] font-mono">REAL-TIME OPERATIONAL METRICS</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-[10px] font-mono">LAST UPDATE</p>
          <p className="text-gray-500 text-xs font-mono">{lastUpdate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.color} opacity-80`}>{stat.icon}</div>
              {stat.trend === 'up' && (
                <span className="text-green-500 text-[10px] font-mono">▲</span>
              )}
              {stat.trend === 'down' && (
                <span className="text-red-500 text-[10px] font-mono">▼</span>
              )}
              {stat.trend === 'stable' && (
                <span className="text-gray-600 text-[10px] font-mono">●</span>
              )}
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-mono font-bold text-white">{stat.value}</span>
              <span className="text-[9px] text-gray-600 font-mono">{stat.unit}</span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider leading-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="mt-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-gray-500 font-mono">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
              <span className="text-[10px] text-gray-500 font-mono">3 SPECIALISTS AVAILABLE</span>
            </div>
          </div>
          <div className="text-[10px] text-gray-600 font-mono">
            LATENCY: 12ms
          </div>
        </div>
      </div>
    </div>
  )
}

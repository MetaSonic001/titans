'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  TrendingUp,
  Upload,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('restaurants')

  const features = [
    {
      title: 'Smart Data Upload',
      description: 'Securely upload and automatically process your sales data with AI-powered validation',
      icon: Upload,
      color: 'bg-blue-600',
      hoverColor: 'bg-blue-700',
      link: '/upload',
      stats: '99.9% accuracy'
    },
    {
      title: 'Predictive Analytics',
      description: 'Get accurate sales forecasts and demand predictions using advanced machine learning',
      icon: BarChart3,
      color: 'bg-green-600',
      hoverColor: 'bg-green-700',
      link: '/predictions',
      stats: 'Up to 95% accurate'
    },
    {
      title: 'Impact Analysis',
      description: 'Understand how events, weather, and promotions affect your restaurant performance',
      icon: TrendingUp,
      color: 'bg-yellow-600',
      hoverColor: 'bg-yellow-700',
      link: '/impact',
      stats: '360° analysis'
    },
    {
      title: 'Performance Metrics',
      description: 'Track KPIs, benchmarks, and growth metrics across all your locations',
      icon: Award,
      color: 'bg-purple-600',
      hoverColor: 'bg-purple-700',
      link: '/scorecard',
      stats: 'Real-time updates'
    }
  ]

  const quickStats = [
    { label: 'Average Revenue Increase', value: '23%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Time Saved on Analysis', value: '15hrs/week', icon: Clock, color: 'text-blue-600' },
    { label: 'Customer Satisfaction', value: '96%', icon: Users, color: 'text-yellow-600' },
    { label: 'Prediction Accuracy', value: '94%', icon: CheckCircle, color: 'text-purple-600' }
  ]

  const solutions = [
    {
      title: 'For Restaurants',
      description: 'Perfect for single locations looking to optimize operations',
      features: [
        'Daily sales forecasting',
        'Inventory optimization',
        'Staff scheduling assistant',
        'Menu performance analysis'
      ]
    },
    {
      title: 'For Chains',
      description: 'Ideal for managing multiple locations efficiently',
      features: [
        'Cross-location analytics',
        'Centralized reporting',
        'Brand-wide insights',
        'Multi-unit optimization'
      ]
    },
    {
      title: 'For Enterprise',
      description: 'Advanced solutions for large-scale operations',
      features: [
        'Custom API integration',
        'Advanced data modeling',
        'Enterprise security',
        'Dedicated support'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <motion.div 
                className="sm:text-center lg:text-left"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform your restaurant with</span>
                  <span className="block text-indigo-600">data-driven decisions</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Harness the power of AI to optimize your restaurant operations, increase revenue, and enhance customer satisfaction with our comprehensive analytics platform.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/demo" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="/watch-demo" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      Watch Demo
                    </Link>
                  </div>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center">
                <stat.icon className={`h-8 w-8 ${stat.color} mr-4`} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Smart Operations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you make informed decisions and optimize every aspect of your restaurant.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Link href={feature.link} className="block h-full">
                <motion.div 
                  className={`${feature.color} rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out h-full`}
                  whileHover={{ scale: 1.03, y: -5 }}
                  animate={{
                    backgroundColor: hoveredCard === index ? feature.hoverColor : feature.color,
                  }}
                >
                  <div className="p-8">
                    <feature.icon className="h-12 w-12 text-white mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white text-opacity-90 mb-6">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white text-opacity-90">
                        <span className="text-sm font-medium">Get started</span>
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </div>
                      <span className="text-sm font-medium text-white bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        {feature.stats}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Solutions Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Solutions for Every Scale
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you are running a single location or managing multiple chains, we have the right solution for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <ul className="space-y-4">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/solutions/${solution.title.toLowerCase()}`} className="mt-8 inline-flex items-center text-indigo-600 hover:text-indigo-700">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="bg-indigo-700 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to transform your restaurant operations?
            </h2>
            <p className="mt-4 text-xl text-indigo-100">
              Join thousands of successful restaurants already using our platform.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link href="/signup" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10">
                  Start Free Trial
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 md:py-4 md:text-lg md:px-10">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
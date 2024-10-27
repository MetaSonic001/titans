'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Sample data for the chart
const generateData = (days: number) => {
  const data = []
  const startDate = new Date()
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
    data.push({
      date: date.toISOString().split('T')[0],
      sales: Math.floor(Math.random() * 1000) + 500,
      prediction: Math.floor(Math.random() * 1000) + 500,
    })
  }
  return data
}

const dailyData = generateData(90)
const weeklyData = dailyData.filter((_, index) => index % 7 === 0)
const monthlyData = dailyData.filter((_, index) => index % 30 === 0)

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-4 border border-purple-100 rounded-lg shadow-lg">
        <p className="text-indigo-900 font-medium">{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.stroke }}>
            {pld.name}: {pld.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PredictionPage() {
  const [selectedItem, setSelectedItem] = useState('all')
  const [selectedView, setSelectedView] = useState('daily')

  const getChartData = () => {
    switch (selectedView) {
      case 'weekly':
        return weeklyData
      case 'monthly':
        return monthlyData
      default:
        return dailyData
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-indigo-900 text-center mb-8">Sales Prediction</h1>
          <p className="text-lg text-indigo-700 text-center mb-12">
            See how your items are predicted to perform in the coming months! Filter by item or category to refine your forecast.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-8 border border-purple-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <Select onValueChange={setSelectedItem} defaultValue={selectedItem}>
              <SelectTrigger className="w-full sm:w-[200px] border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <SelectValue placeholder="Select item or category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="main-courses">Main Courses</SelectItem>
              </SelectContent>
            </Select>

            <Tabs 
              defaultValue="daily" 
              className="w-full sm:w-auto" 
              onValueChange={setSelectedView}
            >
              <TabsList className="bg-indigo-100">
                <TabsTrigger 
                  value="daily"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger 
                  value="weekly"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger 
                  value="monthly"
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card className="bg-white/90 border-purple-100">
            <CardHeader>
              <CardTitle className="text-indigo-900">Sales Prediction Chart</CardTitle>
              <CardDescription className="text-indigo-600">
                Predicted sales trends for the next three months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12, fill: "#4338ca" }} 
                      interval={selectedView === 'daily' ? 6 : 0}
                      angle={-45}
                      textAnchor="end"
                      stroke="#4338ca"
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: "#4338ca" }} 
                      stroke="#4338ca"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#6366f1" 
                      name="Actual Sales" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="prediction" 
                      stroke="#a855f7" 
                      name="Predicted Sales" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">Legend</h3>
            <ul className="list-disc list-inside text-sm text-indigo-600 space-y-1">
              <li>Solid line represents actual sales data</li>
              <li>Dashed line represents predicted sales</li>
              <li>Hover over data points for exact values</li>
              <li>Use the tabs to switch between daily, weekly, and monthly views</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
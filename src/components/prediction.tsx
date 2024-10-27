'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

export function Prediction() {
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Sales Prediction</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            See how your items are predicted to perform in the coming months! Filter by item or category to refine your forecast.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-md rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <Select onValueChange={setSelectedItem} defaultValue={selectedItem}>
              <SelectTrigger className="w-full sm:w-[200px] mb-4 sm:mb-0">
                <SelectValue placeholder="Select item or category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="main-courses">Main Courses</SelectItem>
              </SelectContent>
            </Select>

            <Tabs defaultValue="daily" className="w-full sm:w-auto" onValueChange={setSelectedView}>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales Prediction Chart</CardTitle>
              <CardDescription>
                Predicted sales trends for the next three months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }} 
                      interval={selectedView === 'daily' ? 6 : 0}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#8884d8" 
                      name="Actual Sales" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="prediction" 
                      stroke="#82ca9d" 
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
            <h3 className="text-lg font-semibold mb-2">Legend</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
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
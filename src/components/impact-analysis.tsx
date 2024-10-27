'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Sun, Cloud, Umbrella, Gift } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample data for the impact analysis
const impactData = [
  { date: '2023-05-01', sales: 1200, event: 'Labor Day', weather: 'Sunny' },
  { date: '2023-05-15', sales: 800, event: 'Normal Day', weather: 'Rainy' },
  { date: '2023-05-30', sales: 1500, event: 'Memorial Day', weather: 'Sunny' },
  { date: '2023-06-14', sales: 1000, event: 'Flag Day', weather: 'Cloudy' },
  { date: '2023-06-18', sales: 1800, event: "Father's Day", weather: 'Sunny' },
  { date: '2023-07-04', sales: 2000, event: 'Independence Day', weather: 'Sunny' },
]

const weatherIcons = {
  Sunny: <Sun className="h-4 w-4" />,
  Rainy: <Umbrella className="h-4 w-4" />,
  Cloudy: <Cloud className="h-4 w-4" />,
}

export function ImpactAnalysis() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timePeriod, setTimePeriod] = useState('last3months')
  const [factor, setFactor] = useState('all')

  const filteredData = impactData.filter(item => {
    if (factor === 'all') return true
    if (factor === 'holiday') return item.event !== 'Normal Day'
    if (factor === 'weather') return item.weather !== 'Sunny'
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Impact Analysis</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Discover how local events and seasonal trends affect your sales. Use this data to anticipate high and low demand periods!
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-md rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <Select onValueChange={setTimePeriod} defaultValue={timePeriod}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last3months">Last 3 Months</SelectItem>
                <SelectItem value="last6months">Last 6 Months</SelectItem>
                <SelectItem value="lastyear">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setFactor} defaultValue={factor}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select factor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Factors</SelectItem>
                <SelectItem value="holiday">Holidays</SelectItem>
                <SelectItem value="weather">Weather</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[200px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
              <CardDescription>
                Interactive calendar showing important dates and their impact on sales trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{format(new Date(item.date), 'MMMM d, yyyy')}</CardTitle>
                  <CardDescription>{item.event}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-4 w-4" />
                      <span>Sales: ${item.sales}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {weatherIcons[item.weather as keyof typeof weatherIcons]}
                      <span>{item.weather}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
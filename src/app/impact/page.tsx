'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { format, parseISO } from 'date-fns'
import { Activity, Calendar as CalendarIcon, Cloud, DollarSign, Gift, Sun, TrendingUp, Umbrella, Users } from 'lucide-react'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Enhanced sample data
const impactData = [
  { date: '2023-05-01', sales: 1200, visitors: 450, avgOrder: 85, event: 'Labor Day', weather: 'Sunny', impact: 'High' },
  { date: '2023-05-15', sales: 800, visitors: 280, avgOrder: 65, event: 'Normal Day', weather: 'Rainy', impact: 'Low' },
  { date: '2023-05-30', sales: 1500, visitors: 520, avgOrder: 92, event: 'Memorial Day', weather: 'Sunny', impact: 'High' },
  { date: '2023-06-14', sales: 1000, visitors: 380, avgOrder: 75, event: 'Flag Day', weather: 'Cloudy', impact: 'Medium' },
  { date: '2023-06-18', sales: 1800, visitors: 680, avgOrder: 88, event: "Father's Day", weather: 'Sunny', impact: 'High' },
  { date: '2023-07-04', sales: 2000, visitors: 780, avgOrder: 95, event: 'Independence Day', weather: 'Sunny', impact: 'Very High' },
]

const weatherIcons = {
  Sunny: <Sun className="h-4 w-4 text-yellow-500" />,
  Rainy: <Umbrella className="h-4 w-4 text-blue-500" />,
  Cloudy: <Cloud className="h-4 w-4 text-gray-500" />,
}

// Updated impact colors with better contrast
const impactColors = {
  'Very High': 'bg-green-200 text-green-900',
  'High': 'bg-blue-200 text-blue-900',
  'Medium': 'bg-yellow-200 text-yellow-900',
  'Low': 'bg-red-200 text-red-900',
}

const StatCard = ({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend: number }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <span className={cn("text-sm font-medium", trend > 0 ? "text-green-700" : "text-red-700")}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
          </div>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      </div>
    </CardContent>
  </Card>
)

export default function ImpactAnalysis() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timePeriod, setTimePeriod] = useState('last3months')
  const [factor, setFactor] = useState('all')
  const [activeChart, setActiveChart] = useState('bar')

  const filteredData = impactData.filter(item => {
    if (factor === 'all') return true
    if (factor === 'holiday') return item.event !== 'Normal Day'
    if (factor === 'weather') return item.weather !== 'Sunny'
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Impact Analysis Dashboard</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Analyze how events, weather, and seasonal trends influence your business performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value="$7,300"
            icon={<DollarSign className="h-6 w-6 text-green-700" />}
            trend={12.5}
          />
          <StatCard
            title="Total Visitors"
            value="3,090"
            icon={<Users className="h-6 w-6 text-blue-700" />}
            trend={8.2}
          />
          <StatCard
            title="Avg Order Value"
            value="$83.33"
            icon={<Activity className="h-6 w-6 text-purple-700" />}
            trend={5.7}
          />
          <StatCard
            title="Growth Rate"
            value="15.8%"
            icon={<TrendingUp className="h-6 w-6 text-orange-700" />}
            trend={2.3}
          />
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription className="text-gray-600">Track impact factors and sales correlation</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <Select onValueChange={setTimePeriod} defaultValue={timePeriod}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last3months">Last 3 Months</SelectItem>
                  <SelectItem value="last6months">Last 6 Months</SelectItem>
                  <SelectItem value="lastyear">Last Year</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setFactor} defaultValue={factor}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Factor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Factors</SelectItem>
                  <SelectItem value="holiday">Holidays</SelectItem>
                  <SelectItem value="weather">Weather</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-[150px]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMM d") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar" className="w-full" onValueChange={setActiveChart}>
              <TabsList className="grid w-[200px] grid-cols-2 mb-4">
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                <TabsTrigger value="line">Line Chart</TabsTrigger>
              </TabsList>
              <TabsContent value="bar">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="date" tickFormatter={(date) => format(parseISO(date), 'MMM d')} />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(date) => format(parseISO(date as string), 'MMMM d, yyyy')}
                        formatter={(value: number) => [`$${value}`, 'Sales']}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
                        labelStyle={{ color: '#374151' }}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="line">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis dataKey="date" tickFormatter={(date) => format(parseISO(date), 'MMM d')} />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(date) => format(parseISO(date as string), 'MMMM d, yyyy')}
                        formatter={(value: number) => [`$${value}`, 'Sales']}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
                        labelStyle={{ color: '#374151' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-900">{format(parseISO(item.date), 'MMMM d, yyyy')}</CardTitle>
                    <CardDescription className="flex items-center mt-1 text-gray-600">
                      <Gift className="h-4 w-4 mr-2" />
                      {item.event}
                    </CardDescription>
                  </div>
                  <span className={cn("px-2 py-1 rounded-full text-xs font-medium", 
                    impactColors[item.impact as keyof typeof impactColors]
                  )}>
                    {item.impact}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-700" />
                      <span className="text-gray-900">Sales: ${item.sales}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {weatherIcons[item.weather as keyof typeof weatherIcons]}
                      <span className="text-gray-900">{item.weather}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <span>Visitors: {item.visitors}</span>
                    <span>Avg Order: ${item.avgOrder}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
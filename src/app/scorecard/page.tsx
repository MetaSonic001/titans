'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Download, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'

// Sample data for the scorecard
const scorecardData = {
  overall: 87,
  daily: {
    score: 85,
    bestItems: ['Coffee', 'Breakfast Sandwich'],
    worstItems: ['Vegetarian Burger', 'Fruit Smoothie'],
    trend: 'High accuracy in predicting weekday sales but low on weekends'
  },
  weekly: {
    score: 88,
    bestItems: ['Pizza', 'Salad'],
    worstItems: ['Ice Cream', 'Specialty Cocktails'],
    trend: 'Improved accuracy for lunch items, dinner predictions need refinement'
  },
  monthly: {
    score: 91,
    bestItems: ['Seasonal Specials', 'Happy Hour Deals'],
    worstItems: ['New Menu Items', 'Catering Orders'],
    trend: 'Consistently high accuracy for regular menu items, special events predictions improving'
  }
}

const ScoreRing = ({ value }: { value: number }) => (
  <div className="relative w-48 h-48">
    <svg className="w-full h-full transform -rotate-90">
      <circle
        cx="96"
        cy="96"
        r="88"
        className="stroke-gray-200"
        strokeWidth="12"
        fill="none"
      />
      <circle
        cx="96"
        cy="96"
        r="88"
        className="stroke-blue-500"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={553}
        strokeDashoffset={553 - (553 * value) / 100}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-5xl font-bold text-blue-600">{value}%</div>
    </div>
  </div>
)

const MetricCard = ({ title, value, trend }: { title: string; value: string; trend: 'up' | 'down' }) => (
  <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      {trend === 'up' ? (
        <TrendingUp className="text-green-500 h-5 w-5" />
      ) : (
        <TrendingDown className="text-red-500 h-5 w-5" />
      )}
    </div>
  </div>
)

const PerformanceContent = ({ period }: { period: 'daily' | 'weekly' | 'monthly' }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">
          {period.charAt(0).toUpperCase() + period.slice(1)} Performance
        </h3>
        <p className="text-gray-600">Prediction accuracy and key insights</p>
      </div>
      <div className="text-3xl font-bold text-blue-600">
        {scorecardData[period].score}%
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-3">Best Predicted Items</h4>
        <ul className="space-y-2">
          {scorecardData[period].bestItems.map((item, index) => (
            <li key={index} className="flex items-center text-green-700">
              <ArrowRight className="h-4 w-4 mr-2" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50 rounded-lg p-4">
        <h4 className="font-semibold text-red-800 mb-3">Areas for Improvement</h4>
        <ul className="space-y-2">
          {scorecardData[period].worstItems.map((item, index) => (
            <li key={index} className="flex items-center text-red-700">
              <ArrowRight className="h-4 w-4 mr-2" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="bg-blue-50 rounded-lg p-4">
      <h4 className="font-semibold text-blue-800 mb-2">Trend Analysis</h4>
      <p className="flex items-center text-blue-700">
        {scorecardData[period].score > 85 ? (
          <TrendingUp className="text-blue-500 mr-2" />
        ) : (
          <TrendingDown className="text-blue-500 mr-2" />
        )}
        {scorecardData[period].trend}
      </p>
    </div>
  </div>
)

export default function Scorecard() {
  const [activeTab, setActiveTab] = useState('daily')

  const handleDownload = () => {
    alert('Downloading scorecard report...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Performance Scorecard</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your prediction accuracy and gain insights to optimize your inventory management
          </p>
        </div>

        <div className="mb-12">
          <Card className="border-none shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <ScoreRing value={scorecardData.overall} />
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800">Overall Accuracy Score</h2>
                  <p className="text-gray-600">Your predictions are performing exceptionally well</p>
                  <Button className="w-full md:w-auto" variant="outline" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricCard title="Daily Average" value="85%" trend="up" />
          <MetricCard title="Weekly Growth" value="88%" trend="up" />
          <MetricCard title="Monthly Progress" value="91%" trend="up" />
        </div>

        <Card className="shadow-lg border-none">
          <CardContent>
            <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="daily">
                <PerformanceContent period="daily" />
              </TabsContent>
              <TabsContent value="weekly">
                <PerformanceContent period="weekly" />
              </TabsContent>
              <TabsContent value="monthly">
                <PerformanceContent period="monthly" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
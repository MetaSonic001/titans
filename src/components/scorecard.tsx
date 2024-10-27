'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export function Scorecard() {
  const [activeTab, setActiveTab] = useState('daily')

  const handleDownload = () => {
    // In a real application, this would trigger the download of a PDF or CSV report
    alert('Downloading scorecard report...')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Performance Scorecard</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Evaluate how well your predictions match reality. Download detailed reports to help you refine inventory and sales strategies.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-md rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Overall Prediction Accuracy</h2>
            <div className="text-6xl font-bold text-blue-600">{scorecardData.overall}%</div>
            <Progress value={scorecardData.overall} className="w-full max-w-md mx-auto mt-4" />
          </div>

          <Tabs defaultValue="daily" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            {['daily', 'weekly', 'monthly'].map((period) => (
              <TabsContent key={period} value={period}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {period.charAt(0).toUpperCase() + period.slice(1)} Performance
                    </CardTitle>
                    <CardDescription>
                      Prediction accuracy and insights for {period} sales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-4">
                      {scorecardData[period as keyof typeof scorecardData].score}%
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Best Predicted Items:</h4>
                        <ul className="list-disc list-inside">
                          {scorecardData[period as keyof typeof scorecardData].bestItems.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Worst Predicted Items:</h4>
                        <ul className="list-disc list-inside">
                          {scorecardData[period as keyof typeof scorecardData].worstItems.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Recent Trend:</h4>
                        <p className="flex items-center">
                          {scorecardData[period as keyof typeof scorecardData].score > 85 ? (
                            <TrendingUp className="text-green-500 mr-2" />
                          ) : (
                            <TrendingDown className="text-red-500 mr-2" />
                          )}
                          {scorecardData[period as keyof typeof scorecardData].trend}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center">
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download Full Report
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
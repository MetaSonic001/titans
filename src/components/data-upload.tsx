'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Loader2, Upload } from 'lucide-react'
import { useState } from 'react'

export function DataUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
      setUploadStatus('idle')
      setErrorMessage('')
    } else {
      setFile(null)
      setErrorMessage('Please select a valid CSV file.')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file to upload.')
      return
    }

    setIsUploading(true)
    setUploadStatus('idle')

    // Simulating file upload with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulating a successful upload
      setUploadStatus('success')
    } catch (error) {
      setUploadStatus('error')
      setErrorMessage('An error occurred while uploading the file. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Upload Sales Data</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Upload your historical sales data in CSV format to begin generating accurate sales insights and predictions.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-md rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">File Upload</h2>
            <p className="text-gray-600 mb-4">
              Please ensure your CSV file contains the following columns:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Date</li>
              <li>Item</li>
              <li>Quantity Sold</li>
              <li>Sales Amount</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Data
                </>
              )}
            </Button>
          </div>

          {uploadStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="default" className="mt-4">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your file has been successfully uploaded and is being processed.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {uploadStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
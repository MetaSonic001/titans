'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db, storage } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Loader2, Upload } from 'lucide-react'
import { useState } from 'react'

export default function DataUploadPage() {
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

    try {
      const storageRef = ref(storage, `sales-data/${Date.now()}_${file.name}`)
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      await addDoc(collection(db, 'salesData'), {
        fileName: file.name,
        fileURL: downloadURL,
        uploadedAt: serverTimestamp(),
        status: 'pending_processing'
      })

      setUploadStatus('success')
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('error')
      setErrorMessage('An error occurred while uploading the file. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-indigo-900 text-center mb-8">Upload Sales Data</h1>
          <p className="text-lg text-indigo-700 text-center mb-12">
            Upload your historical sales data in CSV format to begin generating accurate sales insights and predictions.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-8 border border-purple-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">File Upload</h2>
            <p className="text-indigo-600 mb-4">
              Please ensure your CSV file contains the following columns:
            </p>
            <ul className="list-disc list-inside text-indigo-600 mb-4 space-y-1">
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
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
              <Alert className="mt-4 bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800 font-semibold">Success</AlertTitle>
                <AlertDescription className="text-green-700">
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
              <Alert className="mt-4 bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800 font-semibold">Error</AlertTitle>
                <AlertDescription className="text-red-700">{errorMessage}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
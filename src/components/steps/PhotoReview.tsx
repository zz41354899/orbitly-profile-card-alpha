import { useRef, useState } from 'react'
import { StepProps } from '../../types'
import { Camera, Upload, Download, CheckCircle } from 'lucide-react'
import { generateProfilePDF } from '../../utils/pdfExport'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

export default function PhotoReview({ 
  formData, 
  updateFormData, 
  onPrev, 
  isFirst
}: StepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Final submission logic here
    setShowCompletionDialog(true)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        updateFormData({ profilePhoto: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const isProfileComplete = () => {
    return formData.fullName && formData.professionalTitle && formData.aboutMe
  }

  const handleExportPDF = async (language: 'en' | 'zh') => {
    try {
      await generateProfilePDF(formData, language)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Error exporting PDF. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Add your profile photo and review your information
      </p>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Profile Photo
        </label>
        
        <div className="flex flex-col items-center space-y-4">
          {/* Photo Preview */}
          <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
            {formData.profilePhoto ? (
              <img
                src={formData.profilePhoto}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-12 h-12 text-gray-400" />
            )}
          </div>
          
          {/* Upload Button */}
          <button
            type="button"
            onClick={triggerFileInput}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{formData.fullName || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Title:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{formData.professionalTitle || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Location:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{formData.location || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Work Style:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{formData.workStyle || 'Not specified'}</span>
          </div>
          <div className="md:col-span-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">Skills:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              {formData.skills.length > 0 ? formData.skills.join(', ') : 'Not specified'}
            </span>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      <div className={`p-4 rounded-lg ${isProfileComplete() ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-3 ${isProfileComplete() ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className={`text-sm font-medium ${isProfileComplete() ? 'text-green-800' : 'text-yellow-800'}`}>
            {isProfileComplete() ? 'Profile is complete!' : 'Please complete required fields (Name, Title, About Me)'}
          </span>
        </div>
      </div>



      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        {!isFirst && (
          <button
            type="button"
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-colors"
          >
            Previous
          </button>
        )}
        <button
          type="submit"
          disabled={!isProfileComplete()}
          className={`px-6 py-3 rounded-md font-medium ml-auto ${
            isProfileComplete()
              ? 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          Save & Create Profile Card
        </button>
      </div>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl font-semibold">
              🎉 Profile Created Successfully!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-2">
              Your Orbitly profile card is now complete and ready to share!
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 text-center">
              Export Your Profile Card
            </h4>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleExportPDF('en')}
                className="inline-flex items-center justify-center px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                Export as PDF (English)
              </button>
              <button
                onClick={() => handleExportPDF('zh')}
                className="inline-flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                匯出 PDF（中文）
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Generate a professional PDF version of your profile card in your preferred language.
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowCompletionDialog(false)}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  )
} 
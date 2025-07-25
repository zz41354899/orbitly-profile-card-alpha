import { useState, useEffect, useRef } from 'react'
import { StepProps } from '../../types'
import { Camera, Upload, Trash2, Download, CheckCircle } from 'lucide-react'
import StepIndicator from '../StepIndicator'
import { getDisplayAvatar } from '../../utils/avatarUtils'
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
  isFirst,
  steps,
  currentStep
}: StepProps) {
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // 移除未使用的 previewUrl 狀態和相關設置
    if (formData.profilePhoto) {
      // 保留 useEffect 以備將來可能需要
    }
  }, [formData.profilePhoto])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        updateFormData({ profilePhoto: result })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Final submission logic here
    setShowCompletionDialog(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Step Indicator */}
      {steps && currentStep && (
        <div className="stepper-container mb-6">
          <StepIndicator 
            steps={steps} 
            currentStep={currentStep} 
          />
          <p className="step-indicator-text">Step {currentStep} of {steps.length}</p>
        </div>
      )}

      <div className="form-group">
        <h2 className="form-title">Review Your Profile</h2>
        <p className="form-subtitle">Upload a professional photo and review your profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Photo Upload */}
        <div className="form-group">
          <label className="form-label">Profile Photo</label>
          <div className="mt-2 flex flex-col items-center justify-center">
            {/* Photo Preview */}
            <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4 flex items-center justify-center">
              {formData.gender ? (
                <img 
                  src={getDisplayAvatar(formData.profilePhoto, formData.gender)} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("圖片載入失敗", e);
                    const imgElement = e.target as HTMLImageElement;
                    if (imgElement && imgElement.style) {
                      imgElement.style.display = 'none';
                      const nextElement = imgElement.nextElementSibling as HTMLElement;
                      if (nextElement && nextElement.style) {
                        nextElement.style.display = 'flex';
                      }
                    }
                  }}
                />
              ) : (
                <Camera className="w-12 h-12 text-gray-400" />
              )}
              <Camera className="w-12 h-12 text-gray-400 hidden" />
            </div>

            {/* Upload Button */}
            <div className="flex flex-col gap-2 w-full">
              <button
                type="button"
                onClick={triggerFileInput}
                className="btn-secondary flex items-center justify-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                {formData.profilePhoto ? 'Change Photo' : 'Upload Photo'}
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {/* Remove Photo Button */}
              {formData.profilePhoto && (
                <button
                  type="button"
                  onClick={() => updateFormData({ profilePhoto: null })}
                  className="btn-secondary bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 dark:hover:text-red-300 dark:border-red-800 dark:hover:border-red-700 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="form-group">
          <label className="form-label">Profile Summary</label>
          <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-medium text-gray-900 dark:text-gray-300 mb-1">{formData.fullName || 'Your Name'}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{formData.professionalTitle || 'Professional Title'}</p>
            
            {formData.location && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">📍 {formData.location}</p>
            )}
            
            {formData.aboutMe && (
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">About Me</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{formData.aboutMe.substring(0, 100)}{formData.aboutMe.length > 100 ? '...' : ''}</p>
              </div>
            )}
            
            {formData.skills && formData.skills.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {formData.skills.slice(0, 5).map((skill, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{skill}</span>
                  ))}
                  {formData.skills.length > 5 && <span className="text-xs text-gray-500">+{formData.skills.length - 5} more</span>}
                </div>
              </div>
            )}
            
            {formData.specialties && formData.specialties.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {formData.specialties.slice(0, 3).map((specialty, index) => (
                    <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{specialty}</span>
                  ))}
                  {formData.specialties.length > 3 && <span className="text-xs text-gray-500">+{formData.specialties.length - 3} more</span>}
                </div>
              </div>
            )}
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
      <div className="form-navigation md:flex-row flex-col space-y-4 md:space-y-0">
        {!isFirst ? (
          <button
            type="button"
            onClick={onPrev}
            className="btn-secondary w-full md:w-auto"
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        <button
          type="submit"
          disabled={!isProfileComplete()}
          className={`btn-primary w-full md:w-auto ${
            !isProfileComplete() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
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
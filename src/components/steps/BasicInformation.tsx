import { useState } from 'react'
import { StepProps } from '../../types'
import StepIndicator from '../StepIndicator'

export default function BasicInformation({ 
  formData, 
  updateFormData, 
  onNext, 
  isLast,
  steps,
  currentStep
}: StepProps) {
  const [showCustomLocation, setShowCustomLocation] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLast) {
      onNext()
    }
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



      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="fullName" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          required
          className="form-input"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
        />
      </div>

      {/* Gender */}
      <div className="form-group">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          id="gender"
          className="form-select"
          value={formData.gender}
          onChange={(e) => updateFormData({ gender: e.target.value as any })}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Professional Title */}
      <div className="form-group">
        <label htmlFor="professionalTitle" className="form-label">
          Professional Title
        </label>
        <input
          type="text"
          id="professionalTitle"
          className="form-input"
          placeholder="e.g., Frontend Developer"
          value={formData.professionalTitle}
          onChange={(e) => updateFormData({ professionalTitle: e.target.value })}
        />
      </div>

      {/* Location */}
      <div className="form-group">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <select
          id="location"
          className="form-select"
          value={showCustomLocation ? 'other' : formData.location}
          onChange={(e) => {
            if (e.target.value === 'other') {
              setShowCustomLocation(true)
              updateFormData({ location: '' })
            } else {
              setShowCustomLocation(false)
              updateFormData({ location: e.target.value })
            }
          }}
        >
          <option value="">Select your country</option>
          <option value="Taiwan">Taiwan</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Japan">Japan</option>
          <option value="South Korea">South Korea</option>
          <option value="Singapore">Singapore</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="China">China</option>
          <option value="other">Other (Please specify)</option>
        </select>
        
        {/* Custom Location Input */}
        {showCustomLocation && (
          <input
            type="text"
            className="form-input mt-3"
            placeholder="Please specify your location"
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
          />
        )}
      </div>

      {/* Available for Remote */}
      <div className="form-group">
        <div className="toggle-container">
          <button
            type="button"
            className={`toggle-switch ${formData.availableForRemote ? 'enabled' : 'disabled'}`}
            onClick={() => updateFormData({ availableForRemote: !formData.availableForRemote })}
          >
            <span className={`toggle-handle ${formData.availableForRemote ? 'enabled' : 'disabled'}`} />
          </button>
          <div>
            <label className="toggle-label">
              Available for remote collaboration
            </label>
            <p className="toggle-description">Open to remote collaboration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="form-navigation">
        <div></div>
        <button
          type="submit"
          className="btn-primary"
        >
          Next Step
        </button>
      </div>
    </form>
  )
} 
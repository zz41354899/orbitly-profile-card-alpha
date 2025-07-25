import { StepProps } from '../../types'
import StepIndicator from '../StepIndicator'

export default function WorkStyle({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev, 
  isFirst,
  isLast,
  steps,
  currentStep
}: StepProps) {
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

      {/* Work Style */}
      <div className="form-group">
        <label htmlFor="workStyle" className="form-label">
          Work Style
        </label>
        <select
          id="workStyle"
          className="form-select"
          value={formData.workStyle}
          onChange={(e) => updateFormData({ workStyle: e.target.value as any })}
        >
          <option value="">Select work style</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="on-site">On-site</option>
        </select>
        <p className="mt-2 text-sm text-gray-500">
          Choose your preferred working arrangement
        </p>
      </div>

      {/* Weekly Hours */}
      <div className="form-group">
        <label htmlFor="weeklyHours" className="form-label">
          Weekly Availability
        </label>
        <input
          type="text"
          id="weeklyHours"
          className="form-input"
          placeholder="e.g., 10–15 hours / week"
          value={formData.weeklyHours}
          onChange={(e) => updateFormData({ weeklyHours: e.target.value })}
        />
        <p className="mt-2 text-sm text-gray-500">
          How many hours per week can you dedicate to projects?
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="form-navigation">
        {!isFirst ? (
          <button
            type="button"
            onClick={onPrev}
            className="btn-secondary"
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
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
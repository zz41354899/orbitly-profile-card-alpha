import { Step } from '../types'

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div key={step.id} className="step-group">
          <div
            className={`step-circle ${
              step.id === currentStep ? 'active' : 'inactive'
            }`}
          >
            {step.id}
          </div>
          {index < steps.length - 1 && (
            <div className="step-connector" />
          )}
        </div>
      ))}
    </div>
  )
} 
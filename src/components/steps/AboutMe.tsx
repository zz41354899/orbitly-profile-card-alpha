import { StepProps } from '../../types'

export default function AboutMe({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev, 
  isFirst,
  isLast 
}: StepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLast) {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* About Me */}
      <div className="form-group">
        <label htmlFor="aboutMe" className="form-label">
          About Me
        </label>
        <textarea
          id="aboutMe"
          rows={6}
          className="form-textarea"
          placeholder="Please enter your self-introduction, e.g., 'I am a UX designer with 8 years of experience, specializing in...'"
          value={formData.aboutMe}
          onChange={(e) => updateFormData({ aboutMe: e.target.value })}
        />
        <p className="mt-2 text-sm text-gray-500">
          Share your background, experience, and what makes you unique.
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
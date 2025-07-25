import { useState } from 'react'
import { StepProps } from '../../types'
import { X } from 'lucide-react'
import StepIndicator from '../StepIndicator'

export default function SkillsSpecialties({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev, 
  isFirst,
  isLast,
  steps,
  currentStep
}: StepProps) {
  const [skillInput, setSkillInput] = useState('')
  const [specialtyInput, setSpecialtyInput] = useState('')
  
  // Preset tags
  const presetSkills = [
    'React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'Node.js',
    'Python', 'Java', 'PHP', 'C#', 'Go', 'Swift',
    'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator',
    'UI/UX Design', 'Prototyping', 'User Research', 'Wireframing',
    'HTML/CSS', 'Tailwind CSS', 'Bootstrap', 'SASS/SCSS',
    'Git', 'Docker', 'AWS', 'Firebase', 'MongoDB', 'PostgreSQL'
  ]
  
  const presetSpecialties = [
    'Web Development', 'Mobile App Development', 'Frontend Development',
    'Backend Development', 'Full-Stack Development', 'DevOps',
    'UI/UX Design', 'Graphic Design', 'Brand Design', 'Logo Design',
    'Product Design', 'Design Systems', 'User Experience',
    'E-commerce', 'SaaS Applications', 'Marketing Websites',
    'Data Visualization', 'API Development', 'Database Design',
    'Cloud Architecture', 'Performance Optimization', 'SEO'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLast) {
      onNext()
    }
  }

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault()
      if (!formData.skills.includes(skillInput.trim())) {
        updateFormData({ 
          skills: [...formData.skills, skillInput.trim()] 
        })
      }
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    updateFormData({ 
      skills: formData.skills.filter(skill => skill !== skillToRemove) 
    })
  }

  const addSpecialty = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && specialtyInput.trim()) {
      e.preventDefault()
      if (!formData.specialties.includes(specialtyInput.trim())) {
        updateFormData({ 
          specialties: [...formData.specialties, specialtyInput.trim()] 
        })
      }
      setSpecialtyInput('')
    }
  }

  const removeSpecialty = (specialtyToRemove: string) => {
    updateFormData({ 
      specialties: formData.specialties.filter(specialty => specialty !== specialtyToRemove) 
    })
  }

  const addPresetSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      updateFormData({ 
        skills: [...formData.skills, skill] 
      })
    }
  }

  const addPresetSpecialty = (specialty: string) => {
    if (!formData.specialties.includes(specialty)) {
      updateFormData({ 
        specialties: [...formData.specialties, specialty] 
      })
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

      {/* Skills */}
      <div className="form-group">
        <label htmlFor="skills" className="form-label">
          Skills
        </label>
        <input
          type="text"
          id="skills"
          className="form-input"
          placeholder="e.g., Figma, Prototyping, User Research (Press Enter to add)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={addSkill}
        />
        <p className="mt-2 text-sm text-gray-500">
          Press Enter to add each skill, or click on suggested skills below
        </p>
        
        {/* Preset Skills */}
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-600 mb-2">Suggested Skills:</p>
          <div className="flex flex-wrap gap-2">
            {presetSkills.filter(skill => !formData.skills.includes(skill)).slice(0, 12).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addPresetSkill(skill)}
                className="preset-tag"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
        
        {/* Skills Tags */}
        {formData.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Specialties */}
      <div className="form-group">
        <label htmlFor="specialties" className="form-label">
          Specialties
        </label>
        <input
          type="text"
          id="specialties"
          className="form-input"
          placeholder="e.g., Web Design, Mobile Apps, Design Systems (Press Enter to add)"
          value={specialtyInput}
          onChange={(e) => setSpecialtyInput(e.target.value)}
          onKeyDown={addSpecialty}
        />
        <p className="mt-2 text-sm text-gray-500">
          Press Enter to add each specialty, or click on suggested specialties below
        </p>
        
        {/* Preset Specialties */}
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-600 mb-2">Suggested Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {presetSpecialties.filter(specialty => !formData.specialties.includes(specialty)).slice(0, 12).map((specialty) => (
              <button
                key={specialty}
                type="button"
                onClick={() => addPresetSpecialty(specialty)}
                className="preset-tag hover:bg-green-100 hover:text-green-800"
              >
                + {specialty}
              </button>
            ))}
          </div>
        </div>
        
        {/* Specialties Tags */}
        {formData.specialties.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.specialties.map((specialty, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {specialty}
                <button
                  type="button"
                  onClick={() => removeSpecialty(specialty)}
                  className="ml-2 hover:text-green-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
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
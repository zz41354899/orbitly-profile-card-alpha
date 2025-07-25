import { useState, useEffect } from 'react'
import { FormData } from './types'
import ProfilePreview from './components/ProfilePreview'
import BasicInformation from './components/steps/BasicInformation'
import AboutMe from './components/steps/AboutMe'
import SkillsSpecialties from './components/steps/SkillsSpecialties'
import WorkStyle from './components/steps/WorkStyle'
import PhotoReview from './components/steps/PhotoReview'
import { Moon, Sun } from 'lucide-react'

const initialFormData: FormData = {
  fullName: '',
  gender: '',
  professionalTitle: '',
  location: '',
  availableForRemote: false,
  aboutMe: '',
  skills: [],
  specialties: [],
  workStyle: '',
  weeklyHours: '',
  profilePhoto: null,
}

const steps = [
  { id: 1, title: 'Basic Information', component: BasicInformation },
  { id: 2, title: 'About Me', component: AboutMe },
  { id: 3, title: 'Skills & Specialties', component: SkillsSpecialties },
  { id: 4, title: 'Work Style & Availability', component: WorkStyle },
  { id: 5, title: 'Profile Photo & Review', component: PhotoReview },
]

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Dark mode initialization
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])
  
  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const getStepSubtitle = (step: number) => {
    const subtitles = [
      "Let's start with the essentials about you",
      "Tell us about yourself and your background", 
      "Add your skills and areas of expertise",
      "Tell us about your preferred work style and availability",
      ""
    ]
    return subtitles[step - 1] || ""
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="orbitly-container">
      <div className="orbitly-content">
        {/* Header */}
        <div className="orbitly-header">
          <div className="header-left">
            <h1 className="orbitly-title">Orbitly</h1>
          </div>
          
          <div className="header-center">
            {/* Stepper moved to form */}
          </div>
          
          <div className="header-right">
            <button 
              className="dark-mode-toggle"
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="orbitly-main">
          {/* Left Side - Form */}
          <div className="form-panel">
            <div className="mb-8">
              <h2 className="form-title">
                {steps[currentStep - 1].title}
              </h2>
              <p className="form-subtitle">
                {getStepSubtitle(currentStep)}
              </p>
            </div>

            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
              onNext={goToNextStep}
              onPrev={goToPrevStep}
              isFirst={currentStep === 1}
              isLast={currentStep === steps.length}
              steps={steps}
              currentStep={currentStep}
            />
          </div>

          {/* Right Side - Preview */}
          <div className="preview-panel">
            <h3 className="preview-title">
              Profile Preview
            </h3>
            <ProfilePreview formData={formData} />
          </div>
        </div>

        {/* Footer */}
        <div className="orbitly-footer">
          <div className="footer-content">
            <div className="footer-copyright">
              © 2025 Orbitly. All rights reserved.
            </div>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 
import { FormData } from '../types'
import { User, MapPin } from 'lucide-react'

interface ProfilePreviewProps {
  formData: FormData
}

export default function ProfilePreview({ formData }: ProfilePreviewProps) {
  const {
    fullName,
    professionalTitle,
    location,
    aboutMe,
    skills,
    specialties,
    workStyle,
    weeklyHours,
    availableForRemote,
    profilePhoto
  } = formData

  return (
    <div className="profile-card">
      {/* Profile Photo */}
      <div className="profile-avatar">
        {profilePhoto ? (
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <User className="w-8 h-8 text-gray-400" />
        )}
      </div>

      {/* Name and Title */}
      <div className="profile-name">
        {fullName || 'Your Name'}
      </div>
      <div className="profile-title">
        {professionalTitle || 'Professional Title'}
      </div>

      {/* Location */}
      {location && (
        <div className="profile-location">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>
      )}

      {/* About Me */}
      <div className="profile-section">
        <h4 className="profile-section-title">About Me</h4>
        <p className="profile-section-content">
          {aboutMe || 'Your introduction will appear here...'}
        </p>
      </div>

      {/* Skills */}
      <div className="profile-section">
        <h4 className="profile-section-title">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))
          ) : (
            <>
              <span className="skill-tag">Skill 1</span>
              <span className="skill-tag">Skill 2</span>
            </>
          )}
        </div>
      </div>

      {/* Specialties */}
      {specialties.length > 0 && (
        <div className="profile-section">
          <h4 className="profile-section-title">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span key={index} className="skill-tag">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Collaboration */}
      <div className="profile-section">
        <h4 className="profile-section-title">Collaboration</h4>
        <div className="profile-section-content">
          {workStyle && (
            <p>Work Style: {workStyle.charAt(0).toUpperCase() + workStyle.slice(1)}</p>
          )}
          {weeklyHours && (
            <p>Availability: {weeklyHours}</p>
          )}
          {availableForRemote && (
            <p>Available for remote collaboration</p>
          )}
          {!workStyle && !weeklyHours && !availableForRemote && (
            <p>Preferences will appear here...</p>
          )}
        </div>
      </div>


    </div>
  )
} 
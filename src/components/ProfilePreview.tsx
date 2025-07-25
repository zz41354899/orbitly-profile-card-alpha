import { FormData } from '../types'
import { User, MapPin } from 'lucide-react'
import { getDisplayAvatar } from '../utils/avatarUtils'

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

  // Debug: 檢查formData的值
  console.log('ProfilePreview - formData:', {
    gender: formData.gender,
    profilePhoto: profilePhoto ? 'has photo' : 'no photo',
    avatarPath: getDisplayAvatar(profilePhoto, formData.gender)
  })

  return (
    <div className="profile-card">
      {/* Profile Photo */}
      <div className="profile-avatar">
        {formData.gender ? (
          <img
            src={getDisplayAvatar(profilePhoto, formData.gender)}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
            onError={(e) => {
              // 如果圖片加載失敗，顯示預設圖標
              console.error('圖片載入失敗:', getDisplayAvatar(profilePhoto, formData.gender));
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : (
          <User className="w-8 h-8 text-gray-400" />
        )}
        <User className="w-8 h-8 text-gray-400 hidden" />
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
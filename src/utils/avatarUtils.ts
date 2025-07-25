// 根據性別獲取預設頭像
export const getDefaultAvatar = (gender: string): string => {
  switch (gender) {
    case 'male':
      return '/images/male.png'
    case 'female':
      return '/images/female.png'
    default:
      return '/images/male.png' // 預設使用男性頭像
  }
}

// 獲取顯示用的頭像（用戶上傳的或預設的）
export const getDisplayAvatar = (profilePhoto: string | null, gender: string): string => {
  return profilePhoto || getDefaultAvatar(gender)
} 
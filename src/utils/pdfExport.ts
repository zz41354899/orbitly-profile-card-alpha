import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { FormData } from '../types'

// 創建 PDF 模板 HTML
const createPDFTemplate = (formData: FormData, language: 'en' | 'zh') => {
  const isZh = language === 'zh'
  
  const template = `
    <div style="
      font-family: 'Arial', 'Microsoft YaHei', '微軟雅黑', sans-serif;
      padding: 40px;
      background: white;
      color: #1f2937;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    ">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="
          font-size: 32px;
          font-weight: bold;
          margin: 0 0 10px 0;
          color: #000;
        ">${isZh ? '個人資料卡' : 'Profile Card'}</h1>
        <div style="
          width: 60px;
          height: 3px;
          background: #000;
          margin: 0 auto;
        "></div>
      </div>

      <!-- Profile Photo -->
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #e5e7eb;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: #9ca3af;
        ">
          ${formData.profilePhoto ? `<img src="${formData.profilePhoto}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;" />` : '👤'}
        </div>
      </div>

      <!-- Name and Title -->
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #000;
        ">${formData.fullName || (isZh ? '您的姓名' : 'Your Name')}</h2>
        <p style="
          font-size: 18px;
          color: #6b7280;
          margin: 0 0 16px 0;
        ">${formData.professionalTitle || (isZh ? '職業標題' : 'Professional Title')}</p>
        ${formData.location ? `
          <p style="
            font-size: 16px;
            color: #6b7280;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          ">
            📍 ${formData.location}
          </p>
        ` : ''}
      </div>

      <!-- Basic Information -->
      <div style="margin-bottom: 30px;">
        <h3 style="
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #000;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
        ">${isZh ? '基本資訊' : 'Basic Information'}</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          ${formData.workStyle ? `
            <div>
              <strong>${isZh ? '工作模式：' : 'Work Style: '}</strong>
              ${isZh 
                ? (formData.workStyle === 'remote' ? '遠端' : 
                   formData.workStyle === 'hybrid' ? '混合' : '現場')
                : formData.workStyle.charAt(0).toUpperCase() + formData.workStyle.slice(1)
              }
            </div>
          ` : ''}
          ${formData.weeklyHours ? `
            <div>
              <strong>${isZh ? '每週時間：' : 'Weekly Hours: '}</strong>
              ${formData.weeklyHours}
            </div>
          ` : ''}
          ${formData.availableForRemote ? `
            <div style="grid-column: span 2;">
              <strong>✓</strong> ${isZh ? '可遠端合作' : 'Available for remote collaboration'}
            </div>
          ` : ''}
        </div>
      </div>

      <!-- About Me -->
      ${formData.aboutMe ? `
        <div style="margin-bottom: 30px;">
          <h3 style="
            font-size: 20px;
            font-weight: 600;
            margin: 0 0 16px 0;
            color: #000;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
          ">${isZh ? '關於我' : 'About Me'}</h3>
          <p style="
            font-size: 16px;
            color: #4b5563;
            margin: 0;
            text-align: justify;
          ">${formData.aboutMe}</p>
        </div>
      ` : ''}

      <!-- Skills -->
      ${formData.skills.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h3 style="
            font-size: 20px;
            font-weight: 600;
            margin: 0 0 16px 0;
            color: #000;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
          ">${isZh ? '技能' : 'Skills'}</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${formData.skills.map(skill => `
              <span style="
                background: #f3f4f6;
                color: #374151;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
              ">${skill}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Specialties -->
      ${formData.specialties.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h3 style="
            font-size: 20px;
            font-weight: 600;
            margin: 0 0 16px 0;
            color: #000;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
          ">${isZh ? '專長領域' : 'Specialties'}</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${formData.specialties.map(specialty => `
              <span style="
                background: #ecfdf5;
                color: #065f46;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
              ">${specialty}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="
        text-align: center;
        margin-top: 50px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        color: #6b7280;
        font-size: 14px;
      ">
        ${isZh 
          ? `由 Orbitly 生成 - ${new Date().toLocaleDateString('zh-TW')}`
          : `Generated by Orbitly - ${new Date().toLocaleDateString('en-US')}`
        }
      </div>
    </div>
  `
  
  return template
}

// 支持中文字體的 PDF 生成
export const generateProfilePDF = async (formData: FormData, language: 'en' | 'zh' = 'en') => {
  try {
    // 創建臨時 div 來渲染 PDF 內容
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = createPDFTemplate(formData, language)
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.style.top = '0'
    tempDiv.style.width = '800px'
    document.body.appendChild(tempDiv)

    // 等待字體和圖片加載
    await new Promise(resolve => setTimeout(resolve, 100))

    // 使用 html2canvas 生成圖片
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempDiv.scrollHeight
    })

    // 移除臨時元素
    document.body.removeChild(tempDiv)

    // 創建 PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth * 72 / 96, (pdfHeight - 20) / imgHeight * 72 / 96)
    
    const imgX = (pdfWidth - imgWidth * ratio * 96 / 72) / 2
    const imgY = 10

    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(
      imgData, 
      'PNG', 
      imgX, 
      imgY, 
      imgWidth * ratio * 96 / 72, 
      imgHeight * ratio * 96 / 72
    )

    // 下載 PDF
    const fileName = language === 'zh' 
      ? `${formData.fullName || 'Profile'}_個人資料卡.pdf`
      : `${formData.fullName || 'Profile'}_Profile_Card.pdf`
    
    pdf.save(fileName)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('PDF generation failed')
  }
}

// 從 HTML 元素生成 PDF（備用方法）
export const generatePDFFromElement = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.error('Element not found')
    return
  }
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 10
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
    pdf.save(fileName)
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
} 
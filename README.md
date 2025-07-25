# Orbitly Profile Card Generator

一個現代化的個人檔案卡片生成器，讓用戶能夠創建專業的個人檔案卡片，支持深色模式和PDF導出功能。

## ✨ 功能特色

- **多步驟表單**：分為5個步驟，逐步收集用戶信息
- **即時預覽**：實時預覽個人檔案卡片外觀
- **深色模式**：完整支持深色模式，提供優秀的視覺體驗
- **照片上傳**：支持個人照片上傳和預覽
- **PDF導出**：支持中英文PDF導出功能
- **響應式設計**：在各種設備上都能完美展示
- **現代化UI**：基於Tailwind CSS的現代設計

## 🎯 步驟流程

1. **基本信息** - 姓名、性別、職業頭銜、所在地等
2. **關於我** - 個人介紹和背景描述  
3. **技能專長** - 技能標籤和專業領域
4. **工作風格** - 工作偏好和時間安排
5. **照片預覽** - 上傳照片並最終確認

## 🚀 快速開始

### 前置需求

- Node.js 16.0 或更高版本
- npm 或 yarn

### 安裝

1. 克隆項目到本地
```bash
git clone [repository-url]
cd profile-card
```

2. 安裝依賴
```bash
npm install
```

3. 啟動開發服務器
```bash
npm run dev
```

4. 在瀏覽器中打開 http://localhost:5173

### 構建生產版本

```bash
npm run build
```

構建文件將生成在 `dist/` 目錄中。

## 📁 項目結構

```
profile-card/
├── src/
│   ├── components/          # React組件
│   │   ├── steps/          # 表單步驟組件
│   │   ├── ui/             # UI基礎組件
│   │   ├── ProfilePreview.tsx
│   │   └── StepIndicator.tsx
│   ├── utils/              # 工具函數
│   │   └── pdfExport.ts
│   ├── lib/                # 庫文件
│   ├── types.ts            # TypeScript類型定義
│   ├── App.tsx             # 主應用組件
│   ├── main.tsx            # 應用入口
│   └── index.css           # 全局樣式
├── public/                 # 靜態資源
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ 技術棧

- **前端框架**: React 18 + TypeScript
- **構建工具**: Vite
- **UI樣式**: Tailwind CSS
- **圖標**: Lucide React
- **PDF生成**: jsPDF
- **組件庫**: Radix UI (Dialog組件)

## 🎨 設計特色

- **現代化界面**：乾淨、直觀的用戶界面
- **響應式布局**：支持桌面、平板和手機設備
- **深色模式**：完整的深色主題支持
- **流暢動畫**：平滑的過渡動畫效果
- **無障礙設計**：符合無障礙訪問標準

## 📱 響應式支持

- **桌面**: 雙欄布局，表單和預覽並排顯示
- **平板**: 單欄布局，適配中等屏幕
- **手機**: 優化的移動端體驗

## 🌙 深色模式

項目完整支持深色模式：
- 自動檢測系統主題偏好
- 手動切換功能
- 所有組件都有深色變體
- 本地存儲主題設置

## 📄 PDF導出功能

支持兩種語言的PDF導出：
- **中文版本**：適合中文用戶
- **英文版本**：適合國際用戶
- 保持視覺設計一致性
- 高質量輸出

## 🔧 自定義配置

### 修改主題色彩

在 `src/index.css` 中修改 CSS 變數：

```css
:root {
  --primary: 0 0% 9%;
  --background: 0 0% 100%;
  /* 其他顏色變數 */
}
```

### 添加新的技能預設

在相應的步驟組件中修改預設技能列表。

## 🤝 貢獻指南

1. Fork 項目
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📝 開發說明

### 新增表單步驟

1. 在 `src/components/steps/` 中創建新組件
2. 在 `src/App.tsx` 的 `steps` 數組中添加配置
3. 更新 `src/types.ts` 中的 `FormData` 類型

### 修改樣式

項目使用 Tailwind CSS，所有樣式都在組件中定義或在 `src/index.css` 中作為全局樣式類。

## 🐛 常見問題

**Q: 如何更改表單步驟的順序？**
A: 在 `src/App.tsx` 中調整 `steps` 數組的順序。

**Q: 如何添加新的輸入字段？**
A: 1) 更新 `FormData` 類型 2) 在相應步驟組件中添加表單字段 3) 更新 `ProfilePreview` 組件

**Q: PDF導出不工作？**
A: 檢查瀏覽器控制台錯誤，確保所有依賴正確安裝。

## 📜 許可證

本項目使用 MIT 許可證 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 👥 作者

- 開發者：[Your Name]
- 項目連結：[Project Link]

## 🙏 致謝

- [Tailwind CSS](https://tailwindcss.com/) - 優秀的CSS框架
- [Lucide](https://lucide.dev/) - 精美的圖標庫
- [Radix UI](https://www.radix-ui.com/) - 無障礙的UI組件 
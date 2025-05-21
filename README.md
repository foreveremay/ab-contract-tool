# AB 合約工具（A/B Contract Splitter）

本專案為一套可將合約內容拆分為 A 合約與 B 合約的線上工具，支援：

- ✍️ 合約標題、甲乙雙方、付款方式等欄位輸入
- 📁 匯入 Word / PDF / Excel 檔案（模擬）
- 📤 匯出 PDF、Word 格式
- 📑 項目拆分與金額分配（A / B）
- 🖼️ 左預覽、中 A 區、右 B 區的三欄 UI 編輯介面

## 🧪 開發環境

- React + Vite
- Tailwind CSS
- jsPDF / file-saver

## 🚀 使用方式

```bash
npm install
npm run dev
```

本地啟動後請打開： [http://localhost:5173](http://localhost:5173)

## 🛠️ 部署

部署於 Vercel：支援自動構建 `npm run build`，輸出資料夾為 `dist`

---

> 本工具尚在開發中，未來將支援：
> - 合約版本儲存
> - 樣板選擇與套用
> - 寄送 Email / PDF 簽署流程串接
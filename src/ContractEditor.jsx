// AB 合約工具（加上 PDF / Word 匯出預覽 + Excel / Word / PDF 匯入）

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export default function ContractEditor() {
  const [files, setFiles] = useState([]);
  const [items, setItems] = useState([
    { description: "", total: "", partA: "", partB: "" }
  ]);
  const [aData, setAData] = useState({
    title: "",
    partyA: "",
    partyB: "",
    intro: "",
    payment: "",
    date: "",
    legal: "",
    seal: "",
    contractDate: ""
  });

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { description: "", total: "", partA: "", partB: "" }]);
  };

  const updateAData = (field, value) => {
    setAData({ ...aData, [field]: value });
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(12);
    doc.text(`【${aData.title}】`, 10, y);
    doc.text(`甲方：${aData.partyA} / 乙方：${aData.partyB}`, 10, y += 10);
    doc.text(aData.intro, 10, y += 10);
    doc.text(`付款方式：${aData.payment}`, 10, y += 10);
    doc.text(`付款日期：${aData.date}`, 10, y += 10);
    items.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item.description} 總金額：${item.total}｜A:${item.partA} B:${item.partB}`, 10, y += 10);
    });
    doc.text(aData.legal, 10, y += 10);
    doc.text(`用印：${aData.seal}`, 10, y += 10);
    doc.text(`合約日期：${aData.contractDate}`, 10, y += 10);
    doc.save("contract.pdf");
  };

  const exportDOC = () => {
    let content = `【${aData.title}】\n甲方：${aData.partyA} / 乙方：${aData.partyB}\n${aData.intro}\n付款方式：${aData.payment}\n付款日期：${aData.date}\n項目：\n`;
    items.forEach((item, i) => {
      content += `${i + 1}. ${item.description}｜總金額：${item.total}｜A:${item.partA} B:${item.partB}\n`;
    });
    content += `${aData.legal}\n用印：${aData.seal}\n合約日期：${aData.contractDate}`;
    const blob = new Blob([content], { type: "application/msword" });
    saveAs(blob, "contract.doc");
  };

  const importHandler = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target.result;
      alert("🗂️ 匯入內容預覽：\n" + content.slice(0, 500)); // 模擬展示
    };
    reader.readAsText(f);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* 左側：預覽區 */}
      <div className="bg-gray-100 p-4 rounded-xl">
        <h2 className="font-bold text-lg mb-2">📄 預覽</h2>
        <div className="text-sm text-gray-600 whitespace-pre-line">
          <p>【{aData.title}】</p>
          <p>甲方：{aData.partyA} / 乙方：{aData.partyB}</p>
          <p>{aData.intro}</p>
          <p>付款方式：{aData.payment}</p>
          <p>付款日期：{aData.date}</p>
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item.description}｜總金額：{item.total}｜A：{item.partA}／B：{item.partB}</li>
            ))}
          </ul>
          <p>{aData.legal}</p>
          <p>{aData.seal}</p>
          <p>合約日期：{aData.contractDate}</p>
          <div className="mt-4 space-x-2">
            <Button onClick={exportPDF}>匯出 PDF</Button>
            <Button onClick={exportDOC}>匯出 Word</Button>
            <Input type="file" accept=".txt,.doc,.docx,.pdf,.xlsx" onChange={importHandler} />
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <Card className="mb-4">
          <CardContent className="grid grid-cols-2 gap-2 p-4">
            <Input placeholder="合約標題" value={aData.title} onChange={(e) => updateAData("title", e.target.value)} />
            <Input placeholder="甲方名稱" value={aData.partyA} onChange={(e) => updateAData("partyA", e.target.value)} />
            <Input placeholder="乙方名稱" value={aData.partyB} onChange={(e) => updateAData("partyB", e.target.value)} />
            <Input placeholder="付款方式" value={aData.payment} onChange={(e) => updateAData("payment", e.target.value)} />
            <Input placeholder="付款日期" value={aData.date} onChange={(e) => updateAData("date", e.target.value)} />
            <Input placeholder="合約日期" value={aData.contractDate} onChange={(e) => updateAData("contractDate", e.target.value)} />
            <Textarea placeholder="引言" value={aData.intro} onChange={(e) => updateAData("intro", e.target.value)} />
            <Textarea placeholder="法律條文" value={aData.legal} onChange={(e) => updateAData("legal", e.target.value)} />
            <Input placeholder="用印名稱" value={aData.seal} onChange={(e) => updateAData("seal", e.target.value)} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {items.map((item, i) => (
            <Card key={i}>
              <CardContent className="grid grid-cols-4 gap-2 p-4">
                <Textarea placeholder="項目說明" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} />
                <Input placeholder="總金額" value={item.total} onChange={(e) => updateItem(i, "total", e.target.value)} />
                <Input placeholder="A 合約金額" value={item.partA} onChange={(e) => updateItem(i, "partA", e.target.value)} />
                <Input placeholder="B 合約金額" value={item.partB} onChange={(e) => updateItem(i, "partB", e.target.value)} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4">
          <Button onClick={addItem}>➕ 新增項目</Button>
        </div>
      </div>
    </div>
  );
}
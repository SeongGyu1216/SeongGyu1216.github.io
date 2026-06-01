<%*
const file = app.workspace.getActiveFile();
if (!file) return;

let content = await app.vault.read(file);

// 1) 위키 이미지 → md 이미지 (파일명만 유지)
content = content.replace(/!\[\[([^\]]+)\]\]/g, (m, filename) => {
  return `![](./Source/${filename})`;
});

// 2) md 이미지 경로 정규화 + 공백 → %20
content = content.replace(/!\[\]\(([^)]+)\)/g, (m, path) => {
  // 파일명만 추출
  const filename = path.split('/').pop();
  // 공백 전부 %20
  const encoded = filename.replace(/ /g, '%20');
  return `![](./Source/${encoded})`;
});

await app.vault.modify(file, content);

%>

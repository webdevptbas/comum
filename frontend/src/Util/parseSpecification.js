// Mengubah teks specification (plain text dari admin) jadi array section
// Aturan:
// - Baris diawali "-" atau "•" -> dianggap bullet item (misal "- MESH BIBS")
// - Baris TANPA "-"/"•" dan TANPA ":" -> dianggap judul section (misal "AXE", "PRODUCT FEATURES")
// - Baris dengan ":" -> dianggap pasangan label-value (misal "SPINDLE MATERIAL : CHROMOLY +")
export const parseSpecification = (text) => {
  if (!text) return [];

  const rawLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const sections = [];
  let currentSection = null;

  const ensureSection = () => {
    if (!currentSection) {
      currentSection = { title: "", items: [] };
      sections.push(currentSection);
    }
  };

  rawLines.forEach((rawLine) => {
    const isBullet = /^[-•]/.test(rawLine);
    const line = isBullet ? rawLine.replace(/^[-•]\s*/, "") : rawLine;
    const colonIndex = line.indexOf(":");

    if (!isBullet && colonIndex === -1) {
      currentSection = { title: line, items: [] };
      sections.push(currentSection);
      return;
    }

    ensureSection();

    if (colonIndex === -1) {
      currentSection.items.push({ bullet: isBullet, label: null, value: line });
    } else {
      const label = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      currentSection.items.push({ bullet: isBullet, label, value });
    }
  });

  return sections;
};

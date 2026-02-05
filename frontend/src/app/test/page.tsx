"use client"


async function transliterate(text) {
  if (!text || typeof text !== "string") return text;

  const url =
    "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx" +
    "&sl=hi" +
    "&tl=en" +
    "&dt=t" +
    `&q=${encodeURIComponent(text.trim())}`;

  const res = await fetch(url);
  const data = await res.json();

  // data[0] = translated chunks
  return data[0].map((t) => t[0]).join("");
}

export default function App() {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const text = await file.text();
    const json = JSON.parse(text);

    const output = [];
    let i = 0;

    for (const item of json) {
      const name = await transliterate(item.name);
      const block = await transliterate(item.block);
      const district = await transliterate(item.district);

      output.push({
        ...item,
        name,
        block,
        district,
        slug: `${name}-${block}-${district}`
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z-]/g, ""),
      });

      i++;
      if (i % 100 === 0) console.log("Converted", i, "/", json.length);
    }

    download(output);
  };

  const download = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Hindi JSON → WhatsApp English</h2>
      {/* <input type="file" accept=".json" onChange={handleFile} /> */}
      <input
        type="file"
        accept=".json"
        onChange={(e) => {
          console.log("File selected");
          handleFile(e);
        }}
      />
      {/* <input type="file" accept=".json" /> */}
      <p>Open console to see progress</p>
    </div>
  );
}
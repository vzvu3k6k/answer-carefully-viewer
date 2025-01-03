import htm from 'https://esm.sh/htm';
import vhtml from 'https://esm.sh/vhtml';

const html = htm.bind(vhtml);

document.addEventListener("DOMContentLoaded", () =>{
  document.getElementById("file-input").addEventListener("change", (event) => {
    const files = event.currentTarget.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const dataset = JSON.parse(e.target.result);
        const html = buildHTMLFromDataset(file.name, dataset);
        saveAsHTMLFile(file.name.replace(/\.json$/, ".html"), html);
      } catch (error) {
        reportError(error);
      }
    };
    reader.readAsText(file);
  });
});

const saveAsHTMLFile = (fileName, html) => {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
};

const buildHTMLFromDataset = (fileName, dataset) => {
  return "<!DOCTYPE html>" + html`<html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <title>${fileName}</title>
        <style>
          .entry {
            border: 1px solid #ccc;
            margin: 10px;
            padding: 10px;
            max-width: 75em;
          }
          .entry-anchor {
            color: #aaa;
          }
          .pre-wrap {
            white-space: pre-wrap;
          }
          .meta-section {
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <h1>${fileName}</h1>
        ${dataset.map((entry) => html`<${Entry} data=${entry} />`)}
      </body>
    </html>
  `;
};

const Entry = ({ data }) => (html`
  <div class="entry" id=${data.ID}>
    <p><strong>ID:</strong> ${data.ID} <a class="entry-anchor" href="${`#${data.ID}`}">§</a></p>
    <p><strong>Text:</strong> <span class="pre-wrap">${data.text}</span></p>
    <p><strong>Output:</strong> <span class="pre-wrap">${data.output}</span></p>
    <div class="meta-section">
      <p><strong>Meta:</strong></p>
      <ul>
        <li>Risk Area: ${data.meta["risk-area"]}</li>
        <li>Harm Type: ${data.meta["harm-type"]}</li>
        <li>Specific Harm: ${data.meta["specific-harm"]}</li>
      </ul>
    </div>
  </div>
`);

const reportError = (error) => {
  console.error(error);
  document.getElementById("error").textContent = error;
};

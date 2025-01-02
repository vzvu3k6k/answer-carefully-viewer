import { h, render } from 'https://esm.sh/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

function App () {
  const [dataset, setDataset] = useState();
  return html`
    <div>
      <${FileSelector} onLoadFile=${setDataset} />
    </div>
    <div>
      ${dataset && dataset.map((data) => {
        return html`
          <div style="border: 1px solid #ccc; margin: 10px; padding: 10px; max-width: 75em;">
            <p><strong>ID:</strong> ${data.ID}</p>
            <p><strong>Text:</strong> <span style="white-space: pre-wrap">${data.text}</span></p>
            <p><strong>Output:</strong> <span style="white-space: pre-wrap">${data.output}</span></p>
            <div style="margin-top: 10px;">
              <p><strong>Meta:</strong></p>
              <ul>
                <li>Risk Area: ${data.meta["risk-area"]}</li>
                <li>Harm Type: ${data.meta["harm-type"]}</li>
                <li>Specific Harm: ${data.meta["specific-harm"]}</li>
              </ul>
            </div>
          </div>
        `;
      })}
    </div>
  `;
}

const FileSelector = ({ onLoadFile }) => {
  const [error, setError] = useState();
  const onChange = (event) => {
    const files = event.currentTarget.files;
    if (!files || files?.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        console.log(jsonData);
        onLoadFile(jsonData);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    reader.readAsText(file);
  };
  return html`
    <div>
      <input type="file" accept="application/json" onChange=${onChange} />
      ${error && html`<pre>${String(error)}</pre>`}
    </div>
  `;
};

render(html`<${App} />`, document.getElementById("app"));

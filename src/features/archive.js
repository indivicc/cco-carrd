export function initArchive() {
  const archiveContainer = document.getElementById('print-archive');
  if (!archiveContainer) return;

  const style = document.createElement('style');
  style.textContent = `
    #print-archive {
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .print-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 40px;
    }

    .print-card {
      background: white;
      padding: 20px;
      border: 1px solid rgba(56, 86, 221, 0.1);
    }

    .print-image {
      position: relative;
      padding-bottom: 100%;
      margin-bottom: 20px;
    }

    .print-image svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .print-info {
      text-align: center;
      font-family: "Times New Roman, serif";
    }

    .print-info h3 {
      color: #3856DD;
      font-weight: normal;
      margin: 0 0 10px;
    }

    .print-date {
      color: rgba(56, 86, 221, 0.6);
      font-size: 0.9em;
      margin: 0 0 15px;
    }

    .verification-code {
      font-family: monospace;
      color: #3856DD;
      font-size: 0.9em;
      padding: 5px 10px;
      background: rgba(56, 86, 221, 0.05);
      display: inline-block;
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);

  async function loadArchive() {
    try {
      const response = await fetch('https://cco-six.vercel.app/api/sold-prints');
      const data = await response.json();

      if (!data.prints || data.prints.length === 0) {
        archiveContainer.innerHTML = '<p>No prints available.</p>';
        return;
      }

      const printGrid = document.createElement('div');
      printGrid.className = 'print-grid';

      data.prints.forEach(print => {
        const printCard = document.createElement('div');
        printCard.className = 'print-card';

        const soldDate = new Date(print.sold_at).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        printCard.innerHTML = `
          <div class="print-image">
            ${print.svg}
          </div>
          <div class="print-info">
            <h3>N°${String(print.unit_number).padStart(4, '0')}</h3>
            <p class="print-date">Sold ${soldDate}</p>
            <p class="verification-code">${print.verification_code}</p>
          </div>
        `;

        printGrid.appendChild(printCard);
      });

      archiveContainer.innerHTML = printGrid.outerHTML;
    } catch (error) {
      console.error('Error loading archive:', error);
      archiveContainer.innerHTML = '<p>Error loading prints.</p>';
    }
  }

  // Load the archive when the function is called
  loadArchive();
}
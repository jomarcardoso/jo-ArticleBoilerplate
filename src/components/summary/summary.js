import React, { useEffect, useState } from 'react';

function generateIndexNumber({
  lastIndex = [0, 0, 0, 0, 0],
  newIndexType = 'H1',
} = {}) {
  if (newIndexType === 'H1') {
    return [(lastIndex[0] += 1), 0, 0, 0, 0];
  }

  if (newIndexType === 'H2') {
    return [lastIndex[0], (lastIndex[1] += 1), 0, 0, 0];
  }

  if (newIndexType === 'H3') {
    return [lastIndex[0], lastIndex[1], (lastIndex[2] += 1), 0, 0];
  }

  if (newIndexType === 'H4') {
    return [lastIndex[0], lastIndex[1], lastIndex[2], (lastIndex[3] += 1), 0];
  }

  if (newIndexType === 'H5') {
    return [
      lastIndex[0],
      lastIndex[1],
      lastIndex[2],
      lastIndex[3],
      (lastIndex[4] += 1),
    ];
  }
}

export default function Summary({ loaded }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (loaded) {
      const _elHeadings = Array.from(
        document.querySelectorAll(`
          .development h1,
          .development h2,
          .development h3,
          .development h4,
          .development h5
      `)
      );

      const formmated = _elHeadings.reduce((prev, elHeading, i) => {
        const lastIndex = prev[i - 1]?.index ?? [0, 0, 0, 0, 0];

        const index = generateIndexNumber({
          lastIndex: [...lastIndex],
          newIndexType: elHeading.tagName,
        });

        const title = `${index.filter((i) => i !== 0).join('.')} ${
          elHeading.innerHTML
        }`;

        elHeading.innerHTML = title;

        return [
          ...prev,
          {
            index,
            title,
          },
        ];
      }, []);

      console.log(formmated);

      setHeadings(formmated);
    }
  }, [loaded]);

  return (
    <section className="page summary">
      <h1>Sumário</h1>
      {headings.map((heading, index) => (
        <div key={`${heading.title}${index}`}>{heading.title}</div>
      ))}
    </section>
  );
}

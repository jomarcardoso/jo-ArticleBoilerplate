import React, { useEffect, useState } from 'react';

function generateIndexNumber({
  lastIndex = [0, 0, 0, 0, 0],
  newIndexType = 'H1',
} = {}) {
  if (newIndexType === 'H1') {
    return [lastIndex[0]++, 0, 0, 0, 0];
  }

  if (newIndexType === 'H2') {
    return [lastIndex[0], lastIndex[1]++, 0, 0, 0];
  }

  if (newIndexType === 'H3') {
    return [lastIndex[0], lastIndex[1], lastIndex[2]++, 0, 0];
  }

  if (newIndexType === 'H4') {
    return [lastIndex[0], lastIndex[1], lastIndex[2], lastIndex[3]++, 0];
  }

  if (newIndexType === 'H5') {
    return [
      lastIndex[0],
      lastIndex[1],
      lastIndex[2],
      lastIndex[3],
      lastIndex[4]++,
    ];
  }
}

export default function Summary({ loaded }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (loaded) {
      const _elHeadings = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5')
      );
      let lastIndex = [0, 0, 0, 0, 0];

      const formmated = _elHeadings.map((elHeading) => {
        let index = [];

        return {
          index: generateIndexNumber({
            lastIndex,
            newIndexType: elHeading.tagName,
          }),
          title: elHeading.innerHTML,
        };
      });

      setHeadings(formmated);
    }
  }, [loaded]);

  return (
    <section className="page summary">
      <h1>Sumário</h1>
      {headings.map((heading, index) => (
        <div key={`${heading.title}${index}`}>
          {heading.index.filter((i) => i !== 0).join('.')} {heading.title}
        </div>
      ))}
    </section>
  );
}

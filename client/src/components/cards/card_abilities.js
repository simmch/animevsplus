import React from 'react';

const parseBoldText = (text) => {
    // Split the text by '**', and then map through the pieces
    return text.split(/\*\*(.*?)\*\*/g).map((part, index) => {
      // If the index is odd, the part is between '**' (bold)
      return index % 2 === 1 ? <strong key={index}>{part}</strong> : part;
    });
  };
  
  const parseResponse = (response) => {
    // Split the response into paragraphs
    const paragraphs = response.split('\n\n');
  
    // Map the paragraphs to JSX elements
    return paragraphs.map((paragraph, index) => {
      // Check if the paragraph is a list item
      if (paragraph.match(/^\d\. \*\*(.+?)\*\*:/)) {
        // Split the paragraph into list items
        const items = paragraph.split('\n').filter(line => line);
        return (
          <li key={index}>
            {items.map((item, itemIndex) => {
              // Parse the item for bold text
              return <div key={itemIndex}>{parseBoldText(item)}</div>;
            })}
          </li>
        );
      } else {
        // Parse the paragraph for bold text
        return <p key={index}>{parseBoldText(paragraph)}</p>;
      }
    });
  };
  
  const CardAbilities = ({ response }) => {
    return (
      <div>
        <ul>
          {parseResponse(response)}
        </ul>
      </div>
    );
  };
  
  export default CardAbilities;
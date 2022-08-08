import React, { useState } from 'react';


export default function Categories({categories}) {

  const [catIndex, setCatIndex] = useState(0);

  const handleCategories = (index) => {
    setCatIndex(index);
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, index) => 
            <li 
              key={index} 
              onClick={() => handleCategories(index)}
              className={index === catIndex ? "active" : null}>
                {item}
            </li>
          )
        }

      </ul>
    </div>
  )
}

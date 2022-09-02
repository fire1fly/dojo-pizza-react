import React, { useState, useEffect } from 'react';

export default function Pagination({count, step, setStep}) {

  let pagList = [];

  pagList = Array(count).fill('').map((_, index) => index + 1);

  console.log(step);

  function handleStep(flag) {
    if (flag === "prev" && step > 1) {
      setStep(prev => prev - 1);
    }
    if (flag === "next" && step < count) {
      setStep(prev => prev + 1);
    }
  }

  return (
    <div className="pag">
      <div className="pag-item pag__prev" onClick={() => handleStep("prev")}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5,22a1,1,0,0,1-.71-.29l-9-9a1,1,0,0,1,0-1.42l9-9a1,1,0,1,1,1.42,1.42L6.91,12l8.3,8.29a1,1,0,0,1,0,1.42A1,1,0,0,1,14.5,22Z"/>
        </svg>
      </div>
      <div className="pag__inner">
        {
          pagList
          .filter(item => {
            if (item === step + 1 || 
                item === step + 2 || 
                item === step || 
                item === step - 1|| 
                item === step - 2) {
              return true;
            }
          })
          .map((item, index) => 
            <div
              key={index} 
              className={`pag-item ${step === item ? "active" : ""}`}
              onClick={() => setStep(item)}
            >
              {item}
            </div>
          )
        }
      </div>
      <div className="pag-item pag__next" onClick={() => handleStep("next")}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5,22a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L17.09,12,8.79,3.71a1,1,0,0,1,1.42-1.42l9,9a1,1,0,0,1,0,1.42l-9,9A1,1,0,0,1,9.5,22Z"/>
        </svg>
      </div>
    </div>
  )
}

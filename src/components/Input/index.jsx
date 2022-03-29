import React from 'react';
import './Input.scss';

function Input() {
  return(
    <div className="submit-container">
      <textarea className="submit-container__textarea" placeholder="Escribe tu mensaje..."/>
      <button className="submit-container__submit" type="submit">Enviar</button>
    </div>
  );
}

export { Input };

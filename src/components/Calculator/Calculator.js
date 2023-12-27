import { Button } from 'antd';
import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [expression, setExpression] = useState([]);

  const handleClick = (value) => {
    setDisplay(value);
    setExpression([...expression, value]);
  };

  const handleClear = () => {
    setDisplay('');
    setExpression('');
  };

  const handleResult = () => {
    const result = expression
      .join('')
      .split(/(\D)/g)
      .map((value) => (value.match(/\d/g) ? parseInt(value, 0) : value))
      .reduce((acc, value, index, array) => {
        switch (value) {
          case '+':
            return (acc += array[index + 1]);
          case '-':
            return (acc -= array[index + 1]);
          case 'x':
            return (acc *= array[index + 1]);
          case '÷':
            return (acc /= array[index + 1]);
          default:
            return acc;
        }
      });
    setDisplay(result);
    setExpression('');
  };

  return (
    <div className='App'>
      <h3 className='display'>{display}</h3>
      <span className='expression'>{expression}</span>
      <section className='panel'>
        <section className='numbers'>
          <Button onClick={() => handleClick(7)}>7</Button>
          <Button onClick={() => handleClick(8)}>8</Button>
          <Button onClick={() => handleClick(9)}>9</Button>
          <Button onClick={() => handleClick(4)}>4</Button>
          <Button onClick={() => handleClick(5)}>5</Button>
          <Button onClick={() => handleClick(6)}>6</Button>
          <Button onClick={() => handleClick(1)}>1</Button>
          <Button onClick={() => handleClick(2)}>2</Button>
          <Button onClick={() => handleClick(3)}>3</Button>
          <Button className='red-calc' onClick={() => handleClear()}>
            C
          </Button>
          <Button onClick={() => handleClick(0)}>0</Button>
          <Button onClick={() => handleResult()}>=</Button>
        </section>
        <section className='operators'>
          <Button onClick={() => handleClick('÷')}>÷</Button>
          <Button onClick={() => handleClick('x')}>x</Button>
          <Button onClick={() => handleClick('-')}>-</Button>
          <Button onClick={() => handleClick('+')}>+</Button>
        </section>
      </section>
    </div>
  );
};
export default Calculator;

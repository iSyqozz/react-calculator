import { useState,useEffect } from 'react'
import Title from "./components/title"
import Screen from './components/Screen'
import styles from "./style.css"
import Button from './components/Button'

const buttons = ['AC', '÷', '×', 'DEL', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '.', '0', '%']
const limit = 14


const App = () => {
  const [Expression, setExpression] = useState('0');
  const [Op, setOp] = useState('#');
  const [CurrVal, setCurrVal] = useState('0')
  const [PostOp,setPostOp] = useState(false);


  useEffect(() => {
    console.log(CurrVal);
    console.log(Expression);
    console.log(Op);
  }, [CurrVal, Expression, Op]);


  function update_screen(val) {
    if(['+','-','×','÷','%'].includes(val) && val !== ''){
      setOp(val);
      setExpression(CurrVal+val); 
      setPostOp(true);
    }else if(val === '='){
      if (Op === '#'){
        return val
      }

      const arr = Expression.split('');
      const lastEle = arr[arr.length-1]
      if (lastEle === '÷'){
        arr[arr.length-1] = '/'
      }else if(lastEle === '×'){
        arr[arr.length-1] = '*'
      }

      const updatedExp = arr.join(''); 
        
      setOp('#');
      setExpression('0');
      setPostOp(true)
      setCurrVal(eval(updatedExp+CurrVal).toString().substring(0,14));
    
    }else if(val === '.'){
      if (!CurrVal.includes('.')){
        setCurrVal(prev=>prev+'.') 
      }
    }
    else{
      setCurrVal((prev => {
        if (val === 'AC') {
          setOp('#')
          setExpression('0')
          return '0'
        } else if (val === 'DEL') {
          if (prev.length === 1) {
            return '0'
          } else {
            return prev.slice(0, -1)
          }
        }else if(prev === '0' || PostOp) {
          setPostOp(false)
          return val
        }else{
          if (prev.length<14){
            return prev + val
          }else{
            return prev
          }
        }
      }));
    }
  }

  return (
    <>
      <Title />
      <div className='mid-section'>
        <div className='calc-wrapper'>
          <Screen val={CurrVal} />
          {buttons.map(((symbol) => {
            return (
              <Button
                key={symbol}
                symbol={symbol}
                onClick={() => { update_screen(symbol) }}
                choosen={Op}
              />
            )
          }))}
        </div>
      </div>
    </>
  )
}

export default App
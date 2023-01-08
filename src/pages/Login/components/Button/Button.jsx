/* import React from 'react'
import { Button } from 'semantic-ui-react'
import "../Button/Button.css"

const ButtonI = () => (
  <div className='Button1'>
    <Button className='Button2'>Ingresar</Button>
  </div>
)

export default ButtonI;
 */

import React from 'react'
import { Button } from 'antd';
//import { SizeType } from 'antd/es/config-provider/SizeContext';
import "../Button/Button.css"

const ButtonI = () => {
  //const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  return (
          <Button className='Button2' type="submit" shape="round" size="large" style={{ backgroundColor: '#1677ff', width: '250px', color: '#fff'}}>
            INGRESAR
          </Button>
  );
};

export default ButtonI;
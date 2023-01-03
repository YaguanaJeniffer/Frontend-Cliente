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
    <>
      <div direction="vertical" className='Button1'>
          <Button className='Button2' type="primary" shape="round" size="large" style={{ backgroundColor: '#1677ff', width: '250px' }}>
            INGRESAR
          </Button>
      </div>
    </>
  );
};

export default ButtonI;
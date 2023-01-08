/* import React from 'react'
import { Input } from 'semantic-ui-react'
import '../Input/Input.css';
const InputT = () => {
  return (
  <div className='Text'>
    <Input icon='users' iconPosition='left' placeholder='Usuario' />
    </div>
  );
};

export default InputT; */

import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import '../Input/Input.css';

const InputT= () => (
  <>
    <Input className='Text' placeholder="Correo" prefix={<UserOutlined />} />
  </>
);

export default InputT;

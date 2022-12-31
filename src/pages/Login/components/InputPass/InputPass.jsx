/* import React from "react";
import { Input } from 'semantic-ui-react';
import '../InputPass/InputPass.css';

const InputPass = () => {
  return (
    <div className="Text">
      <Input icon='lock' iconPosition='left' type="password" placeholder='Contraseña'/>
    </div>
  );
};

export default InputPass; */


import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import '../InputPass/InputPass.css';
import { LockOutlined } from '@ant-design/icons';

const InputPass= () => {
  //const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Space direction="vertical">
      
      <Input.Password className="Text"
        placeholder="Contraseña"
        prefix={<LockOutlined />}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />  
      </Space>
  );
};

export default InputPass;

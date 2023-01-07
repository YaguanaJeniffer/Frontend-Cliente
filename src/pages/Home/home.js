import React from "react";
import { Button } from 'antd';

class Home extends React.Component {
    render() {
        return (
            <Button className='Button2' type="submit" shape="round" size="large" style={{ backgroundColor: '#1677ff', width: '250px', color: '#fff'}}>
            Home
          </Button>
        );
    }
}
export default Home;
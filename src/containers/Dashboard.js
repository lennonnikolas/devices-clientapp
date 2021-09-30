import React, {useState, useEffect} from 'react';

import Card from '../components/card';
import Header from '../components/header';
import Body from '../components/body';

import '../css/dashboard.css';

const Dashboard = () => {
  const [serverInformation, setServerInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/devices')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setIsLoading(false);
          setServerInformation(data);
        })
        .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className='container'>
      <Header>Server Information Dashboard</Header>
      <Body>
        {
          isLoading ?
            'Loading...' :
            serverInformation && serverInformation.map((serverInfo) =>
              <Card
                key={serverInfo.id}
                id={serverInfo.id}
                title={`System name: ${serverInfo.system_name}`}
                subTitle={`System type: ${serverInfo.type}`}
                metaData={`Size: ${serverInfo.hdd_capacity} GB`}
              />)
        }
      </Body>
    </div>
  );
};

export default Dashboard;

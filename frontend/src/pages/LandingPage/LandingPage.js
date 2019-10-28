import React from 'react';
import { Typography } from 'antd';
import Center from '../../components/Center/Center';

function LandingPage() {
  return (
    <Center>
      <div>
        <Typography.Title>
          Vampire Pty Ltd
        </Typography.Title>
        <Typography.Paragraph>
          Hippity hoppity we're coming for your blood
        </Typography.Paragraph>
      </div>
    </Center>
  );
}

export default LandingPage;

/*
  Copyright 2020 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { runMockRenderTests } from '@lowdefy/block-tools';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Switch } from 'antd';

Enzyme.configure({ adapter: new Adapter() });
import Block from '../src/blocks/Switch/Switch';
import examples from '../demo/examples/Switch.yaml';
import meta from '../src/blocks/Switch/Switch.json';

jest.mock('antd/lib/switch', () => {
  const comp = jest.fn(() => 'mocked');
  return comp;
});

const mocks = [
  {
    name: 'default',
    fn: Switch,
  },
];

runMockRenderTests({ examples, Block, meta, mocks, enzyme: { mount } });

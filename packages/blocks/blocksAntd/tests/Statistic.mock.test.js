/*
  Copyright 2020-2021 Lowdefy, Inc

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
import { Statistic } from 'antd';

Enzyme.configure({ adapter: new Adapter() });
import StatisticBlock from '../src/blocks/Statistic/Statistic';
import examples from '../demo/examples/Statistic.yaml';
import meta from '../src/blocks/Statistic/Statistic.json';

jest.mock('antd/lib/statistic', () => {
  return jest.fn((props) => props.toString());
});

const mocks = [
  {
    name: 'default',
    fn: Statistic,
  },
];

runMockRenderTests({ examples, Block: StatisticBlock, meta, mocks, enzyme: { mount } });

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

import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { blockDefaultProps } from '@lowdefy/block-tools';
import { type } from '@lowdefy/helpers';

import Label from '../Label/Label';
import Icon from '../Icon/Icon';
import disabledDate from '../../disabledDate';

const MonthPicker = DatePicker.MonthPicker;

const MonthSelector = ({
  blockId,
  events,
  loading,
  methods,
  properties,
  required,
  validation,
  value,
}) => {
  return (
    <Label
      blockId={blockId}
      events={events}
      properties={{ title: properties.title, size: properties.size, ...properties.label }}
      validation={validation}
      required={required}
      loading={loading}
      content={{
        content: () => (
          <div className={methods.makeCssClass({ width: '100%' })}>
            <div id={`${blockId}_popup`} />
            <MonthPicker
              id={`${blockId}_input`}
              autoFocus={properties.autoFocus}
              getPopupContainer={() => document.getElementById(`${blockId}_popup`)}
              className={methods.makeCssClass([{ width: '100%' }, properties.inputStyle])}
              disabled={properties.disabled}
              allowClear={properties.allowClear !== false}
              placeholder={properties.placeholder || 'Select Month'}
              format={properties.format || 'YYYY-MM'}
              size={properties.size}
              suffixIcon={
                properties.suffixIcon && (
                  <Icon
                    blockId={`${blockId}_suffixIcon`}
                    events={events}
                    properties={properties.suffixIcon || 'CalendarOutlined'}
                  />
                )
              }
              disabledDate={disabledDate(properties.disabledDates)}
              onChange={(newVal) => {
                methods.setValue(
                  !newVal
                    ? null
                    : moment
                        .utc(newVal.add(newVal.utcOffset(), 'minutes'))
                        .startOf('month')
                        .toDate()
                );
                methods.triggerEvent({ name: 'onChange' });
              }}
              value={type.isDate(value) ? moment.utc(value).startOf('month') : null}
            />
          </div>
        ),
      }}
    />
  );
};

MonthSelector.defaultProps = blockDefaultProps;

export default MonthSelector;

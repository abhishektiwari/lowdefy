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

import createPrint from './print';

function errorBoundary(fn, options = {}) {
  async function run(...args) {
    try {
      const res = await fn(...args);
      return res;
    } catch (error) {
      const print = createPrint();
      print.error(error.message);
      if (!options.stayAlive) {
        process.exit();
      }
    }
  }
  return run;
}

export default errorBoundary;
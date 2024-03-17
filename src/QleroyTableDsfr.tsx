/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { QleroyTableDsfrProps, QleroyTableDsfrStylesProps } from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<QleroyTableDsfrStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function QleroyTableDsfr(props: QleroyTableDsfrProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width, tableSummary, tableBordered } = props;
  console.group("data");
  data.forEach(item => {
    for (let key in item) {
      console.log(`${key}: ${item[key]}`);
    }
  })
  console.groupEnd();

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  console.log('Plugin props', props);

  const tableClassname = tableBordered ? "fr-table fr-table--bordered" : "fr-table";

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <div className={tableClassname}>
        <table>
          <caption>{tableSummary}</caption>
          <thead>
            <tr>
              {Object.keys(data[0]).map(col =>
              (
                <th scope="col">{col}</th>
              )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map(item =>
            (
              <tr>
                {
                  Object.values(item).map(col =>
                  (
                    <td>{col}</td>
                  )
                  )}
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
    </Styles>
  );
}

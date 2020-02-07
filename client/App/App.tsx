import React, { Component } from 'react';
import s from './App.module.css';

import { Container } from '@trutoo/ui-core';

interface Props {}

/**
 * Basic tapp used as an example for bootstrapping.
 */
export class App extends Component<Props> {
  render() {
    return <Container className={`${s.app} tu-elevation-1`}>Web</Container>;
  }
}

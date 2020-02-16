import React, { Component } from 'react';
import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';
import { Container } from '@trutoo/ui-core';

import s from './page.module.css';

import APIUtil from 'utils/api';
import { Tapp, TappProps } from 'components/Tapp/Tapp';
import { TappHeader } from 'components/TappHeader/TappHeader';
import { Header } from 'components/Header/Header';

interface Props {
  tapp: TappProps;
}

export default class Page extends Component<Props> {
  static async getInitialProps(ctx: NextPageContext) {
    const { req, query } = ctx;
    const tapp = await fetch(APIUtil.toAbsolute(`/api/tapps/${query.id}`, req)).then(res => res.json());
    return { tapp };
  }

  render() {
    return (
      <div className={s.page}>
        <Header className={s.header} />
        <TappHeader {...this.props.tapp} />
        <Container>
          <div className={`${s.card} tu-elevation-8`}>
            <Tapp {...this.props.tapp} />
          </div>
        </Container>
      </div>
    );
  }
}

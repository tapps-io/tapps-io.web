import React, { Component } from 'react';
import { NextPageContext, NextPage } from 'next';
import fetch from 'isomorphic-unfetch';
import { Container } from '@trutoo/ui-core';

import s from './page.module.css';

import APIUtil from 'utils/api';
import { Tapp, TappProps } from 'components/Tapp/Tapp';
import { TappHeader } from 'components/TappHeader/TappHeader';
import { Header } from 'components/Header/Header';
import { withApollo } from 'lib/apollo';

interface Props {
  tapp: TappProps;
}

class Page extends Component<Props> {
  static async getInitialProps(ctx: NextPageContext) {
    const { req, query } = ctx;
    const tapp = await fetch(APIUtil.toAbsolute(`/api/tapps/${query.id}`, req)).then(res => res.json());
    console.log(tapp);
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

const page = ({ tapp }: Props) => (
  <div className={s.page}>
    <Header className={s.header} />
    <TappHeader {...tapp} />
    <Container>
      <div className={`${s.card} tu-elevation-8`}>
        <Tapp {...tapp} />
      </div>
    </Container>
  </div>
);

page.getInitialProps = async (ctx: NextPageContext) => {
  const { req, query } = ctx;
  //await fetch(APIUtil.toAbsolute(`/api/tapps/${query.id}`, req)).then(res => res.json());
  return { tapp: {} as any };
};

export default withApollo<Props>(page)({ ssr: true });

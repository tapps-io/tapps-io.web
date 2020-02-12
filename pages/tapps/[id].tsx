import React, { Component } from 'react';
import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';

import { Tapp, TappProps } from 'components/Tapp/Tapp';
import APIUtil from 'utils/api';

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
    return <Tapp {...this.props.tapp} />;
  }
}

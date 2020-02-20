import React from 'react';
import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';
import { Container } from '@trutoo/ui-core';

import s from './page.module.css';

import { Tapp } from 'components/Tapp/Tapp';
import { TappHeader } from 'components/TappHeader/TappHeader';
import { Header } from 'components/Header/Header';
import { withApollo } from 'lib/apollo';
import { GetTappsDocument, GetTappsQuery } from 'generated/graphql';
import { FragmentUtil } from 'utils/fragment';

interface TappFragment {
  tapp: string;
  semver: string;
  version: string;
  prerender: string;
  title: string;
  description?: string | null;
  author?: string | { name?: string; email?: string; url?: string };
  contributors?: (string | { name?: string; email?: string; url?: string })[];
  license?: string;
  repository?: string;
  bugs?: string;
  scripts: string[];
  styles: string[];
  sponsor?: {
    name: string;
    link: string;
  } | null;
  categories?:
    | ({
        name: string;
      } | null)[]
    | null;
}

interface Props {
  tapp: TappFragment | null;
}

const page = ({ tapp }: Props) =>
  !tapp ? (
    <div>Failed to load tapp</div>
  ) : (
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
  try {
    const tappData = await ctx.apolloClient
      ?.query<GetTappsQuery>({ query: GetTappsDocument })
      .then(res => res.data?.tapps?.[0]);

    if (!tappData) throw new Error(`Failed to load tapp data from ${process.env.CMS}`);

    const tappFragment = await fetch(
      `${process.env.GATEWAY}/fragments/tapps-io$tapp.${tappData.tapp}@${tappData.semver}`,
    ).then(res => {
      return res.text().then(prerender => ({
        ...tappData,
        prerender,
        version: res.headers.get('x-version') || '0.0.0',
        ...FragmentUtil.splitLink(res.headers.get('link') || ''),
      }));
    });

    const tapp = await fetch(
      `${process.env.GATEWAY}/fragments/tapps-io$tapp.${tappData.tapp}@${tappFragment.version}/package.json`,
    ).then(res => {
      return res.json().then(metadata => ({
        ...tappFragment,
        description: tappFragment.description || metadata.description,
        author: metadata.author,
        license: metadata.license,
        contributors: metadata.contributors,
        repository: metadata.repository,
        bugs: metadata.bugs,
        dependencies: metadata.dependencies,
      }));
    });

    return { tapp };
  } catch (err) {
    console.warn(err);
    return { tapp: null };
  }
};

export default withApollo<Props>(page)({ ssr: true });

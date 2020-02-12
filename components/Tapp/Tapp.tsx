import React from 'react';
import { Container, Grid } from '@trutoo/ui-core';

import s from './Tapp.module.css';

import useScript from 'hooks/useScript';
import useStyle from 'hooks/useStyle';

export interface TappProps {
  prerender: string;
  title: string;
  version: string;
  description?: string;
  packages?: string;
  licenses?: string;
  scripts?: string[];
  styles?: string[];
}

/**
 * Basic tapp used as an example for bootstrtapping.
 */
export function Tapp({ prerender, title, description, version, packages, licenses, scripts, styles }: TappProps) {
  if (scripts) useScript(...scripts);
  if (styles) useStyle(...styles);
  return (
    <Container className={`${s.tapp} tu-elevation-1`}>
      <Grid columns={[1, 1, 2]}>
        <div dangerouslySetInnerHTML={{ __html: prerender }} />
        <article>
          <h2>{title}</h2>
          <h3>version {version}</h3>
          <p>{description}</p>
        </article>
      </Grid>
    </Container>
  );
}

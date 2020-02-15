import React from 'react';
import { Grid } from '@trutoo/ui-core';

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
    <Grid className={`${s.tapp}`} columns={[1, 1, 2]}>
      <div dangerouslySetInnerHTML={{ __html: prerender }} />
      <article>
        <p>{description}</p>
      </article>
    </Grid>
  );
}

import React, { useState } from 'react';
import { Grid } from '@trutoo/ui-core';
import { Icon } from '@trutoo/ui-icons';

import s from './Tapp.module.css';

import useScript from 'hooks/useScript';
import useStyle from 'hooks/useStyle';

export interface TappProps {
  prerender: string;
  title: string;
  version: string;
  description?: string | null;
  author?: string | { name?: string; email?: string; url?: string };
  contributors?: (string | { name?: string; email?: string; url?: string })[];
  dependencies?: { [name: string]: string };
  licenses?: string;
  scripts?: string[];
  styles?: string[];
}

/**
 * Basic tapp used as an example for bootstrtapping.
 */
export function Tapp({ prerender, description, author, contributors, dependencies, scripts, styles }: TappProps) {
  if (scripts) useScript(...scripts);
  if (styles) useStyle(...styles);

  return (
    <article className={`${s.tapp}`}>
      <Grid columns={[1, 1, 2]}>
        <section dangerouslySetInnerHTML={{ __html: prerender }} />
        <section className={s.metadata}>
          <h3>Description</h3>
          <p>{description}</p>
          <h3>Contributors</h3>
          <p>
            {typeof author == 'object' ? author.name : author} |{' '}
            {contributors
              ?.map(contributor => (typeof contributor == 'object' ? contributor.name : contributor))
              .join(', ')}
          </p>
          <h3>Project</h3>
          <a>Repository</a> | <a>Issues</a>
          {dependencies ? (
            <>
              <table className={s.dependencies}>
                <thead>
                  <tr>
                    <th>Package</th>
                    <th>Version</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(dependencies).map(([name, version]) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{version}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            false
          )}
        </section>
      </Grid>
    </article>
  );
}

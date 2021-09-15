import React, { useState, ReactNode } from 'react';
import { Icon } from '@trutoo/ui-icons';

import s from './Tapp.module.css';

import useScript from 'hooks/useScript';
import useStyle from 'hooks/useStyle';

export type Person = string | { name?: string; email?: string; url?: string };
export type Repository = string | { type?: string; directory?: string; url?: string };
export type Issues = string | { email?: string; url?: string };

export interface TappProps {
  prerender: string;
  title: string;
  version: string;
  description?: string | null;
  author?: Person;
  contributors?: Person[];
  dependencies?: { [name: string]: string };
  licenses?: string;
  repository?: Repository;
  issues?: Issues;
  scripts?: string[];
  styles?: string[];
}

const personRender = (person: Person) =>
  typeof person == 'string' ? (
    person
  ) : (
    <a key={person.name} href={person.url || (person.email && `mailto:${person.email}`)}>
      {person.name}
    </a>
  );

const repositoryRender = (repository: Repository) =>
  typeof repository == 'string' ? <a href={repository}>Repository</a> : <a href={repository.url}>Repository</a>;

const issuesRender = (issues: Issues) =>
  typeof issues == 'string' ? <a href={issues}>Issues</a> : <a href={issues.url}>Issues</a>;

export function Tapp({
  prerender,
  title,
  description,
  author,
  contributors,
  dependencies,
  repository,
  issues,
  scripts,
  styles,
}: TappProps) {
  if (scripts) useScript(...scripts);
  if (styles) useStyle(...styles);
  const [metadataShown, showMetadata] = useState(false);

  return (
    <article className={`${s.tapp}`}>
      <header className={`${s.header}`}>
        <a
          className={`${s.more}`}
          aria-controls="metadata"
          aria-expanded={metadataShown}
          onClick={() => showMetadata(!metadataShown)}>
          {metadataShown ? <Icon id="close" /> : <Icon id="question" />}
        </a>
        <h2>{title}</h2>
      </header>
      <section className={s.app} dangerouslySetInnerHTML={{ __html: prerender }} aria-hidden={metadataShown} />
      <section id="metadata" className={s.metadata} aria-hidden={!metadataShown}>
        <h3>Contributors</h3>
        <p>
          {author ? personRender(author) : 'No'} |{' '}
          {contributors?.map(personRender).reduce((acc, x) => (acc === null ? [x] : [acc, ' | ', x]), [] as ReactNode)}
        </p>
        <h3>Project</h3>
        {repository && repositoryRender(repository)} | {issues && issuesRender(issues)}
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
    </article>
  );
}

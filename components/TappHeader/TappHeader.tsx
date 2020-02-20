import React from 'react';

import s from './TappHeader.module.css';
import { Container } from '@trutoo/ui-core';

interface Props {
  title: string;
  version: string;
  license?: string;
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

export function TappHeader({ title, version, license, categories, sponsor }: Props) {
  return (
    <section className={s.tappHeader}>
      <Container className={s.container}>
        <nav className={s.breadcrumbs} aria-label="breadcrumb">
          <ol>
            <li>
              <a>Dashboard</a>
            </li>
            {categories?.map(category =>
              category ? (
                <li className={s.category} key={category.name}>
                  <a>{category.name}</a>
                </li>
              ) : (
                false
              ),
            )}
            <li className={s.category} aria-current="page">
              <span>{title}</span>
            </li>
          </ol>
        </nav>
        <ul className={s.bubbles}>
          <li className={s.bubble}>Version {version}</li>
          <li className={s.bubble}>{license}</li>
          <li className={s.bubble}>{sponsor?.name}</li>
        </ul>
        <h1 className={s.title}>{title}</h1>
      </Container>
    </section>
  );
}

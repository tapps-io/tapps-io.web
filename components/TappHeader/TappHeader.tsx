import React from 'react';

import s from './TappHeader.module.css';
import { Container } from '@trutoo/ui-core';

interface Props {
  title: string;
  version: string;
}

export function TappHeader({ title, version }: Props) {
  return (
    <section className={s.tappHeader}>
      <Container className={s.container}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.info}>Version {version}</p>
      </Container>
    </section>
  );
}

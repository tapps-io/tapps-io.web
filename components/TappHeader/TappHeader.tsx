import React from 'react';

import s from './TappHeader.module.css';
import { Container } from '@trutoo/ui-core';
import { GetTappsComponent } from 'generated/graphql';

interface Props {
  title: string;
  version: string;
}

export function TappHeader({ title, version }: Props) {
  return (
    <section className={s.tappHeader}>
      <Container className={s.container}>
        <GetTappsComponent variables={{ tapp: 'color-contrast' }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading</div>;
            const tapp = data?.tapps?.[0];
            if (error || !tapp) return <p className="error">Error loading tapp.</p>;
            return (
              <>
                <h1 className={s.title}>{tapp.title}</h1>
                <p className={s.info}>{tapp.description}</p>
                <p className={s.info}>{tapp.sponsor?.title}</p>
                <p className={s.info}>Version {tapp.semver}</p>
              </>
            );
          }}
        </GetTappsComponent>
      </Container>
    </section>
  );
}

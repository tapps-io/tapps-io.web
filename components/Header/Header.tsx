import React from 'react';
import { Container } from '@trutoo/ui-core';

import s from './Header.module.css';

export interface HeaderProps {
  className?: string;
}

/**
 * Basic header used as an example for bootstrheadering.
 */
export function Header({ className }: HeaderProps) {
  return (
    <header className={`${className} ${s.header}`}>
      <Container>
        <a className={s.logo} href="/">
          <img src="/images/logo-white.svg" />
          tapps.io
        </a>
      </Container>
    </header>
  );
}

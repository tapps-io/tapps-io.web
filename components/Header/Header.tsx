import React from 'react';
import { Container } from '@trutoo/ui-core';

import s from './Header.module.css';

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const toggleDark = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', theme == 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`${className} ${s.header}`}>
      <Container>
        <a className={s.darkMode} onClick={toggleDark}>
          🌙
        </a>
        <a className={s.logo} href="/">
          <img src="/images/logo-white.svg" />
          tapps.io
        </a>
      </Container>
    </header>
  );
}

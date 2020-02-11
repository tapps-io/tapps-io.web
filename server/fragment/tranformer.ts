import { HTMLElement } from 'node-html-parser';
import { Fragment } from './fragment';

import { Transformer } from '../utils/transformations';

export class FragmentTransformer implements Transformer {
  private fragments = new Map<string, Fragment>();

  init(document: HTMLElement) {
    const roots = document.querySelectorAll('x-fragment');
    const fragments = [];
    roots.forEach(root => {
      if (!root.hasAttribute('src')) throw 'Fragment must have a src attribute';
      const fragment = new Fragment(root, root.getAttribute('src')!);
      fragment.init(root);
      fragments.push(fragment);
    });
  }

  run(document: HTMLElement): Promise<HTMLElement> {
    return Promise.resolve(document);
  }
}

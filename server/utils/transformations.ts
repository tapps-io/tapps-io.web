import { parse, HTMLElement } from 'node-html-parser';

export interface Transformer {
  run: (document: HTMLElement) => Promise<HTMLElement>;
}

export class Transformations {
  private transformers = new Map<string, Transformer>();

  async run(content: string) {
    let document = parse(content) as HTMLElement;
    for (const [name, transformer] of this.transformers) {
      document = await transformer.run(document);
    }
    return document.toString();
  }

  registerParser(name: string, parser: Transformer) {
    this.transformers.set(name, parser);
  }
}

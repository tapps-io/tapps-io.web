import { HTMLElement } from 'node-html-parser';

export class Fragment {
  static REGEX_LINK = /<(.+)>; rel="(.*)"/;

  private scripts: HTMLScriptElement[] = [];
  private styles: HTMLLinkElement[] = [];

  constructor(private root: HTMLElement, private src: string) {
    this.fetch(this.src);
  }

  init(root: HTMLElement, data?: any) {
    console.log(root, data);
  }

  fetch(src: string) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', this.handleLoad.bind(this));
    xhr.addEventListener('error', this.handleError.bind(this));
    xhr.open('GET', src);
    xhr.send();
  }

  handleLoad(event: ProgressEvent) {
    const html = (event.target as XMLHttpRequest).response;
    const links = (event.target as XMLHttpRequest).getResponseHeader('link') || '';
    this.replaceFragment(html);
    this.attachLinks(links);
  }

  handleError(event: ProgressEvent) {
    console.warn((event.target as XMLHttpRequest).response);
  }

  attachLinks(references: string) {
    const links = references.split(',');
    links.forEach(link => {
      const match = link.match(Fragment.REGEX_LINK) || [];
      switch (match[2]) {
        case 'stylesheet':
          if (this.hasStyle(match[1])) return;
          const style = document.createElement('link');
          style.rel = 'stylesheet';
          style.href = match[1];
          document.head.appendChild(style);
          this.styles.push(style);
          break;
        case 'fragment-script':
          if (this.hasScript(match[1])) return;
          const script = document.createElement('script');
          script.src = match[1];
          document.head.appendChild(script);
          this.scripts.push(script);
          break;
      }
    });
  }

  hasStyle(url: string) {
    const links = document.getElementsByTagName('link');
    for (let i = links.length; i--; ) if (links[i].href.endsWith(url)) return true;
    return false;
  }

  hasScript(url: string) {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length; i--; ) if (scripts[i].src.endsWith(url)) return true;
    return false;
  }

  replaceFragment(html: string) {
    /*
    const root = document.createElement('div');
    root.innerHTML = html;
    if (this.root.parentElement) {
      this.root.parentElement.insertBefore(root, this.root);
      this.root.parentElement.removeChild(this.root);
    }
    this.root = root;
    */
  }
}

export class FragmentUtil {
  static REGEX_LINK = /<(.+)>; rel="(.*)"/;

  static splitLink(references: string) {
    const links = references.split(',');
    const result = {
      scripts: [] as string[],
      styles: [] as string[],
    };
    links.forEach(link => {
      const match = link.match(FragmentUtil.REGEX_LINK) || [];
      switch (match[2]) {
        case 'stylesheet':
          result.styles.push(`${process.env.GATEWAY}${match[1]}`);
          break;
        case 'fragment-script':
          result.scripts.push(`${process.env.GATEWAY}${match[1]}`);
          break;
      }
    });
    return result;
  }
}

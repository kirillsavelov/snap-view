import { BaseResourceEmbedder } from '@src/utils/BaseResourceEmbedder';

export class FontEmbedder extends BaseResourceEmbedder {
  public async embed(htmlElement: HTMLElement): Promise<void> {
    const fontFaceRules: string[] = await this.collectFontFaceRules();

    this.embedFontFaceRules(htmlElement, fontFaceRules);
  }

  private async collectFontFaceRules(): Promise<string[]> {
    const fontFaceRules: string[][] = await Promise.all(
      Array.from(document.styleSheets).map(
        (styleSheet: StyleSheet): Promise<string[]> =>
          this.extractFontFaceRules(styleSheet),
      ),
    );

    return fontFaceRules.flat();
  }

  private embedFontFaceRules(htmlElement: HTMLElement, rules: string[]): void {
    const styleElement: HTMLStyleElement = document.createElement('style');
    styleElement.textContent = rules.join('\n');

    htmlElement.insertBefore(styleElement, htmlElement.firstChild);
  }

  private async extractFontFaceRules(
    styleSheet: StyleSheet,
  ): Promise<string[]> {
    try {
      const rules: CSSRuleList = (styleSheet as CSSStyleSheet).cssRules;

      return Promise.all(
        Array.from(rules)
          .filter((rule: CSSRule): rule is CSSFontFaceRule =>
            this.isFontFaceRule(rule),
          )
          .map(
            (rule: CSSFontFaceRule): Promise<string> =>
              this.processFontFaceRule(
                rule,
                styleSheet.href || document.baseURI,
              ),
          ),
      );
    } catch (error) {
      console.error('Failed to access stylesheet:', styleSheet.href, error);

      return [];
    }
  }

  private isFontFaceRule(rule: CSSRule): rule is CSSFontFaceRule {
    return rule instanceof CSSFontFaceRule;
  }

  private async processFontFaceRule(
    rule: CSSFontFaceRule,
    baseUrl: string,
  ): Promise<string> {
    const match: RegExpMatchArray | null = rule.cssText.match(/src:\s*(.*?);/);

    if (!match || !match[1]) {
      return rule.cssText;
    }

    let srcValue: string = match[1];
    const urls: string[] = this.extractUrls(srcValue);

    for (const url of urls) {
      const dataUrl: string = url.startsWith('data:')
        ? url
        : await this.getDataUrl(url, baseUrl);

      srcValue = srcValue.replace(url, dataUrl);
    }

    return rule.cssText.replace(/src:\s*.*?;/, `src: ${srcValue};`);
  }
}

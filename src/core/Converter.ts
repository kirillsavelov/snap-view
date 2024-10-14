export interface Converter<I, O> {
  convert(input: I): O | Promise<O>;
}

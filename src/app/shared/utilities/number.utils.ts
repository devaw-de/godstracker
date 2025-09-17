export class NumberUtils {
  static clamp(value: number, config: { min: number; max: number } = {min: 0, max: 99}) {
    if (config.min >= config.max) {
      throw new Error('NumberUtils.clamp expects min value to be smaller than max value');
    }
    return Math.max(
      Math.min(value, config.max),
      config.min
    )
  }
}

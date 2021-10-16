import { Injectable } from '@angular/core';

export const CustomBreakpointNames = {
  xSmall: 'ExtraSmall',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  xLarge: 'ExtraLarge',

};
@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  breakpoints: object = {
    '(max-width: 599.98px)': CustomBreakpointNames.xSmall,
    '(min-width: 600px) and (max-width:959.98px)': CustomBreakpointNames.small,
    '(min-width: 960px) and (max-width:1279.98px)': CustomBreakpointNames.medium,
    '(min-width: 1280px) and (max-width:1919.98px)': CustomBreakpointNames.large,
    '(min-width: 1920px)': CustomBreakpointNames.xLarge,
  };

  getBreakpoints(): string[] {
    return Object.keys(this.breakpoints);
  }

  getBreakpointName(breakpointValue): string {
    return this.breakpoints[breakpointValue];
  }

  constructor() {}
}

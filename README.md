# TSLintPresets
A set of personal linting-rulesets for TypeScript

## Usage
The provided linting-presets can be used by setting the `extends`-option of the `tslint.json`-file:  
***tslint.json:***
```json
{
    "extends": "@manuth/tslint-presets/recommended"
}
```

By setting this option your `tslint.json`-file will inherit the `recommended`-file located in the `@manuth/tsconfig`-module.

## Presets
Following presets are available in this module:
  * `@manuth/tslint-presets`:  
    The short form of `@manuth/tslint-presets/recommended`
  * `@manuth/tslint-presets/recommended`:
    manuth's recommended settings
  * `@manuth/tslint-presets/weak`:  
    manuth's weak settings
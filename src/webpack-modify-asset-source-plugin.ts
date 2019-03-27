import {Compiler, compilation} from 'webpack';

const ThisPluginName = 'WebpackModifyAssetSourcePlugin';

type ModifyFn = (code: string) => string

type Options = {
  enable: boolean,
  assetName: string,
  modify: ModifyFn
}

export default class WebpackModifyAssetSourcePlugin {
  private readonly enable: boolean;
  private readonly assetName: string;
  private readonly modify: ModifyFn;

  constructor(options: Options) {
    this.enable = options.enable;
    this.assetName = options.assetName
    this.modify = options.modify;
  }

  apply(compiler: Compiler) {
    if (!this.enable) {
      return;
    }
    compiler.hooks.emit.tap(ThisPluginName, (compilation: compilation.Compilation) => {
      if (compilation.assets[this.assetName]) {
        const assetSource = compilation.assets[this.assetName].source();
        compilation.assets[this.assetName].source = () => this.modify(assetSource);
      } else {
        throw new Error(`Asset not found: ${this.assetName}, available assets: ${Object.keys(compilation.assets)}`)
      }
    });
  }

}

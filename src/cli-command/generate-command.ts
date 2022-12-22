import {CliCommandInterface} from './cli-command.interface.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';

  public async execute(): Promise<void> {
    console.log('Placeholder');
  }
}

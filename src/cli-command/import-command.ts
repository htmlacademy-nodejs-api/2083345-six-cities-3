import {CliCommandInterface} from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {createOffer, getErrorMessage} from '../utils/common.js';
import chalk from 'chalk';


export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLineHandler(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onCompleteHandler(count: number) {
    console.log(chalk.green(`${count} rows imported.`));
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLineHandler);
    fileReader.on('end', this.onCompleteHandler);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(chalk.red(`Can't read the file: ${getErrorMessage(err)}`));
    }
  }
}

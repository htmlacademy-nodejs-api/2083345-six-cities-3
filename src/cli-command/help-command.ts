import {CliCommandInterface} from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(chalk.cyan(`
       Программа для подготовки данных для REST API сервера.
    `));
    console.log(chalk.blue(`
       Пример:
    `));
    console.log(`
           main.js --<command> [--arguments]
    `);
    console.log(chalk.blue(`
       Команды:
    `));
    console.log(`
           --version:                   # выводит номер версии
           --help:                      # выводит описание всех поддерживаемых команд
           --import <path>:             # импортирует данные из TSV-файла
           --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
       `);
  }
}

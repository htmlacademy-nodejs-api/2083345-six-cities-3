import { CliCommandInterface } from '../cli-command/cli-command.interface.js';

type Commands = {
  [propertyName: string]: CliCommandInterface
}
type ParsedCommand = {
  [key: string]: string[];
}

export default class CLIApplication {
  private commands: Commands = {};
  private defaultCommand = '--help';

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((accumulator, item) => {
      if (item.startsWith('--')) {
        command = item;
        accumulator[command] = [];
      } else if (command && item) {
        accumulator[command].push(item);
      }
      return accumulator;
    }, parsedCommand);
  }

  public registerCommands(commandList: CliCommandInterface[]): void {
    commandList.reduce((accumulator, command) => {
      const cliCommand = command;
      accumulator[cliCommand.name] = cliCommand;
      return accumulator;
    }, this.commands);
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}


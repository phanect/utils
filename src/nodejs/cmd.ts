import { exec as execCallback } from "node:child_process";

type CmdParams = Parameters<typeof execCallback>;
type CommandString = CmdParams[0];
type CmdOptions = CmdParams[1] & {
  output?: boolean,
  printCommand?: boolean,
};

type CmdCallback = Exclude<CmdParams[2], undefined>;
type CmdCallbackParams = Parameters<CmdCallback>;
type CmdStdOut = CmdCallbackParams[1];
type CmdStdErr = CmdCallbackParams[2];

type CmdReturn = {
  stdout: CmdStdOut;
  stderr: CmdStdErr;
  child: ReturnType<typeof execCallback>
};

type Queued = {
  processId: number;
  text: string | unknown;
  target: "stdout" | "stderr";
  isCommand: boolean;
};

/**
 * Run multiple commands asynchronously, but show their output sequentially.
 * @param commands - Command(s) to run.
 * @param options - Options. Same as Node.js's `child_process.exec()`'s + some additional options
 * @param options.output - Print output if `true`. If `false`, no command output is printed and you have to print them manually from the return value. `true` by default.
 * @param options.printCommand - Print command string before running the command. `true` by default.
 * @returns Array of command output and child process object.
 */
export const cmd = async (commands: CommandString | CommandString[], options?: CmdOptions): Promise<CmdReturn | CmdReturn[]> => {
  // Default options
  const { output = true, printCommand = true } = options ?? {};
  /** Current command ID to be allowed to pring log */
  let currentProcessId = 0;
  /** Queue of the texts waiting to be printed. */
  let queue: Queued[] = [];
  const returnValues: CmdReturn[] = [];

  const log = (queued: Queued): void => {
    const logger = queued.target === "stdout" ? console.info : console.error;
    const prefix = queued.isCommand ? ((0 < queued.processId ? "\n" : "") + ">>> ") : "";
    const trailingLineBreaks = queued.isCommand ? "\n\n" : "\n";

    if (typeof queued.text === "string" || !!queued.text?.toString) {
      logger(queued.text
        .toString()
        .trim() // strip leading & trailing linebreaks
        .split("\n")
        .map(line => `${prefix} ${line}`)
        .join("\n") + trailingLineBreaks
      );
    } else {
      logger(prefix, queued.text, trailingLineBreaks);
    }
  };

  type AddToPrintQueueOptions = Omit<Queued, "text" | "isCommand"> & {
    isCommand?: Queued["isCommand"] | undefined;
  };

  const addToPrintQueue = (
    text: string | Buffer | unknown,
    { target, processId, isCommand = false }: AddToPrintQueueOptions
  ): void => {
    const _text = (typeof text === "string" || !text?.toString) ? text : text.toString();

    if (processId <= currentProcessId) {
      log({
        processId,
        text: _text,
        target,
        isCommand,
      });
    } else {
      queue.push({
        processId,
        text: _text,
        target,
        isCommand,
      });
    }
  };
  const dumpFromQueue = (processId: number): void => {
    for (const queued of queue) {
      if (queued.processId <= processId) {
        log(queued);
      }
    }
    queue = [];
  };
  const nextProcess = (): void => {
    currentProcessId++;
    dumpFromQueue(currentProcessId);
  };

  const promises: Promise<CmdReturn>[] = (Array.isArray(commands) ? commands : [ commands ])
    .map((command, i) => new Promise<CmdReturn>((resolve, reject) => {
      try {
        if (printCommand !== false) {
          addToPrintQueue(command, {
            target: "stdout",
            processId: i,
            isCommand: true,
          });
        }

        const child = execCallback(command, { ...options, stdio: "inherit" }, (err, stdout, stderr) => {
          if (err) {
            reject(err);
            return;
          }

          resolve({ stdout, stderr, child });
        });

        if (output !== false) {
          child.stdout?.on(
            "data",
            (data: string | Buffer | unknown): void => addToPrintQueue(data, {
              target: "stdout",
              processId: i,
            }),
          );

          child.stderr?.on(
            "data",
            (data: string | Buffer | unknown): void => addToPrintQueue(data, {
              target: "stderr",
              processId: i,
            })
          );
        }
      } catch(err) {
        reject(err);
      }
    }));

  for (const promise of promises) {
    returnValues.push(await promise);
    nextProcess();
  }

  return Array.isArray(commands) ? returnValues : returnValues[0];
};

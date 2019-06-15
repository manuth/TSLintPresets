import Assert = require("assert");
import { fork } from "child_process";
import FileSystem = require("fs-extra");
import Path = require("path");
import { TempDirectory } from "temp-filesystem";

/**
 * Tests the integrity of a `tslint` configuration-file.
 *
 * @param path
 * The path to the `tslint`-configuration to test.
 */
async function testConfig(path: string)
{
    let tempDir = new TempDirectory();

    await Promise.all([
        await FileSystem.writeFile(tempDir.MakePath("index.ts"), "const x = 1;"),
        await FileSystem.writeJSON(tempDir.MakePath("tsconfig.json"), {}),
        await FileSystem.writeJSON(tempDir.MakePath("tslint.json"), { extends: Path.resolve(Path.join(__dirname, path)) })
    ]);

    let exitCode = await new Promise<number>(
        (resolve) =>
        {
            let forkProcess = fork(
                Path.join(__dirname, "..", "..", "node_modules", "tslint", "bin", "tslint"),
                [
                    "-p",
                    "."
                ],
                {
                    execArgv: [],
                    cwd: tempDir.MakePath()
                });

            forkProcess.on("exit", (code) => resolve(code));
        });

    Assert.strictEqual(exitCode, 0);
}

suite(
    "TSLintPresets",
    () =>
    {

        test(
            "Checking the integrity of the main config-file…",
            async () =>
            {
                await testConfig("../..");
            });
    });
import Assert = require("assert");
import { spawnSync } from "child_process";
import FileSystem = require("fs-extra");
import npmWhich = require("npm-which");
import Path = require("path");
import { TempDirectory } from "temp-filesystem";
import UPath = require("upath");
import { IRuleTest } from "./IRuleTest.test";

/**
 * Provides tests for a tslint-preset.
 */
export abstract class PresetTests
{
    /**
     * Gets or sets tests for tslint-rules.
     */
    public RuleTests: IRuleTest[] = [];

    /**
     * Gets the temporary directory for the tests.
     */
    protected readonly TempDir: TempDirectory;

    /**
     * Gets the path to the preset to test.
     */
    protected readonly PresetPath: string;

    /**
     * Initializes a new instance of the `PresetTests` class.
     *
     * @param tempDir
     * The temporary directory for the tests.
     *
     * @param presetPath
     * The path of the preset to test.
     */
    public constructor(tempDir: TempDirectory, presetPath: string)
    {
        this.TempDir = tempDir;
        this.PresetPath = presetPath;

        FileSystem.writeJSONSync(
            this.TempDir.MakePath("tsconfig.json"), {});

        FileSystem.writeJSONSync(
            this.TempDir.MakePath("tslint.json"),
            {
                extends: UPath.toUnix(Path.relative(this.TempDir.MakePath(), this.PresetPath))
            });
    }

    /**
     * Registers the tests.
     */
    public Register()
    {
        let self = this;

        for (let ruleTest of this.RuleTests)
        {
            suite(
                "Checking the integrity of the `" + ruleTest.RuleName + "`-rule…",
                async () =>
                {
                    if (ruleTest.Preprocess)
                    {
                        suiteSetup(ruleTest.Preprocess);
                    }

                    if (ruleTest.ValidCode)
                    {
                        test(
                            "Testing valid code-snipptets…",
                            async function()
                            {
                                this.slow(30 * 1000);
                                this.timeout(60 * 1000);
                                await self.TestCode(ruleTest.ValidCode, ruleTest.RuleName, false);
                            });
                    }

                    if (ruleTest.InvalidCode)
                    {
                        test(
                            "Testing invalid code-snipptes…",
                            async function()
                            {
                                this.slow(30 * 1000);
                                this.timeout(60 * 1000);
                                await self.TestCode(ruleTest.InvalidCode, ruleTest.RuleName, true);
                            });
                    }

                    if (ruleTest.Postprocess)
                    {
                        suiteTeardown(ruleTest.Postprocess);
                    }
                });
        }
    }

    /**
     * Tests code-lines for errors.
     *
     * @param codeLines
     * The code-lines to test.
     *
     * @param ruleName
     * The name of the rule to test.
     *
     * @param error
     * A value indicating whether an error is expected.
     */
    protected async TestCode(codeLines: string[], ruleName: string, error: boolean)
    {
        for (let codeLine of codeLines)
        {
            Assert.strictEqual(
                (await this.ProcessCode(codeLine)).filter(
                    (error) =>
                    {
                        return error.ruleName === ruleName;
                    }
                ).length > 0, error);
        }
    }

    /**
     * Tests the `code` using `tslint`.
     *
     * @param code
     * The code to test.
     *
     * @return
     * The exit-code of `tslint`.
     */
    protected async ProcessCode(code: string): Promise<any[]>
    {
        await FileSystem.writeFile(this.TempDir.MakePath("index.ts"), code);
        return JSON.parse(spawnSync(npmWhich(__dirname).sync("tslint"), ["--format", "json", "-p", this.TempDir.MakePath()]).stdout);
    }
}
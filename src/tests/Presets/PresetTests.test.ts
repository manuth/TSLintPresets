import Assert = require("assert");
import { spawnSync } from "child_process";
import Path = require("path");
import FileSystem = require("fs-extra");
import npmWhich = require("npm-which");
import { TempDirectory } from "temp-filesystem";
import { IRuleTest } from "./IRuleTest.test";

/**
 * Provides tests for a tslint-preset.
 */
export abstract class PresetTests
{
    /**
     * Gets or sets tests for tslint-rules.
     */
    protected RuleTests: IRuleTest[] = [];

    /**
     * Gets or sets the temporary directory for the tests.
     */
    protected TempDir: TempDirectory;

    /**
     * Gets the path to the preset to test.
     */
    protected readonly PresetPath: string;

    /**
     * Initializes a new instance of the `PresetTests` class.
     *
     * @param presetPath
     * The path of the preset to test.
     */
    public constructor(presetPath: string)
    {
        this.PresetPath = presetPath;
    }

    /**
     * Registers the tests.
     */
    public Register(): void
    {
        let self = this;

        suite(
            "Checking the integrity of the preset…",
            () =>
            {
                suiteSetup(async () => this.Initialize());
                suiteTeardown(() => this.Dispose());

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
            });
    }

    /**
     * Initializes the tests.
     */
    protected async Initialize(): Promise<void>
    {
        this.TempDir = new TempDirectory();

        await FileSystem.writeJSON(
            this.TempDir.MakePath("tsconfig.json"), {});

        await FileSystem.writeJSON(
            this.TempDir.MakePath("tslint.json"),
            {
                extends: Path.relative(this.TempDir.MakePath(), this.PresetPath)
            });
    }

    /**
     * Disposes the tests.
     */
    protected Dispose(): void
    {
        this.TempDir.Dispose();
    }

    /**
     * Tests code-snippets for errors.
     *
     * @param codeSnippets
     * The code-snippets to test.
     *
     * @param ruleName
     * The name of the rule to test.
     *
     * @param error
     * A value indicating whether an error is expected.
     */
    protected async TestCode(codeSnippets: string[], ruleName: string, error: boolean): Promise<void>
    {
        for (let codeLine of codeSnippets)
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
     * @returns
     * The result of `tslint`.
     */
    protected async ProcessCode(code: string): Promise<any[]>
    {
        await FileSystem.writeFile(this.TempDir.MakePath("index.ts"), code);
        return JSON.parse(spawnSync(npmWhich(__dirname).sync("tslint"), ["--format", "json", "-p", this.TempDir.MakePath()]).stdout);
    }
}

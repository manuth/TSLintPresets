import Assert = require("assert");
import FileSystem = require("fs-extra");
import Path = require("path");
import { Configuration } from "tslint";

/**
 * Tests the integrity of a `tslint` configuration-file.
 *
 * @param path
 * The path to the `tslint`-configuration to test.
 */
function testConfig(path: string)
{
    let dirName: string = Path.dirname(Path.resolve(path));
    let rawConfig = require(path);
    let config = Configuration.parseConfigFile(rawConfig, dirName, (fileName) => require(Path.resolve(fileName)));
    Assert.strictEqual(config.rules.size > 0, true);
}

suite(
    "TSLintRulesets",
    () =>
    {

        test(
            "Checking the integrity of the main config-file…",
            () =>
            {
                testConfig("../..");
            });
    });
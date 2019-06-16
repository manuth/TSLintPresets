import Path = require("path");
import { TempDirectory } from "temp-filesystem";
import { RecommendedPresetTests } from "./RecommendedPresetTests.test";

suite(
    "Default",
    () =>
    {
        /**
         * The temporary directory for the tests.
         */
        let tempDir = new TempDirectory();

        /**
         * An object which provides tests.
         */
        let presetTests = new RecommendedPresetTests(tempDir, Path.resolve(__dirname, "..", "..", ".."));

        presetTests.Register();
    });
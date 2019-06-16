import { TempDirectory } from "temp-filesystem";
import { WeakPresetTests } from "./WeakPresetTests.test";

suite(
    "Weak",
    () =>
    {
        /**
         * The temporary directory for the tests.
         */
        let tempDir = new TempDirectory();

        /**
         * An object which provides tests.
         */
        let presetTests = new WeakPresetTests(tempDir);

        presetTests.Register();
    });
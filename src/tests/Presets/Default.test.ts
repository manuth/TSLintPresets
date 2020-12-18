import Path = require("path");
import { RecommendedPresetTests } from "./RecommendedPresetTests.test";

suite(
    "Default",
    () =>
    {
        new RecommendedPresetTests(Path.resolve(__dirname, "..", "..", "..")).Register();
    });

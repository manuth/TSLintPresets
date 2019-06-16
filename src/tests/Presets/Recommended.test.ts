import Path = require("path");
import { RecommendedPresetTests } from "./RecommendedPresetTests.test";

suite(
    "Recommended",
    () =>
    {
        new RecommendedPresetTests(Path.resolve(__dirname, "..", "..", "..", "recommended")).Register();
    });
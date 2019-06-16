import Path = require("path");
import { TempDirectory } from "temp-filesystem";
import { RecommendedPresetTests } from "./RecommendedPresetTests.test";

suite(
    "Recommended",
    () =>
    {
        new RecommendedPresetTests(Path.resolve(__dirname, "..", "..", "..", "recommended")).Register();
    });
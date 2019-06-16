import { TempDirectory } from "temp-filesystem";
import { WeakPresetTests } from "./WeakPresetTests.test";

suite(
    "Weak",
    () =>
    {
        new WeakPresetTests().Register();
    });
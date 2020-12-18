import Path = require("path");
import { RecommendedPresetTests } from "./RecommendedPresetTests.test";

/**
 * Provides thests for the recommended preset.
 */
export class WeakPresetTests extends RecommendedPresetTests
{
    /**
     * Initializes a new instance of the `WeakPresetTests` class.
     */
    public constructor()
    {
        let presetPath = Path.join(__dirname, "..", "..", "..", "weak");
        super(presetPath);
        let rules: string[] = [];
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        let settings = require(presetPath);

        if (settings.rules)
        {
            for (let ruleName in settings.rules)
            {
                rules.push(ruleName);
            }
        }

        let ruleTests = this.RuleTests;
        this.RuleTests = [];

        for (let ruleTest of ruleTests)
        {
            if (rules.includes(ruleTest.RuleName))
            {
                switch (ruleTest.RuleName)
                {
                    case "array-type":
                        ruleTest.InvalidCode = null;
                        ruleTest.ValidCode = [
                            `
                            let a: string[];
                            let b: Array<string>;

                            class Task<T>
                            { }

                            class TaskList<T>
                            {
                                public A: Array<Task<T>>;
                                public B: Task<T>[];
                            }`
                        ];
                        break;
                    case "trailing-comma":
                        ruleTest.ValidCode.push(...ruleTest.InvalidCode);
                        ruleTest.InvalidCode = null;
                        break;
                    default:
                        this.RuleTests.push(ruleTest);
                        break;
                }
            }
        }
    }
}

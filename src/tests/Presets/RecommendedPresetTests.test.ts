import FileSystem = require("fs-extra");
import { PresetTests } from "./PresetTests.test";

/**
 * Provides thests for the recommended preset.
 */
export class RecommendedPresetTests extends PresetTests
{
    /**
     * Initializes a new instance of the `RecommendedPresetTests` class.
     *
     * @param presetPath
     * The path of the preset to test.
     */
    public constructor(presetPath: string)
    {
        super(presetPath);

        this.RuleTests = [
            {
                RuleName: "member-ordering",
                ValidCode: [
                    `
                    class Test
                    {
                        public static a;
                        public b;
                    }`
                ],
                InvalidCode: [
                    `
                    class Test
                    {
                        public b;
                        public static a;
                    }`
                ]
            },
            {
                RuleName: "no-empty-interface",
                ValidCode: [
                    `
                    interface ITest
                    { }`
                ]
            },
            {
                RuleName: "no-inferrable-types",
                ValidCode: [
                    `let test = "";`
                ],
                InvalidCode: [
                    `let test: string = "";`
                ]
            },
            {
                RuleName: "await-promise",
                ValidCode: [
                    `
                    let promise: Promise = null;
                    await promise;`
                ],
                InvalidCode: [
                    `await "test";`
                ]
            },
            {
                RuleName: "ban-comma-operator",
                InvalidCode: [
                    `let test = (1, 2)`,
                    `
                    switch (null) {
                        case 1, 2:
                            break;
                    }`
                ]
            },
            {
                RuleName: "forin",
                ValidCode: [
                    `
                    let test = [1, 2];

                    for (let index in test)
                    { }`
                ]
            },
            {
                RuleName: "no-bitwise",
                ValidCode: [
                    `let test = 1 | 2;`
                ]
            },
            {
                RuleName: "no-console",
                ValidCode: [
                    `console.log("");`
                ]
            },
            {
                RuleName: "no-duplicate-switch-case",
                ValidCode: [
                    `
                    switch (null)
                    {
                        case 1:
                            break;
                        case 2:
                            break;
                    }`
                ],
                InvalidCode: [
                    `
                    switch (null)
                    {
                        case 1:
                            break;
                        case 2:
                            break;
                        case 1:
                            break;
                    }`
                ]
            },
            {
                RuleName: "no-dynamic-delete",
                InvalidCode: [
                    `
                    let test = {};
                    let id = "key";
                    test[id] = 1;
                    delete test[id];`
                ]
            },
            {
                RuleName: "no-empty",
                ValidCode: [
                    `function() { }`
                ]
            },
            {
                RuleName: "no-floating-promises",
                ValidCode: [
                    `
                    let promise: () => Promise<void> = null;
                    promise();`
                ]
            },
            {
                RuleName: "no-for-in-array",
                ValidCode: [
                    `
                    let test = [1, 2];

                    for (let index in test)
                    { }`
                ]
            },
            {
                RuleName: "no-return-await",
                ValidCode: [
                    `
                    let testFunction: () => Promise<number> = () =>
                    {
                        let test: () => Promise<number> = null;
                        return test;
                    }`
                ],
                InvalidCode: [
                    `
                    let testFunction: () => Promise<number> = () =>
                    {
                        let test: () => Promise<number> = null;
                        return await test;
                    }`
                ]
            },
            {
                RuleName: "no-shadowed-variable",
                ValidCode: [
                    `
                    let test = "";

                    let testFunction = () =>
                    {
                        let test = "";
                    }`
                ]
            },
            {
                RuleName: "no-string-literal",
                ValidCode: [
                    `
                    let test = {};
                    test["test"] = "";`
                ]
            },
            {
                RuleName: "no-sparse-arrays",
                ValidCode: [
                    `let test = [1,2];`
                ],
                InvalidCode: [
                    `let test = [1,,2];`
                ]
            },
            {
                RuleName: "restrict-plus-operands",
                ValidCode: [
                    `
                    console.log(1 + 1);
                    console.log("" + "");`
                ],
                InvalidCode: [
                    `console.log("" + 1);`
                ]
            },
            {
                RuleName: "triple-equals",
                ValidCode: [
                    `console.log(1 === 1);`
                ],
                InvalidCode: [
                    `console.log(1 == 1);`
                ]
            },
            {
                RuleName: "eofline",
                ValidCode: [``]
            },
            {
                RuleName: "max-classes-per-file",
                ValidCode: [
                    `
                    class Test1 { }
                    class Test2 { }`
                ]
            },
            {
                RuleName: "max-line-length",
                ValidCode: [
                    "d".repeat(300) + " = null;"
                ]
            },
            {
                RuleName: "no-default-export",
                InvalidCode: [
                    `
                    let test = null;
                    export default test;`
                ]
            },
            {
                RuleName: "no-duplicate-imports",
                InvalidCode: [
                    `
                    import { test } from "test";
                    import "test";`
                ]
            },
            {
                RuleName: "no-trailing-whitespace",
                ValidCode: [
                    `
                    /**
                     *
                     */`
                ],
                InvalidCode: [
                    `
                    /**
                     *` + " " + `
                     */`
                ]
            },
            {
                RuleName: "object-literal-sort-keys",
                ValidCode: [
                    `
                    let test = {
                        "z": null,
                        "a": null
                    };`
                ]
            },
            {
                RuleName: "prefer-const",
                ValidCode: [`let test = null;`]
            },
            {
                RuleName: "trailing-comma",
                ValidCode: [
                    `
                    let test = {
                        "a": null,
                        "z": null
                    }`
                ]
            },
            {
                RuleName: "array-type",
                ValidCode: [
                    `
                    class Task<T>
                    { }

                    class TaskList<T>
                    {
                        protected InnerList: Array<Task<T>> = [];
                    }

                    let test: string[];`
                ],
                InvalidCode: [
                    `
                    class Task<T>
                    { }

                    class TaskList<T>
                    {
                        protected InnerList: Task<T>[] = [];
                    }`,
                    `let test: Array<string>;`
                ]
            },
            {
                RuleName: "arrow-parens",
                ValidCode: [
                    `let testFunction = test => console.log(test);`
                ]
            },
            {
                RuleName: "comment-format",
                ValidCode: [
                    `// A test`
                ],
                InvalidCode: [
                    `//A`,
                    `// a`
                ]
            },
            {
                RuleName: "completed-docs",
                ValidCode: [
                    `
                    /**
                     * A
                     */
                    class TestClass
                    {
                        /**
                         * A
                         */
                        public Test;

                        /**
                         * A
                         */
                        public get Test()
                        {
                            return "";
                        }

                        /**
                         * A
                         */
                        public TestMethod() { }
                    }

                    /**
                     * A
                     */
                    enum TestEnum
                    {
                        /**
                         * A
                         */
                        Test
                    }

                    /**
                     * A
                     */
                    function TestFunction() { }

                    /**
                     * A
                     */
                    interface ITest { }

                    /**
                     * A
                     */
                    type TestType = { };

                    /**
                     * A
                     */
                    let test = { };`
                ],
                InvalidCode: [
                    `class Test { }`,
                    `enum Test { }`,
                    `
                    /**
                     * A
                     */
                    enum Test
                    {
                        Test
                    }`,
                    `function Test() { }`,
                    `interface ITest { }`,
                    `
                    /**
                     * A
                     */
                    class Test
                    {
                        Test() { }
                    }`,
                    `
                    /**
                     * A
                     */
                    class Test
                    {
                        get Test()
                        {
                            return "";
                        }
                    }`,
                    `
                    /**
                     * A
                     */
                    class Test
                    {
                        Test;
                    }`,
                    `type Test = { }`,
                    `let test = { }`
                ]
            },
            {
                RuleName: "match-default-export-name",
                Preprocess: async () =>
                {
                    await FileSystem.writeFile(
                        this.TempDir.MakePath("Importer.ts"),
                        `
                        let Importer = { };
                        export default Importer;`);
                },
                ValidCode: [
                    `import Importer from "./Importer";`
                ],
                InvalidCode: [
                    `import ImpOrtär from "./Importer";`
                ],
                Postprocess: async () =>
                {
                    await FileSystem.remove("Importer.ts");
                }
            },
            {
                RuleName: "no-boolean-literal-compare",
                ValidCode: [
                    `
                    let test = Math.random() > 0.5;
                    if (test) { }`
                ],
                InvalidCode: [
                    `
                    let test = Math.random() > 0.5;
                    if (test === false) { }`
                ]
            },
            {
                RuleName: "no-parameter-properties",
                ValidCode: [
                    `
                    class Test
                    {
                        public Test;
                        public constructor() { }
                    }`
                ],
                InvalidCode: [
                    `
                    class Test
                    {
                        public constructor(
                            public Test)
                        { }
                    }`
                ]
            },
            {
                RuleName: "no-redundant-jsdoc",
                ValidCode: [
                    `
                    /**
                     * @param test
                     * test
                     */
                    function testFunction(test: string)
                    { }`
                ],
                InvalidCode: [
                    `
                    /**
                     * @param {string} test
                     * test
                     */
                    function testFunction(test: string)
                    { }`
                ]
            },
            {
                RuleName: "no-reference-import",
                ValidCode: [
                    `
                    /// <reference types="node" />`
                ],
                InvalidCode: [
                    `
                    /// <reference types="node" />
                    import "node";`
                ]
            },
            {
                RuleName: "no-unnecessary-qualifier",
                ValidCode: [
                    `
                    enum Test
                    {
                        A,
                        B = A
                    }`
                ],
                InvalidCode: [
                    `
                    enum Test
                    {
                        A,
                        B = Test.A
                    }`
                ]
            },
            {
                RuleName: "no-unnecessary-type-assertion",
                ValidCode: [
                    `
                    let test: number = 1;
                    test = test;`
                ],
                InvalidCode: [
                    `
                    let test: number = 1;
                    test = test as number;`
                ]
            },
            {
                RuleName: "one-line",
                ValidCode: [
                    `
                    if (true)
                    { }
                    else
                    { }`
                ]
            },
            {
                RuleName: "number-literal-format",
                ValidCode: [
                    `let x = 0.5;`
                ],
                InvalidCode: [
                    `let x = .5;`
                ]
            },
            {
                RuleName: "prefer-object-spread",
                ValidCode: [
                    `let x = {...{}, test: ""};`
                ],
                InvalidCode: [
                    `let x = Object.assign({}, {test: ""});`
                ]
            },
            {
                RuleName: "return-undefined",
                ValidCode: [
                    `
                    function test(): void
                    {
                        return;
                    }

                    function undefinedTest(): any
                    {
                        return undefined;
                    }`
                ],
                InvalidCode: [
                    `
                    function test(): void
                    {
                        return undefined;
                    }`,
                    `
                    function test(): number
                    {
                        return;
                    }`
                ]
            },
            {
                RuleName: "space-before-function-paren",
                ValidCode: [
                    `
                    console.log(function() { });
                    console.log(async () => { });

                    class Test
                    {
                        public constructor() { }
                        public Test() { }
                    }

                    function testFunction() { }`
                ],
                InvalidCode: [
                    `console.log(function () { });`,
                    `console.log(async() => { });`,
                    `
                    class Test
                    {
                        public constructor () { }
                    }`,
                    `
                    class Test
                    {
                        public Test () { }
                    }`,
                    `function Test () { }`
                ]
            }
        ];
    }
}
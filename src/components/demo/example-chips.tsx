import { parserCoreFixtures } from "../../../fixtures/parser-core-v0.js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const approvedExamples = [
  "Initialize the model before training.",
  "Run the server with the config.",
  "If the server uses the config, load the file."
] as const;

const approvedExampleSet = new Set<string>(approvedExamples);

const exampleInputs = parserCoreFixtures
  .map((fixture) => fixture.input)
  .filter((input): input is (typeof approvedExamples)[number] => approvedExampleSet.has(input));

interface ExampleChipsProps {
  currentInput: string;
  onSelect: (value: string) => void;
}

export function ExampleChips({ currentInput, onSelect }: ExampleChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {exampleInputs.map((example) => {
        const isActive = currentInput.trim() === example;

        return (
          <Button
            key={example}
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "h-auto min-h-11 rounded-full border-border bg-white px-3 py-2 text-left text-xs leading-5 text-muted-foreground",
              isActive && "border-primary bg-accent text-primary"
            )}
            onClick={() => onSelect(example)}
          >
            {example}
          </Button>
        );
      })}
    </div>
  );
}

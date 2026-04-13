import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "../src/App.js";

describe("local demo v0", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts blank with disabled parse and copy controls", () => {
    render(<App />);

    const textarea = screen.getByLabelText("Paste technical English") as HTMLTextAreaElement;
    const parseButton = screen.getByRole("button", { name: "Parse Sentence" }) as HTMLButtonElement;
    const copyButton = screen.getByRole("button", { name: "Copy JSON" }) as HTMLButtonElement;

    expect(textarea.value).toBe("");
    expect(parseButton.disabled).toBe(true);
    expect(copyButton.disabled).toBe(true);
  });

  it("parses a known sentence and renders token output plus JSON", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Paste technical English"), "Initialize the model before training.");
    await user.click(screen.getByRole("button", { name: "Parse Sentence" }));

    expect(screen.getByText("Initialize")).toBeTruthy();
    expect(screen.getByTestId("json-output").textContent).toContain("\"input\": \"Initialize the model before training.\"");
  });

  it("fills from an example chip without auto parsing", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Run the server with the config." }));

    const textarea = screen.getByLabelText("Paste technical English") as HTMLTextAreaElement;
    expect(textarea.value).toBe("Run the server with the config.");
    expect(screen.queryByTestId("json-output")).toBeNull();
    expect(screen.getByText("Parse a sentence to inspect token roles.")).toBeTruthy();
  });

  it("clears previous output when the input changes after parsing", async () => {
    const user = userEvent.setup();
    render(<App />);

    const textarea = screen.getByLabelText("Paste technical English");

    await user.type(textarea, "Initialize the model before training.");
    await user.click(screen.getByRole("button", { name: "Parse Sentence" }));

    expect(screen.getByTestId("json-output")).toBeTruthy();

    await user.type(textarea, " Again");

    expect(screen.queryByTestId("json-output")).toBeNull();
    expect(screen.getByText("Input changed. Parse again to refresh token roles.")).toBeTruthy();
  });

  it("copies the exact visible JSON payload", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Paste technical English"), "If the server uses the config, load the file.");
    await user.click(screen.getByRole("button", { name: "Parse Sentence" }));

    const visibleJson = screen.getByTestId("json-output").textContent;
    const writeText = vi.spyOn(window.navigator.clipboard, "writeText");

    await user.click(screen.getByRole("button", { name: "Copy JSON" }));

    expect(writeText).toHaveBeenCalledWith(visibleJson);
    expect(screen.getByRole("button", { name: "Copied JSON" })).toBeTruthy();
  });
});

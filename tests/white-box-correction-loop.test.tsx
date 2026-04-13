import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { App } from "../src/App.js";

describe("white-box correction loop", () => {
  it("renders JSON and Code-like IR after parsing the README sentence", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Paste technical English"), "Initialize the model before training.");
    await user.click(screen.getByRole("button", { name: "Parse Sentence" }));

    expect(screen.getByText("Code-like IR")).toBeTruthy();
    expect(screen.getByTestId("json-output").textContent).toContain("\"relation\":");
    expect(screen.getByTestId("ir-output").textContent).toBe("before(train):\n  initialize(model)");
  });

  it("selects a token, explains it, and updates JSON plus IR after a manual correction", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Paste technical English"), "Initialize the model before training.");
    await user.click(screen.getByRole("button", { name: "Parse Sentence" }));
    await user.click(screen.getByTestId("role-chip-3"));

    expect(screen.getByText("Why this role")).toBeTruthy();
    expect(screen.getByText("Rule: relation:sequence")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Set role: purpose" }));

    expect(screen.getByTestId("role-chip-3").textContent).toContain("purpose");
    expect(screen.getByTestId("json-output").textContent).toContain("\"purpose\": {");
    expect(screen.getByTestId("json-output").textContent).not.toContain("\"relation\": {");
    expect(screen.getByTestId("ir-output").textContent).toBe("initialize(model)\n# purpose: before train");
  });

  it("restores a saved override when the same sentence is parsed again", async () => {
    const firstUser = userEvent.setup();
    const firstRender = render(<App />);

    await firstUser.type(screen.getByLabelText("Paste technical English"), "Initialize the model before training.");
    await firstUser.click(screen.getByRole("button", { name: "Parse Sentence" }));
    await firstUser.click(screen.getByTestId("role-chip-3"));
    await firstUser.click(screen.getByRole("button", { name: "Set role: purpose" }));

    firstRender.unmount();

    const secondUser = userEvent.setup();
    render(<App />);

    await secondUser.type(screen.getByLabelText("Paste technical English"), "Initialize the model before training.");
    await secondUser.click(screen.getByRole("button", { name: "Parse Sentence" }));
    await secondUser.click(screen.getByTestId("role-chip-3"));

    expect(screen.getByTestId("role-chip-3").textContent).toContain("purpose");
    expect(screen.getAllByText("Saved locally").length).toBeGreaterThan(0);
  });

  it("clears JSON, IR, and the token inspector after editing parsed input", async () => {
    const user = userEvent.setup();
    render(<App />);

    const textarea = screen.getByLabelText("Paste technical English");
    await user.type(textarea, "Initialize the model before training.");
    await user.click(screen.getByRole("button", { name: "Parse Sentence" }));
    await user.click(screen.getByTestId("role-chip-0"));

    expect(screen.getByText("Why this role")).toBeTruthy();
    expect(screen.getByTestId("json-output")).toBeTruthy();
    expect(screen.getByTestId("ir-output")).toBeTruthy();

    await user.type(textarea, " Again");

    expect(screen.queryByTestId("json-output")).toBeNull();
    expect(screen.queryByTestId("ir-output")).toBeNull();
    expect(screen.queryByText("Why this role")).toBeNull();
  });

  it("copies the exact visible JSON after a correction", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Paste technical English"), "Initialize the model before training.");
    await user.click(screen.getByRole("button", { name: "Parse Sentence" }));
    await user.click(screen.getByTestId("role-chip-3"));
    await user.click(screen.getByRole("button", { name: "Set role: purpose" }));

    const visibleJson = screen.getByTestId("json-output").textContent;
    const writeText = vi.spyOn(window.navigator.clipboard, "writeText");

    await user.click(screen.getByRole("button", { name: "Copy JSON" }));

    expect(writeText).toHaveBeenCalledWith(visibleJson);
    expect(screen.getByRole("button", { name: "Copied JSON" })).toBeTruthy();
  });
});

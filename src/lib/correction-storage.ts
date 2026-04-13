import type { SpanRoleOverride } from "@/lib/corrections.js";

export const CORRECTION_STORAGE_PREFIX = "english-decompiler:sentence-corrections";

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function getSentenceKey(input: string): string | null {
  const trimmedInput = input.trim();
  return trimmedInput === "" ? null : `${CORRECTION_STORAGE_PREFIX}:${trimmedInput}`;
}

export function loadSentenceCorrections(input: string): SpanRoleOverride[] {
  const storage = getStorage();
  const key = getSentenceKey(input);
  if (storage === null || key === null) {
    return [];
  }

  const stored = storage.getItem(key);
  if (stored === null) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (entry): entry is SpanRoleOverride =>
        typeof entry === "object" &&
        entry !== null &&
        typeof entry.tokenIndex === "number" &&
        typeof entry.role === "string"
    );
  } catch {
    return [];
  }
}

export function saveSentenceCorrections(input: string, overrides: SpanRoleOverride[]): void {
  const storage = getStorage();
  const key = getSentenceKey(input);
  if (storage === null || key === null) {
    return;
  }

  storage.setItem(key, JSON.stringify(overrides));
}

export function clearSentenceCorrections(input: string): void {
  const storage = getStorage();
  const key = getSentenceKey(input);
  if (storage === null || key === null) {
    return;
  }

  storage.removeItem(key);
}

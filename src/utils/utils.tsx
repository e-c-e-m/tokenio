import { Token } from "@/types/token";

// This function is needed because by default, tokens are returned from /tokens as nested token objects.
// They are nested within chainIds and so the data needs to be flattened to allow easy access to every entry.

export const flattenTokens = (tokens: Token[]) => Object.values(tokens).flat();
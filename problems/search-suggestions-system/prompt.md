# Search Suggestions System

You are given an array of string `products` and a string `searchWord`.

Design a system that suggests **at most three** product names from `products` after each character of `searchWord` is typed. Suggested products must share a common prefix with the substring of `searchWord` typed so far. If more than three products match that prefix, return the three **lexicographically smallest** strings.

Return a list of lists: the suggestions available after typing the first character, then after the second, and so on until the full `searchWord` has been typed.

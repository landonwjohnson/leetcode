# Engineering Roadmap: Algorithms, Interview Pattern Recognition, and Real-World Build Mapping

## How To Use This In Interviews

- Scan for trigger words first (window, pair, dependency, overlap, kth, shortest path).
- Map to a `Question Type` then pick the most likely `Pattern`.
- State pattern choice out loud before coding.
- Start from the canonical skeleton (hash map, two pointers, BFS, DP state).
- Validate constraints (`n`, sorted/unsorted, duplicates, update frequency, online vs batch).

## How To Use This For Real Engineering

- Use `Daily Usefulness` and `Real-World Relevance` to prioritize practical patterns.
- Convert high-value rows into production-grade helpers and deployed demos.
- For each solved problem, produce:
  - 1 reusable utility (library/helper),
  - 1 UI/visual demo (public portfolio),
  - 1 short note on where it appears in product engineering.

## Priority Order (Practical First)

1. Hash map/frequency, sliding window, sorting + two pointers, intervals, heap top-k.
2. Prefix sums, binary search-on-answer, graph BFS/DFS, tree traversal, trie.
3. DP fundamentals, union-find, monotonic stack/queue.
4. Advanced graph, advanced DP, bit tricks, design systems, ML-adjacent retrieval/ranking.

## Pattern Recognition Fast Guide

| Clue in Prompt | Likely Pattern |
|---|---|
| "find duplicate", "count", "group", "frequency" | Hash map / set |
| "longest/shortest subarray/substring" | Sliding window |
| "sorted array", "pair sum", "remove duplicates in-place" | Two pointers |
| "next greater/smaller", "valid parentheses", "undo" | Stack / monotonic stack |
| "kth", "top k", "stream median" | Heap |
| "overlap", "meeting rooms", "merge ranges" | Intervals + sorting |
| "minimum steps/path", "dependencies", "islands" | BFS/DFS graph |
| "best possible x", "min feasible value" | Binary search on answer |
| "ways to", "maximize/minimize with choices" | Dynamic programming |
| "prefix query", "autocomplete" | Trie / prefix indexing |

---

## Question Type: Lookup / Frequency / Matching
### Pattern: Hash Map / Set / Counting
**Role and company fit**
- Heaviest usage: Backend, full-stack, data, search, infra.
- Typical companies: marketplaces, ad-tech, social feeds, fraud/fintech, analytics SaaS.
- Interview weight: very high across FAANG, unicorns, fintech, and startup backend loops.

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Lookup / frequency | Hash map | [Two Sum](https://leetcode.com/problems/two-sum/) | Easy | High | High | Daily | find complement quickly | pair sum, target, indices | O(1) expected lookup | checkout/cart matching, fraud pair checks | promo pair matcher | ecommerce, fintech | product SaaS, fintech | Stripe, Shopify | Backend, Full Stack | common utility | complement heatmap | transaction pair debugger | `findPairByTarget` | [ ] | [ ] | [ ] |
| [ ] | P0 | Frequency | Hash set | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) | Easy | High | High | Daily | detect repeated value | duplicate, repeated | membership check | dedupe imports, id collisions | duplicate user detector | data pipelines | data platforms | Snowflake, Datadog | Data Eng, Backend | frequent data hygiene | duplicate timeline visualizer | file upload duplicate guard | `hasDuplicate` | [ ] | [ ] | [ ] |
| [ ] | P0 | Text frequency | Hash map | [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | Easy | Medium | High | Occasional | compare char counts | anagram, same letters | frequency equality | normalized search tokens | typo-tolerant tag cleanup | search, content | content platforms | Notion, Medium | Full Stack, Search | useful in indexing | char count bars | token normalizer playground | `sameMultiset` | [ ] | [ ] | [ ] |
| [ ] | P1 | Grouping | Hash map list | [Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Medium | Medium | High | Occasional | cluster by signature | group words | canonical key map | keyword clustering | grouped tag explorer | martech, content | SEO, ad-tech | HubSpot, Adobe | Search, Data Eng | moderate in batch jobs | anagram buckets UI | grouped-tags microtool | `groupBySignature` | [ ] | [ ] | [ ] |
| [ ] | P0 | Prefix frequency | Hash map + prefix | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium | High | High | Daily | count ranges hitting target | subarray count, sum k | cumulative counts | event analytics windows | conversion run detector | analytics, observability | metrics platforms | Mixpanel, Amplitude | Data Eng, Backend | very practical | running sum plot | KPI segment finder | `countSubarraysBySum` | [ ] | [ ] | [ ] |
| [ ] | P1 | Sequence lookup | Hash set | [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) | Medium | Medium | High | Occasional | longest streak | consecutive, unsorted | O(1) streak start detection | user streaks, uptime streak | daily streak tracker | consumer apps, gaming | social/gaming | Duolingo, Discord | Full Stack, Gameplay | feature-specific but common | streak timeline | habits streak app | `longestStreak` | [ ] | [ ] | [ ] |
| [ ] | P1 | Bijection mapping | Hash map | [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) | Easy | Low | Medium | Mostly Interview | one-to-one mapping validation | map chars | bijection check | ID remapping consistency | template placeholder validator | compilers/tools | devtools | JetBrains | Tools Eng | occasional | map graph view | template map validator | `isBijection` | [ ] | [ ] | [ ] |
| [ ] | P1 | Set ops | Set intersection | [Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/) | Easy | High | Medium | Daily | overlap datasets | common elements | set intersection | audience overlap, permissions | cohort overlap panel | ad-tech, analytics | martech, SaaS | Meta Ads, Google Ads | Data Eng, Backend | common ETL helper | overlap venn chart | audience overlap calculator | `intersectUnique` | [ ] | [ ] | [ ] |
| [ ] | P1 | Frequency ranking | Hash map + sort/heap | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | Medium | High | High | Daily | most frequent items | top-k, frequent | count then select | trending queries/products | trend widget | search, ecommerce | search/reco orgs | Amazon, YouTube | Search, ML, Backend | very practical | top-k animated bars | trending dashboard | `topKByFrequency` | [ ] | [ ] | [ ] |
| [ ] | P2 | Identity map | Hash map | [First Unique Character](https://leetcode.com/problems/first-unique-character-in-a-string/) | Easy | Medium | Medium | Occasional | first non-repeated | first unique | order + counts | queue cleansing | first-unique badge | chat/logging | comms platforms | Slack, Twilio | Backend, Full Stack | occasional | stream uniqueness ticker | unique event detector | `firstUniqueIndex` | [ ] | [ ] | [ ] |

---

## Question Type: Range / Substring / Subarray
### Pattern: Sliding Window / Prefix Window

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Substring | Sliding window | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Medium | High | High | Daily | max unique window | longest substring, no repeat | two-pointer window with map | token parsing, input validation | username quality checker | identity, forms | consumer apps | GitHub, Airbnb | Frontend, Full Stack | common in client validation | live highlight window | password strength inspector | `longestUniqueWindow` | [ ] | [ ] | [ ] |
| [ ] | P0 | Fixed window max | Monotonic deque | [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) | Hard | High | High | Daily | rolling max over stream | window size k, max each | deque keeps candidates | real-time metrics | latency spike panel | observability | infra SaaS | Datadog, New Relic | Infra, Data Eng | core dashboard logic | rolling max chart | stream KPI monitor | `rollingMax` | [ ] | [ ] | [ ] |
| [ ] | P0 | Min length range | Sliding window | [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | Medium | High | High | Daily | smallest window meeting threshold | minimum length, at least target | shrink-expand invariant | SLA violations | shortest alert window | SRE, analytics | infra and BI | Cloudflare, Grafana | Backend, Data Eng | frequent threshold logic | threshold band visualizer | SLA breach explorer | `minWindowBySum` | [ ] | [ ] | [ ] |
| [ ] | P1 | Pattern containment | Sliding window freq | [Permutation in String](https://leetcode.com/problems/permutation-in-string/) | Medium | Medium | High | Occasional | existence of rearranged pattern | permutation exists | fixed-length frequency compare | signature detection | abuse signature scanner | security/logging | cybersecurity | CrowdStrike | Security Eng, Backend | moderate | frequency diff bars | signature scanner demo | `containsPermutation` | [ ] | [ ] | [ ] |
| [ ] | P1 | Match windows | Sliding window freq | [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) | Medium | Medium | High | Occasional | all matching starts | anagram positions | rolling frequency delta | keyword extraction | text snippet marker | search/content | content/search | Elastic, Algolia | Search, Full Stack | moderate | substring highlighter | query fragment explorer | `findWindowMatches` | [ ] | [ ] | [ ] |
| [ ] | P0 | Profit range | Running min + diff | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Easy | High | High | Daily | best single transaction | max profit, buy then sell | maintain minimum prefix | pricing and arbitrage checks | deal opportunity meter | fintech, ecommerce | trading and retail | Robinhood, eBay | Backend, Quant | common scoring primitive | profit line scanner | deal optimizer demo | `maxOnePassGain` | [ ] | [ ] | [ ] |
| [ ] | P1 | Window replacement | Sliding window | [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/) | Medium | Medium | High | Mostly Interview | max with bounded edits | replace at most k | majority frequency in window | typo tolerance | moderation normalization | social/content | social platforms | Reddit, X | Full Stack, Search | occasional | live edit budget UI | text normalize playground | `longestWindowWithBudget` | [ ] | [ ] | [ ] |
| [ ] | P1 | Circular subarray | Kadane variant | [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) | Medium | Medium | Medium | Niche | best range with wrap | circular array | max normal vs wrap | cyclic scheduling | periodic load optimizer | systems/perf | infra/platform | AWS teams | Infra, Backend | specialized | circular chart solver | periodic metric analyzer | `maxCircularSubarray` | [ ] | [ ] | [ ] |

---

## Question Type: Pair / Comparison
### Pattern: Two Pointers / Sorting

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Pair sorted | Two pointers | [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Easy | High | High | Daily | find pair in sorted array | sorted, two indices | inward pointer convergence | recommendations by sorted score | score pair finder | search/reco | recommendation companies | Netflix | Backend, ML Eng | practical in sorted pipelines | pointer movement animator | score pair API | `twoSumSorted` | [ ] | [ ] | [ ] |
| [ ] | P1 | Triplets | Sort + pointers | [3Sum](https://leetcode.com/problems/3sum/) | Medium | Medium | High | Occasional | find unique triplets | triplets sum 0 | reduce to two-sum after sort | balancing constraints | budget balancing tool | fintech, planning | finance SaaS | Intuit | Backend, Data Eng | useful for combinational constraints | triplet explorer | finance constraint checker | `threeSumUnique` | [ ] | [ ] | [ ] |
| [ ] | P1 | Max area | Two pointers | [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | Medium | Low | High | Mostly Interview | maximize boundary product | max area between lines | shrinking lower bound | throughput capacity estimate | channel capacity planner | infra/perf | CDN/networking | Akamai | Infra Eng | conceptually useful | area sweep animation | capacity what-if widget | `maxBoundaryProduct` | [ ] | [ ] | [ ] |
| [ ] | P0 | In-place compaction | Two pointers | [Move Zeroes](https://leetcode.com/problems/move-zeroes/) | Easy | High | Medium | Daily | stable compaction | move zeros end | read/write pointer | sparse dataset cleanup | drag-drop ordered list sanitizer | frontend/backend | SaaS apps | Atlassian | Frontend, Full Stack | common utility | pointer swap visualizer | array cleanup mini-app | `stableCompact` | [ ] | [ ] | [ ] |
| [ ] | P1 | Dedupe sorted | Two pointers | [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Easy | High | Medium | Daily | remove duplicates in-place | sorted dedupe | linear overwrite | analytics pre-aggregation | dedupe list import | data processing | ETL/data apps | Fivetran | Data Eng, Backend | very common | write-index visualizer | CSV dedupe tool | `dedupeSortedInPlace` | [ ] | [ ] | [ ] |

---

## Question Type: Validation / Nested Structure
### Pattern: Stack / Monotonic Stack

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Bracket validation | Stack | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) | Easy | High | High | Daily | validate nested open/close | parentheses, valid string | LIFO matching | parser validation, editor tooling | code editor lint helper | devtools, IDE | tooling vendors | VS Code ecosystem | Tools Eng, Frontend | frequent for parsers | push/pop timeline | expression validator | `isBalancedDelimiters` | [ ] | [ ] | [ ] |
| [ ] | P1 | Next greater | Monotonic stack | [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) | Medium | Medium | High | Occasional | next greater element distance | next warmer day | decreasing stack of indices | alert lead-time | delayed notification predictor | analytics/weather | data products | Apple Weather | Data Eng, Backend | moderate | index jump animation | metric wait-time analyzer | `nextGreaterDistance` | [ ] | [ ] | [ ] |
| [ ] | P1 | Histogram optimization | Monotonic stack | [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) | Hard | Low | High | Mostly Interview | max rectangle under bars | histogram area | nearest smaller boundaries | rendering/packing analogies | warehouse occupancy optimizer | ops/logistics | logistics SaaS | Flexport | Backend, Quant | niche | histogram area explorer | occupancy planner | `maxHistogramArea` | [ ] | [ ] | [ ] |
| [ ] | P0 | Undo-style parsing | Stack | [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | Medium | Medium | Medium | Occasional | evaluate postfix expression | RPN, stack eval | operands resolve late | formula engines | spreadsheet expression widget | productivity | office suites | Microsoft 365 | Tools Eng, Backend | practical for calculators | RPN execution stepper | formula sandbox | `evalPostfix` | [ ] | [ ] | [ ] |

---

## Question Type: Order / Streaming
### Pattern: Queue / Deque / Online Aggregation

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Online average | Queue | [Moving Average from Data Stream](https://leetcode.com/problems/moving-average-from-data-stream/) | Easy | High | Medium | Daily | maintain rolling average | stream, moving average | fixed-size FIFO | observability dashboards | rolling KPI sparkline | analytics/IoT | metrics platforms | Grafana Cloud | Data Eng, Backend | very common | rolling chart | real-time analytics card | `rollingAverage` | [ ] | [ ] | [ ] |
| [ ] | P0 | Rate window | Queue | [Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/) | Easy | High | Medium | Daily | count events in recent interval | recent, ping, last 3000 | timestamp eviction | API rate limiting | request throttle meter | APIs, infra | API gateways | Kong, Cloudflare | Infra, Backend | core infra primitive | window event timeline | rate-limit simulator | `countEventsInWindow` | [ ] | [ ] | [ ] |
| [ ] | P1 | Task scheduling | Heap/queue | [Task Scheduler](https://leetcode.com/problems/task-scheduler/) | Medium | Medium | High | Occasional | min intervals with cooldown | cooldown, CPU tasks | greedy with queue | worker queue backoff | job queue dashboard | cloud compute | job platforms | AWS Batch | Infra, Platform | recurring in async systems | scheduler gantt | pipeline queue viewer | `scheduleWithCooldown` | [ ] | [ ] | [ ] |

---

## Question Type: Linked Structure / Pointer Traversal
### Pattern: Linked List

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P1 | Reverse chain | Linked list | [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) | Easy | Low | High | Mostly Interview | reverse pointers safely | reverse list | pointer rewiring | memory structures | custom cache internals | systems | infra teams | Redis contributors | Backend, Systems | interview-heavy | pointer animation | list transform lab | `reverseList` | [ ] | [ ] | [ ] |
| [ ] | P1 | Cycle detect | Fast/slow pointers | [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) | Easy | Medium | High | Occasional | detect loop | cycle, repeated node | Floyd pointers | loop detection in workflows | workflow cycle checker | orchestration | workflow SaaS | Temporal | Platform, Backend | useful for graph-like refs | cycle walker | workflow verifier | `hasCycle` | [ ] | [ ] | [ ] |
| [ ] | P1 | Merge sorted lists | Linked list merge | [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) | Easy | Medium | High | Occasional | stable sorted merge | merge lists | pointer merge | feed merge, stream merge | timeline merger | social/data | feed systems | LinkedIn | Backend, Data Eng | moderately useful | merge trace viewer | multi-feed merger | `mergeSortedLists` | [ ] | [ ] | [ ] |

---

## Question Type: Tree / Hierarchy
### Pattern: DFS/BFS Trees

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Tree depth | DFS | [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Easy | Medium | High | Occasional | compute depth/height | max depth | recursive aggregation | org chart depth | org complexity meter | enterprise SaaS | HR/work mgmt | Workday | Backend, Full Stack | appears in hierarchical data | depth heat tree | hierarchy inspector | `treeDepth` | [ ] | [ ] | [ ] |
| [ ] | P0 | Valid BST | DFS bounds | [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) | Medium | Medium | High | Occasional | enforce ordering constraints | BST validity | global bounds check | ordered index validation | product category index validator | search/catalog | ecommerce/search | Amazon | Search, Backend | moderate | bound propagation visualizer | index integrity checker | `validateOrderedTree` | [ ] | [ ] | [ ] |
| [ ] | P1 | LCA | Tree recursion | [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | Medium | Medium | High | Occasional | shared ancestor of nodes | common ancestor | subtree convergence | folder ancestry | comment thread ancestor jump | social/docs | collaboration tools | Notion, Confluence | Full Stack, Backend | moderate | ancestor path viewer | hierarchy jump API | `lowestCommonAncestor` | [ ] | [ ] | [ ] |
| [ ] | P1 | Level traversal | BFS | [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Medium | Medium | High | Daily | process nodes by level | level by level | queue frontier | breadth analytics | permissions tree renderer | enterprise software | B2B SaaS | Okta | Frontend, Backend | practical in UIs | level-by-level render | role tree explorer | `levelOrder` | [ ] | [ ] | [ ] |

---

## Question Type: Graph / Connected Components / Dependencies
### Pattern: BFS/DFS / Topological Sort / Shortest Path

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Connected components | DFS/BFS | [Number of Islands](https://leetcode.com/problems/number-of-islands/) | Medium | High | High | Daily | count disconnected regions | islands, components | flood-fill traversal | image segmentation, map regions | minimap island detector | GIS/gaming | maps, game studios | Uber Maps, Unity teams | Gameplay, Backend, Data | high for spatial apps | grid flood-fill view | map region analyzer | `countComponentsGrid` | [ ] | [ ] | [ ] |
| [ ] | P0 | Dependency cycles | Topological sort | [Course Schedule](https://leetcode.com/problems/course-schedule/) | Medium | High | High | Daily | detect cyclic dependency | prerequisites, can finish | DAG feasibility | build pipeline DAGs | package dependency explorer | devtools, build systems | infra/devtools | GitHub, npm ecosystem | Platform, Backend | very practical | dependency graph explorer | CI dependency health page | `hasCycleDirected` | [ ] | [ ] | [ ] |
| [ ] | P1 | Path shortest steps | BFS | [Word Ladder](https://leetcode.com/problems/word-ladder/) | Hard | Medium | High | Niche | min transformation steps | shortest transformation | unweighted shortest path | typo correction transitions | query rewrite pathfinder | search/NLP | search companies | Google Search | Search, ML Eng | niche but valuable | transformation graph | query rewrite demo | `shortestTransformPath` | [ ] | [ ] | [ ] |
| [ ] | P1 | Clone topology | Graph DFS | [Clone Graph](https://leetcode.com/problems/clone-graph/) | Medium | Low | High | Mostly Interview | deep clone with cycles | clone graph | visited map clone | object graph copying | state graph duplicator | tooling/sim | simulation products | Autodesk | Tools, Engine | mostly concept | clone animation | graph copy checker | `cloneGraphSafe` | [ ] | [ ] | [ ] |
| [ ] | P0 | Grid shortest path | BFS | [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/) | Medium | High | High | Daily | shortest route in blocked grid | shortest path grid | BFS with 8 dirs | robotics/nav game maps | route finder | robotics, gaming | autonomous systems | Waymo | Gameplay, Robotics, Backend | high in spatial products | BFS maze visualizer | route planner mini-app | `shortestPathGrid` | [ ] | [ ] | [ ] |
| [ ] | P1 | All paths DAG | DFS memo | [All Paths From Source to Target](https://leetcode.com/problems/all-paths-from-source-to-target/) | Medium | Medium | Medium | Occasional | enumerate valid DAG paths | all paths | DFS path building | workflow alternatives | multi-path workflow UI | workflow engines | automation SaaS | Zapier | Platform, Backend | useful for explainability | DAG route explorer | pipeline route suggester | `enumerateDagPaths` | [ ] | [ ] | [ ] |
| [ ] | P1 | Region capture | DFS border | [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/) | Medium | Medium | High | Occasional | preserve border-connected region | surrounded, board | reverse-mark safe zones | map painting/game logic | territory capture board | gaming, graphics | game studios | Riot Games | Gameplay, Graphics | common in board logic | capture animation | territory simulation | `captureSurrounded` | [ ] | [ ] | [ ] |
| [ ] | P0 | Account dedupe graph | DFS/union mapping | [Accounts Merge](https://leetcode.com/problems/accounts-merge/) | Medium | High | High | Daily | merge entities by shared key | shared email merge | component merge | identity stitching | contact dedupe CRM | CRM/security | enterprise SaaS | Salesforce | Backend, Data Eng | very practical | merge graph UI | account dedupe service | `mergeBySharedAttribute` | [ ] | [ ] | [ ] |

---

## Question Type: Search / Threshold / Sorted Data
### Pattern: Binary Search / Binary Search on Answer

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Exact search | Binary search | [Binary Search](https://leetcode.com/problems/binary-search/) | Easy | High | High | Daily | locate target index | sorted nums | log-time halving | catalog lookup | sorted inventory finder | ecommerce/search | product search | eBay | Backend, Full Stack | very common | midpoint explorer | sorted lookup API | `binarySearch` | [ ] | [ ] | [ ] |
| [ ] | P0 | Boundary search | Lower/upper bound | [Find First and Last Position in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) | Medium | High | High | Daily | find range boundaries | first/last occurrence | two bound searches | range filters | facet count bounds | search/analytics | search SaaS | Algolia | Search, Backend | practical in filtering | bounds visualizer | facet boundary service | `searchRange` | [ ] | [ ] | [ ] |
| [ ] | P1 | Rotated search | Modified binary search | [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Medium | Medium | High | Mostly Interview | handle rotated monotonic data | rotated sorted | half sorted invariant | circular buffers | ring buffer debug tool | systems | infra products | Kafka tooling | Backend, Infra | occasional | rotated array viewer | ring index explorer | `searchRotated` | [ ] | [ ] | [ ] |
| [ ] | P0 | Threshold optimization | Binary search answer | [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) | Medium | Medium | High | Occasional | minimum feasible speed | minimum x satisfies | monotonic feasibility | autoscaling thresholds | worker throughput tuner | cloud ops | cloud providers | AWS | Infra, Platform | practical in capacity tuning | feasible/infeasible chart | capacity slider simulator | `minFeasibleValue` | [ ] | [ ] | [ ] |

---

## Question Type: Ranking / Top-K / Priority
### Pattern: Heap / Partial Sorting

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Kth element | Min/max heap | [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Medium | High | High | Daily | keep best k candidates | kth largest | bounded heap | leaderboards | top-k user board | gaming, social | game/social apps | Blizzard, Discord | Gameplay, Backend | very common | heap state visualizer | live leaderboard | `kthLargest` | [ ] | [ ] | [ ] |
| [ ] | P0 | Frequent top-k | Heap + hash map | [Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/) | Medium | High | High | Daily | rank by freq then tie-break | top k words | count + heap | search suggestions | trending terms widget | search/content | search engines | Google | Search, ML, Backend | very practical | top terms chart | trend API | `topKFrequentTokens` | [ ] | [ ] | [ ] |
| [ ] | P1 | Dynamic median | Two heaps | [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) | Hard | High | High | Daily | online median queries | stream median | balance lower/upper heaps | latency medians | p50 metrics tile | observability | monitoring tools | Datadog | Data Eng, Infra | common in analytics | dual-heap animation | live quantile monitor | `streamMedian` | [ ] | [ ] | [ ] |
| [ ] | P1 | Merge sorted streams | Heap of heads | [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) | Hard | Medium | High | Occasional | merge many sorted sources | k lists merge | always take min head | feed merge | multi-source feed combiner | social/data | content platforms | LinkedIn | Backend, Data Eng | moderate utility | merge race view | stream merger service | `mergeKSorted` | [ ] | [ ] | [ ] |

---

## Question Type: Interval / Scheduling / Overlap
### Pattern: Sorting + Sweep / Heap

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Merge overlap | Sort intervals | [Merge Intervals](https://leetcode.com/problems/merge-intervals/) | Medium | High | High | Daily | normalize overlaps | intervals overlap | sorted sweep merge | booking windows | calendar cleaner | calendars, logistics | productivity SaaS | Google Calendar | Backend, Full Stack | extremely practical | overlap timeline | meeting merge tool | `mergeIntervals` | [ ] | [ ] | [ ] |
| [ ] | P0 | Resource count | Heap by end time | [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) | Medium | High | High | Daily | min concurrent resources | rooms required | active end-time heap | capacity planning | room conflict viewer | scheduling | workforce/logistics | Calendly | Backend, Full Stack | very practical | concurrent bars | scheduler conflict app | `minResourcesForIntervals` | [ ] | [ ] | [ ] |
| [ ] | P0 | Insert range | Interval insertion | [Insert Interval](https://leetcode.com/problems/insert-interval/) | Medium | High | High | Daily | insert and reconcile | add interval | local merge around insert | maintenance windows | downtime planner | SRE/ops | cloud infra | Azure | Infra, Backend | frequent in ops tools | insertion animation | release window planner | `insertInterval` | [ ] | [ ] | [ ] |
| [ ] | P1 | Erase overlap min | Greedy intervals | [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) | Medium | Medium | High | Occasional | min removals to avoid overlap | remove overlap | choose smallest end greedily | ad slot conflict cleanup | campaign scheduler | ad-tech | advertising platforms | The Trade Desk | Backend, Data Eng | moderate | keep/remove visualizer | ad slot optimizer | `minOverlapRemovals` | [ ] | [ ] | [ ] |

---

## Question Type: Prefix Sums / Rolling Metrics
### Pattern: Prefix Sum / Difference Arrays

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Immutable range sum | Prefix sum | [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) | Easy | High | Medium | Daily | answer many range sums quickly | many range sum queries | precompute prefix | dashboard KPIs | rolling metric pane | analytics | BI platforms | Tableau | Data Eng, Backend | very practical | cumulative curve demo | metric query API | `prefixRangeSum` | [ ] | [ ] | [ ] |
| [ ] | P0 | 2D range sum | 2D prefix sum | [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/) | Medium | High | Medium | Daily | matrix rectangle sum query | 2D matrix sum | area prefix inclusion-exclusion | heatmaps | region intensity inspector | GIS/vision | map/computer vision | Mapbox | Graphics, Data Eng | practical in spatial UIs | heatmap brush sum | map tile stats API | `prefix2DQuery` | [ ] | [ ] | [ ] |
| [ ] | P1 | Product except self | Prefix/suffix | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | Medium | Medium | High | Occasional | all-product excluding index | except self | pre/suf accumulation | weighted scoring | influence score cards | ranking/reco | recommendation teams | Spotify | ML, Backend | moderate | influence wheel | weighted rank calculator | `productExceptIndex` | [ ] | [ ] | [ ] |

---

## Question Type: Matrix / Grid Traversal
### Pattern: BFS/DFS / DP Grid

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Grid BFS spread | BFS | [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) | Medium | Medium | High | Occasional | multi-source spread time | spread over minutes | BFS level by level | incident propagation | outage blast-radius simulator | SRE/security | infra/security orgs | Cloudflare | Infra, Security | useful in incident models | spread wave animation | propagation simulator | `multiSourceBfsTime` | [ ] | [ ] | [ ] |
| [ ] | P1 | Island area | DFS flood fill | [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) | Medium | Medium | High | Occasional | largest connected region | largest island | component area counting | region segmentation | parcel grouping UI | GIS/logistics | geospatial platforms | Esri | Data Eng, Backend | useful in mapping | area fill visualizer | parcel analyzer | `largestComponentArea` | [ ] | [ ] | [ ] |
| [ ] | P1 | Paths count | DP grid | [Unique Paths](https://leetcode.com/problems/unique-paths/) | Medium | Medium | High | Occasional | number of ways to destination | count paths | DP state transitions | routing combinatorics | route count calculator | logistics/robotics | mobility companies | DoorDash | Backend, Robotics | moderate | grid path counter | route options widget | `countGridPaths` | [ ] | [ ] | [ ] |

---

## Question Type: Combinations / Permutations
### Pattern: Backtracking

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P1 | Power set | Backtracking | [Subsets](https://leetcode.com/problems/subsets/) | Medium | Medium | High | Occasional | generate all subsets | all subsets | choose/skip recursion | feature flag combinations | bundle builder | ecommerce/configuration | SaaS product config | Shopify apps | Full Stack, Backend | moderate | subset tree viewer | config combo explorer | `generateSubsets` | [ ] | [ ] | [ ] |
| [ ] | P1 | Permutations | Backtracking | [Permutations](https://leetcode.com/problems/permutations/) | Medium | Low | High | Mostly Interview | all orderings | permutations | swap/fix recursion | test order generation | scenario permutation lab | QA/tools | test platforms | Cypress ecosystem | Tools, QA Eng | occasional | recursion tree anim | permutation service | `permute` | [ ] | [ ] | [ ] |
| [ ] | P1 | Target combinations | Backtracking | [Combination Sum](https://leetcode.com/problems/combination-sum/) | Medium | Medium | High | Occasional | combinations hitting target | sum target combinations | branch and bound | pricing bundles | coupon pack composer | ecommerce/fintech | retail platforms | Amazon | Backend, Full Stack | moderate | branch tree chart | deal bundle planner | `combinationSum` | [ ] | [ ] | [ ] |

---

## Question Type: Greedy
### Pattern: Local Optimal Choice

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Reachability | Greedy | [Jump Game](https://leetcode.com/problems/jump-game/) | Medium | Medium | High | Occasional | can reach end index | jump lengths, reach end | track farthest reachable | dependency progress checks | milestone reachability widget | product/games | gaming/SaaS | Supercell | Gameplay, Full Stack | useful reasoning pattern | reach frontier visual | progression analyzer | `canReachEnd` | [ ] | [ ] | [ ] |
| [ ] | P1 | Min jumps | Greedy layers | [Jump Game II](https://leetcode.com/problems/jump-game-ii/) | Medium | Medium | High | Occasional | minimum hops | min jumps | level-wise range expansion | CDN hops planning analogy | route hops panel | networking | infra/network | Cloudflare | Infra, Backend | occasional | hop-range visualizer | route hop optimizer | `minJumps` | [ ] | [ ] | [ ] |
| [ ] | P1 | Gas circuit | Greedy cumulative | [Gas Station](https://leetcode.com/problems/gas-station/) | Medium | Low | High | Mostly Interview | feasible start index | circular route fuel | reset on negative prefix | delivery route sanity | fleet route validator | logistics | delivery tech | Uber Eats | Backend, Ops | niche | fuel balance ring | route feasibility app | `findFeasibleStart` | [ ] | [ ] | [ ] |

---

## Question Type: Optimization / Dynamic Programming
### Pattern: 1D/2D DP

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Count ways | DP 1D | [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) | Easy | Medium | High | Occasional | count ways with recurrence | ways to reach | small state recurrence | funnel progression combinations | onboarding path counter | product analytics | SaaS consumer | Duolingo | Full Stack, Data Eng | moderate | recurrence chart | onboarding optimizer | `countWaysLinear` | [ ] | [ ] | [ ] |
| [ ] | P0 | Max non-adjacent sum | DP 1D | [House Robber](https://leetcode.com/problems/house-robber/) | Medium | Medium | High | Occasional | choose non-adjacent max | cannot take adjacent | include/exclude state | budget allocation | ad budget slot selector | ad-tech/fintech | ad platforms | Google Ads | Backend, Quant | practical in constrained picks | state transition plot | budget picker tool | `maxNonAdjacentSum` | [ ] | [ ] | [ ] |
| [ ] | P0 | Min coins | DP unbounded | [Coin Change](https://leetcode.com/problems/coin-change/) | Medium | High | High | Daily | minimum units to make target | min coins amount | optimal substructure | payment denomination optimization | payout optimizer | fintech/payments | fintechs | PayPal | Backend, Quant | very practical | DP table animator | payout denomination tool | `minCoins` | [ ] | [ ] | [ ] |
| [ ] | P1 | Sequence growth | DP + binary search | [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) | Medium | Medium | High | Occasional | longest increasing trend | increasing subsequence | patience sorting idea | trend strength in metrics | growth trend analyzer | analytics/ML | data products | Amplitude | Data Eng, ML | useful in analytics | LIS build chart | trend analyzer app | `lisLength` | [ ] | [ ] | [ ] |
| [ ] | P1 | Edit operations | DP 2D | [Edit Distance](https://leetcode.com/problems/edit-distance/) | Hard | Medium | High | Daily | min edits between strings | insert/delete/replace | 2D transition costs | spell check, diff tools | typo suggestion engine | search/NLP/devtools | search and editors | Google Docs | Search, Tools, ML | very useful | edit path heatmap | text diff service | `levenshtein` | [ ] | [ ] | [ ] |

---

## Question Type: Trie / Prefix Search
### Pattern: Trie / Prefix Indexing

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Prefix lookup | Trie | [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) | Medium | High | High | Daily | insert/search/startsWith | prefix, autocomplete | prefix-index node sharing | search suggestions | trie search bar | search, docs | search/document tools | Algolia, Notion | Search, Backend, Full Stack | highly practical | trie node explorer | autocomplete API | `Trie` class | [ ] | [ ] | [ ] |
| [ ] | P1 | Wildcard dictionary | Trie + DFS | [Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Medium | Medium | High | Occasional | prefix + wildcard search | . wildcard word search | branching trie DFS | moderation dictionaries | safe-word matcher | trust&safety | social/content | YouTube moderation | Backend, ML Ops | moderate | wildcard traversal visual | dictionary matcher service | `searchWithWildcard` | [ ] | [ ] | [ ] |
| [ ] | P1 | Board word search | Trie + backtracking | [Word Search II](https://leetcode.com/problems/word-search-ii/) | Hard | Medium | High | Niche | find many words in grid | board, dictionary | trie prunes search space | Boggle-like engines | puzzle helper | gaming/edtech | game studios | Zynga | Gameplay, Backend | niche but portfolio-strong | board+trie demo | puzzle solver app | `findWordsInGrid` | [ ] | [ ] | [ ] |

---

## Question Type: Union Find / Disjoint Set
### Pattern: DSU

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P1 | Dynamic connectivity | Union-find | [Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) | Medium | Medium | High | Occasional | count components under unions | connected components | near O(1) union/find | social graph clustering | friend cluster viewer | social/security | social graph products | LinkedIn | Backend, Data Eng | moderate | DSU parent forest UI | connectivity explorer | `UnionFind` | [ ] | [ ] | [ ] |
| [ ] | P1 | Merge accounts | Union-find | [Accounts Merge (DSU version)](https://leetcode.com/problems/accounts-merge/) | Medium | High | High | Daily | merge by shared identity keys | account merge | transitive grouping | customer identity resolution | CRM identity stitcher | CRM/fintech | enterprise SaaS | Salesforce | Backend, Data Eng | very practical | union operations timeline | identity merge service | `mergeEntitiesDSU` | [ ] | [ ] | [ ] |
| [ ] | P2 | Equation consistency | Union-find + parity | [Satisfiability of Equality Equations](https://leetcode.com/problems/satisfiability-of-equality-equations/) | Medium | Low | Medium | Mostly Interview | constraints consistency | a==b, a!=b | component equality tracking | config compatibility checks | rules conflict validator | config engines | platform tools | HashiCorp | Platform, Tools | niche | constraint graph visual | rule consistency checker | `checkEquationConsistency` | [ ] | [ ] | [ ] |

---

## Question Type: Bit Manipulation
### Pattern: Bitwise Ops / Masking

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P1 | Single odd element | XOR | [Single Number](https://leetcode.com/problems/single-number/) | Easy | Medium | High | Occasional | isolate non-duplicate item | every element twice except one | XOR cancels pairs | event ID parity checks | duplicate event resolver | telemetry | infra analytics | Datadog | Infra, Backend | occasional | XOR bit animation | stream dedupe checker | `singleByXor` | [ ] | [ ] | [ ] |
| [ ] | P2 | Count bits | DP/bit ops | [Counting Bits](https://leetcode.com/problems/counting-bits/) | Easy | Low | Medium | Niche | count set bits per number | number of 1 bits | recurrence on half | bitmap analytics | feature flag mask panel | systems/gfx | low-level teams | game engines | Graphics, Engine | niche specialized | bit-count visual | bitmap toolkit demo | `countBitsArray` | [ ] | [ ] | [ ] |
| [ ] | P2 | Subset mask DP | Bitmasking | [Subsets (bitmask variant)](https://leetcode.com/problems/subsets/) | Medium | Low | Medium | Niche | enumerate subsets by mask | bitmask subsets | compact state encoding | feature combinatorics | permission mask debugger | security/platform | infra/security | Okta | Security, Platform | niche | mask toggles UI | permissions simulator | `enumerateByMask` | [ ] | [ ] | [ ] |

---

## Question Type: Design Problems
### Pattern: Data Structure Design / API Behavior

| Done | Priority | Question Type | Pattern | LeetCode Problem | Difficulty | Daily Usefulness | Interview Usefulness | Real-World Relevance | What the question is usually asking | Recognition clues / trigger words | Why this pattern fits | Real-world use cases | Real product feature examples | Industry usage | Types of companies that use it | Specific company examples | Job roles that use it | Day-to-day engineering relevance | Visual website demo idea | Deployable demo idea | Reusable utility/helper idea | Swift | C++ | TypeScript |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [ ] | P0 | Cache design | Hash map + DLL | [LRU Cache](https://leetcode.com/problems/lru-cache/) | Medium | High | High | Daily | O(1) get/put with eviction | cache, least recently used | map + linked order | API response caching | endpoint cache panel | backend infra | APIs/platform | Fastly | Backend, Platform | highly practical | cache hit/miss visual | API cache simulator | `LRUCache` | [ ] | [ ] | [ ] |
| [ ] | P0 | Time-based key-value | Ordered map | [Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store/) | Medium | High | High | Daily | query by timestamp | set/get timestamp | per-key sorted timeline | feature flags over time | config timeline viewer | platform/config | platform SaaS | LaunchDarkly | Platform, Backend | very practical | timeline query demo | versioned config API | `timeMap` | [ ] | [ ] | [ ] |
| [ ] | P1 | Randomized set | Hash map + array | [Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/) | Medium | Medium | High | Occasional | O(1) random selection with updates | get random in O(1) | index map swap-delete | random sampling | random suggestion widget | recommendation/gaming | content apps | TikTok | ML, Backend, Gameplay | useful for sampling | random pick animation | sampler API | `RandomizedSet` | [ ] | [ ] | [ ] |

---

## AI / ML Related Algorithm Categories (Engineering Lens)

| Category | Core Patterns | LeetCode Anchors | Real AI/ML Product Mapping | Most Relevant Roles |
|---|---|---|---|---|
| Retrieval and ranking | Heap top-k, sorting, prefix filters | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/), [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/), [Search Insert Position](https://leetcode.com/problems/search-insert-position/) | candidate generation, ANN pre/post-filtering, feed ranking fallback logic | ML Eng, Search Eng, Backend |
| Similarity / nearest-neighbor thinking | distance scoring, partial selection | [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/), [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | recommendation candidates, semantic search reranking, map nearest POI | ML Eng, Search Eng, Data Eng |
| Sequence modeling prep | sliding window, DP over sequence | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/), [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/), [Edit Distance](https://leetcode.com/problems/edit-distance/) | token stream cleaning, anomaly windows, text correction | ML Eng, Data Eng, Full Stack |
| Graph-based intelligence | BFS/DFS/toposort | [Course Schedule](https://leetcode.com/problems/course-schedule/), [Word Ladder](https://leetcode.com/problems/word-ladder/), [Number of Islands](https://leetcode.com/problems/number-of-islands/) | knowledge graph traversal, dependency health, lineage graph | Data Eng, Platform, Search Eng |
| Tree models and hierarchical reasoning | tree traversal, recursion | [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/), [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) | decision tree introspection UIs, taxonomy navigation | ML Eng, Backend, Frontend |
| Optimization under constraints | greedy + DP + binary search on answer | [Coin Change](https://leetcode.com/problems/coin-change/), [Jump Game](https://leetcode.com/problems/jump-game/), [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) | budgeted model serving, throughput tuning, batch sizing | Infra Eng, ML Platform, Quant |

---

## Visual Deployable Demo Backlog

- Hash map lookup visualizer (`Two Sum`, `Contains Duplicate`) -> deploy as interview pattern explainer.
- Sliding window substring highlighter (`Longest Substring`, `Find All Anagrams`) -> interactive text analyzer.
- Interval overlap calendar (`Merge Intervals`, `Meeting Rooms II`) -> scheduling conflict explorer.
- Top-k leaderboard (`Kth Largest`, `Top K Frequent`) -> real-time ranking panel.
- Trie search suggestion UI (`Implement Trie`) -> autocomplete microservice + demo UI.
- BFS pathfinding visualizer (`Shortest Path in Binary Matrix`) -> maze/route demo.
- Dependency graph explorer (`Course Schedule`) -> DAG cycle detector for CI pipelines.
- Streaming metric chart (`Moving Average`, `Sliding Window Maximum`) -> observability mini-dashboard.
- Connected-component map (`Number of Islands`) -> minimap cluster detector.
- Cache simulator (`LRU Cache`, `TimeMap`) -> hit-rate and eviction tuner.

## Reusable Utility/Helper Backlog

- `mergeIntervals`, `insertInterval`, `minResourcesForIntervals`.
- `rollingAverage`, `rollingMax`, `countEventsInWindow`.
- `topKByFrequency`, `kthLargest`, `streamMedian`.
- `binarySearch`, `searchRange`, `minFeasibleValue`.
- `UnionFind`, `mergeEntitiesDSU`.
- `Trie`, `searchWithWildcard`.
- `levenshtein`, `lisLength`, `maxNonAdjacentSum`.

## Best Problems By Goal

### Best for Daily Engineering
- `Merge Intervals`, `Meeting Rooms II`, `LRU Cache`, `Time Based Key-Value Store`, `Subarray Sum Equals K`, `Sliding Window Maximum`, `Top K Frequent Elements`, `Course Schedule`, `Number of Islands`, `Binary Search`.

### Best for Interview Prep
- `3Sum`, `Word Ladder`, `Largest Rectangle in Histogram`, `Median from Data Stream`, `Edit Distance`, `LIS`, `Clone Graph`, `Koko Eating Bananas`, `Combination Sum`.

### Best for Deployable Demos
- `Implement Trie`, `Course Schedule`, `Shortest Path in Binary Matrix`, `Merge Intervals`, `Top K Frequent Elements`, `Moving Average from Data Stream`, `LRU Cache`.

### Best for Reusable Snippets
- `searchRange`, `mergeIntervals`, `rollingAverage`, `rollingMax`, `topKByFrequency`, `levenshtein`, `UnionFind`.

## Final Learn-First Plan (12-Week Backbone)

1. Weeks 1-2: Hash map + sliding window + two pointers.
2. Weeks 3-4: Intervals + heap + binary search.
3. Weeks 5-6: Graph BFS/DFS + topological sort.
4. Weeks 7-8: Trees + trie + prefix sums.
5. Weeks 9-10: DP fundamentals + greedy.
6. Weeks 11-12: Design problems (`LRU`, `TimeMap`) + ML-adjacent ranking/retrieval demos.

## Extended Problem Bank (Broad Coverage)

Use this as the long-tail queue after the prioritized tables. It is intentionally broad for long-term study, interview reps, and demo ideation.

### Lookup / Frequency / Matching
- Two Sum
- Contains Duplicate
- Valid Anagram
- Group Anagrams
- Top K Frequent Elements
- Subarray Sum Equals K
- Longest Consecutive Sequence
- Isomorphic Strings
- First Unique Character in a String
- Majority Element
- Intersection of Two Arrays
- Happy Number
- Find the Difference
- Ransom Note
- Word Pattern

### Range / Substring / Subarray
- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Minimum Size Subarray Sum
- Sliding Window Maximum
- Find All Anagrams in a String
- Permutation in String
- Longest Repeating Character Replacement
- Maximum Average Subarray I
- Max Consecutive Ones III
- Fruit Into Baskets
- Subarrays with K Different Integers
- Binary Subarrays With Sum
- Number of Substrings Containing All Three Characters
- Maximum Points You Can Obtain from Cards
- Longest Turbulent Subarray

### Pair / Comparison
- Two Sum II
- 3Sum
- 3Sum Closest
- 4Sum
- Container With Most Water
- Valid Palindrome
- Valid Palindrome II
- Backspace String Compare
- Move Zeroes
- Remove Duplicates from Sorted Array
- Sort Colors
- Squares of a Sorted Array
- Boats to Save People
- Trapping Rain Water
- Partition Labels

### Validation / Nested / Stack
- Valid Parentheses
- Min Stack
- Evaluate Reverse Polish Notation
- Daily Temperatures
- Next Greater Element I
- Next Greater Element II
- Largest Rectangle in Histogram
- Remove All Adjacent Duplicates in String
- Decode String
- Basic Calculator
- Basic Calculator II
- Simplify Path
- Asteroid Collision
- Online Stock Span
- Remove K Digits

### Order / Streaming / Queue
- Implement Queue using Stacks
- Number of Recent Calls
- Moving Average from Data Stream
- Dota2 Senate
- Design Circular Queue
- First Unique Number
- Hit Counter
- Task Scheduler
- Design Front Middle Back Queue
- Kth Largest Element in a Stream

### Linked Structure / Pointer Traversal
- Reverse Linked List
- Reverse Linked List II
- Linked List Cycle
- Linked List Cycle II
- Merge Two Sorted Lists
- Merge k Sorted Lists
- Remove Nth Node From End of List
- Reorder List
- Palindrome Linked List
- Intersection of Two Linked Lists
- Add Two Numbers
- Swap Nodes in Pairs
- Odd Even Linked List
- Sort List
- Copy List with Random Pointer

### Tree / Hierarchy
- Maximum Depth of Binary Tree
- Diameter of Binary Tree
- Balanced Binary Tree
- Invert Binary Tree
- Same Tree
- Symmetric Tree
- Binary Tree Level Order Traversal
- Binary Tree Right Side View
- Validate Binary Search Tree
- Lowest Common Ancestor of a Binary Tree
- Kth Smallest Element in a BST
- Construct Binary Tree from Preorder and Inorder Traversal
- Serialize and Deserialize Binary Tree
- Path Sum
- Binary Tree Maximum Path Sum

### Graph / Connected Components / Dependencies
- Number of Islands
- Max Area of Island
- Surrounded Regions
- Clone Graph
- Course Schedule
- Course Schedule II
- Pacific Atlantic Water Flow
- Word Ladder
- Number of Provinces
- Graph Valid Tree
- Accounts Merge
- Reconstruct Itinerary
- Network Delay Time
- Cheapest Flights Within K Stops
- Redundant Connection

### Search / Threshold / Sorted Data
- Binary Search
- Search Insert Position
- Search in Rotated Sorted Array
- Find Minimum in Rotated Sorted Array
- Find First and Last Position of Element in Sorted Array
- Peak Index in a Mountain Array
- Search a 2D Matrix
- Koko Eating Bananas
- Capacity To Ship Packages Within D Days
- Split Array Largest Sum
- Median of Two Sorted Arrays
- Find Peak Element
- Arrange Coins
- Sqrt(x)
- Guess Number Higher or Lower

### Ranking / Top-k / Priority
- Kth Largest Element in an Array
- Top K Frequent Elements
- Top K Frequent Words
- Find Median from Data Stream
- K Closest Points to Origin
- Last Stone Weight
- Reorganize String
- Furthest Building You Can Reach
- IPO
- Maximum Performance of a Team
- Task Scheduler
- Merge k Sorted Lists
- Smallest Range Covering Elements from K Lists
- Find K Pairs with Smallest Sums
- Sliding Window Median

### Interval / Scheduling / Overlap
- Merge Intervals
- Insert Interval
- Non-overlapping Intervals
- Meeting Rooms
- Meeting Rooms II
- Minimum Number of Arrows to Burst Balloons
- Interval List Intersections
- Employee Free Time
- My Calendar I
- My Calendar II
- Car Pooling
- Minimum Interval to Include Each Query
- Video Stitching
- Remove Covered Intervals
- Set Intersection Size At Least Two

### Prefix Sums / Rolling Metrics
- Range Sum Query - Immutable
- Range Sum Query 2D - Immutable
- Product of Array Except Self
- Subarray Sum Equals K
- Continuous Subarray Sum
- Contiguous Array
- Maximum Size Subarray Sum Equals k
- Corporate Flight Bookings
- Car Pooling
- Count Number of Nice Subarrays
- Number of Sub-arrays With Odd Sum
- Running Sum of 1d Array
- Pivot Index
- Minimum Value to Get Positive Step by Step Sum
- Plates Between Candles

### Matrix / Grid Traversal
- Number of Islands
- Max Area of Island
- Rotting Oranges
- Flood Fill
- 01 Matrix
- Walls and Gates
- Number of Closed Islands
- Number of Enclaves
- Unique Paths
- Unique Paths II
- Minimum Path Sum
- Shortest Path in Binary Matrix
- The Maze
- The Maze II
- Game of Life

### Combinations / Permutations / Backtracking
- Subsets
- Subsets II
- Permutations
- Permutations II
- Combination Sum
- Combination Sum II
- Combination Sum III
- Letter Combinations of a Phone Number
- Generate Parentheses
- Palindrome Partitioning
- N-Queens
- Word Search
- Restore IP Addresses
- Matchsticks to Square
- Partition to K Equal Sum Subsets

### Greedy
- Jump Game
- Jump Game II
- Gas Station
- Candy
- Assign Cookies
- Lemonade Change
- Queue Reconstruction by Height
- Partition Labels
- Wiggle Subsequence
- Minimum Number of Refueling Stops
- Remove Duplicate Letters
- Course Schedule III
- Maximum Units on a Truck
- Can Place Flowers
- Best Time to Buy and Sell Stock II

### Dynamic Programming
- Climbing Stairs
- Min Cost Climbing Stairs
- House Robber
- House Robber II
- Coin Change
- Coin Change II
- Longest Increasing Subsequence
- Longest Common Subsequence
- Edit Distance
- Word Break
- Decode Ways
- Unique Binary Search Trees
- Partition Equal Subset Sum
- Target Sum
- Maximum Product Subarray
- Best Time to Buy and Sell Stock with Cooldown
- Best Time to Buy and Sell Stock III
- Best Time to Buy and Sell Stock IV
- Interleaving String
- Distinct Subsequences

### Bit Manipulation
- Single Number
- Single Number II
- Missing Number
- Number of 1 Bits
- Counting Bits
- Reverse Bits
- Sum of Two Integers
- Power of Two
- Bitwise AND of Numbers Range
- Subsets (bitmask)

### Trie / Prefix Search
- Implement Trie (Prefix Tree)
- Design Add and Search Words Data Structure
- Word Search II
- Replace Words
- Longest Word in Dictionary
- Map Sum Pairs
- Implement Magic Dictionary
- Search Suggestions System
- Stream of Characters
- Palindrome Pairs

### Union Find / Disjoint Set
- Number of Connected Components in an Undirected Graph
- Number of Provinces
- Redundant Connection
- Accounts Merge
- Satisfiability of Equality Equations
- Number of Islands II
- Most Stones Removed with Same Row or Column
- Regions Cut By Slashes
- Graph Valid Tree
- Min Cost to Connect All Points

### Design Problems
- LRU Cache
- LFU Cache
- Time Based Key-Value Store
- Insert Delete GetRandom O(1)
- Design Twitter
- Design Browser History
- Implement Queue using Stacks
- Implement Stack using Queues
- Design Circular Deque
- Design HashMap
- Design HashSet
- Design Underground System
- All O`one Data Structure
- Snapshot Array
- Design Authentication Manager

If you want, next step is I can generate `roadmap.dataset.json` from this markdown (one object per row) so you can power filters/sorting directly on your site.
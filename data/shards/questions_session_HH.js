// Sprint 2 batch HH - DSA: Big-O, recursion, sorts, search
// 50 questions: 35 MC + 15 Fill
window.QUESTIONS_SHARD_HH = {
  mc: [
    { id: "mc_dsa_bigo_const_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      question: "מה O(1) משמעותו?",
      options: [
        "Constant time — זמן הריצה לא תלוי בגודל הקלט. דוגמאות: array[i], hash table get, push/pop ב-stack",
        "1 second",
        "Linear",
        "Logarithmic"
      ],
      correctIndex: 0,
      explanation: "O(1) = upper bound קבוע. ב-amortized: dynamic array push יכול להיות O(1) ממוצע למרות resize.",
      optionFeedback: [
        "✅ נכון. constant complexity.",
        "❌ זמן יחיד לא ההגדרה.",
        "❌ O(n) שונה.",
        "❌ O(log n) שונה."
      ]
    },
    { id: "mc_dsa_bigo_log_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      question: "מה O(log n) טיפוסי?",
      options: [
        "חלוקה לחצאים בכל איטרציה — binary search, BST balanced, heap insert/delete",
        "Linear",
        "n²",
        "Constant"
      ],
      correctIndex: 0,
      explanation: "log n צמיחה איטית מאוד. n=1M → log₂(1M) ≈ 20.",
      optionFeedback: [
        "✅ נכון. divide-by-half.",
        "❌ O(n) שונה.",
        "❌ O(n²) שונה.",
        "❌ O(1) שונה."
      ]
    },
    { id: "mc_dsa_bigo_n_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      question: "מה O(n)?",
      options: [
        "Linear — זמן הריצה גדל proportional לקלט. דוגמאות: לולאה אחת, find ב-array, sum",
        "Quadratic",
        "Constant",
        "Log"
      ],
      correctIndex: 0,
      explanation: "n=10 → 10 ops. n=1000 → 1000 ops. ‫קצב ‫קבוע יחסית.",
      optionFeedback: [
        "✅ נכון. linear scan.",
        "❌ O(n²) שונה.",
        "❌ O(1) שונה.",
        "❌ O(log n) שונה."
      ]
    },
    { id: "mc_dsa_bigo_nlogn_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 7,
      question: "מתי O(n log n) נפוץ?",
      options: [
        "Sorts יעילים: merge sort, heap sort, Tim sort. גם ב-Array.sort של JS",
        "All sorts",
        "Bubble sort",
        "Linear search"
      ],
      correctIndex: 0,
      explanation: "Lower bound לcomparison sort. Tim sort ב-Array.prototype.sort של V8.",
      optionFeedback: [
        "✅ נכון. comparison sort.",
        "❌ bubble = O(n²).",
        "❌ bubble = O(n²) גרוע.",
        "❌ search = O(n)."
      ]
    },
    { id: "mc_dsa_bigo_nsq_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      question: "מתי O(n²)?",
      options: [
        "לולאות מקוננות: bubble/selection/insertion sort, naive substring search, all-pairs comparison",
        "Single loop",
        "Hash",
        "Tree balanced"
      ],
      correctIndex: 0,
      explanation: "n=1000 → 10⁶ ops. n=1M → 10¹² ops (שעות).",
      optionFeedback: [
        "✅ נכון. nested loops.",
        "❌ single = O(n).",
        "❌ hash = O(1) ממוצע.",
        "❌ tree = O(log n)."
      ]
    },
    { id: "mc_dsa_bigo_exp_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 8,
      question: "מתי O(2ⁿ)?",
      options: [
        "Recursive בלי memo: Fibonacci נאיבי, subset enumeration, brute-force search על powerset",
        "Linear",
        "Polynomial",
        "Logarithmic"
      ],
      correctIndex: 0,
      explanation: "n=30 → ~10⁹ ops. memoization → O(n) ב-Fibonacci.",
      optionFeedback: [
        "✅ נכון. exponential.",
        "❌ שונה.",
        "❌ O(n^k) שונה.",
        "❌ הפוך."
      ]
    },
    { id: "mc_dsa_space_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 7,
      question: "מה ההבדל בין time complexity לspace complexity?",
      options: [
        "Time = פעולות לאורך זמן. Space = זיכרון נוסף. recursive פונקציות יכולות O(n) space עקב call stack",
        "זהים",
        "Space רק ב-Big-O",
        "Time רק"
      ],
      correctIndex: 0,
      explanation: "merge sort O(n log n) time, O(n) space. quick sort in-place O(log n) space.",
      optionFeedback: [
        "✅ נכון. שני מימדים.",
        "❌ שונים.",
        "❌ time + space.",
        "❌ שניהם נמדדים."
      ]
    },
    { id: "mc_dsa_amortized_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 8,
      question: "מה amortized complexity ב-Array.push?",
      options: [
        "O(1) ממוצע — לפעמים resize O(n), אבל פעם בכל doubling. ממוצע על n פעולות הוא O(1)",
        "O(n)",
        "O(log n)",
        "O(n²)"
      ],
      correctIndex: 0,
      explanation: "Dynamic array doubles capacity. n פושים = ~n ops total → O(1) ממוצע.",
      optionFeedback: [
        "✅ נכון. amortized analysis.",
        "❌ זה ה-worst case בודד.",
        "❌ לא log.",
        "❌ לא quadratic."
      ]
    },
    { id: "mc_dsa_bubble_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      question: "מה bubble sort?",
      options: [
        "השוואת זוגות עוקבים ושינוי מקום אם לא ממוין. n-1 passes. O(n²) worst, O(n) best (כבר ממוין)",
        "Divide and conquer",
        "Pivot-based",
        "Heap-based"
      ],
      correctIndex: 0,
      explanation: "פשוט ללימוד אבל לא יעיל. בשימוש בעיקר ל-pedagogy.",
      optionFeedback: [
        "✅ נכון. swap adjacent.",
        "❌ merge sort שונה.",
        "❌ quick sort שונה.",
        "❌ heap sort שונה."
      ]
    },
    { id: "mc_dsa_quick_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 7,
      question: "מה quicksort עושה?",
      options: [
        "בוחר pivot, מחלק לקטן/גדול, recursion. O(n log n) ממוצע, O(n²) worst (pivot גרוע). in-place",
        "Linear",
        "Always n log n",
        "Stable"
      ],
      correctIndex: 0,
      explanation: "Random pivot ממנע worst case. לא stable. שימוש לא ב-default sort של JS (Tim sort).",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא linear.",
        "❌ worst case קיים.",
        "❌ לא stable."
      ]
    },
    { id: "mc_dsa_merge_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 7,
      question: "מה merge sort?",
      options: [
        "Divide & conquer: חלוקה לחצי, sort כל חצי, merge. O(n log n) תמיד. stable. O(n) space",
        "In-place",
        "O(n²)",
        "Pivot-based"
      ],
      correctIndex: 0,
      explanation: "ה-stable מקיים סדר של שווים. דורש buffer נוסף.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא in-place.",
        "❌ זה quick worst.",
        "❌ זה quick."
      ]
    },
    { id: "mc_dsa_binary_search_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      question: "Binary search דורש?",
      options: [
        "Array ממוין — בודק את האמצע, חוצה החיפוש לחצי. O(log n) זמן",
        "Hash",
        "Linked",
        "Random"
      ],
      correctIndex: 0,
      explanation: "אם לא ממוין: O(n log n) sort ראשית, אחר כך binary search.",
      optionFeedback: [
        "✅ נכון.",
        "❌ hash שונה.",
        "❌ linked לא תומך.",
        "❌ דרוש סדר."
      ]
    },
    { id: "mc_dsa_hashmap_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::object", level: 7,
      question: "מה complexity של hash map ops?",
      options: [
        "Average O(1) get/set/has/delete. Worst O(n) (collisions). JS Map ו-Object דומים",
        "Always O(1)",
        "O(log n)",
        "O(n)"
      ],
      correctIndex: 0,
      explanation: "טוב hash function = collision נדיר. JS V8 משתמש ב-mixing מתקדם.",
      optionFeedback: [
        "✅ נכון. amortized.",
        "❌ collisions קיימים.",
        "❌ זה tree.",
        "❌ זה list."
      ]
    },
    { id: "mc_dsa_set_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::object", level: 6,
      question: "מתי Set עדיף על Array?",
      options: [
        "ייחודיות + has() ב-O(1). Array.includes ב-O(n). Set מבוסס hash, שומר סדר insertion",
        "Always",
        "Smaller",
        "Sortable"
      ],
      correctIndex: 0,
      explanation: "Array.includes/indexOf O(n). Set.has O(1). חשוב לdedupes ולחיפושים.",
      optionFeedback: [
        "✅ נכון. lookup speed.",
        "❌ ל-iteration Array OK.",
        "❌ Set יכול לתפוס יותר.",
        "❌ Set לא ממוין."
      ]
    },
    { id: "mc_dsa_map_obj_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::object", level: 6,
      question: "מתי Map עדיף על Object?",
      options: [
        "Keys שאינם strings (objects/numbers), iteration נדרשת ב-insertion order, חינוי size, אין prototype pollution",
        "Always",
        "Smaller",
        "Faster always"
      ],
      correctIndex: 0,
      explanation: "Object keys = strings בלבד (אלא Symbol). Map תומך כל key. delete ב-Map יותר יעיל.",
      optionFeedback: [
        "✅ נכון. structured key support.",
        "❌ Object לעיתים מתאים.",
        "❌ דומה.",
        "❌ דומה."
      ]
    },
    { id: "mc_dsa_recursion_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::function", level: 6,
      question: "מה הבסיס של recursion?",
      options: [
        "Base case (תנאי עצירה) + recursive case (קריאה עצמית עם sub-problem). חסר base case = stack overflow",
        "Loop only",
        "Async",
        "Promise"
      ],
      correctIndex: 0,
      explanation: "function f(n){ if(n<=0) return 1; return n * f(n-1); } — base + recurrence.",
      optionFeedback: [
        "✅ נכון. base + recursive.",
        "❌ recursion שונה מ-loop.",
        "❌ async שונה.",
        "❌ promise שונה."
      ]
    },
    { id: "mc_dsa_tail_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::function", level: 8,
      question: "מה tail call optimization?",
      options: [
        "אם הפעולה האחרונה היא call recursive, לא צריך frame חדש. מצב זה לא ממומש בפועל ב-V8 ב-JS",
        "Always optimized",
        "Iteration only",
        "Generator"
      ],
      correctIndex: 0,
      explanation: "ECMAScript spec הגדיר את זה אבל V8 לא מיישם. רק Safari/JSC. כתוב iterative ב-JS לבטוח.",
      optionFeedback: [
        "✅ נכון.",
        "❌ לא ב-JS.",
        "❌ זו ההמרה הצופה.",
        "❌ generator שונה."
      ]
    },
    { id: "mc_dsa_memo_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::function", level: 7,
      question: "מה memoization עושה ל-Fibonacci?",
      options: [
        "ממירה O(2ⁿ) ל-O(n) על-ידי שמירת תוצאות subproblems ב-cache. recursion יחזיר מ-cache במקום לחשב מחדש",
        "פתאום iterative",
        "פתאום O(1)",
        "Slower"
      ],
      correctIndex: 0,
      explanation: "Top-down DP. Bottom-up DP בלולאה גם O(n) זמן, O(1) space לFib.",
      optionFeedback: [
        "✅ נכון. trade space for time.",
        "❌ עדיין recursive.",
        "❌ לא O(1) זמן.",
        "❌ הפוך."
      ]
    },
    { id: "mc_dsa_dp_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::function", level: 8,
      question: "מה Dynamic Programming?",
      options: [
        "אסטרטגיה לבעיות עם optimal substructure ו-overlapping subproblems — שמירת תוצאות בטבלה (memo/tab)",
        "OOP",
        "Async pattern",
        "Recursion only"
      ],
      correctIndex: 0,
      explanation: "Top-down (memo) או bottom-up (tabulation). דוגמאות: Fib, knapsack, LCS, edit distance.",
      optionFeedback: [
        "✅ נכון. DP definition.",
        "❌ לא OOP.",
        "❌ לא async.",
        "❌ recursion + cache."
      ]
    },
    { id: "mc_dsa_two_pointer_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 7,
      question: "מתי משתמשים ב-two pointer?",
      options: [
        "Array ממוין: find pair sum X, remove duplicates, reverse. O(n) במקום O(n²)",
        "Always",
        "Hash table",
        "BFS"
      ],
      correctIndex: 0,
      explanation: "left=0, right=n-1; while(left<right) tighten by comparing.",
      optionFeedback: [
        "✅ נכון. sorted optimization.",
        "❌ לא תמיד.",
        "❌ hash אסטרטגיה אחרת.",
        "❌ BFS שונה."
      ]
    },
    { id: "mc_dsa_sliding_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 7,
      question: "מתי sliding window?",
      options: [
        "Subarray/substring שמקיים תנאי: longest no-repeat substring, max sum k-length window. O(n) על O(n²) brute",
        "Sort",
        "Search",
        "Hash"
      ],
      correctIndex: 0,
      explanation: "Window: left ו-right pointers. הזזה: r++, l++ לפי תנאי.",
      optionFeedback: [
        "✅ נכון. window pattern.",
        "❌ sort שונה.",
        "❌ search שונה.",
        "❌ hash משלים אך לא נדרש."
      ]
    },
    { id: "mc_dsa_dfs_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::function", level: 8,
      question: "מה DFS (Depth First Search)?",
      options: [
        "Traversal עומק — לוקח מסלול עד הסוף לפני backtrack. recursion טבעית, או stack מפורש. שימושי ל-cycle detection",
        "BFS",
        "Always best",
        "Sorting"
      ],
      correctIndex: 0,
      explanation: "DFS על tree: pre/in/post order. על graph: צריך visited set.",
      optionFeedback: [
        "✅ נכון. depth-first.",
        "❌ BFS שונה.",
        "❌ תלוי בעיה.",
        "❌ traversal לא sort."
      ]
    },
    { id: "mc_dsa_bfs_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::function", level: 8,
      question: "מה BFS (Breadth First Search)?",
      options: [
        "Traversal לפי שכבות — queue-based. שימושי ל-shortest path ב-unweighted graph, level-order ב-tree",
        "DFS",
        "Recursive natural",
        "Sorting"
      ],
      correctIndex: 0,
      explanation: "Queue: enqueue start, dequeue, enqueue neighbors. Dijkstra משתמש ב-priority queue (BFS variant).",
      optionFeedback: [
        "✅ נכון. queue-based.",
        "❌ DFS שונה.",
        "❌ DFS recursive טבעי.",
        "❌ traversal."
      ]
    },
    { id: "mc_dsa_tree_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::object", level: 7,
      question: "מה DOM tree (בקצרה)?",
      options: [
        "Hierarchy: document → html → head/body → ... כל node יש parent (חוץ מ-root) ו-children. traversal דרך childNodes/parentNode",
        "Linear list",
        "Hash",
        "Ring"
      ],
      correctIndex: 0,
      explanation: "DFS על DOM = render order. שימושי ל-event bubbling/capturing.",
      optionFeedback: [
        "✅ נכון. tree structure.",
        "❌ לא linear.",
        "❌ לא hash.",
        "❌ לא ring."
      ]
    },
    { id: "mc_dsa_stack_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      question: "מה stack (LIFO)?",
      options: [
        "Last-In First-Out: push/pop בקצה. שימושים: function call stack, undo, balanced parens, DFS",
        "FIFO",
        "Sort",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Array.push/pop ב-JS = stack ops. O(1) ממוצע.",
      optionFeedback: [
        "✅ נכון. LIFO.",
        "❌ FIFO = queue.",
        "❌ stack לא ממיין.",
        "❌ סדר קבוע."
      ]
    },
    { id: "mc_dsa_queue_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      question: "מה queue (FIFO)?",
      options: [
        "First-In First-Out: enqueue בקצה אחד, dequeue מהקצה השני. שימושים: BFS, task scheduling, event loop",
        "LIFO",
        "Sorted",
        "Stack"
      ],
      correctIndex: 0,
      explanation: "Array.push + shift ב-JS, אבל shift O(n). LinkedList queue O(1).",
      optionFeedback: [
        "✅ נכון. FIFO.",
        "❌ stack.",
        "❌ queue לא ממיין.",
        "❌ הפוך."
      ]
    },
    { id: "mc_dsa_linked_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::object", level: 7,
      question: "מה היתרון של linked list על array?",
      options: [
        "Insert/delete באמצע O(1) (אם יש pointer). Array דורש shift = O(n). אבל linked list אין random access",
        "Smaller memory",
        "Always faster",
        "Sorted"
      ],
      correctIndex: 0,
      explanation: "Trade-off: linked list O(n) ל-access, O(1) למבנה. cache locality ב-array עדיף.",
      optionFeedback: [
        "✅ נכון. trade-off.",
        "❌ pointers = יותר.",
        "❌ תלוי op.",
        "❌ אינו מתויג."
      ]
    },
    { id: "mc_dsa_heap_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 8,
      question: "מה min-heap?",
      options: [
        "Tree balanced שבו parent ≤ children. Insert/extract-min O(log n). שימושי ל-priority queue, top-K",
        "Sort",
        "Linear",
        "BST"
      ],
      correctIndex: 0,
      explanation: "Array implementation: parent at i, children at 2i+1, 2i+2. heapify ב-O(n).",
      optionFeedback: [
        "✅ נכון. heap structure.",
        "❌ sort הוא שימוש.",
        "❌ לא linear.",
        "❌ BST שונה."
      ]
    },
    { id: "mc_dsa_bst_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::object", level: 8,
      question: "מה BST?",
      options: [
        "Binary Search Tree: left < node < right. Search/insert O(log n) balanced, O(n) worst (degenerate)",
        "Heap",
        "Trie",
        "Hash"
      ],
      correctIndex: 0,
      explanation: "Self-balancing variants: AVL, Red-Black. Java TreeMap = Red-Black Tree.",
      optionFeedback: [
        "✅ נכון. BST property.",
        "❌ heap שונה.",
        "❌ trie לprefixes.",
        "❌ hash שונה."
      ]
    },
    { id: "mc_dsa_trie_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::object", level: 8,
      question: "מתי trie מועיל?",
      options: [
        "Prefix search מהיר: autocomplete, dictionary, IP routing. O(len) חיפוש, לא תלוי בכמות מילים",
        "Sorted list",
        "Heap",
        "Hash"
      ],
      correctIndex: 0,
      explanation: "כל node = char. שליפת all words עם prefix דורשת DFS מ-prefix node.",
      optionFeedback: [
        "✅ נכון. prefix tree.",
        "❌ list שונה.",
        "❌ heap שונה.",
        "❌ hash שונה."
      ]
    },
    { id: "mc_dsa_graph_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::object", level: 8,
      question: "מה דרכים שונות לייצג graph?",
      options: [
        "Adjacency list (Map<node, Set<neighbors>>) — חסכוני ב-sparse. Adjacency matrix — חסכוני ב-dense, O(1) is-edge",
        "Only matrix",
        "Only list",
        "Tree only"
      ],
      correctIndex: 0,
      explanation: "List: V+E memory. Matrix: V² memory. בחירה לפי density.",
      optionFeedback: [
        "✅ נכון. שתי דרכים.",
        "❌ שתיים.",
        "❌ שתיים.",
        "❌ tree = graph בלי cycles."
      ]
    },
    { id: "mc_dsa_dfs_recurse_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::function", level: 8,
      question: "למה ב-DOM traversal, recursive DFS עלול לקרוס?",
      options: [
        "Stack overflow ב-DOMs עמוקים מאוד. Iterative עם stack מפורש בטוח יותר. אלטרנטיבה: TreeWalker",
        "DOM is flat",
        "Async only",
        "TS only"
      ],
      correctIndex: 0,
      explanation: "Call stack ב-JS limited. trees עם 10K+ depth מסוכנים. Iterative pattern עם array as stack.",
      optionFeedback: [
        "✅ נכון. stack limit.",
        "❌ DOM hierarchical.",
        "❌ DFS sync.",
        "❌ language-agnostic."
      ]
    },
    { id: "mc_dsa_unique_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      question: "איך להסיר duplicates מ-array?",
      options: [
        "[...new Set(arr)] — O(n) עם Set. שומר order. שימושי לprimitives. ל-objects לפי property: filter+seen",
        "Sort+filter",
        "indexOf",
        "Reduce only"
      ],
      correctIndex: 0,
      explanation: "ל-objects לפי id: const seen = new Set(); arr.filter(o=>{ if(seen.has(o.id)) return false; seen.add(o.id); return true; }).",
      optionFeedback: [
        "✅ נכון. Set spread.",
        "❌ שיטה אחרת O(n log n).",
        "❌ אטי.",
        "❌ אפשרי אבל פחות נקי."
      ]
    },
    { id: "mc_dsa_count_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      question: "איך לספור frequency ב-array?",
      options: [
        "reduce עם object/Map: arr.reduce((m,v)=>{ m[v]=(m[v]||0)+1; return m; }, {}) — O(n)",
        "Sort first",
        "Two loops",
        "JSON.stringify"
      ],
      correctIndex: 0,
      explanation: "Map עדיף על object אם keys לא strings. ל-strings, object נוח.",
      optionFeedback: [
        "✅ נכון. one-pass count.",
        "❌ אטי O(n log n).",
        "❌ אטי O(n²).",
        "❌ לא relevantnt."
      ]
    },
    { id: "mc_dsa_anagram_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::string", level: 6,
      question: "איך לבדוק אם שתי מחרוזות הן אנגרמה?",
      options: [
        "Sort + compare ב-O(n log n), או count chars (Map/Object) ב-O(n) ולהשוות counts",
        "Always equal",
        "indexOf",
        "Random"
      ],
      correctIndex: 0,
      explanation: "Counter approach: יותר מהיר ל-strings ארוכות. Sort approach: פשוט יותר.",
      optionFeedback: [
        "✅ נכון. שתי גישות.",
        "❌ שגיאה לוגית.",
        "❌ לא רלוונטי.",
        "❌ דטרמיניסטי."
      ]
    }
  ],
  fill: [
    { id: "fill_dsa_set_uniq_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// Remove duplicates from array\nconst unique = [...new ____(arr)];",
      answer: "Set",
      explanation: "Set deduplicates primitives in O(n)."
    },
    { id: "fill_dsa_count_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      code: "// Frequency map\nconst freq = arr.____((map, v) => {\n  map[v] = (map[v] || 0) + 1;\n  return map;\n}, {});",
      answer: "reduce",
      explanation: "reduce builds object accumulator."
    },
    { id: "fill_dsa_max_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// Max value\nconst max = ____.max(...arr);",
      answer: "Math",
      explanation: "Math.max(...arr) spread expands."
    },
    { id: "fill_dsa_sort_num_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// Numeric sort ascending\narr.sort((a, b) => a ____ b);",
      answer: "-",
      explanation: "(a-b) ascending; (b-a) descending."
    },
    { id: "fill_dsa_reverse_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// In-place reverse\narr.____();   // mutates\n// or: const reversed = [...arr].reverse(); — non-mutating copy",
      answer: "reverse",
      explanation: "Array.reverse mutates in-place."
    },
    { id: "fill_dsa_includes_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// Check membership\nif (arr.____(target)) {\n  console.log('found');\n}",
      answer: "includes",
      explanation: "includes returns boolean (handles NaN)."
    },
    { id: "fill_dsa_find_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// First match\nconst user = users.____(u => u.id === 5);",
      answer: "find",
      explanation: "find returns first match or undefined."
    },
    { id: "fill_dsa_some_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// Any element passes test\nconst hasAdmin = users.____(u => u.role === 'admin');",
      answer: "some",
      explanation: "some returns true if any matches."
    },
    { id: "fill_dsa_every_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// All elements pass test\nconst allActive = users.____(u => u.active);",
      answer: "every",
      explanation: "every returns true if all match."
    },
    { id: "fill_dsa_flat_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      code: "// Flatten nested array\n[[1,2],[3,4]].____()  // [1,2,3,4]\n[[1,[2]]].____(2)  // [1, 2] (depth)",
      answer: "flat",
      explanation: "flat(depth) flattens; default depth 1."
    },
    { id: "fill_dsa_flatmap_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      code: "// Map then flatten by 1\nconst pairs = arr.____(x => [x, x * 2]);",
      answer: "flatMap",
      explanation: "flatMap = map + flat(1) combined."
    },
    { id: "fill_dsa_from_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 6,
      code: "// Create array of size n\nArray.____({ length: 5 }, (_, i) => i * 2);\n// [0, 2, 4, 6, 8]",
      answer: "from",
      explanation: "Array.from with mapper builds array."
    },
    { id: "fill_dsa_indexof_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// Find index\nconst i = arr.____(target);  // -1 if not found",
      answer: "indexOf",
      explanation: "indexOf uses === (won't find NaN)."
    },
    { id: "fill_dsa_join_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 4,
      code: "// CSV from array\n['a', 'b', 'c'].____(',');  // 'a,b,c'",
      answer: "join",
      explanation: "join(sep) creates delimited string."
    },
    { id: "fill_dsa_slice_hh_001", topicId: "topic_dsa", conceptKey: "lesson_11::Array", level: 5,
      code: "// Non-mutating subarray\nconst first3 = arr.____(0, 3);  // arr[0..2]",
      answer: "slice",
      explanation: "slice = non-mutating; splice = mutating."
    }
  ]
};

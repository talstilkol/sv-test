const fs = require('fs');
const path = require('path');

function solve(inputData) {
  try {
    // Validate input
    if (!inputData || typeof inputData !== 'object') {
      throw new Error('Invalid input: expected an object');
    }

    // Extract required fields
    const { task_ids, micro_tasks } = inputData;
    if (!Array.isArray(task_ids) || !Array.isArray(micro_tasks)) {
      throw new Error('Invalid input: task_ids and micro_tasks must be arrays');
    }

    // Build work plan based on micro_tasks
    const workPlan = micro_tasks.map((task, index) => {
      // Map Hebrew micro_tasks to specific actions
      switch (task) {
        case 'זה סעיף כותרת/מעטפת':
          return {
            id: index + 1,
            action: 'apply_subtasks',
            description: 'Apply all subtasks of the question',
            status: 'pending'
          };
        case 'לבנות תוכנית עבודה לפי תתי-הסעיפים בפועל':
          return {
            id: index + 1,
            action: 'build_work_plan',
            description: 'Build detailed work plan per subtasks',
            status: 'pending'
          };
        case 'לעטוף פעולות ב-try/catch':
          return {
            id: index + 1,
            action: 'wrap_in_try_catch',
            description: 'Wrap operations in try/catch blocks',
            status: 'pending'
          };
        case 'להחזיר/להציג הודעת שגיאה':
          return {
            id: index + 1,
            action: 'return_error_message',
            description: 'Return or display error message',
            status: 'pending'
          };
        case 'לא להסתיר כשלונות':
          return {
            id: index + 1,
            action: 'preserve_errors',
            description: 'Preserve errors without hiding failures',
            status: 'pending'
          };
        case 'לזיהוי קלט/פלט':
          return {
            id: index + 1,
            action: 'identify_io',
            description: 'Identify input/output specifications',
            status: 'pending'
          };
        case 'לממש אלגוריתם':
          return {
            id: index + 1,
            action: 'implement_algorithm',
            description: 'Implement the required algorithm',
            status: 'pending'
          };
        case 'להחזיר מבנה נתונים מדויק':
          return {
            id: index + 1,
            action: 'return_exact_data_structure',
            description: 'Return exact required data structure',
            status: 'pending'
          };
        default:
          return {
            id: index + 1,
            action: 'unknown',
            description: `Unknown task: ${task}`,
            status: 'skipped'
          };
      }
    });

    // Process task_ids to map to specific implementations
    const taskImplementations = task_ids.map((taskId, index) => {
      switch (taskId) {
        case 'question_scope_inherited':
          return {
            id: index + 1,
            task: 'question_scope_inherited',
            implementation: 'inherit_scope from parent question',
            status: 'pending'
          };
        case 'alerts_error_handling':
          return {
            id: index + 1,
            task: 'alerts_error_handling',
            implementation: 'implement alert-based error handling',
            status: 'pending'
          };
        case 'js_algorithms':
          return {
            id: index + 1,
            task: 'js_algorithms',
            implementation: 'implement deterministic algorithm',
            status: 'pending'
          };
        default:
          return {
            id: index + 1,
            task: taskId,
            implementation: 'no implementation defined',
            status: 'skipped'
          };
      }
    });

    // Return structured result
    return {
      status: 'success',
      workPlan,
      taskImplementations,
      summary: {
        totalTasks: task_ids.length,
        totalMicroTasks: micro_tasks.length,
        completedMicroTasks: workPlan.filter(t => t.status !== 'skipped').length,
        completedTaskImplementations: taskImplementations.filter(t => t.status !== 'skipped').length
      }
    };
  } catch (error) {
    // Ensure errors are not hidden
    return {
      status: 'error',
      message: error.message,
      stack: error.stack,
      details: {
        timestamp: new Date().toISOString(),
        input: inputData
      }
    };
  }
}

module.exports = { solve };
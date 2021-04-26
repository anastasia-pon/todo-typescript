# Reminders App
A collaborative ToDo app that allows users create and manage todo lists together.

Language: TypeScript
Framework: React
Backend: Node
Tests: Cypress

## User Stories
The app implement the following user stories:
- I as a user can create to-do items, such as a grocery list
- I as ​another user ​can collaborate in real-time with ​user ​- so that we can(for example) edit our family shopping-list together
- I as a user can mark to-do items as “done” by clicking on them - so that I can avoid clutter and focus onthings that are still pending
- I as a user can filter the to-do list and view items that were marked as done - so that I can retrospect on my prior progress
- I as a user can add sub-tasks to my to-do items - so that I could make logical groups oftasks and see their overall progress
- I as a user can specify cost/price for a task or a subtask - so that I can track myexpenses / project cost
- I as a user can make infinite nested levels of subtasks
- I as a user can create multiple to-do lists where each list has it's unique URL that I canshare with my friends - so that I could have separate to do lists for my groceries and workrelated tasks
- In addition to regular to-do tasks, I as a user can add “special” typed to-do items, that will have custom style and some required fields:
  - ”work-task”, which has a required field “deadline” - which is a date
  - “food” that has fields:
    - required: “carbohydrate”, “fat”, “protein” (each specified in g/100g)
- I as a user can be sure that my todos will be persisted so that important information isnot lost when server restarts
- I as a user can regisster and access my todo lists at any time

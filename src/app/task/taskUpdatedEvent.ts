interface TaskUpdatedEvent {
  id: string;
  title?: string;
  details?: string;
  dueDate?: Date;
  completed?: boolean;
  completedDate?: Date;
}

export default TaskUpdatedEvent;

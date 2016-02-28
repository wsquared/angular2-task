import { Record } from 'immutable';

const TaskRecord = Record({
  id: 0,
  title: '',
  description: '',
  dueDate: null,
  completed: false,
  completedDate: null
});

export class TaskModel extends TaskRecord {

  id: number;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  completedDate: Date;

  constructor(props) {
    super(props);
  }

}

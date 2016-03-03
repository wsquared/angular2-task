import { Record } from 'immutable';

const TaskRecord = Record({
  id: 0,
  title: '',
  details: '',
  dueDate: null,
  completed: false,
  completedDate: null
});

export class TaskModel extends TaskRecord {

  id: string;
  title: string;
  details: string;
  dueDate: Date;
  completed: boolean;
  completedDate: Date;

  constructor(props) {
    super(props);
  }

}


import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  taskStatus: TaskStatus;
  search: string;
}

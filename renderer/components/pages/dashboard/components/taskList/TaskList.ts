export interface Task {
  /**
   * name of task
   */
  name: string

  /**
   * status of the task
   */
  status: 'todo' | 'done'

  /**
   * date at witch the task was creates
   */
  createdAt?: Date | undefined

  /**
   * date at witch the task was up: date
   */
  updateAt?: Date | undefined

  /**
   * date at witch the task was ended
   */
  endAt?: Date | undefined

  /**
   * due date of the task (timestamp)
   */
  dueDate?: Date | undefined

  /**
   * description of the task
   */
  description?: string | undefined

  /**
   * list of sub-task
   */
  children?: Array<Omit<Task, 'children'>> | undefined
}

export default interface TaskList {
  title: string

  updateAt?: Date

  tasks: Array<Task>
}

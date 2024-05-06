

export interface ITodo {
    id: string;
    title: string;
    description: string;
    createDate: string;
    updateDate: string;
    dueDate: string;
    status: "In Progress" | "Complete" | "Not Started";
  }
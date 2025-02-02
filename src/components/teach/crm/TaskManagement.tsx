import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Check, Clock, Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  contact_id: string;
  assigned_to: string;
}

const TaskManagement = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["follow-up-tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("follow_up_tasks")
        .select(`
          *,
          profiles!follow_up_tasks_contact_id_fkey (
            first_name,
            last_name
          )
        `)
        .order("due_date", { ascending: true });

      if (error) throw error;
      return data as Task[];
    },
  });

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return;

    const { error } = await supabase.from("follow_up_tasks").insert([
      {
        title: newTask.title,
        description: newTask.description,
        created_by: (await supabase.auth.getUser()).data.user?.id,
        status: "pending",
      },
    ]);

    if (!error) {
      setNewTask({ title: "", description: "" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="flex-1"
        />
        <Button onClick={handleCreateTask}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-4">
          {tasks?.map((task) => (
            <Card key={task.id}>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                  <Badge
                    variant={task.status === "completed" ? "default" : "secondary"}
                  >
                    {task.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {format(new Date(task.due_date), "PPp")}
                  </span>
                  {task.status !== "completed" && (
                    <Button variant="ghost" size="sm">
                      <Check className="h-4 w-4 mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TaskManagement;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { format, addDays } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const DuplicateClass = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState<any>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [keepWaitlist, setKeepWaitlist] = useState(false);
  const [keepStudents, setKeepStudents] = useState(false);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      setIsLoading(true);
      
      if (!courseId) {
        toast({
          title: 'Error',
          description: 'No course ID provided',
          variant: 'destructive',
        });
        navigate('/dashboard/classes');
        return;
      }
      
      try {
        // This would be a real API call in production
        // For now, we'll use a mock response
        const mockCourse = {
          id: courseId,
          title: 'Introduction to Pottery',
          date: new Date().toISOString(),
          sessions: [
            {
              id: 1,
              date: new Date().toISOString(),
              start_time: '10:00',
              end_time: '12:00',
            },
            {
              id: 2,
              date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              start_time: '10:00',
              end_time: '12:00',
            }
          ],
          waitlist: [
            { id: 1, user_id: 'user1', name: 'John Doe' },
            { id: 2, user_id: 'user2', name: 'Jane Smith' },
          ],
          enrollments: [
            { id: 1, user_id: 'user3', name: 'Alice Johnson' },
            { id: 2, user_id: 'user4', name: 'Bob Brown' },
          ]
        };
        
        setCourseData(mockCourse);
        setNewTitle(`Copy of ${mockCourse.title}`);
        
        // Set default date to one week after the original first session
        const firstSessionDate = new Date(mockCourse.sessions[0].date);
        setNewDate(addDays(firstSessionDate, 7));
        
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch course data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId, navigate, toast]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTitle || !newDate) {
      toast({
        title: 'Missing information',
        description: 'Please provide a title and date for the new class',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Calculate date difference to shift all session dates
      const originalFirstDate = new Date(courseData.sessions[0].date);
      const daysDifference = Math.round((newDate.getTime() - originalFirstDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // This would be a real API call in production
      // For now, just show a success message
      setTimeout(() => {
        toast({
          title: 'Success',
          description: 'Class duplicated successfully!',
        });
        navigate('/dashboard/classes');
      }, 1500);
      
    } catch (error) {
      console.error('Error duplicating class:', error);
      toast({
        title: 'Error',
        description: 'Failed to duplicate class',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };
  
  if (isLoading && !courseData) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-40">
              <p>Loading course data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-4 sm:py-10 px-4 sm:px-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Duplicate Class</CardTitle>
          <CardDescription>
            Create a copy of "{courseData?.title}" with new dates and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">New Class Title</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter a title for the new class"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <div className="mt-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="startDate"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newDate ? format(newDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newDate}
                        onSelect={setNewDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  All sessions will be shifted to start from this date
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Additional Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keepWaitlist"
                    checked={keepWaitlist}
                    onCheckedChange={(checked) => setKeepWaitlist(checked === true)}
                  />
                  <label
                    htmlFor="keepWaitlist"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Copy waitlist ({courseData?.waitlist?.length || 0} students)
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keepStudents"
                    checked={keepStudents}
                    onCheckedChange={(checked) => setKeepStudents(checked === true)}
                  />
                  <label
                    htmlFor="keepStudents"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Copy enrolled students ({courseData?.enrollments?.length || 0} students)
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard/classes')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading || !newTitle || !newDate}
              >
                <Copy className="mr-2 h-4 w-4" />
                {isLoading ? 'Creating...' : 'Duplicate Class'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DuplicateClass;

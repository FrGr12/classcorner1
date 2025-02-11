
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Star, 
  Clock, 
  Download, 
  Filter, 
  BookMarked,
  GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentStats = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-2xl font-bold">Stats & Insights</h1>
              <p className="text-muted-foreground mt-1">
                Track your learning progress and achievements
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="text-sm"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter Data
              </Button>
              <Button 
                className="bg-accent-purple hover:bg-accent-purple/90 text-white text-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Progress
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview/Highlights Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Learning Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Classes Attended</p>
                  <h3 className="text-2xl font-bold mt-2">0</h3>
                  <p className="text-xs mt-1 opacity-80">All time</p>
                </div>
                <BookOpen className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Upcoming Classes</p>
                  <h3 className="text-2xl font-bold mt-2">0</h3>
                  <p className="text-xs mt-1 opacity-80">Next 30 days</p>
                </div>
                <Calendar className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Hours Learning</p>
                  <h3 className="text-2xl font-bold mt-2">0</h3>
                  <p className="text-xs mt-1 opacity-80">Total hours</p>
                </div>
                <Clock className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-purple text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Skills Learned</p>
                  <h3 className="text-2xl font-bold mt-2">0</h3>
                  <p className="text-xs mt-1 opacity-80">Unique skills</p>
                </div>
                <GraduationCap className="h-5 w-5 opacity-70" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Progress Metrics */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Learning Progress</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Average Rating</h3>
              </div>
              <div className="text-2xl font-bold">0.0</div>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookMarked className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Completion Rate</h3>
              </div>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-sm text-muted-foreground mt-1">
                Classes completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Investment</h3>
              </div>
              <div className="text-2xl font-bold">$0</div>
              <p className="text-sm text-muted-foreground mt-1">
                Total spent on classes
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Learning History */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Learning History</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Monthly Activity</h3>
              <Button variant="outline" size="sm">Last 12 months</Button>
            </div>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Activity chart will be displayed here
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Skills Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Skills Overview</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Skills Distribution</h3>
              <Button variant="outline" size="sm">All Time</Button>
            </div>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Skills distribution chart will be displayed here
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recent Reviews */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Your Reviews</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Recent Reviews</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <p className="text-muted-foreground text-center py-8">
              No reviews submitted yet
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-left">Recommended Classes</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Based on Your Interests</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <p className="text-muted-foreground text-center py-8">
              Start taking classes to get personalized recommendations
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default StudentStats;

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnifiedInbox from "../crm/UnifiedInbox";
import Communications from "../crm/Communications";
import CourseMatches from "../crm/CourseMatches";
import MatchInsights from "../crm/MatchInsights";

const TeacherCRM = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">CRM & Messaging</h1>

      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="matches">Course Matches</TabsTrigger>
          <TabsTrigger value="insights">Match Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <UnifiedInbox />
        </TabsContent>

        <TabsContent value="communications">
          <Communications />
        </TabsContent>

        <TabsContent value="matches">
          <CourseMatches />
        </TabsContent>

        <TabsContent value="insights">
          <MatchInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherCRM;
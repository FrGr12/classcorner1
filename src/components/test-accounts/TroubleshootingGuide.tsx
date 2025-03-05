
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Database, RefreshCw, AlertCircle, Terminal, Code, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TroubleshootingGuide = () => {
  const handleCopySQL = () => {
    const sqlSetup = `
-- Make sure we have the user_type enum first
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'user_type'
  ) THEN
    CREATE TYPE user_type AS ENUM ('student', 'teacher', 'admin');
  END IF;
END
$$;

-- Create the profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  user_type user_type NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  search_text TEXT
);

-- Create the function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, user_type)
  VALUES (
    new.id,
    new.email,
    COALESCE((new.raw_user_meta_data->>'first_name'), ''),
    COALESCE((new.raw_user_meta_data->>'last_name'), ''),
    COALESCE((new.raw_user_meta_data->>'user_type')::user_type, 'student')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Add the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();`;

    navigator.clipboard.writeText(sqlSetup);
    alert("SQL setup code copied to clipboard!");
  };

  return (
    <div className="p-4 border rounded-md bg-amber-50">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-md text-amber-800 font-medium mb-3">
            Database Setup Required
          </p>
          
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded text-sm text-red-700">
            <p className="font-semibold flex items-center">
              <Database className="h-4 w-4 mr-1" /> Missing Database Configuration
            </p>
            <p className="mt-1">
              The test account creation feature requires a <code className="bg-red-100 px-1 rounded">profiles</code> table 
              and <code className="bg-red-100 px-1 rounded">handle_new_user</code> trigger to work.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="bg-white rounded-md border border-amber-200 mb-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-3 py-2 hover:bg-amber-50 text-amber-800 font-medium">
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Database Setup Instructions
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 py-2 bg-amber-50/50 border-t border-amber-100">
                <ol className="list-decimal pl-5 text-sm text-amber-800 space-y-2">
                  <li>Open your Supabase project dashboard</li>
                  <li>Go to the SQL Editor section</li>
                  <li>Create a new query</li>
                  <li>Copy and paste the SQL code (click button below)</li>
                  <li>Run the SQL query to set up the required database structure</li>
                  <li>Return to this page and try creating test accounts again</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-3 py-2 hover:bg-amber-50 text-amber-800 font-medium">
                <div className="flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  SQL Code Explanation
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 py-2 bg-amber-50/50 border-t border-amber-100">
                <div className="text-xs text-amber-700">
                  <p className="font-medium">What this SQL code does:</p>
                  <ol className="list-decimal pl-4 mt-1 space-y-1">
                    <li>Creates the <code className="bg-amber-100 px-1 rounded">user_type</code> enum if it doesn't exist</li>
                    <li>Creates the <code className="bg-amber-100 px-1 rounded">profiles</code> table linked to Supabase Auth users</li>
                    <li>Creates the <code className="bg-amber-100 px-1 rounded">handle_new_user</code> function</li>
                    <li>Sets up a trigger to create a profile whenever a user signs up</li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-3 py-2 hover:bg-amber-50 text-amber-800 font-medium">
                <div className="flex items-center">
                  <Terminal className="h-4 w-4 mr-2" />
                  Verification Steps
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 py-2 bg-amber-50/50 border-t border-amber-100">
                <div className="text-xs text-amber-700">
                  <p className="font-medium">After running the SQL, verify that:</p>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>The <code className="bg-amber-100 px-1 rounded">profiles</code> table exists in the public schema</li>
                    <li>The <code className="bg-amber-100 px-1 rounded">handle_new_user</code> function exists in the public schema</li>
                    <li>The <code className="bg-amber-100 px-1 rounded">on_auth_user_created</code> trigger exists on the auth.users table</li>
                    <li>Try creating test accounts again after verification</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex flex-col gap-3 mb-4">
            <Button 
              variant="secondary" 
              onClick={handleCopySQL}
              className="bg-amber-100 hover:bg-amber-200 border border-amber-200 text-amber-800"
            >
              <Database className="h-4 w-4 mr-2" />
              Copy SQL Setup Code
            </Button>
            
            <Button 
              variant="ghost"
              className="bg-white border border-amber-200 text-amber-800 hover:bg-amber-50"
              onClick={() => window.open('https://supabase.com/dashboard/project/pylbrdwuikhwupqjcqzy/sql/new', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Supabase SQL Editor
            </Button>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200 text-blue-800 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="font-medium">After running the SQL:</span>
            </div>
            <p className="text-sm">
              Return to this page and click the "Create Test Accounts" button again. The system will automatically attempt
              to create test accounts with the newly configured database structure.
            </p>
          </Alert>
          
          <p className="text-xs text-amber-600 italic">
            Need more help? Check the <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="underline text-amber-800">Supabase documentation</a> or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootingGuide;

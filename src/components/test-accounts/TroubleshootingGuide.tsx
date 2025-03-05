
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Database, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="mt-4 p-4 border rounded-md bg-amber-50">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-amber-800 font-medium mb-2">
            Troubleshooting Database Setup Issues:
          </p>
          
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded text-sm text-red-700">
            <p className="font-semibold flex items-center">
              <Database className="h-4 w-4 mr-1" /> Missing Database Setup Detected
            </p>
            <p className="mt-1">
              This error occurs because your Supabase database is missing the required tables and triggers.
              The test account creation needs a <code className="bg-red-100 px-1 rounded">profiles</code> table
              and <code className="bg-red-100 px-1 rounded">handle_new_user</code> function to work properly.
            </p>
          </div>
          
          <p className="text-sm font-medium text-amber-800 mb-2">Steps to fix the issue:</p>
          <ol className="list-decimal pl-5 text-sm text-amber-800 space-y-2">
            <li>Open your Supabase project dashboard</li>
            <li>Go to the SQL Editor section</li>
            <li>Create a new query</li>
            <li>Copy and paste the following SQL code (click button below)</li>
            <li>Run the SQL query to set up the required database structure</li>
            <li>Return to this page and try creating test accounts again</li>
          </ol>
          
          <div className="mt-4 flex justify-center">
            <Button 
              variant="secondary" 
              onClick={handleCopySQL}
              className="bg-amber-100 hover:bg-amber-200 border border-amber-200 text-amber-800"
            >
              <Database className="h-4 w-4 mr-2" />
              Copy SQL Setup Code
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-white border border-amber-200 rounded text-xs text-amber-700">
            <p className="font-medium">What this SQL code does:</p>
            <ol className="list-decimal pl-4 mt-1 space-y-1">
              <li>Creates the <code className="bg-amber-100 px-1 rounded">user_type</code> enum if it doesn't exist</li>
              <li>Creates the <code className="bg-amber-100 px-1 rounded">profiles</code> table linked to Supabase Auth users</li>
              <li>Creates the <code className="bg-amber-100 px-1 rounded">handle_new_user</code> function</li>
              <li>Sets up a trigger to create a profile whenever a user signs up</li>
            </ol>
          </div>
          
          <div className="mt-4 text-sm text-amber-800">
            <p className="font-medium">Other troubleshooting tips:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Verify that the Edge Function is properly deployed with the necessary environment variables</li>
              <li>Check that your Supabase service role key has the necessary permissions</li>
              <li>Try refreshing the page and clearing browser cache</li>
              <li>If issues persist, check the Edge Function logs in your Supabase dashboard</li>
            </ul>
          </div>
          
          <div className="mt-4 pt-3 border-t border-amber-200">
            <p className="text-xs text-amber-600 italic">
              Need more help? Check the <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="underline text-amber-800">Supabase documentation</a> or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootingGuide;

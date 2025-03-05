
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const TroubleshootingGuide = () => {
  return (
    <div className="mt-4 p-4 border rounded-md bg-amber-50">
      <p className="text-sm text-amber-800 font-medium mb-2">
        Troubleshooting Login Issues:
      </p>
      <ol className="list-decimal pl-5 text-sm text-amber-800 space-y-2">
        <li>First, try recreating the test accounts using the button above</li>
        <li>If you get a database error:
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Check if your Supabase database has all required tables set up correctly</li>
            <li>Make sure there is a <code className="bg-amber-100 px-1 rounded">profiles</code> table with proper columns</li>
            <li>Verify that the Row Level Security (RLS) policies are properly configured</li>
            <li>Check if there are any triggers or functions missing in your database setup</li>
          </ul>
        </li>
        <li>If the "Test Login" button works but you still can't log in on the auth page:
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Clear your browser cache and cookies</li>
            <li>Try in an incognito/private browsing window</li>
            <li>Make sure you're using the exact same email and password (use copy buttons)</li>
          </ul>
        </li>
        <li>Check the Supabase dashboard to ensure:
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>The user appears in the Authentication {'>'} Users section</li>
            <li>Email confirmation is disabled in Authentication {'>'} Settings</li>
            <li>The site URL and redirect URLs are configured correctly</li>
          </ul>
        </li>
        <li>If issues persist:
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Check browser console logs for specific error messages</li>
            <li>Verify that the <code className="bg-amber-100 px-1 rounded">handle_new_user</code> function and trigger exist in your database</li>
            <li>Try running the database setup SQL scripts again</li>
          </ul>
        </li>
      </ol>

      <div className="mt-3 p-2 bg-white border border-amber-200 rounded text-xs text-amber-700">
        <p className="font-medium">Common Database Setup Issues:</p>
        <p className="mt-1">If you see "The profiles table does not exist" error, you need to set up your database with the required tables. Make sure there is a <code className="bg-amber-100 px-1 rounded">handle_new_user</code> function that creates profiles when users sign up.</p>
      </div>
    </div>
  );
};

export default TroubleshootingGuide;

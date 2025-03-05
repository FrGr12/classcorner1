
import React from "react";
import { Link } from "react-router-dom";

const TroubleshootingGuide = () => {
  return (
    <div className="mt-4 p-4 border rounded-md bg-amber-50">
      <p className="text-sm text-amber-800 font-medium mb-2">
        Troubleshooting Login Issues:
      </p>
      <ol className="list-decimal pl-5 text-sm text-amber-800 space-y-2">
        <li>First, try recreating the test accounts using the button above</li>
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
        <li>If issues persist, check browser console logs for specific error messages</li>
      </ol>
    </div>
  );
};

export default TroubleshootingGuide;

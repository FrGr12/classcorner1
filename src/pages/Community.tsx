
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/landing/Navigation";
import { useCommunityData } from "@/hooks/useCommunityData";
import { CommunityLayout } from "@/components/community/layout/CommunityLayout";

const Community = () => {
  const { topic, category, resource } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [activeTab, setActiveTab] = useState(() => {
    if (window.location.pathname.includes('/groups')) return 'groups';
    if (window.location.pathname.includes('/resources')) return 'resources';
    return 'topics';
  });

  useEffect(() => {
    if (window.location.pathname.includes('/groups')) {
      setActiveTab('groups');
    } else if (window.location.pathname.includes('/resources')) {
      setActiveTab('resources');
    } else {
      setActiveTab('topics');
    }
  }, [window.location.pathname]);

  const communityData = useCommunityData(topic, category, searchQuery);

  return (
    <>
      <Navigation />
      <CommunityLayout 
        activeTab={activeTab}
        topic={topic}
        category={category}
        resource={resource}
        communityData={communityData}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default Community;

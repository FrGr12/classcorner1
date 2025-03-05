
import React from 'react';
import { useTeacherMessages } from './useTeacherMessages';
import { MessageList } from './MessageList';
import { MessageReply } from './MessageReply';

const TeacherMessages = () => {
  const { 
    messages, 
    loading,
    newMessage,
    setNewMessage,
    selectedMessage,
    setSelectedMessage,
    activeTab,
    setActiveTab,
    handleSendReply,
    getUnreadMessages,
    getSentMessages
  } = useTeacherMessages();

  if (loading) {
    return <div className="p-4">Loading messages...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 border rounded-lg overflow-hidden">
        <div className="bg-muted p-3 border-b">
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md ${activeTab === 'inbox' ? 'bg-primary text-primary-foreground' : 'hover:bg-background'}`}
              onClick={() => setActiveTab('inbox')}
            >
              Inbox
              {getUnreadMessages().length > 0 && (
                <span className="ml-2 bg-destructive text-destructive-foreground text-xs rounded-full px-2 py-0.5">
                  {getUnreadMessages().length}
                </span>
              )}
            </button>
            <button
              className={`px-3 py-1 rounded-md ${activeTab === 'sent' ? 'bg-primary text-primary-foreground' : 'hover:bg-background'}`}
              onClick={() => setActiveTab('sent')}
            >
              Sent
            </button>
          </div>
        </div>
        
        <MessageList
          messages={activeTab === 'inbox' ? messages : getSentMessages()}
          selectedMessage={selectedMessage}
          onSelectMessage={setSelectedMessage}
        />
      </div>
      
      <div className="md:col-span-2 border rounded-lg">
        {selectedMessage ? (
          <MessageReply
            selectedMessage={selectedMessage}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSendReply={() => handleSendReply(selectedMessage.thread_id, newMessage)}
            onClose={() => setSelectedMessage(null)}
          />
        ) : (
          <div className="flex items-center justify-center h-full p-6 text-center text-muted-foreground">
            Select a message to view and reply
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMessages;

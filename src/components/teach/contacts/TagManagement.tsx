
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag, Pencil, X, Check, Plus } from "lucide-react";

interface ContactTag {
  id: string;
  name: string;
  color: string;
}

const TagManagement = () => {
  const [tags, setTags] = useState<ContactTag[]>([
    { id: '1', name: 'Active', color: 'bg-green-100 text-green-800' },
    { id: '2', name: 'VIP', color: 'bg-purple-100 text-purple-800' },
    { id: '3', name: 'Waitlist', color: 'bg-orange-100 text-orange-800' }
  ]);
  const [newTagName, setNewTagName] = useState('');
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag: ContactTag = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        color: 'bg-blue-100 text-blue-800'
      };
      setTags([...tags, newTag]);
      setNewTagName('');
    }
  };

  const handleEditTag = (tag: ContactTag) => {
    setEditingTag(tag.id);
    setEditedName(tag.name);
  };

  const handleSaveEdit = (tagId: string) => {
    if (editedName.trim()) {
      setTags(tags.map(tag => 
        tag.id === tagId ? { ...tag, name: editedName.trim() } : tag
      ));
      setEditingTag(null);
      setEditedName('');
    }
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter new tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button 
          onClick={handleAddTag}
          className="bg-accent-purple hover:bg-accent-purple/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      </div>

      <div className="grid gap-4">
        {tags.map(tag => (
          <div key={tag.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center gap-3">
              {editingTag === tag.id ? (
                <Input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-48"
                  autoFocus
                />
              ) : (
                <Badge className={`${tag.color} px-2 py-1`}>
                  {tag.name}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {editingTag === tag.id ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSaveEdit(tag.id)}
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleEditTag(tag)}
                >
                  <Pencil className="h-4 w-4 text-gray-500" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDeleteTag(tag.id)}
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagManagement;

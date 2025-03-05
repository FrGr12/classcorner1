
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export function CreateResourceDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !content.trim() || !type || !category) {
      toast({
        title: t("message.error"),
        description: t("resource.fillAllFields"),
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: t("message.error"),
        description: t("resource.loginRequired"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase
      .from('learning_resources')
      .insert({
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        type,
        category,
        read_time: readTime.trim(),
        author_id: user.id,
        is_admin: true
      });

    setIsLoading(false);

    if (error) {
      toast({
        title: t("message.error"),
        description: error.message || t("resource.createFailed"),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t("message.success"),
      description: t("resource.createSuccess"),
    });
    setIsOpen(false);
    setTitle("");
    setDescription("");
    setContent("");
    setType("");
    setCategory("");
    setReadTime("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="w-4 h-4 mr-2" />
          {t("resource.new")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{t("resource.createTitle")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder={t("resource.titlePlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder={t("resource.descriptionPlaceholder")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder={t("resource.contentPlaceholder")}
              className="min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder={t("resource.selectType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guide">{t("resource.type.guide")}</SelectItem>
                <SelectItem value="tutorial">{t("resource.type.tutorial")}</SelectItem>
                <SelectItem value="article">{t("resource.type.article")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder={t("resource.selectCategory")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pottery">{t("categories.pottery")}</SelectItem>
                <SelectItem value="photography">{t("categories.photography")}</SelectItem>
                <SelectItem value="painting">{t("categories.painting")}</SelectItem>
                <SelectItem value="music">{t("categories.music")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Input
              placeholder={t("resource.readTimePlaceholder")}
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("resource.create")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


import CreateClassHeader from "@/components/teach/create-class/CreateClassHeader";
import DuplicateClassForm from "@/components/teach/duplicate-class/DuplicateClassForm";
import { useDuplicateClassForm } from "@/hooks/use-duplicate-class-form";

const DuplicateClass = () => {
  const {
    form,
    images,
    setImages,
    isSubmitting,
    draftCount,
    onSubmit,
    saveDraft,
  } = useDuplicateClassForm();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CreateClassHeader draftCount={draftCount} isSubmitting={isSubmitting} />
      <DuplicateClassForm
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        onSaveDraft={saveDraft}
        images={images}
        setImages={setImages}
      />
    </div>
  );
};

export default DuplicateClass;

import NavbarCompo from "../NavbarCompo";
import { EditorRegex } from ".";



const CreatePage = ({
  children, 
  variables, 
  onSave,
  onChange,
  initialContent
}) => {
  
  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarCompo />
      
      
        <EditorRegex
          onSave={onSave}
  
          variables={variables}
          initialContent={initialContent}
          onChange={onChange}
        >
         {children}
        </EditorRegex>
    
 

   
    </div>
  );
};

export default CreatePage;

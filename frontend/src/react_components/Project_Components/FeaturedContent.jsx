import React from 'react'
// import Input from '../components/input';
// import Label from '../components/label';
// import Textarea from '../components/textArea';

const FeaturedContent = ({ Card, CardContent, CgClose, handleRemoveSection, featuredContent, setFeaturedContent, Button, HiPlus, handleAddSection }) => {

  // const handleClick = (id)=>{
  //   featuredContent.map((section)=>{
  //     section.primaryActions.map((action) =>{
  //       console.log(section);
  //       if(action.id===id){
  //         return action.component
  //     }
  //     })

  //   })
  // }
  //   const handleClick = (id) => {
  //     console.log(id);
  //   for (const section of featuredContent) {
  //     const foundAction = section.primaryActions.find((action) => action.id === id);

  //     if (foundAction) {
  //       // Do something with the found action or component
  //       return action.component
  //       // If you need to return the component, you can store it in a state variable or trigger some other logic
  //     }
  //   }
  // };

  // const handleClick = (id) => {
  //   const updatedContent = featuredContent.map((section) => ({
  //     ...section,
  //     primaryActions: section.primaryActions.map((action) => {
  //       if (action.id === id) {
  //         return { ...action, isVisible: true };
  //       }
  //       return action;
  //     }),
  //   }));
  //   console.log(featuredContent);

  //   setFeaturedContent(updatedContent);
  // };

  //   const handleClick = (id) => {
  //   setFeaturedContent(prevFeaturedContent => 
  //     prevFeaturedContent.map(section => ({
  //       ...section,
  //       primaryActions: section.primaryActions.map(action => 
  //         action.id === id ? { ...action, isVisible: true } : action
  //       ),
  //     }))
  //   );
  //   console.log(featuredContent);
  // };

  // const handleClick = (id) => {
  //   setFeaturedContent(prevFeaturedContent => 
  //     prevFeaturedContent.map(section => ({
  //       ...section,
  //       primaryActions: section.primaryActions.map(action => 
  //         action.id === id ? { ...action, isVisible: true } : action
  //       ),
  //     })),
  //     );
  //     console.log(featuredContent);
  // };

  const handleClick = (sectionId, actionId) => {
    setFeaturedContent((prevFeaturedContent) =>
      prevFeaturedContent.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            primaryActions: section.primaryActions.map((action) =>
              action.id === actionId ? { ...action, isVisible: true } : action
            ),
          }
          : section
      )
    );
    console.log(featuredContent);
  };




  return (
    <div className="Featured-content flex flex-col w-[100%] my-7 space-y-8">
      <h2 className="text-white font-extrabold text-2xl my-4">Featured content</h2>

      {featuredContent.map((section) => (
        <Card key={section.id} className="bg-gray-800 border-hidden">
          <CardContent>
            <div className="flex justify-center items-center ml-4 mr-2">
              <input
                type="text"
                name="section_title"
                placeholder="Section title"
                value={'Section title'}
                className="w-full pl-2 text-white font-medium bg-gray-800 my-4 h-12 border-b-1 border  border-transparent focus:outline-none focus:ring-0 border-b-black"
                spellCheck="false"
              />
              <div
                onClick={() => {
                  handleRemoveSection(section.id);
                }}
                className="rounded-md h-7 w-7 hover:bg-gray-700 hover:text-white cursor-pointer flex justify-center items-center transition-all duration-300 ease-in-out"
              >
                <CgClose className="text-gray-500  text-lg font-thin h-5 w-5  cursor-pointer" />
              </div>
            </div>

            <div className="mx-4 space-y-2">
              {section.primaryActions
                .filter((action) => action.isVisible)
                .map((action) => action.component)}
            </div>

            <div className="primary-actions flex flex-col w-[100%] my-1 space-y-2">
              <div className="primary-buttons grid grid-cols-2 gap-2 w-full">
                {section.primaryActions.map((action) => (
                  <Button
                    key={action.id}
                    className="bg-gray-700 w-[full] hover:bg-gray-600 justify-start"
                    onClick={() => handleClick(section.id, action.id)}
                  >
                    {React.createElement(action.icon, { className: 'mr-2 h-5 w-5' })}
                    <div className="font-medium text-base">{action.label}</div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}


      <div className="flex space-x-4">
        <Button
          className="bg-gray-700 h-12 w-12 hover:bg-gray-600 justify-start flex items-center"
          onClick={handleAddSection}
        >
          <HiPlus className="text-white text-9xl font-extrabold" />
        </Button>
        <div className="font-medium text-base text-white flex items-center">Add section</div>
      </div>
    </div>
  )
}

export default FeaturedContent;